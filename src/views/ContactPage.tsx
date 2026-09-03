import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { MapEmbed } from '@/components/contact/MapEmbed';
import { Photo } from '@/components/media/Photo';
import { Pending } from '@/components/Pending';
import { PhoneIcon, WhatsAppIcon, MailIcon } from '@/components/ui/icons';
import { client } from '~/config/client.config';
import { telHref, whatsappHref, mailHref } from '@/lib/site';

/**
 * The contact page.
 *
 * Section 3.4 found the incumbent one "practically empty": a heading, a VAT
 * badge and a form. No address, no map, no opening times, no alternative to
 * filling in the form. Someone who does not want to type gets nothing.
 *
 * So the alternatives come first here — phone, WhatsApp, email — and the form
 * sits beside them rather than in place of them.
 *
 * The page opens on a wide photograph of finished work. It is the last thing a
 * visitor sees before deciding whether to write, and a bare heading over a
 * form was the weakest screen on the site.
 */
export async function ContactPage({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: t('nav.home'), pathname: '/' }])} />

      <Section tight className="pb-0">
        <Container width="wide">
          <Breadcrumbs crumbs={[{ name: t('nav.home'), pathname: '/' }]} current={t('nav.contact')} />

          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
            <div>
              <h1 className="font-heading text-h1 font-bold text-balance">{t('form.heading')}</h1>
              <p className="mt-7 max-w-[52ch] text-lead text-ink-muted">{t('form.lead')}</p>
            </div>

            <div data-reveal className="hero-media">
              <Photo
                id="geruest-luftbild"
                locale={locale}
                sizes="(min-width: 1024px) 46vw, 100vw"
                aspect="16/10"
                priority
                className="photo-plate"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
            <div>
              <InquiryForm sourcePage="/kontakt" />
            </div>

            <aside className="flex flex-col gap-12">
              <div>
                <h2 className="font-heading text-micro font-bold text-ink-muted uppercase">
                  {t('form.contactHeading')}
                </h2>

                <ul className="mt-5 flex flex-col gap-2">
                  <li>
                    <a
                      href={telHref}
                      className="flex min-h-14 items-center gap-3.5 font-heading text-h3 font-bold no-underline transition-colors duration-fast ease-out hover:text-accent-text"
                    >
                      <PhoneIcon className="size-5 shrink-0 text-accent-text" />
                      {client.contact.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 items-center gap-3.5 text-body no-underline transition-colors duration-fast ease-out hover:text-accent-text"
                    >
                      <WhatsAppIcon className="size-5 shrink-0 text-ink-subtle" />
                      {t('actions.whatsapp')}
                    </a>
                  </li>
                  <li>
                    <a
                      href={mailHref}
                      className="flex min-h-12 items-center gap-3.5 text-body no-underline transition-colors duration-fast ease-out hover:text-accent-text"
                    >
                      <MailIcon className="size-5 shrink-0 text-ink-subtle" />
                      {client.contact.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-micro font-bold text-ink-muted uppercase">
                  {t('form.hoursHeading')}
                </h2>
                <dl className="mt-5 flex flex-col gap-3 text-body">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 border-b border-border pb-3">
                    <dt className="text-ink-muted">{t('nav.contact')}</dt>
                    {/* Office hours are section 19 — not supplied, not invented. */}
                    <dd>
                      {client.hours ?? <Pending id="hours.office" what={t('form.hoursHeading')} />}
                    </dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                    <dt className="text-ink-muted">{t('actions.emergency')}</dt>
                    <dd className="font-heading font-bold text-red-700">
                      {client.emergency.coverage}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="font-heading text-micro font-bold text-ink-muted uppercase">
                  {t('form.mapHeading')}
                </h2>
                <div className="mt-5">
                  <MapEmbed />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
