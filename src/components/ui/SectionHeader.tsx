import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * The heading block that opens a section.
 *
 * The eyebrow is a <p>, never an <h*>. Section 3.2 of the audit found the
 * incumbent site using H4 and H5 purely for styling, which is what destroys
 * its document outline — the fix is not to style headings better but to stop
 * using headings for things that are not headings.
 */
export function SectionHeader({
  eyebrow,
  index,
  title,
  id,
  lead,
  level = 2,
  align = 'start',
  tone = 'default',
  className,
}: {
  readonly eyebrow?: string;
  /** Running number, shown before the eyebrow. Gives the page a spine. */
  readonly index?: number;
  readonly title: ReactNode;
  readonly id?: string;
  readonly lead?: ReactNode;
  readonly level?: 2 | 3;
  readonly align?: 'start' | 'center';
  readonly tone?: 'default' | 'inverse';
  readonly className?: string;
}) {
  const Heading = level === 2 ? 'h2' : 'h3';

  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'flex items-center gap-3 font-heading text-micro font-bold uppercase',
            tone === 'inverse' ? 'text-sky-400' : 'text-accent-text',
          )}
        >
          {index !== undefined ? (
            <>
              <span className="font-mono tabular-nums opacity-70">
                {String(index).padStart(2, '0')}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  'h-px w-8',
                  tone === 'inverse' ? 'bg-sky-400/50' : 'bg-accent-600/40',
                )}
              />
            </>
          ) : null}
          {eyebrow}
        </p>
      ) : null}

      <Heading
        id={id}
        className={cn(
          eyebrow ? 'mt-3' : '',
          level === 2 ? 'text-h2' : 'text-h3',
          'font-heading font-bold',
          tone === 'inverse' ? 'text-clay-50' : 'text-ink',
        )}
      >
        {title}
      </Heading>

      {lead ? (
        <div
          className={cn(
            'mt-4 max-w-[58ch] text-lead',
            tone === 'inverse' ? 'text-ink-inverse-muted' : 'text-ink-muted',
            align === 'center' ? 'mx-auto' : '',
          )}
        >
          {lead}
        </div>
      ) : null}
    </div>
  );
}
