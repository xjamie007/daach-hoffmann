import type { InquiryResult, IncomingPhoto } from './process';
import { submitInquiry } from '@/app/actions/submitInquiry';

/**
 * Server-host transport.
 *
 * Section 12.2 asks for a server action rather than a route handler, and this
 * is the path that provides it. Compiled in only when
 * NEXT_PUBLIC_DEPLOY_TARGET=server; see transport.endpoint.ts for why the two
 * cannot coexist in one bundle.
 */
export async function sendInquiry(
  inquiry: Record<string, unknown>,
  photos: readonly IncomingPhoto[],
): Promise<InquiryResult> {
  return submitInquiry(inquiry, photos);
}
