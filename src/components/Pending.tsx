import { getTranslations } from 'next-intl/server';

interface PendingProps {
  /** What is missing, in the site's language. Shown to the visitor. */
  readonly what: string;
  /** Short identifier used by `npm run check:pending` to list open items. */
  readonly id: string;
}

/**
 * A fact the client has not supplied yet.
 *
 * Section 0 of the brief forbids inventing anything that could pass as fact:
 * no founding year, no RCS number, no testimonial. Where a real value is
 * missing, this renders instead — deliberately conspicuous, because a
 * placeholder that blends in is a placeholder that reaches production.
 *
 * It carries `data-pending` so the pre-launch check can enumerate every one of
 * them without relying on anybody remembering where they are.
 */
export async function Pending({ what, id }: PendingProps) {
  const t = await getTranslations('pending');

  return (
    <mark
      data-pending={id}
      title={t('explanation')}
      className="inline-flex items-baseline gap-1.5 rounded-xs border border-dashed border-red-500 bg-red-500/8 px-1.5 py-0.5 font-body text-[0.9em] text-red-700 not-italic"
    >
      <span aria-hidden="true" className="translate-y-px text-[0.75em] font-bold tracking-[0.08em] uppercase">
        {t('label')}
      </span>
      <span>{what}</span>
    </mark>
  );
}
