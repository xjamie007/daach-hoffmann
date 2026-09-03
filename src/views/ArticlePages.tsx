import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import { PhoneIcon } from '@/components/ui/icons';
import { client } from '~/config/client.config';
import { telHref } from '@/lib/site';
import { processPage } from '@/content/pages/process';

/**
 * The three long-form pages that are neither a service nor a project.
 *
 * They share a shape — breadcrumb, title, lead, then headed sections of prose
 * capped at the reading measure — so they share a shell. What differs is the
 * material below the prose, which is specific to each.
 */
function ArticleShell({
  locale,
  current,
  title,
  lead,
  children,
}: {
  readonly locale: Locale;
  readonly current: string;
  readonly title: string;
  readonly lead: string;
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <Section tight className="pb-0">
        <Container width="wide">
          <BreadcrumbHome locale={locale} current={current} />
          <h1 className="max-w-[22ch] font-heading text-h1 font-bold text-balance">{title}</h1>
          <p className="mt-7 max-w-[62ch] text-lead text-ink-muted">{lead}</p>
        </Container>
      </Section>
      {children}
    </>
  );
}

async function BreadcrumbHome({ locale, current }: { readonly locale: Locale; readonly current: string }) {
  const t = await getTranslations();
  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: t('nav.home'), pathname: '/' }])} />
      <Breadcrumbs crumbs={[{ name: t('nav.home'), pathname: '/' }]} current={current} />
    </>
  );
}

async function ClosingBand({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();
  return (
    <Section tone="sunken" tight>
      <Container width="content">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[46ch] font-heading text-h3 font-bold text-balance">
            {
              {
                de: 'Kostenvoranschlag und Anfahrt kostenlos.',
                fr: 'Devis et déplacement gratuits.',
                en: 'Quote and call-out free of charge.',
              }[locale]
            }
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button as="link" href="/kontakt" size="lg">
              {t('actions.requestQuote')}
            </Button>
            <Button as="a" href={telHref} variant="secondary" size="lg" icon={<PhoneIcon className="size-5" />}>
              {client.contact.phoneDisplay}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Process                                                                    */
/* -------------------------------------------------------------------------- */

export async function ProcessPage({ locale }: { readonly locale: Locale }) {
  const t = await getTranslations();

  return (
    <ArticleShell
      locale={locale}
      current={t('nav.process')}
      title={processPage.title[locale]}
      lead={processPage.lead[locale]}
    >
      <Section>
        <Container width="wide">
          <ol className="flex flex-col gap-14">
            {processPage.steps.map((step, index) => (
              <li key={index} className="grid gap-x-10 gap-y-4 border-t-2 border-navy-900 pt-7 lg:grid-cols-[5rem_minmax(0,20rem)_1fr]">
                <span className="font-mono text-h3 text-ink-subtle tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="font-heading text-h2 font-bold">{step.title[locale]}</h2>
                <div className="prose-roof">
                  {step.body.map((paragraph, i) => (
                    <p key={i} className={i === 0 ? 'mt-0' : ''}>
                      {paragraph[locale]}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <ClosingBand locale={locale} />
    </ArticleShell>
  );
}

