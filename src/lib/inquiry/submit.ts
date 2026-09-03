import type { InquiryResult, IncomingPhoto } from './process';
// Resolved by an alias in next.config.ts to whichever transport matches the
// deploy target. Both files export the same `sendInquiry` signature, so the
// form never learns which host it is running on.
import { sendInquiry } from '@inquiry-transport';

export interface SubmitPayload {
  readonly inquiry: Record<string, unknown>;
  readonly photos: readonly IncomingPhoto[];
}

export async function submit({ inquiry, photos }: SubmitPayload): Promise<InquiryResult> {
  return sendInquiry(inquiry, photos);
}
