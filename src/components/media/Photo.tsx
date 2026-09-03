import type { Locale } from '@/i18n/routing';
import { PHOTOS, PHOTO_ALT, type PhotoId } from '@/content/photos';
import { basePath } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * A photograph from the business's own archive.
 *
 * A static host runs no image optimiser, so `next/image` cannot do its job
 * here. This emits the `<picture>` element it would have produced: AVIF first,
 * WebP second, JPEG last, each with a srcset built from the widths that were
 * actually generated. Width and height come from the manifest rather than
 * being typed by hand, which is what holds cumulative layout shift at zero.
 *
 * Section 9.4 allows only real photographs of this business. Every file here
 * came from the company's existing site.
 */
export function Photo({
  id,
  locale,
  sizes,
  priority = false,
  aspect,
  className,
  imgClassName,
}: {
  readonly id: PhotoId;
  readonly locale: Locale;
  /** Required. Without it the browser downloads the largest candidate. */
  readonly sizes: string;
  readonly priority?: boolean;
  /** Crop the photograph to a different ratio than the source. */
  readonly aspect?: string;
  readonly className?: string;
  readonly imgClassName?: string;
}) {
  const asset = PHOTOS[id];
  const alt = PHOTO_ALT[id][locale];

  const srcSet = (extension: string) =>
    asset.widths.map((width) => `${basePath}/img/${id}-${width}.${extension} ${width}w`).join(', ');

  const largest = asset.widths[asset.widths.length - 1] ?? asset.width;

  return (
    <picture className={cn('block overflow-hidden', className)}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`${basePath}/img/${id}-${largest}.jpg`}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        alt={alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        style={aspect ? { aspectRatio: aspect } : undefined}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </picture>
  );
}
