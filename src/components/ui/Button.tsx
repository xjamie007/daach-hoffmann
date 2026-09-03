import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'signal' | 'ghost' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE = [
  'inline-flex items-center justify-center gap-2.5 rounded-sm',
  'font-heading font-semibold tracking-[-0.005em] text-center',
  'transition-[background-color,border-color,color,translate] duration-fast ease-out',
  'no-underline select-none',
  // The site is read outdoors on a phone, sometimes one-handed on a ladder.
  // 48px is the floor for every variant, well above the WCAG 2.2 minimum.
  'min-h-12',
  'disabled:pointer-events-none disabled:opacity-55',
  // Movement on press only, never on hover: a hover lift on a touch device
  // fires on scroll and reads as a glitch.
  'active:translate-y-px',
].join(' ');

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover',
  secondary: 'border border-border-strong bg-transparent text-ink hover:border-navy-900 hover:bg-navy-900/6',
  // Reserved for the emergency path. Using it anywhere else spends the one
  // colour on this site that is supposed to mean exactly one thing.
  signal: 'bg-signal text-on-signal hover:bg-signal-hover',
  ghost: 'bg-transparent text-ink hover:bg-navy-900/8',
  inverse: 'bg-clay-50 text-navy-900 hover:bg-clay-200',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-small',
  md: 'px-5 py-3 text-body',
  lg: 'px-7 py-4 text-lead',
};

interface CommonProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
  readonly children: ReactNode;
  /** Rendered before the label, hidden from assistive technology. */
  readonly icon?: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & {
    readonly as?: 'button';
  };

type ButtonAsExternal = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children' | 'href'> & {
    readonly as: 'a';
    /** For `tel:`, `mailto:` and WhatsApp — anything outside the router. */
    readonly href: string;
  };

type ButtonAsLink = CommonProps & {
  readonly as: 'link';
  /** Internal pathname; translated per locale by next-intl. */
  readonly href: Parameters<typeof Link>[0]['href'];
};

export type ButtonProps = ButtonAsButton | ButtonAsExternal | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, icon } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);
  const content = (
    <>
      {icon ? (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      ) : null}
      {children}
    </>
  );

  if (props.as === 'link') {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, icon: _i, href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (props.as === 'a') {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, icon: _i, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {content}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, children: _ch, icon: _i, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
