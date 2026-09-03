'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MapPinIcon } from '@/components/ui/icons';
import { client } from '~/config/client.config';

/**
 * Click-to-load Google Maps.
 *
 * Section 14.3 rules out embedding Google Maps *directly*: the embed contacts
 * Google and transfers the visitor's IP address before any consent exists, and
 * there is no legal basis for that on a page someone merely opened. What it
 * permits is a locally drawn representation with click-to-load — which is
 * what this is. Until the button is pressed nothing is requested from
 * anywhere; the placeholder is drawn here, in this file. Pressing it is the
 * consenting act, and the notice states what will happen before it happens
 * rather than after. So the map is Google's, and the page still needs no
 * cookie banner.
 *
 * The keyless embed endpoint is used deliberately. The supported route is the
 * Maps Embed API with a billable key, and there is no Google key for this
 * business yet; `output=embed` needs none, so the map works today rather than
 * after an account is set up. Swapping in the Embed API later is this one URL.
 *
 * The address and the maps link work without any of this, so a visitor who
 * never presses the button loses nothing they actually needed. That link used
 * to be a `geo:` URL, which no desktop browser handles — it was a button that
 * did nothing for anyone not on a phone. The Google URL deep-links into the
 * app where one is installed and opens the web map everywhere else.
 */
export function MapEmbed() {
  const t = useTranslations('form');
  const locale = useLocale();
  const [loaded, setLoaded] = useState(false);

  const { lat, lng } = client.address.geo;
  // Coordinates rather than the address string: a geocoder that fails to find
  // a small business in Holzem would drop the pin on the wrong village, and
  // this is the one thing on the page that has to be exactly right.
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=16&hl=${locale}&output=embed`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  if (loaded) {
    return (
      <div className="overflow-hidden rounded-sm border border-border">
        <iframe
          src={embedUrl}
          title={`${client.name} — ${client.address.locality}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block aspect-[4/3] w-full border-0"
        />
        {/*
          No attribution line of our own. The OpenStreetMap embed this replaced
          needed one — ODbL requires it and the iframe does not carry it — but
          Google's embed attributes itself inside the frame ("Kartendaten
          ©2026 Google"), so a caption underneath said the same thing twice.
        */}
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-sm border border-border bg-surface-sunken p-6">
      {/*
        A drawn placeholder rather than a static map image: a hosted preview
        would be a third-party request too, which is the thing being avoided.
      */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 size-full text-navy-300"
      >
        <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.75">
          <path d="M-20 210 L180 150 L420 196" />
          <path d="M-20 96 L150 60 L420 120" />
          <path d="M110 -20 L150 60 L180 150 L165 320" />
          <path d="M280 -20 L262 130 L300 320" />
        </g>
        <circle cx="200" cy="150" r="46" fill="currentColor" opacity="0.14" />
      </svg>

      <div className="relative">
        <p className="flex items-start gap-2.5 font-heading text-h4 font-bold text-ink">
          <MapPinIcon className="mt-0.5 size-5 shrink-0 text-accent-text" />
          <span>
            {client.address.street}
            <br />
            {client.address.postalCode} {client.address.locality}
          </span>
        </p>

        <p className="mt-4 max-w-[46ch] text-small text-ink-muted">{t('mapNotice')}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="inline-flex min-h-12 items-center rounded-sm bg-navy-900 px-5 font-heading font-semibold text-clay-50 transition-colors duration-fast ease-out hover:bg-navy-800"
          >
            {t('mapLoad')}
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"

            className="inline-flex min-h-12 items-center rounded-sm border border-border-strong px-5 font-heading font-semibold text-ink no-underline transition-colors duration-fast ease-out hover:border-navy-900 hover:bg-navy-900/6"
          >
            {t('openInMaps')}
          </a>
        </div>
      </div>
    </div>
  );
}
