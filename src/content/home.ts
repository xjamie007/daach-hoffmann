import type { Localized, SiteImage } from './types';

/**
 * Home page copy.
 *
 * Content lives in typed files in the repository, not in the database
 * (section 10). Keeping it here rather than in messages/*.json draws the line
 * the project actually needs: messages hold interface chrome — button labels,
 * ARIA strings, navigation — while this holds the writing, where a German
 * sentence and its French counterpart are two pieces of work rather than one
 * string and a translation of it.
 *
 * Nothing here states a fact the business has not stated about itself. The
 * free quote, the free call-out and the seven-day emergency service are all
 * claims carried on the existing site. Founding year, team size and project
 * count are not, and so they appear as marked placeholders rather than as
 * numbers.
 */

export const hero = {
  eyebrow: {
    de: 'Couvreur · Charpente · Zinguerie',
    fr: 'Couverture · Charpente · Zinguerie',
    en: 'Roofing · Carpentry · Sheet metal',
  } satisfies Localized,
  title: {
    de: 'Dachdecker aus Holzem — für ganz Luxemburg',
    fr: 'Couvreur à Holzem — pour tout le Luxembourg',
    en: 'Roofers based in Holzem — working across Luxembourg',
  } satisfies Localized,
  lead: {
    de: 'Neueindeckung, Sanierung, Spenglerei und Notdienst — vom Dachstuhl bis zur Dachrinne. Kostenvoranschlag und Anfahrt sind im ganzen Grossherzogtum kostenlos, auch wenn daraus kein Auftrag wird.',
    fr: "Couverture neuve, rénovation, ferblanterie et dépannage — de la charpente à la gouttière. Devis et déplacement gratuits dans tout le Grand-Duché, même si cela ne débouche sur aucun chantier.",
    en: 'New roofs, renovation, sheet metal and emergency call-outs — from the rafters to the gutter. Quote and call-out free anywhere in the Grand Duchy, even when no job comes of it.',
  } satisfies Localized,
  /** Section 7.1: a real photograph of finished work, not darkened, not a backdrop. */
  image: { kind: 'photo', id: 'haus-schiefer-fertig' } satisfies SiteImage,
} as const;

/**
 * The first-screen summary.
 *
 * Four facts, one line, directly under the hero. Everything a visitor needs to
 * decide whether this business is even relevant to them: where it is, how far
 * it goes, when it answers, and what the first step costs. None of it is a
 * claim the business has not already made about itself.
 */
export const glance = [
  {
    id: 'base',
    label: { de: 'Sitz', fr: 'Siège', en: 'Based in' } satisfies Localized,
    value: {
      de: 'Holzem, Gemeinde Mamer',
      fr: 'Holzem, commune de Mamer',
      en: 'Holzem, commune of Mamer',
    } satisfies Localized,
  },
  {
    id: 'area',
    label: { de: 'Einsatzgebiet', fr: "Zone d'intervention", en: 'Area covered' } satisfies Localized,
    value: {
      de: 'Ganzes Grossherzogtum',
      fr: 'Tout le Grand-Duché',
      en: 'The whole Grand Duchy',
    } satisfies Localized,
  },
  {
    id: 'emergency',
    label: { de: 'Notdienst', fr: 'Dépannage', en: 'Emergency' } satisfies Localized,
    value: {
      de: '7 Tage die Woche',
      fr: '7 jours sur 7',
      en: 'Seven days a week',
    } satisfies Localized,
    accent: true,
  },
  {
    id: 'quote',
    label: { de: 'Angebot & Anfahrt', fr: 'Devis & déplacement', en: 'Quote & call-out' } satisfies Localized,
    value: { de: 'Kostenlos', fr: 'Gratuits', en: 'Free of charge' } satisfies Localized,
  },
] as const;

export const emergency = {
  eyebrow: {
    de: 'Notdienst · 7 Tage die Woche',
    fr: 'Dépannage · 7 jours sur 7',
    en: 'Emergency service · seven days a week',
  } satisfies Localized,
  title: {
    de: 'Sturmschaden? Undichte Stelle? Wir kommen.',
    fr: 'Dégât de tempête ? Une fuite ? Nous intervenons.',
    en: 'Storm damage? A leak? We come out.',
  } satisfies Localized,
  body: {
    de: 'Bei einem offenen Dach zählt die Stunde, nicht der Werktag. Rufen Sie an — ein Anruf klärt in zwei Minuten, was ein Formular in zwei Tagen klärt. Wenn es sich nicht sofort reparieren lässt, sichern wir zuerst und rechnen später.',
    fr: "Sur un toit ouvert, c'est l'heure qui compte, pas le jour ouvrable. Appelez — deux minutes au téléphone valent deux jours de formulaire. Si la réparation ne peut pas se faire tout de suite, on sécurise d'abord et on chiffre ensuite.",
    en: 'With an open roof it is the hour that matters, not the working day. Call us — two minutes on the phone settles what a form takes two days to settle. If it cannot be repaired on the spot, we make it safe first and work out the cost afterwards.',
  } satisfies Localized,
} as const;

export const services = {
  eyebrow: { de: 'Leistungen', fr: 'Prestations', en: 'Services' } satisfies Localized,
  title: {
    de: 'Alles am Dach, von einem Betrieb',
    fr: 'Tout ce qui touche au toit, par une seule entreprise',
    en: 'Everything on the roof, from one company',
  } satisfies Localized,
  lead: {
    de: 'Vom Dachstuhl bis zur Dachrinne. Ein Ansprechpartner, ein Gerüst, ein Termin — statt drei Gewerke, die aufeinander warten.',
    fr: "De la charpente à la gouttière. Un interlocuteur, un échafaudage, un rendez-vous — au lieu de trois corps de métier qui s'attendent.",
    en: 'From the roof structure to the gutter. One contact, one scaffold, one appointment — instead of three trades waiting on each other.',
  } satisfies Localized,
} as const;

/**
 * Trust markers.
 *
 * `claim` entries are commitments the business already publishes. `pending`
 * entries are the figures section 7.1 asks for and section 19 lists as
 * missing — years in business, roofs completed, team size. They are shown as
 * marked gaps rather than filled with a plausible number, because a founding
 * year is exactly the kind of invention nobody would catch and everybody would
 * repeat.
 */
export const about = {
  eyebrow: { de: 'Der Betrieb', fr: "L'entreprise", en: 'The company' } satisfies Localized,
  title: {
    de: 'Ein Dachdeckerbetrieb aus Holzem',
    fr: 'Une entreprise de couverture à Holzem',
    en: 'A roofing business from Holzem',
  } satisfies Localized,
  body: [
    {
      de: 'Wir sitzen an der Route de Capellen in Holzem, einer Ortschaft der Gemeinde Mamer. Von hier aus sind Mamer, Capellen, Garnich und Dippach unter vier Kilometer entfernt, die weiteste Gemeinde in unserem Kerngebiet liegt acht Kilometer weg. Gearbeitet wird im ganzen Grossherzogtum.',
      fr: "Nous sommes établis route de Capellen à Holzem, une localité de la commune de Mamer. D'ici, Mamer, Capellen, Garnich et Dippach sont à moins de quatre kilomètres ; la commune la plus éloignée de notre zone centrale est à huit kilomètres. Nous intervenons dans tout le Grand-Duché.",
      en: 'We are based on the Route de Capellen in Holzem, a village in the commune of Mamer. From here Mamer, Capellen, Garnich and Dippach are under four kilometres away, and the furthest commune in our core area is eight. We work across the whole Grand Duchy.',
    },
    {
      de: 'Couverture, Charpente und Zinguerie — Eindeckung, Dachstuhl und Spenglerei — dazu Kaminköpfe, Dachreinigung, Terrassenarbeiten und der Notdienst an sieben Tagen die Woche. Das ist bewusst alles rund um das Dach und nicht mehr: Wenn eine Anfrage zu Elektrik, Sanitär oder Statik gehört, sagen wir das, statt sie irgendwie mitzumachen.',
      fr: "Couverture, charpente et zinguerie, auxquelles s'ajoutent souches de cheminée, nettoyage de toiture, travaux de terrasse et dépannage sept jours sur sept. C'est délibérément tout ce qui touche au toit, et rien de plus : si une demande relève de l'électricité, du sanitaire ou de la structure, nous le disons plutôt que de la traiter tant bien que mal.",
      en: 'Roofing, carpentry and sheet metal, plus chimney stacks, roof cleaning, terrace work and emergency cover seven days a week. That is deliberately everything around the roof and nothing beyond it: if an enquiry belongs to electrics, plumbing or structural work, we say so rather than taking it on regardless.',
    },
  ],
  /** Figures the client owes us. Section 19. */
  figures: [
    {
      id: 'founded',
      label: { de: 'Am Markt seit', fr: 'Sur le marché depuis', en: 'In business since' } satisfies Localized,
      pendingId: 'figures.founded',
      pendingWhat: { de: 'Gründungsjahr', fr: 'Année de création', en: 'Founding year' } satisfies Localized,
    },
    {
      id: 'projects',
      label: { de: 'Abgeschlossene Dächer', fr: 'Toitures réalisées', en: 'Roofs completed' } satisfies Localized,
      pendingId: 'figures.projects',
      pendingWhat: { de: 'Anzahl', fr: 'Nombre', en: 'Count' } satisfies Localized,
    },
    {
      id: 'team',
      label: { de: 'Mitarbeiter', fr: 'Collaborateurs', en: 'Team members' } satisfies Localized,
      pendingId: 'figures.team',
      pendingWhat: { de: 'Anzahl', fr: 'Nombre', en: 'Count' } satisfies Localized,
    },
  ],
} as const;

export const process = {
  eyebrow: { de: 'Ablauf', fr: 'Déroulement', en: 'How it works' } satisfies Localized,
  title: {
    de: 'Von der Anfrage bis zur Abnahme',
    fr: "De la demande à la réception des travaux",
    en: 'From first enquiry to sign-off',
  } satisfies Localized,
  steps: [
    {
      id: 'enquiry',
      title: { de: 'Anfrage', fr: 'Demande', en: 'Enquiry' } satisfies Localized,
      body: {
        de: 'Ein Foto vom Schaden sagt mehr als eine Seite Text. Wir melden uns innerhalb eines Werktags — bei einem Notfall sofort.',
        fr: "Une photo du dommage en dit plus qu'une page de texte. Nous répondons sous un jour ouvrable — immédiatement en cas d'urgence.",
        en: 'One photo of the damage says more than a page of description. We reply within one working day — immediately if it is an emergency.',
      } satisfies Localized,
    },
    {
      id: 'visit',
      title: { de: 'Vor-Ort-Termin', fr: 'Visite sur place', en: 'Site visit' } satisfies Localized,
      body: {
        de: 'Kostenlos, im ganzen Grossherzogtum. Wir steigen aufs Dach und sehen uns auch das an, wonach Sie nicht gefragt haben.',
        fr: 'Gratuite, dans tout le Grand-Duché. Nous montons sur le toit et regardons aussi ce que vous ne nous avez pas demandé.',
        en: 'Free, anywhere in the Grand Duchy. We get onto the roof and also look at what you did not ask about.',
      } satisfies Localized,
    },
    {
      id: 'quote',
      title: { de: 'Angebot', fr: 'Devis', en: 'Quote' } satisfies Localized,
      body: {
        de: 'Schriftlich, nach Positionen aufgeschlüsselt, mit Material und Zeitrahmen. Keine Pauschale, die sich hinterher erklären muss.',
        fr: 'Par écrit, décomposé poste par poste, matériaux et délais compris. Pas de forfait qui devrait se justifier après coup.',
        en: 'In writing, broken down by item, with materials and a time frame. No lump sum that has to be explained afterwards.',
      } satisfies Localized,
    },
    {
      id: 'work',
      title: { de: 'Ausführung & Abnahme', fr: 'Exécution & réception', en: 'Work & sign-off' } satisfies Localized,
      body: {
        de: 'Der Termin steht vorher fest. Zum Schluss gehen wir gemeinsam übers Dach — Abnahme heisst, dass Sie es gesehen haben.',
        fr: "La date est fixée à l'avance. À la fin, nous parcourons le toit ensemble — la réception, c'est que vous l'avez vu.",
        en: 'The date is fixed in advance. At the end we walk the roof together — sign-off means you have seen it.',
      } satisfies Localized,
    },
  ],
} as const;

export const projects = {
  eyebrow: { de: 'Referenzen', fr: 'Réalisations', en: 'Projects' } satisfies Localized,
  title: {
    de: 'Ausgeführte Arbeiten',
    fr: 'Chantiers réalisés',
    en: 'Completed work',
  } satisfies Localized,
  lead: {
    de: 'Schiefer im Aufbau, ein offenes Dach im Gerüst, ein Zinkfallrohr, ein ausgebautes Dachgeschoss. Ort, Jahr und Fläche stehen bewusst nicht dabei — sie liegen uns zu diesen Aufnahmen nicht vor, und ausgedacht wird hier nichts.',
    fr: "Ardoise en cours de pose, toiture ouverte sous échafaudage, descente en zinc, comble aménagé. Lieu, année et surface ne figurent volontairement pas : ces données ne nous sont pas connues pour ces prises de vue, et nous n'inventons rien.",
    en: 'Slate being laid, an open roof under scaffold, a zinc downpipe, a converted loft. Location, year and area are deliberately absent — we do not have them for these shots, and nothing here is invented.',
  } satisfies Localized,
} as const;

export const area = {
  eyebrow: { de: 'Einsatzgebiet', fr: "Zone d'intervention", en: 'Area covered' } satisfies Localized,
  title: {
    de: 'Zu Hause im Kanton Capellen, unterwegs im ganzen Land',
    fr: 'Ancrés dans le canton de Capellen, actifs dans tout le pays',
    en: 'At home in the canton of Capellen, working nationwide',
  } satisfies Localized,
  body: {
    de: 'Von Holzem aus sind die Gemeinden im Westen und Süden in wenigen Minuten erreichbar. Angefahren wird das ganze Grossherzogtum — die Anfahrt kostet in keinem Fall etwas.',
    fr: "Depuis Holzem, les communes de l'ouest et du sud sont à quelques minutes. Nous nous déplaçons dans tout le Grand-Duché — et le déplacement ne coûte jamais rien.",
    en: 'From Holzem the municipalities to the west and south are minutes away. We travel across the whole Grand Duchy — and the journey never costs anything.',
  } satisfies Localized,
} as const;

export const cta = {
  title: {
    de: 'Beschreiben Sie uns Ihr Dach',
    fr: 'Décrivez-nous votre toiture',
    en: 'Tell us about your roof',
  } satisfies Localized,
  body: {
    de: 'Je konkreter die Anfrage, desto genauer die Antwort. Dachtyp, ungefähre Fläche, was Ihnen aufgefallen ist — und wenn möglich zwei, drei Fotos. Damit können wir oft schon vor dem Termin sagen, worum es geht.',
    fr: "Plus la demande est précise, plus la réponse l'est. Type de toiture, surface approximative, ce que vous avez remarqué — et si possible deux ou trois photos. Cela nous permet souvent de situer le problème avant même la visite.",
    en: 'The more specific the enquiry, the more precise the answer. Roof type, rough area, what you have noticed — and two or three photos if you can. That often tells us what we are dealing with before the visit.',
  } satisfies Localized,
} as const;
