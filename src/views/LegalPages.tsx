import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Pending } from '@/components/Pending';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { client } from '~/config/client.config';
import { telHref, mailHref } from '@/lib/site';
import { legalNotice, privacyPolicy } from '@/content/pages/legal';

/* -------------------------------------------------------------------------- */
/* Mentions légales                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Resolves each required identifier to a value or a marked gap.
 *
 * Section 14.1 lists what the law of 14 August 2000 requires, and section 19
 * records that most of it has not been supplied. Rendering a plausible RCS
 * number would be worse than rendering none: a wrong statutory identifier is
 * itself a breach, and it is the kind of thing nobody re-checks once it is on
 * the page.
 */
function identityValue(key: string, locale: Locale): ReactNode {
  switch (key) {
    case 'legalName':
      return client.legalName ?? <Pending id="legal.legalName" what={pick(locale, 'Firma & Rechtsform', 'Dénomination & forme', 'Name & legal form')} />;
    case 'address':
      return (
        <address className="not-italic">
          {client.address.street}
          <br />
          {client.address.postalCode} {client.address.locality}
          <br />
          {client.address.countryName[locale]}
        </address>
      );
    case 'phone':
      return (
        <a href={telHref} className="text-accent-text underline">
          +352 {client.contact.phoneDisplay}
        </a>
      );
    case 'email':
      return (
        <>
          <a href={mailHref} className="text-accent-text underline">
            {client.contact.email}
          </a>
          {!client.contact.emailIsProvisioned ? (
            <span className="mt-1.5 block">
              <Pending
                id="contact.emailProvisioned"
                what={pick(
                  locale,
                  'Adresse noch einzurichten',
                  'Adresse encore à créer',
                  'Address still to be set up',
                )}
              />
            </span>
          ) : null}
        </>
      );
    case 'rcs':
      return client.legal.rcs ?? <Pending id="legal.rcs" what="RCS" />;
    case 'autorisation':
      return client.legal.autorisation ?? <Pending id="legal.autorisation" what={pick(locale, 'Nummer', 'Numéro', 'Number')} />;
    case 'vat':
      return client.legal.vat ?? <Pending id="legal.vat" what="LU" />;
    case 'contentResponsible':
      return client.legal.contentResponsible ?? <Pending id="legal.contentResponsible" what={pick(locale, 'Name', 'Nom', 'Name')} />;
    case 'supervisory':
      /* Factual for the trade, not a claim about this business: craft firms
         holding an autorisation d'établissement fall under the Chambre des
         Métiers. The membership details themselves are on the about page's
         outstanding list. */
      return 'Chambre des Métiers, Luxembourg';
    case 'host':
      return (
        client.legal.host.name ?? (
          <Pending id="legal.host" what={pick(locale, 'Anbieter & Anschrift', 'Hébergeur & adresse', 'Provider & address')} />
        )
      );
    default:
      return null;
  }
}

function pick(locale: Locale, de: string, fr: string, en: string): string {
  return { de, fr, en }[locale];
}

export async function LegalNoticePage({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: t('nav.home'), pathname: '/' }])} />

      <Section tight className="pb-0">
        <Container width="wide">
          <Breadcrumbs crumbs={[{ name: t('nav.home'), pathname: '/' }]} current={t('nav.legal')} />
          <h1 className="font-heading text-h1 font-bold">{legalNotice.title[locale]}</h1>
          <p className="mt-6 max-w-[62ch] text-lead text-ink-muted">{legalNotice.intro[locale]}</p>
        </Container>
      </Section>

      <Section>
        <Container width="content">
          <dl className="grid gap-x-10 border-t border-border-strong sm:grid-cols-[minmax(0,16rem)_1fr]">
            {legalNotice.identity.map((row) => (
              <div key={row.key} className="contents">
                <dt className="border-b border-border py-5 font-heading text-small font-semibold text-ink-muted sm:py-6">
                  {row.label[locale]}
                </dt>
                <dd className="border-b border-border pb-5 text-body sm:py-6">
                  {identityValue(row.key, locale)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="prose-roof mt-14">
            <h2>{legalNotice.disputeTitle[locale]}</h2>
            <p>{legalNotice.dispute[locale]}</p>
            <h2>{legalNotice.contentTitle[locale]}</h2>
            <p>{legalNotice.content[locale]}</p>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Privacy policy                                                             */
/* -------------------------------------------------------------------------- */

export async function PrivacyPage({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: t('nav.home'), pathname: '/' }])} />

      <Section tight className="pb-0">
        <Container width="wide">
          <Breadcrumbs crumbs={[{ name: t('nav.home'), pathname: '/' }]} current={t('nav.privacy')} />
          <h1 className="font-heading text-h1 font-bold">{privacyPolicy.title[locale]}</h1>
          <p className="mt-7 max-w-[62ch] text-lead text-ink-muted">{privacyPolicy.lead[locale]}</p>
        </Container>
      </Section>

      <Section>
        <Container width="content">
          <div className="prose-roof">
            {privacyPolicy.sections.map((section, index) => (
              <section key={index}>
                <h2>{section.title[locale]}</h2>
                {section.body.map((paragraph, i) => (
                  <p key={i}>{paragraph[locale]}</p>
                ))}
              </section>
            ))}

            <p className="mt-12 border-l-2 border-red-600 bg-red-500/6 py-4 pl-5 text-small text-ink">
              {privacyPolicy.reviewNotice[locale]}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
