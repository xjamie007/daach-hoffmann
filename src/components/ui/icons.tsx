import type { SVGProps } from 'react';

/**
 * Icon set.
 *
 * Every icon here earns its place by labelling an action, never by decorating a
 * heading — section 1.3 names rounded icon tiles above headings as the most
 * recognisable AI tell there is, and the surest way not to build one is not to
 * have decorative icons at all.
 *
 * Drawn on a 24px grid with a 1.75 stroke and square caps, matching the
 * squared-off geometry of the wordmark. All are `aria-hidden`; the visible
 * label next to them carries the meaning.
 */

type IconProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'>;

function Line({ className, ...props }: IconProps & { readonly children: React.ReactNode }) {
  const { children, ...rest } = props as IconProps & { children: React.ReactNode };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M5.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 7 7l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2Z" />
    </Line>
  );
}

export function FormIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M4.5 3.5h11l4 4v13h-15z" />
      <path d="M15 3.5v4.5h4.5M8 12h8M8 16h5" />
    </Line>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </Line>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M5 5l14 14M19 5 5 19" />
    </Line>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Line>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M4 12.5 9.5 18 20 6.5" />
    </Line>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Line>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M3.5 5.5h17v13h-17z" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </Line>
  );
}

/**
 * WhatsApp's own mark, filled rather than stroked. A brand glyph redrawn as a
 * line icon stops being recognisable, and recognition is the entire point on
 * a bar a panicking visitor scans in a second.
 */
export function WhatsAppIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.92 9.92 0 0 0 4.88 1.27h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.17h-.01a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.39c0-4.56 3.71-8.27 8.27-8.27a8.27 8.27 0 0 1 0 16.52Zm4.53-6.19c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.1-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
