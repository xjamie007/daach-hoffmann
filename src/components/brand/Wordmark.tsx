import { cn } from '@/lib/cn';
import { client } from '~/config/client.config';
import { basePath } from '@/lib/site';

/**
 * The company logo.
 *
 * Taken from the existing site, where it was a JPEG with the white box baked
 * in — section 3.5 records that it could therefore not be placed on any
 * coloured surface at all. The white was removed by flood-filling from the
 * edges rather than keying every near-white pixel, which would also have
 * punched out the white field inside the crest itself.
 *
 * It is still a raster. A redrawn SVG remains on the list of things to ask the
 * business for, and swapping it is a change to this file only.
 *
 * On dark grounds the logo sits on a light plate: its lettering is navy and
 * its roofs are red, and neither reads against the navy footer.
 */
export function Wordmark({
  className,
  tone = 'ink',
}: {
  readonly className?: string;
  readonly tone?: 'ink' | 'inverse';
}) {
  const image = (
    <picture>
      <source srcSet={`${basePath}/brand/logo.webp`} type="image/webp" />
      <img
        src={`${basePath}/brand/logo.png`}
        alt={client.name}
        width={640}
        height={389}
        className="h-full w-auto"
        // The logo is the first thing painted in the header on every page.
        loading="eager"
        decoding="sync"
      />
    </picture>
  );

  if (tone === 'inverse') {
    return (
      <span className={cn('inline-flex rounded-sm bg-clay-50 p-2.5', className)}>{image}</span>
    );
  }

  return <span className={cn('inline-flex', className)}>{image}</span>;
}
