'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import type { ServiceId } from '~/config/client.config';

/**
 * Loads the enquiry form only once it is about to be seen.
 *
 * Section 4 sets a budget of 120 KB of JavaScript on the home page. React and
 * Next alone account for 103 KB of that, so the entire application has about
 * 17 KB to work with — and the form, with Zod and the photo pipeline, is 33 KB
 * on its own. Shipping it in the initial bundle puts the home page at 152 KB
 * and misses the budget by a third.
 *
 * It is also the eleventh thing on the page. Nobody has scrolled to it while
 * the first screen is still painting, so loading it then buys nothing and
 * costs the largest contentful paint. Here it is fetched when the section
 * comes within 400 pixels of the viewport, or as soon as anything inside it is
 * focused — which is what happens when a keyboard user tabs toward it before
 * scrolling.
 *
 * The fallback is not a spinner. It reserves the same height so nothing shifts
 * when the real form arrives, and it carries the phone number, so a visitor
 * who arrives during the swap still has a way to make contact.
 */
const InquiryForm = dynamic(() => import('./InquiryForm').then((mod) => mod.InquiryForm), {
  ssr: false,
});

export function DeferredInquiryForm({
  defaultService,
  sourcePage,
  fallback,
}: {
  readonly defaultService?: ServiceId;
  readonly sourcePage?: string;
  /** Rendered until the form loads. Server-provided, so it costs no JavaScript. */
  readonly fallback: ReactNode;
}) {
  const [show, setShow] = useState(false);
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = holder.current;
    if (!node || show) return;

    // No IntersectionObserver (very old browser): load immediately rather than
    // leaving someone with a form that never appears.
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setShow(true);
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(node);

    // A keyboard user can reach this before it scrolls into view.
    const onFocusIn = () => setShow(true);
    node.addEventListener('focusin', onFocusIn);

    return () => {
      observer.disconnect();
      node.removeEventListener('focusin', onFocusIn);
    };
  }, [show]);

  return (
    <div ref={holder}>
      {show ? <InquiryForm defaultService={defaultService} sourcePage={sourcePage} /> : fallback}
    </div>
  );
}
