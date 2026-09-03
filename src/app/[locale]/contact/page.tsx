import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import { contactMetadata, renderContact } from '@/views/contactRoute';

/** French and English share this slug; German uses /kontakt. */
export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return contactMetadata(locale);
}

export default async function ContactRoutePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return renderContact(locale);
}
