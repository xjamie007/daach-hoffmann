'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPinIcon } from '@/components/ui/icons';
import { client } from '~/config/client.config';

/**
 * Click-to-load map.
 *
 * Section 14.3 rules out embedding Google Maps directly: the embed contacts
 * Google and transfers the visitor's IP address before any consent exists, and
 * there is no legal basis for that on a page someone merely opened. It permits
 * a static representation with click-to-load, or an OpenStreetMap embed that
 * works without consent.
 *
 * This does both at once. Until the button is pressed, nothing is requested
 * from anywhere — the placeholder is drawn locally. Pressing it loads the
 * OpenStreetMap embed, and the notice says plainly what that means before it
 * happens rather than after.
 *
 * The address and the directions link work without any of this, so a visitor
 * who never presses the button loses nothing they actually needed.
 */
export function MapEmbed() {
  const t = useTranslations('form');
  const [loaded, setLoaded] = useState(false);

  const { lat, lng } = client.address.geo;
  const delta = 0.008;
  const bbox = [lng - delta, lat - delta / 2, lng + delta, lat + delta / 2].join('%2C');
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  const geoUrl = `geo:${lat},${lng}?q=${encodeURIComponent(
    `${client.address.street}, ${client.address.postalCode} ${client.address.locality}`,
  )}`;

  if (loaded) {
    return (
      <div className="overflow-hidden rounded-sm border border-border">
        <iframe
          src={embedUrl}
          title={`${client.name} — ${client.address.locality}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="block aspect-[4/3] w-full border-0"
        />
        <p className="bg-surface-sunken px-4 py-2.5 text-[0.75rem] text-ink-subtle">
          © {t('mapProvider')}
        </p>
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
            href={geoUrl}
            className="inline-flex min-h-12 items-center rounded-sm border border-border-strong px-5 font-heading font-semibold text-ink no-underline transition-colors duration-fast ease-out hover:border-navy-900 hover:bg-navy-900/6"
          >
            {t('openInMaps')}
          </a>
        </div>
      </div>
    </div>
  );
}
