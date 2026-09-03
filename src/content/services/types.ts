import type { Localized } from '@/content/types';
import type { ServiceId } from '~/config/client.config';

/**
 * Structure of a service page, following section 7.2 of the brief.
 *
 * The order is not decorative. It answers, in sequence, the questions a
 * homeowner actually has — what is this, do I have this problem, how do you
 * work, what do you use — before asking for anything.
 *
 * There is deliberately no cost section. Section 7.2 allows one, but with no
 * price list supplied it could only ever say "it depends", at length, on six
 * pages. That is length without information, and it pushed the FAQ — which
 * does answer things — below the fold. The incumbent site
 * answers none of them: three or four paragraphs per page, the rest duplicated
 * across every URL.
 *
 * Every page must clear 600 words of its own text in each language.
 */
export interface ServiceContent {
  readonly id: ServiceId;

  readonly meta: Localized<{ readonly title: string; readonly description: string }>;

  /** What this is, in one sentence, without trade jargon. */
  readonly intro: Localized;

  /** Longer opening paragraph. */
  readonly lead: Localized;

  /** Concrete symptoms — what the homeowner is actually seeing. */
  readonly symptoms: {
    readonly title: Localized;
    readonly intro: Localized;
    readonly items: readonly Localized[];
  };

  /** How the work is carried out. */
  readonly approach: {
    readonly title: Localized;
    readonly body: readonly Localized[];
  };

  /** Materials and the reason for each. */
  readonly materials: {
    readonly title: Localized;
    readonly intro: Localized;
    readonly items: readonly { readonly name: Localized; readonly why: Localized }[];
  };


  /** Three to five questions. Rendered with FAQPage structured data. */
  readonly faq: readonly { readonly question: Localized; readonly answer: Localized }[];

  /** Closing call to action, specific to this service. */
  readonly cta: { readonly title: Localized; readonly body: Localized };
}
