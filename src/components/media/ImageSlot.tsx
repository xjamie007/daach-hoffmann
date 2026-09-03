import type { Locale } from '@/i18n/routing';
import type { SiteImage } from '@/content/types';
import { Photo } from './Photo';
import type { PhotoId } from '@/content/photos';
import { cn } from '@/lib/cn';

/**
 * Renders a photograph, or the exact space one will occupy.
 *
 * Where a real photograph exists it delegates to <Photo>. Where the business
 * has not supplied one, section 9.4 permits a clearly marked placeholder with
 * defined dimensions and rules out stock photography without exception — an
 * exclusion that covers generated imagery too, since a plausible roof that is
 * not this business's roof is the same lie as a stock photo, only harder to
 * spot.
 *
 * The placeholder reserves the real aspect ratio, so the day a photograph
 * arrives nothing reflows, and it prints the brief for the shot so whoever
 * takes it knows what is needed.
 */
export function ImageSlot({
  image,
  locale,
  sizes,
  priority = false,
  className,
}: {
  readonly image: SiteImage;
  readonly locale: Locale;
  readonly sizes: string;
  readonly priority?: boolean;
  readonly className?: string;
}) {
  if (image.kind === 'photo') {
    return (
      <Photo
        id={image.id as PhotoId}
        locale={locale}
        sizes={sizes}
        priority={priority}
        aspect={image.aspect}
        className={className}
      />
    );
  }

  return (
    <div
      data-pending={`image.${image.id}`}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
      className={cn(
        'relative flex w-full flex-col justify-between gap-6 overflow-hidden',
        'border border-dashed border-navy-400 bg-surface-sunken p-6',
        className,
      )}
    >
      {/* A faint pitch line, so an empty slot still reads as belonging to this
          site rather than as a broken image. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full text-navy-300"
      >
        <path
          d="M0 55 50 12 100 55"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <p className="relative font-heading text-micro font-bold text-red-700 uppercase">
        {{ de: 'Foto ausstehend', fr: 'Photo à fournir', en: 'Photograph pending' }[locale]}
      </p>

      <div className="relative">
        <p className="max-w-[46ch] text-small leading-relaxed text-ink-muted">{image.brief[locale]}</p>
        <p className="mt-3 font-mono text-[0.7rem] text-ink-subtle">
          {image.width} × {image.height}
        </p>
      </div>
    </div>
  );
}
