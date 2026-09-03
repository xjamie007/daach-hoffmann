'use client';

import { useId } from 'react';
import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/**
 * Form primitives.
 *
 * Three decisions here come straight from section 15.1 and are not negotiable
 * per-field:
 *
 *  · The label is a real <label>, always visible. A placeholder used as a label
 *    disappears the moment someone types, which strands anyone who is
 *    interrupted — and on this form the interruption is a leaking roof.
 *  · Errors are wired with aria-describedby and announced politely, so a
 *    screen-reader user learns why the form did not submit.
 *  · Every control clears 48px. The site is read outdoors on a phone.
 */

const CONTROL = [
  'w-full rounded-sm border bg-surface-raised px-3.5 py-3',
  'text-body text-ink placeholder:text-ink-subtle',
  'transition-[border-color,box-shadow] duration-fast ease-out',
  'min-h-12',
  'hover:border-navy-700',
  'disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-ink-subtle',
].join(' ');

const CONTROL_VALID = 'border-border-strong';
const CONTROL_INVALID = 'border-red-600 bg-red-500/4';

interface FieldShellProps {
  readonly id: string;
  readonly label: string;
  /** Shown under the label. Use it to prevent an error, not to explain one. */
  readonly hint?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly optionalLabel?: string;
  readonly children: (aria: {
    id: string;
    'aria-describedby': string | undefined;
    'aria-invalid': boolean | undefined;
  }) => ReactNode;
}

export function Field({ id, label, hint, error, required, optionalLabel, children }: FieldShellProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-heading text-small font-semibold text-ink">
        {label}
        {!required && optionalLabel ? (
          <span className="ml-2 font-body text-small font-normal text-ink-subtle">{optionalLabel}</span>
        ) : null}
      </label>

      {hint ? (
        <p id={hintId} className="text-small text-ink-muted">
          {hint}
        </p>
      ) : null}

      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}

      {error ? (
        <p id={errorId} role="alert" className="flex gap-2 text-small font-medium text-red-700">
          <span aria-hidden="true">↳</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

type ControlAria = {
  id: string;
  'aria-describedby': string | undefined;
  'aria-invalid': boolean | undefined;
};

export function TextInput({
  aria,
  invalid,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { readonly aria: ControlAria; readonly invalid?: boolean }) {
  return <input {...aria} {...props} className={cn(CONTROL, invalid ? CONTROL_INVALID : CONTROL_VALID, className)} />;
}

export function TextArea({
  aria,
  invalid,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { readonly aria: ControlAria; readonly invalid?: boolean }) {
  return (
    <textarea
      {...aria}
      {...props}
      className={cn(CONTROL, 'min-h-36 resize-y leading-relaxed', invalid ? CONTROL_INVALID : CONTROL_VALID, className)}
    />
  );
}

export function Select({
  aria,
  invalid,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { readonly aria: ControlAria; readonly invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        {...aria}
        {...props}
        className={cn(
          CONTROL,
          'appearance-none pr-11',
          invalid ? CONTROL_INVALID : CONTROL_VALID,
          className,
        )}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

/**
 * Consent checkbox. Section 14 makes this legally load-bearing, so it is a
 * real checkbox with a real label rather than a styled div: it has to be
 * reachable by keyboard, announced correctly, and recorded with a timestamp.
 */
export function Checkbox({
  label,
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { readonly label: ReactNode; readonly error?: string }) {
  const generated = useId();
  const id = props.id ?? generated;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <input
          {...props}
          id={id}
          type="checkbox"
          aria-describedby={errorId}
          aria-invalid={error ? true : undefined}
          className={cn(
            'mt-0.5 size-5 shrink-0 cursor-pointer rounded-xs border-2 accent-accent-600',
            error ? 'border-red-600' : 'border-border-strong',
            className,
          )}
        />
        <label htmlFor={id} className="cursor-pointer text-small leading-relaxed text-ink">
          {label}
        </label>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="flex gap-2 text-small font-medium text-red-700">
          <span aria-hidden="true">↳</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
