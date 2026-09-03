import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { telHref } from '@/lib/site';

export default async function LocaleNotFound() {
  const t = await getTranslations();

  return (
    <Section>
      <Container width="prose">
        <h1 className="font-heading text-h1 font-bold">{t('notFound.title')}</h1>
        <p className="mt-5 text-lead text-ink-muted">{t('notFound.body')}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button as="link" href="/leistungen">
            {t('nav.services')}
          </Button>
          <Button as="a" href={telHref} variant="secondary">
            {t('actions.callLong')}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
