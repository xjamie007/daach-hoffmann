import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Width = 'prose' | 'content' | 'wide';

const WIDTHS: Record<Width, string> = {
  prose: 'max-w-prose',
  content: 'max-w-content',
  wide: 'max-w-wide',
};

/**
 * Horizontal rhythm for the whole site. The gutter is fluid so that a phone
 * held one-handed keeps text off the bezel without wasting a desktop viewport.
 */
export function Container({
  as: Tag = 'div',
  width = 'content',
  className,
  children,
}: {
  readonly as?: ElementType;
  readonly width?: Width;
  readonly className?: string;
  readonly children: ReactNode;
}) {
  return (
    <Tag className={cn('mx-auto w-full px-[var(--gutter-x)]', WIDTHS[width], className)}>
      {children}
    </Tag>
  );
}
