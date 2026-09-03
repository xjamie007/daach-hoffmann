/**
 * Single source of truth for everything client-specific.
 *
 * Section 16 of the brief is unambiguous: nothing in this file may appear
 * hard-coded anywhere else in the codebase. Not the address, not the service
 * list, and above all not the phone number. This project is the template for
 * the next trade business, and a hard-coded phone number is the one mistake
 * that survives a copy-paste and reaches a stranger's customers.
 *
 * `null` means "the client has not supplied this yet". It is never a default,
 * never a guess, and never a plausible-looking invention. Anything null renders
 * through <Pending> as a visible marker and is listed by `npm run check:pending`.
 */

export type LocalizedText = Readonly<Record<'de' | 'fr' | 'en', string>>;

/** A fact the client still owes us. See section 19 of the brief. */
export type PendingFact = null;

export type ServiceId =
  | 'roofing'
  | 'sheet-metal'
  | 'chimney'
  | 'cleaning'
  | 'emergency'
  | 'other';

export interface ServiceDefinition {
  readonly id: ServiceId;
  /** URL slug per locale. Section 8: slugs are translated, not just content. */
  readonly slug: LocalizedText;
  readonly name: LocalizedText;
  /** One line that names a real benefit, never a restatement of the name. */
  readonly promise: LocalizedText;
  /** Drives ordering in navigation and on the home page. */
  readonly order: number;
  /** Emergency gets the signal colour and its own path through the site. */
  readonly isEmergency: boolean;
}

export interface ServiceArea {
  readonly slug: string;
  readonly name: string;
  readonly canton: 'Capellen' | 'Luxembourg';
  /**
   * Straight-line distance from the workshop in Holzem, rounded to the
   * kilometre. Filled in phase 6 from verified coordinates — never estimated,
   * because "12 minutes away" is a promise a customer will time.
   */
  readonly distanceKm: number | PendingFact;
  readonly geo: { readonly lat: number; readonly lng: number } | PendingFact;
}

export const client = {
  name: 'Daach Hoffmann',
  /** Full registered name including legal form. Section 19, legally required. */
  legalName: null as string | PendingFact,
  trade: 'roofing',
  /** Section 19. The existing site says only "depuis de nombreuses années". */
  founded: null as number | PendingFact,

  address: {
    street: '28, Route de Capellen',
    postalCode: 'L-8279',
    locality: 'Holzem',
    /** Holzem is a village in the commune of Mamer, canton of Capellen. */
    commune: 'Mamer',
    canton: 'Capellen',
    country: 'LU',
    countryName: {
      de: 'Luxemburg',
      fr: 'Luxembourg',
      en: 'Luxembourg',
    } satisfies LocalizedText,
    /** Source: Wikipedia, Holzem (Mamer). Used for LocalBusiness JSON-LD. */
    geo: { lat: 49.617, lng: 5.983 },
  },

  contact: {
    /** E.164, for tel: links and schema.org. Never rendered directly. */
    phone: '+352661903200',
    /** How a Luxembourger reads it aloud. Rendered, never dialled. */
    phoneDisplay: '661 903 200',
    whatsapp: '+352661903200',
    /**
     * The domain belongs to the business but the existing site still publishes
     * a Gmail address. Section 3.4 counts that as a trust leak on a five-figure
     * enquiry. This address must be created before launch.
     */
    email: 'info@daach-hoffmann.lu',
    emailIsProvisioned: false,
  },

  /** All three legally required on Luxembourg websites. Law of 14 August 2000. */
  legal: {
    rcs: null as string | PendingFact,
    autorisation: null as string | PendingFact,
    vat: null as string | PendingFact,
    /** Named person responsible for the content. */
    contentResponsible: null as string | PendingFact,
    /** Filled once hosting is final; required in the Mentions légales. */
    host: {
      name: null as string | PendingFact,
      address: null as string | PendingFact,
    },
  },

  /** Section 19. Office hours are not the same as emergency availability. */
  hours: null as PendingFact,

  /**
   * What the confirmation mail and the form promise the sender.
   *
   * Section 3.4 counts the missing response-time commitment as a conversion
   * defect, so the site has to state one. This is the one value here that is a
   * promise about the future rather than a fact about the past — which makes
   * it the business's to confirm before launch, not ours to assume.
   */
  responseTime: {
    confirmedByClient: false,
    workingDays: 1,
  },

  emergency: {
    available: true,
    /** Verified on the existing site: "7 jours sur 7". */
    coverage: '7/7',
  },

  insurance: {
    provider: null as string | PendingFact,
    coverage: null as string | PendingFact,
  },

  /** Chambre des Métiers membership, certifications, qualifications. */
  credentials: null as PendingFact,

  /** Number of completed roofs, team size — section 7.1 wants real figures only. */
  figures: {
    teamSize: null as number | PendingFact,
    completedProjects: null as number | PendingFact,
  },

  locales: ['de', 'fr', 'en'] as const,
  defaultLocale: 'de',
  /** Luxembourgish is planned; the routing already tolerates a fourth column. */
  plannedLocales: ['lb'] as const,

  services: [
    {
      id: 'roofing',
      order: 1,
      isEmergency: false,
      slug: { de: 'dacheindeckung', fr: 'couverture', en: 'roofing' },
      name: {
        de: 'Dacheindeckung & Dachstuhl',
        fr: 'Couverture & charpente',
        en: 'Roofing & roof structure',
      },
      promise: {
        de: 'Neues Dach oder Sanierung — vom Sparren bis zum letzten Ziegel aus einer Hand.',
        fr: 'Toiture neuve ou rénovation — du chevron à la dernière tuile, un seul interlocuteur.',
        en: 'New roof or renovation — from rafter to final tile, handled by one team.',
      },
    },
    {
      id: 'sheet-metal',
      order: 2,
      isEmergency: false,
      slug: { de: 'spenglerei', fr: 'ferblanterie', en: 'sheet-metal' },
      name: {
        de: 'Spenglerei & Dachrinnen',
        fr: 'Ferblanterie & gouttières',
        en: 'Sheet metal & gutters',
      },
      promise: {
        de: 'Zink, Kupfer und Blech an den Stellen, an denen ein Dach zuerst undicht wird.',
        fr: 'Zinc, cuivre et tôle là où un toit commence toujours par fuir.',
        en: 'Zinc, copper and flashing at the points where a roof leaks first.',
      },
    },
    {
      id: 'chimney',
      order: 3,
      isEmergency: false,
      slug: { de: 'kamin', fr: 'cheminee', en: 'chimney' },
      name: {
        de: 'Kaminkopf & Durchdringungen',
        fr: 'Souche de cheminée & pénétrations',
        en: 'Chimney stack & roof penetrations',
      },
      promise: {
        de: 'Der häufigste Ausgangspunkt für Feuchteschäden — abgedichtet und neu verkleidet.',
        fr: "Le point de départ le plus fréquent des infiltrations — étanchéifié et rhabillé.",
        en: 'The most common origin of damp damage — sealed and re-clad.',
      },
    },
    {
      id: 'cleaning',
      order: 4,
      isEmergency: false,
      slug: { de: 'dachreinigung', fr: 'nettoyage', en: 'roof-cleaning' },
      name: {
        de: 'Dachreinigung & Beschichtung',
        fr: 'Nettoyage & peinture de toiture',
        en: 'Roof cleaning & coating',
      },
      promise: {
        de: 'Moos runter, Poren zu — verlängert die Lebensdauer, statt sie zu kaschieren.',
        fr: 'Mousse retirée, pores refermés — on prolonge la durée de vie, on ne la masque pas.',
        en: 'Moss off, pores sealed — extends the life of a roof instead of hiding its age.',
      },
    },
    {
      id: 'emergency',
      order: 5,
      isEmergency: true,
      slug: { de: 'notdienst', fr: 'depannage', en: 'emergency' },
      name: {
        de: 'Notdienst 7/7',
        fr: 'Dépannage 7j/7',
        en: 'Emergency service 7/7',
      },
      promise: {
        de: 'Sturmschaden, offene Stelle, Wasser im Haus — wir sichern zuerst, wir rechnen später.',
        fr: "Dégât de tempête, toit ouvert, eau dans la maison — on sécurise d'abord, on chiffre ensuite.",
        en: 'Storm damage, an open roof, water inside — we make it safe first and quote afterwards.',
      },
    },
    {
      id: 'other',
      order: 6,
      isEmergency: false,
      slug: { de: 'weitere', fr: 'autres', en: 'other' },
      name: {
        de: 'Terrassen & weitere Arbeiten',
        fr: 'Terrasses & autres travaux',
        en: 'Terraces & further work',
      },
      promise: {
        de: 'Terrassenreinigung, Fassadenanschlüsse und alles, was ohnehin ein Gerüst braucht.',
        fr: "Nettoyage de terrasses, raccords de façade et tout ce qui demande de toute façon un échafaudage.",
        en: 'Terrace cleaning, façade junctions and anything that needs the scaffolding anyway.',
      },
    },
  ] as const satisfies readonly ServiceDefinition[],

  /**
   * Municipalities that get their own page in v1. Section 6 is explicit: each
   * needs at least 250 words of genuinely different text with a real link to
   * the place. A template with the name swapped out is worse than no page —
   * Google recognises it and penalises it.
   */
  serviceAreas: [
    { slug: 'mamer', name: 'Mamer', canton: 'Capellen', distanceKm: null, geo: null },
    { slug: 'capellen', name: 'Capellen', canton: 'Capellen', distanceKm: null, geo: null },
    { slug: 'steinfort', name: 'Steinfort', canton: 'Capellen', distanceKm: null, geo: null },
    { slug: 'bertrange', name: 'Bertrange', canton: 'Luxembourg', distanceKm: null, geo: null },
    { slug: 'strassen', name: 'Strassen', canton: 'Luxembourg', distanceKm: null, geo: null },
    { slug: 'kehlen', name: 'Kehlen', canton: 'Capellen', distanceKm: null, geo: null },
    { slug: 'koerich', name: 'Koerich', canton: 'Capellen', distanceKm: null, geo: null },
    { slug: 'garnich', name: 'Garnich', canton: 'Capellen', distanceKm: null, geo: null },
    { slug: 'dippach', name: 'Dippach', canton: 'Capellen', distanceKm: null, geo: null },
    { slug: 'kopstal', name: 'Kopstal', canton: 'Capellen', distanceKm: null, geo: null },
  ] as const satisfies readonly ServiceArea[],

  /** Radius the business actually covers, for the map on the home page. */
  serviceRadiusKm: 30,

  brand: {
    /**
     * Rendering colours live in src/styles/tokens.css as CSS custom properties;
     * that file is the single source of truth for anything visual. The values
     * repeated here are only the ones JavaScript needs — the browser theme
     * colour and Open Graph image generation — and they must be kept in step.
     */
    themeColor: '#15191d',
    fonts: {
      heading: 'Bricolage Grotesque',
      body: 'Public Sans',
    },
    /** Existing logo is a JPG with a white box. Must be redrawn as SVG. */
    logo: {
      svg: null as string | PendingFact,
      source: 'logo3.jpg (existing site, raster only)',
    },
  },

  /** Social profiles for schema.org `sameAs`. None confirmed yet. */
  sameAs: [] as readonly string[],

  /** Google Business Profile, needed before reviews can be shown at all. */
  googleBusinessProfile: null as string | PendingFact,

  /** Previous site, kept for the redirect map and the launch checklist. */
  legacy: {
    domain: 'daach-hoffmann.lu',
    builtBy: 'NET 7 (net-7.com)',
  },
} as const;

export type ClientConfig = typeof client;

/** Convenience accessor used by navigation, the home page and JSON-LD. */
export const servicesByOrder = [...client.services].sort((a, b) => a.order - b.order);

export function getService(id: ServiceId): ServiceDefinition {
  const service = client.services.find((entry) => entry.id === id);
  if (!service) {
    throw new Error(`Unknown service id: ${id}`);
  }
  return service;
}

export function getServiceBySlug(locale: 'de' | 'fr' | 'en', slug: string): ServiceDefinition | undefined {
  return client.services.find((entry) => entry.slug[locale] === slug);
}
