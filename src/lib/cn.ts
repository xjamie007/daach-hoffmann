/**
 * Joins class names, dropping anything falsy.
 *
 * Deliberately not a dependency: `clsx` would add a package to do string
 * concatenation.
 *
 * What this does NOT do is resolve conflicts. Two utilities that set the same
 * CSS property have equal specificity, so the one that wins is whichever
 * Tailwind emits later — the order they appear in the class attribute is
 * irrelevant. Passing `hidden` to a component whose base classes already set
 * `inline-flex` therefore does nothing reliable. Wrap the component in an
 * element that carries the display utility instead.
 */
export function cn(...parts: ReadonlyArray<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
