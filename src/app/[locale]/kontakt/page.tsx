import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import { contactMetadata, renderContact } from '@/views/contactRoute';

/** German only — the French and English slug is /contact. */
export function generateStaticParams() {
  return [{ locale: 'de' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return contactMetadata(locale);
}

export default async function KontaktPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return renderContact(locale);
}
