'use server';

import { headers } from 'next/headers';
import { processInquiry, type IncomingPhoto, type InquiryResult } from '@/lib/inquiry/process';

/**
 * Server action transport.
 *
 * Section 12.2 asks for a server action rather than a route handler, and this
 * is it. It is used when NEXT_PUBLIC_DEPLOY_TARGET=server; on the static
 * target there is no Node runtime to run it and the browser posts to the
 * Supabase edge function instead. Both call the same processInquiry, so the
 * validation, storage and mail behaviour cannot diverge between hosts.
 */
export async function submitInquiry(
  payload: unknown,
  photos: readonly IncomingPhoto[] = [],
): Promise<InquiryResult> {
  const headerList = await headers();

  /*
    First entry of x-forwarded-for is the client; the rest are proxies. Used
    only for the hashed rate-limiting column — never stored in clear text.
  */
  const forwarded = headerList.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() ?? headerList.get('x-real-ip') ?? null;

  return processInquiry(payload, photos, { ip });
}
