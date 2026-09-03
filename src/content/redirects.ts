/**
 * Every URL the incumbent site is known to expose, mapped to its replacement.
 *
 * Section 13.3 of the brief lists these eight. They stay French because that
 * is the language the existing pages rank in — sending a French visitor who
 * clicks a Google result to a German page would be a second regression on top
 * of the URL change.
 *
 * On the static target these cannot become HTTP 301s; GitHub Pages has no
 * redirect layer. They are rendered as client-side redirect documents instead,
 * which browsers follow but search engines treat as a weaker signal. Moving to
 * a host with a redirect layer turns the same list into real 301s with no
 * further edits — see next.config.ts.
 *
 * Before launch, confirm against Search Console which URLs are actually
 * indexed and extend this list. The brief says so explicitly, and an agency
 * template site usually exposes more paths than its navigation admits.
 */
export interface LegacyRedirect {
  readonly from: string;
  readonly to: string;
}

export const legacyRedirects: readonly LegacyRedirect[] = [
  { from: '/index.html', to: '/de' },
  { from: '/couverture_hobscheid_luxembourg.html', to: '/fr/prestations/couverture' },
  { from: '/ferblanterie_luxembourg.html', to: '/fr/prestations/ferblanterie' },
  { from: '/nettoyage_toiture_luxembourg.html', to: '/fr/prestations/nettoyage' },
  { from: '/cheminee_toiture_hobscheid.html', to: '/fr/prestations/cheminee' },
  { from: '/depannage_toiture_luxembourg.html', to: '/fr/prestations/depannage' },
  { from: '/nettoyage_terrasse_luxembourg.html', to: '/fr/prestations/autres' },
  { from: '/contact_couvreur_luxembourg.html', to: '/fr/contact' },
];
