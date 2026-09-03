import type { InquiryResult, IncomingPhoto } from './process';

/**
 * Static-host transport.
 *
 * GitHub Pages runs no Node process, so there is no server action to call.
 * The browser posts the same payload to a Supabase edge function, which runs
 * the same validation, storage and mail pipeline.
 *
 * Which of the two transports is compiled in is decided by
 * NEXT_PUBLIC_DEPLOY_TARGET and resolved by an alias in next.config.ts, so the
 * bundle for a static build contains no reference to the server action at all
 * — Next refuses to export a build that has one in its graph, however
 * carefully it is guarded at runtime.
 */
const endpoint = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT;

export async function sendInquiry(
  inquiry: Record<string, unknown>,
  photos: readonly IncomingPhoto[],
): Promise<InquiryResult> {
  if (!endpoint) {
    /*
      No endpoint configured.

      In development this accepts the enquiry so the whole form — validation,
      resizing, the upload UI, the success state — can be exercised without a
      Supabase project. `delivered: false` travels back with it, and the
      success panel says plainly that nothing was stored or sent, so this can
      never be mistaken for a working submission.

      In a production build the same situation is an error, because there it
      means a missing environment variable and a visitor whose enquiry would
      vanish. NODE_ENV is inlined at build time, so the demo branch is removed
      from the production bundle entirely rather than merely skipped.
    */
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[inquiry] Development mode without NEXT_PUBLIC_INQUIRY_ENDPOINT — accepting the enquiry locally.\n' +
          '[inquiry] Nothing was stored and no mail was sent.',
        { inquiry, photos: photos.length },
      );
      return { ok: true, id: 'dev-local', photosStored: 0, delivered: false };
    }

    console.error(
      '[inquiry] NEXT_PUBLIC_INQUIRY_ENDPOINT is not set. On a static host the form has nowhere to post. See .env.example.',
    );
    return { ok: false, error: 'mail' };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ inquiry, photos }),
    });

    if (!response.ok) {
      console.error('[inquiry] endpoint returned', response.status);
      return { ok: false, error: response.status === 400 ? 'rejected' : 'mail' };
    }

    return (await response.json()) as InquiryResult;
  } catch (error) {
    // Offline, DNS failure, blocked request. Section 12.2 lists "no network"
    // as a case that needs a comprehensible message, not a stack trace.
    console.error('[inquiry] request failed', error);
    return { ok: false, error: 'mail' };
  }
}
