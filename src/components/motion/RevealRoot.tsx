'use client';

import { useEffect } from 'react';

/**
 * Scroll reveals for the whole document, from one observer.
 *
 * Section 9.5 allows gentle scroll reveals with a short stagger and rules out
 * parallax, bounce and elastic easing — a roofer sells solidity, and motion
 * that draws attention to itself works against that.
 *
 * Mounted once in the layout. Server components mark themselves with
 * `data-reveal` and stay server components; there is no client wrapper per
 * element and no per-element observer.
 *
 * Two things make this safe rather than clever:
 *
 *  · The hidden state is applied only after this script runs, by adding a
 *    class to <html>. Without JavaScript, nothing is ever hidden — the usual
 *    failure of scroll reveals is a page that stays blank when the script does
 *    not load.
 *  · `prefers-reduced-motion` is checked before anything is hidden at all, so
 *    the reduced-motion path is not "animate faster", it is "never move".
 *  · A watchdog reveals anything that is on screen but still hidden a second
 *    later. IntersectionObserver callbacks are throttled to nothing while a
 *    tab is in the background, so a page opened in a background tab and
 *    brought forward could otherwise show a screen of blank paper. Costs one
 *    timer; removes the only way this file can hide a page permanently.
 */
export function RevealRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reduced.matches || typeof IntersectionObserver === 'undefined') return;

    root.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      },
      // Fires a little before the element arrives, so the movement has
      // finished by the time it is properly in view rather than starting then.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    );

    const attach = () => {
      for (const node of document.querySelectorAll('[data-reveal]:not(.is-revealed)')) {
        // Anything already on screen at load is shown immediately: animating
        // the first viewport delays the largest contentful paint for no gain.
        const box = node.getBoundingClientRect();
        if (box.top < window.innerHeight * 0.9) node.classList.add('is-revealed');
        else observer.observe(node);
      }
    };

    attach();

    /** Anything on screen and still hidden is shown, observer or no observer. */
    const rescue = () => {
      for (const node of document.querySelectorAll('[data-reveal]:not(.is-revealed)')) {
        const box = node.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) node.classList.add('is-revealed');
      }
    };

    const watchdog = window.setTimeout(rescue, 1000);
    document.addEventListener('visibilitychange', rescue);

    // Client-side navigation replaces the tree without remounting this.
    const mutation = new MutationObserver(attach);
    mutation.observe(document.body, { childList: true, subtree: true });

    const onPreferenceChange = () => {
      if (!reduced.matches) return;
      root.classList.remove('reveal-ready');
      observer.disconnect();
    };
    reduced.addEventListener('change', onPreferenceChange);

    return () => {
      window.clearTimeout(watchdog);
      document.removeEventListener('visibilitychange', rescue);
      observer.disconnect();
      mutation.disconnect();
      reduced.removeEventListener('change', onPreferenceChange);
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
