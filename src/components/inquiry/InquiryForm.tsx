'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Field, TextInput, TextArea, Select, Checkbox } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { PhotoUpload, type PreparedPhoto } from './PhotoUpload';
import { PhoneIcon, CheckIcon } from '@/components/ui/icons';
import { inquirySchema } from '@/lib/inquiry/schema';
import { URGENCIES, ROOF_TYPES } from '@/lib/inquiry/fields';
import { submit } from '@/lib/inquiry/submit';
import { client, servicesByOrder, type ServiceId } from '~/config/client.config';
import { telHref } from '@/lib/site';
import type { Locale } from '@/i18n/routing';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * The enquiry form. Section 12 calls it the core of the project, and the
 * reason is in section 4: the difference between "I would like a quote" and
 * "tile roof, 120 m², built 1978, water stain upstairs, three photos attached,
 * Mamer" is the difference between a callback and an appointment. Every field
 * here exists to move an enquiry toward the second.
 *
 * Three behaviours are worth pointing out:
 *
 *  · Choosing "emergency" immediately surfaces the phone number, because a
 *    form is the wrong tool when water is coming in — and saying so costs one
 *    enquiry and saves a roof.
 *  · Success is rendered in place. Section 12.2 rules out a separate thank-you
 *    page with no way back.
 *  · Validation runs on submit, not on every keystroke. Errors that appear
 *    while someone is still typing their email address are noise.
 */
export function InquiryForm({
  defaultService,
  sourcePage,
  compact = false,
}: {
  readonly defaultService?: ServiceId;
  readonly sourcePage?: string;
  readonly compact?: boolean;
}) {
  const t = useTranslations('form');
  const locale = useLocale() as Locale;

  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<readonly PreparedPhoto[]>([]);
  const [urgency, setUrgency] = useState<string>('');
  const [delivered, setDelivered] = useState(true);
  const [photoCount, setPhotoCount] = useState(0);

  /* Rendered once, when the form is mounted. Section 12.2's timing check. */
  const startedAt = useMemo(() => Date.now(), []);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  /*
    Move focus to the confirmation once React has committed it.

    A requestAnimationFrame scheduled next to setStatus fires before the commit,
    so the ref is still null and focus silently stays on the submit button —
    which leaves a screen-reader user with no announcement that anything
    happened at all. An effect keyed on the status runs after the DOM exists.
  */
  useEffect(() => {
    if (status === 'success') summaryRef.current?.focus();
  }, [status]);

  /** Turns a message key from the schema into a sentence in the visitor's language. */
  function message(key: string): string {
    return key.startsWith('errors.') ? t(key) : key;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const candidate = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      urgency: String(data.get('urgency') ?? ''),
      service: String(data.get('service') ?? ''),
      roofType: String(data.get('roofType') ?? ''),
      postalCode: String(data.get('postalCode') ?? ''),
      locality: String(data.get('locality') ?? ''),
      message: String(data.get('message') ?? ''),
      consent: data.get('consent') === 'on',
      locale,
      sourcePage,
      website: String(data.get('website') ?? ''),
      startedAt,
    };

    const parsed = inquirySchema.safeParse(candidate);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? '');
        if (key && !fieldErrors[key]) fieldErrors[key] = message(issue.message);
      }
      setErrors(fieldErrors);
      setStatus('idle');
      // Move focus to the first field that failed, so a keyboard user is not
      // left at the submit button wondering what happened.
      const first = Object.keys(fieldErrors)[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus('submitting');

    const result = await submit({
      inquiry: parsed.data,
      photos: photos.map((photo) => ({ name: photo.name, type: photo.type, data: photo.data })),
    });

    if (result.ok) {
      setDelivered(result.delivered);
      setPhotoCount(photos.length);
      for (const photo of photos) URL.revokeObjectURL(photo.previewUrl);
      setPhotos([]);
      setStatus('success');
      return;
    }

    if (result.error === 'validation') {
      setErrors(
        Object.fromEntries(
          Object.entries(result.fieldErrors).map(([key, value]) => [key, message(value)]),
        ),
      );
      setStatus('idle');
      return;
    }

    setStatus('error');
  }

  /* ---- Success ------------------------------------------------------- */
  if (status === 'success') {
    return (
      <div
        ref={summaryRef}
        tabIndex={-1}
        className="border-t-2 border-moss-600 bg-moss-100/60 p-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <p className="flex items-center gap-3 font-heading text-h3 font-bold text-ink">
          <CheckIcon className="size-6 text-moss-600" />
          {t('successTitle')}
        </p>
        <p className="mt-4 max-w-[58ch] text-body text-ink">{t('successBody')}</p>
        {photoCount > 0 ? (
          <p className="mt-2 text-small text-ink-muted">{t('successPhotos', { count: photoCount })}</p>
        ) : null}
        {!delivered ? (
          <p className="mt-5 border-l-2 border-red-600 bg-red-500/8 py-3 pl-4 text-small text-ink">
            {t('successDemo')}
          </p>
        ) : null}
        <div className="mt-7">
          <Button
            variant="secondary"
            onClick={() => {
              setStatus('idle');
              formRef.current?.reset();
            }}
          >
            {t('successAgain')}
          </Button>
        </div>
      </div>
    );
  }

  const busy = status === 'submitting';

  /* ---- Form ---------------------------------------------------------- */
  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      {/*
        Honeypot. Not `display:none` — some bots skip hidden fields, and some
        password managers fill them. Moved off-screen, taken out of the tab
        order, and hidden from assistive technology.
      */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="inq-name" label={t('name')} required error={errors.name}>
          {(aria) => (
            <TextInput aria={aria} name="name" autoComplete="name" invalid={Boolean(errors.name)} disabled={busy} />
          )}
        </Field>

        <Field id="inq-email" label={t('email')} required error={errors.email}>
          {(aria) => (
            <TextInput
              aria={aria}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              invalid={Boolean(errors.email)}
              disabled={busy}
            />
          )}
        </Field>

        <Field
          id="inq-phone"
          label={t('phone')}
          optionalLabel={t('phoneOptional')}
          error={errors.phone}
        >
          {(aria) => (
            <TextInput
              aria={aria}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              invalid={Boolean(errors.phone)}
              disabled={busy}
            />
          )}
        </Field>

        <Field id="inq-urgency" label={t('urgency')} required error={errors.urgency}>
          {(aria) => (
            <Select
              aria={aria}
              name="urgency"
              defaultValue=""
              onChange={(event) => setUrgency(event.target.value)}
              invalid={Boolean(errors.urgency)}
              disabled={busy}
            >
              <option value="" disabled>
                {t('choose')}
              </option>
              {URGENCIES.map((value) => (
                <option key={value} value={value}>
                  {t(`urgencyOptions.${value}`)}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </div>

      {/*
        Section 12.2: choosing "emergency" must immediately and visibly say
        that a call is faster, with the number. This is the one place on the
        site where we actively talk someone out of using the form.
      */}
      {urgency === 'emergency' ? (
        <p className="flex flex-col gap-3 border-l-2 border-red-600 bg-red-500/8 py-4 pl-5 text-body text-ink sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <span className="max-w-[52ch]">{t('emergencyHint')}</span>
          <a
            href={telHref}
            className="inline-flex min-h-12 shrink-0 items-center gap-2.5 rounded-sm bg-signal px-5 font-heading font-semibold text-on-signal no-underline transition-colors duration-fast ease-out hover:bg-signal-hover"
          >
            <PhoneIcon className="size-5" />
            {client.contact.phoneDisplay}
          </a>
        </p>
      ) : null}

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="inq-service" label={t('service')} required error={errors.service}>
          {(aria) => (
            <Select
              aria={aria}
              name="service"
              defaultValue={defaultService ?? ''}
              invalid={Boolean(errors.service)}
              disabled={busy}
            >
              <option value="" disabled>
                {t('choose')}
              </option>
              {servicesByOrder.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name[locale]}
                </option>
              ))}
            </Select>
          )}
        </Field>

        <Field id="inq-roof" label={t('roofType')} optionalLabel={t('roofTypeOptional')}>
          {(aria) => (
            <Select aria={aria} name="roofType" defaultValue="" disabled={busy}>
              <option value="">{t('choose')}</option>
              {ROOF_TYPES.map((value) => (
                <option key={value} value={value}>
                  {t(`roofOptions.${value}`)}
                </option>
              ))}
            </Select>
          )}
        </Field>

        <Field id="inq-postal" label={t('postalCode')} required error={errors.postalCode}>
          {(aria) => (
            <TextInput
              aria={aria}
              name="postalCode"
              autoComplete="postal-code"
              inputMode="numeric"
              invalid={Boolean(errors.postalCode)}
              disabled={busy}
            />
          )}
        </Field>

        <Field id="inq-locality" label={t('locality')} required error={errors.locality}>
          {(aria) => (
            <TextInput
              aria={aria}
              name="locality"
              autoComplete="address-level2"
              invalid={Boolean(errors.locality)}
              disabled={busy}
            />
          )}
        </Field>
      </div>

      <Field
        id="inq-message"
        label={t('message')}
        hint={t('messageHint')}
        required
        error={errors.message}
      >
        {(aria) => (
          <TextArea
            aria={aria}
            name="message"
            placeholder={t('messagePlaceholder')}
            invalid={Boolean(errors.message)}
            disabled={busy}
          />
        )}
      </Field>

      {!compact ? <PhotoUpload photos={photos} onChange={setPhotos} disabled={busy} /> : null}

      <Checkbox
        name="consent"
        error={errors.consent}
        disabled={busy}
        label={
          <>
            {t('consent')}{' '}
            <Link href="/datenschutz" className="text-accent-text underline">
              {t('consentLink')}
            </Link>
          </>
        }
      />

      {status === 'error' ? (
        <div role="alert" className="border-l-2 border-red-600 bg-red-500/8 py-4 pl-5">
          <p className="font-heading font-bold text-red-700">{t('errorTitle')}</p>
          <p className="mt-1.5 max-w-[58ch] text-body text-ink">{t('errorBody')}</p>
          <a href={telHref} className="mt-3 inline-flex items-center gap-2 font-heading font-semibold text-ink">
            <PhoneIcon className="size-4 text-red-700" />
            {client.contact.phoneDisplay}
          </a>
        </div>
      ) : null}

      {Object.keys(errors).length > 0 ? (
        <p role="alert" className="text-small font-medium text-red-700">
          {t('errorFields')}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={busy}>
          {busy ? t('submitting') : t('submit')}
        </Button>
        <p className="text-small text-ink-muted">{t('responsePromise')}</p>
      </div>
    </form>
  );
}
