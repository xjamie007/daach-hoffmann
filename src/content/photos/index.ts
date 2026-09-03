import type { Localized } from '@/content/types';
import { PHOTOS, type PhotoId } from './manifest';

export { PHOTOS };
export type { PhotoId };

/**
 * Alt text for every photograph, written per language.
 *
 * Section 15.1 requires descriptive alt text in all three languages, and
 * section 3.2 records that the incumbent site has none at all — every image
 * there carries an empty alt attribute.
 *
 * These describe what is visible and nothing more. None of them names a place,
 * a date or a customer, because none of that was supplied with the photographs:
 * the images are the business's own work, and that is all we can say with
 * certainty. Captions can be enriched the day the job details arrive.
 */
export const PHOTO_ALT: Readonly<Record<PhotoId, Localized>> = {
  'haus-schiefer-fertig': {
    de: 'Fertiggestelltes Wohnhaus mit dunkler Dacheindeckung und Dachflächenfenstern, aufgenommen bei Tageslicht von der Strasse.',
    fr: "Maison achevée avec couverture sombre et fenêtres de toit, photographiée depuis la rue en plein jour.",
    en: 'A finished house with a dark roof covering and roof windows, photographed from the street in daylight.',
  },
  'dach-first-ziegel': {
    de: 'Blick über den First eines frisch eingedeckten Ziegeldachs, Leiter angelehnt, Strasse im Hintergrund.',
    fr: "Vue le long du faîtage d'une toiture en tuiles fraîchement posée, échelle appuyée, rue en arrière-plan.",
    en: 'A view along the ridge of a freshly laid tiled roof, ladder resting against it, street below.',
  },
  'ziegel-dunkel-leitern': {
    de: 'Dunkle Ziegelfläche im Detail, zwei Dachdeckerleitern auf der Fläche aufgelegt.',
    fr: 'Détail de tuiles sombres, deux échelles de couvreur posées sur le pan.',
    en: 'Close view of dark tiling with two roof ladders laid across the slope.',
  },
  'spenglerei-anschluss': {
    de: 'Spenglerarbeit am Übergang zweier Dachflächen, Blechanschluss um ein Entlüftungsrohr.',
    fr: "Travail de ferblanterie à la jonction de deux pans, raccord métallique autour d'une ventilation.",
    en: 'Sheet-metal work where two roof planes meet, with a flashing dressed around a vent pipe.',
  },
  'zink-fallrohr': {
    de: 'Fallrohr aus Zink mit gelötetem Bogen an einer Holzfassade.',
    fr: 'Descente en zinc avec coude soudé le long d’une façade en bois.',
    en: 'A zinc downpipe with a soldered bend running down a timber façade.',
  },
  'dachrinne-detail': {
    de: 'Neu montierte Dachrinne mit Rinnenhaltern entlang der Traufe.',
    fr: 'Gouttière neuve montée sur ses crochets le long de l’égout.',
    en: 'A newly fitted gutter on its brackets along the eaves.',
  },
  kaminkopf: {
    de: 'Dunkel verkleideter Kaminkopf über der Dachfläche, freistehend gegen den Himmel.',
    fr: 'Souche de cheminée habillée de sombre au-dessus du toit, se détachant sur le ciel.',
    en: 'A dark-clad chimney stack standing above the roof against the sky.',
  },
  'kaminkopf-verkleidet': {
    de: 'Verputzter Kaminkopf mit Abdeckhaube auf einem Dach mit roten Firstziegeln.',
    fr: 'Souche enduite avec chapeau, sur une toiture à faîtières rouges.',
    en: 'A rendered chimney stack with a cowl, on a roof with red ridge tiles.',
  },
  'moos-vorher-nachher': {
    de: 'Zwei aneinandergrenzende Dachflächen im Vergleich: links dicht mit Moos bewachsen, rechts gereinigt.',
    fr: 'Deux pans voisins comparés : à gauche envahi de mousse, à droite nettoyé.',
    en: 'Two adjoining roof slopes side by side: heavily mossed on the left, cleaned on the right.',
  },
  'moos-nordseite': {
    de: 'Stark bemooste Dachfläche auf der Nordseite eines Wohnhauses.',
    fr: 'Pan de toiture fortement couvert de mousse, côté nord d’une maison.',
    en: 'A heavily mossed roof slope on the north side of a house.',
  },
  'dach-offen-geruest': {
    de: 'Teilweise abgedecktes Dach mit sichtbarem Dachstuhl, Gerüst und Leiter an der Traufe.',
    fr: 'Toiture partiellement déposée, charpente apparente, échafaudage et échelle à l’égout.',
    en: 'A partly stripped roof with the structure exposed, scaffold and ladder at the eaves.',
  },
  'ziegel-gebrochen': {
    de: 'Gebrochene und verschobene Tonziegel im Detail, darunter freiliegende Lattung.',
    fr: 'Détail de tuiles cassées et déplacées, lattage apparent en dessous.',
    en: 'Close view of broken and displaced clay tiles with the battens exposed beneath.',
  },
  'terrasse-reinigung': {
    de: 'Terrassenreinigung mit dem Flächenreiniger, gereinigter Streifen deutlich vom ungereinigten abgesetzt.',
    fr: 'Nettoyage de terrasse au nettoyeur de surface, la bande nettoyée nettement plus claire.',
    en: 'A terrace being cleaned with a surface cleaner, the cleaned strip clearly lighter than the rest.',
  },
  'pflaster-halb-gereinigt': {
    de: 'Pflasterfläche zur Hälfte gereinigt, die Kante zwischen bemoostem und sauberem Bereich verläuft mitten durchs Bild.',
    fr: 'Surface pavée nettoyée à moitié, la limite entre zone moussue et zone propre traverse l’image.',
    en: 'A paved area cleaned halfway, the line between mossed and clean running through the middle of the frame.',
  },
  'arbeit-stehfalz': {
    de: 'Dachdecker bei der Arbeit an einer Stehfalzdeckung aus Blech, blauer Himmel.',
    fr: 'Couvreur au travail sur une couverture métallique à joint debout, ciel bleu.',
    en: 'A roofer at work on a standing-seam metal roof under a blue sky.',
  },
  'schiefer-verlegen': {
    de: 'Schieferdeckung im Aufbau: verlegte Reihen unten, freiliegende Lattung oben.',
    fr: 'Couverture en ardoise en cours : rangs posés en bas, lattage apparent en haut.',
    en: 'A slate roof being laid: finished courses below, open battens above.',
  },
  'schiefer-dachfenster': {
    de: 'Schieferdach mit eingebautem Dachflächenfenster, Blick entlang der Fläche.',
    fr: 'Toiture en ardoise avec fenêtre de toit intégrée, vue le long du pan.',
    en: 'A slate roof with a roof window set into it, seen along the slope.',
  },
  'schiefer-detail': {
    de: 'Nahaufnahme einer Schieferdeckung mit sichtbarer Überdeckung der Steine.',
    fr: 'Gros plan sur une couverture en ardoise, recouvrement des pierres visible.',
    en: 'Close-up of slate covering with the overlap of the individual slates visible.',
  },
  'dachstuhl-offen': {
    de: 'Blick von innen durch das offene Dach auf Sparren und Himmel.',
    fr: 'Vue de l’intérieur à travers la toiture ouverte : chevrons et ciel.',
    en: 'A view from inside up through the open roof to the rafters and the sky.',
  },
  'geruest-luftbild': {
    de: 'Gerüst und teilweise gedeckte Dachfläche von oben, Arbeiter auf der Fläche.',
    fr: 'Échafaudage et pan partiellement couvert vus d’en haut, ouvriers sur la surface.',
    en: 'Scaffolding and a partly covered roof seen from above, workers on the slope.',
  },
  'dachgeschoss-ausgebaut': {
    de: 'Ausgebautes Dachgeschoss von innen: Schräge, Dachflächenfenster, Dielenboden.',
    fr: 'Comble aménagé vu de l’intérieur : rampant, fenêtre de toit, plancher.',
    en: 'A converted loft from inside: sloping ceiling, roof window, board floor.',
  },
  natursteinmauer: {
    de: 'Gereinigte Natursteinmauer und Pflasterfläche an einer Terrasse.',
    fr: 'Mur en pierre naturelle et surface pavée nettoyés, en bordure de terrasse.',
    en: 'A cleaned natural stone wall and paved surface at the edge of a terrace.',
  },
};
