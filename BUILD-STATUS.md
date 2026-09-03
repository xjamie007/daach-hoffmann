# Baustand

Stand: 2. September 2026. Spezifikation ist `~/Desktop/Daach-Hoffmann-Website-Rebuild-Briefing.pdf`
(16 Seiten, Abschnitte 0–20). Produktkontext in [PRODUCT.md](PRODUCT.md).

Volltext des Briefings extrahieren:

```bash
python3 -c "import pypdf; r=pypdf.PdfReader('/Users/jamieley/Desktop/Daach-Hoffmann-Website-Rebuild-Briefing.pdf'); [print(f'=== S{i+1} ===', p.extract_text()) for i,p in enumerate(r.pages)]"
```

## Fertig

| Phase | Inhalt | Abnahme |
|---|---|---|
| **0 — Setup** | Next.js 15.5 App Router, TypeScript strict, Tailwind v4, next-intl mit DE/FR/EN und übersetzten Slugs, `config/client.config.ts`, Design-Tokens, selbst gehostete Schriften | Layout in drei Sprachen, Sprachumschalter funktioniert |
| **1 — Designsystem** | Palette, Typo-Skala, Button, Container, Section, SectionHeader, Formularfelder, Header, Mobilnavigation, Footer, permanente Aktionsleiste, Wortmarke, Icons | `/de/styleguide` zeigt alle Komponenten in allen Zuständen |
| **2 — Startseite** | Alle Sektionen aus 7.1 in der vorgegebenen Reihenfolge, dreisprachig | Genau eine H1, lückenlose Hierarchie, hreflang vollständig |
| **3 — Leistungsseiten** | Sechs Seiten à 900–1.400 Wörter je Sprache, FAQ mit FAQPage-Schema, Kostenfaktoren statt erfundener Preise | `check:content` erzwingt ≥ 600 Wörter je Sprache |
| **4 — Referenzen** | Datenmodell, Filter nach Leistung und Ort, Detailseite, Vorher/Nachher-Slider, ImageObject-Schema | Übersicht mit ehrlichem Leerzustand — keine erfundenen Projekte |
| **5 — Formular** | Zod-Schema für Client und Server, Foto-Upload mit Verkleinerung auf 2000 px, Server Action *und* Supabase Edge Function, zwei Resend-Mails, Honeypot + Zeitmessung, SQL-Migration mit RLS | Ende zu Ende geprüft: 9 Fehlermeldungen in ganzen Sätzen, Fokusführung, Notfall-Hinweis |
| **6 — Standort- & Inhaltsseiten** | Zehn Gemeindeseiten mit belegten Ortsfakten und Quellenangabe, Über uns, Ablauf, 3 % MwSt | `check:content` erzwingt ≥ 250 Wörter je Sprache und Gemeinde |
| **7 — Recht & SEO** | Impressum, Datenschutzerklärung, RoofingContractor/Service/FAQPage/BreadcrumbList/ImageObject, Sitemap mit Alternates, robots.txt, Weiterleitungsdokumente | 80 Seiten, 0 Strukturprobleme |

Skills aus Abschnitt 1 sind projektlokal installiert (`.agents/skills`, symlinked nach `.claude/skills`).

## Offen

| Phase | Inhalt |
|---|---|
| **8 — Abnahme** | Lighthouse Mobile im Drosselungsmodus, `review-animations`, Rich Results Test, Abschnitt 18 vollständig durchgehen |

Ausserdem offen, jeweils abhängig von Material des Kunden:

- **Referenzprojekte.** Das gesamte System steht; `src/content/projects/index.ts` ist ein leeres Array. Das erste echte Projekt ist ein Eintrag in dieser Datei und sonst nichts.
- **Bilder.** Jeder `ImageSlot` reserviert bereits die richtigen Masse und trägt ein Briefing für die Aufnahme. Sobald Fotos da sind, entsteht kein Layout-Sprung.
- **Bewertungssektion.** Bewusst nicht gebaut, solange keine echten Google-Rezensionen mit Freigabe vorliegen. Ihr Platz auf der Startseite ist im Code kommentiert.

## Befehle

```bash
npm run dev        # Entwicklung, Port 3000, mit lokalem Formular-Fallback
npm run build      # statischer Export nach ./out
npm run preview    # serviert ./out wie GitHub Pages, Port 4321
npm run check      # Typen + Kontraste + Sprachkatalog-Parität
npm run check:pending   # offene Kundenangaben auflisten (--strict lässt scheitern)
npm run check:bundle    # JavaScript-Budget der Startseite (braucht vorher build)
```

`npm run check` bündelt Typen, Kontraste, Sprachkatalog-Parität, Wortzahlen und den
Abgleich zwischen App und Edge Function.

**Wichtig:** `npm run build` nie bei laufendem Dev-Server ausführen — beide schreiben nach
`.next`, und der Dev-Server bleibt mit `MODULE_NOT_FOUND` zurück. Dev-Server vorher stoppen.
Zur visuellen Prüfung ist ohnehin `npm run preview` richtig: das ist das Artefakt, das
tatsächlich ausgeliefert wird.

## Überarbeitung vom 2. September 2026 (Nachmittag)

Auf Wunsch des Kunden:

- **Logo eingebunden.** Aus `logo3.jpg` der Bestandsseite freigestellt — Flutfüllung vom Rand statt globalem Weiss-Key, sonst wäre auch die weisse Fläche im Wappen verschwunden. Liegt als PNG und WebP mit Transparenz in `public/brand/`. Auf dunklem Grund steht es auf einer hellen Platte, weil Schrift und Dächer im Logo navy und rot sind.
- **Farbpalette aus dem Logo.** Navy `#184860` als Grund, Logo-Rot `#d81818` als Signal, Flaggen-Hellblau `#78c0d8` für Links auf dunklem Grund, Akzentblau für Aktionen. Kupfer/Terrakotta ist vollständig ersetzt. Alle 21 Kontrastpaare bestehen weiterhin WCAG 2.2 AA.
- **22 echte Fotos** aus der Bestandsseite gezogen, in AVIF/WebP/JPG in vier Breiten erzeugt (114 Dateien), mit Alt-Texten in drei Sprachen. Manifest wird generiert, `width`/`height` kommen daraus — kein Layout-Sprung.
- **3 % MwSt vollständig entfernt** — Seite, Route, Navigationseintrag, Startseiten-Block und alle Erwähnungen in den Leistungstexten. Weicht bewusst von Abschnitt 7.5 des Briefings ab.
- **Claim-Kasten ersetzt** durch einen Über-uns-Block mit Foto und zwei Absätzen. Die drei offenen Zahlen (Gründungsjahr, abgeschlossene Dächer, Mitarbeiter) sind geblieben.
- **Karte des Einsatzgebiets.** Echte Landesgrenze aus OpenStreetMap (Relation 2171347), von 18.081 auf 322 Stützpunkte reduziert. Gemeindepunkte an ihren echten OSM-Koordinaten, Entfernungen daraus berechnet (2,6 bis 8,0 km Luftlinie). Radius auf die Landesfläche beschnitten. Ortsnamen erscheinen nur bei Hover oder Fokus — bei acht Kilometern Streuung überlagern sich zehn Dauerbeschriftungen zu einem Klumpen.
- **Dachquerschnitt** als interaktives Erklärstück, ohne eine Zeile JavaScript: acht versteckte Radios und Geschwister-Selektoren. Alle acht Beschreibungen stehen im HTML, funktioniert ohne Skript, Pfeiltasten wechseln die Schicht.
- **Scroll-Reveals und Hover-Zustände.** Ein einziger IntersectionObserver für das ganze Dokument; der Verborgen-Zustand entsteht erst, wenn das Skript läuft, damit ohne JavaScript nie etwas unsichtbar bleibt. `prefers-reduced-motion` schaltet alles ab.
- **Mobilmenü repariert.** Es ging nur auf Headerhöhe auf: `backdrop-filter` auf dem Header erzeugt einen Containing Block, damit verhält sich ein `position: fixed` Kind wie `absolute`. Das Panel hängt jetzt per Portal am Body, mit Fokusfalle und Escape.

## Zweiter Designdurchgang

- **Referenzenseite entfernt**, die Bildstrecke ist auf die Startseite gewandert und läuft dort von selbst: zwei Reihen, gegenläufig, 22 Fotos, reines CSS. Jede Reihe enthält ihre Bilder doppelt und verschiebt sich um exakt die halbe Eigenbreite — dadurch ist die Schleife nahtlos ohne Messung, ohne Timer und ohne JavaScript. Pausiert bei Hover und Tastaturfokus, steht bei `prefers-reduced-motion` still.
- **Scroll-Fortschrittsbalken** oben, über `animation-timeline: scroll()` — kein Scroll-Listener, der Compositor rechnet.
- **Hero setzt sich beim Verlassen ab** (`animation-timeline: view()`), verliert etwas Grösse und Licht. Kein Parallax: nichts bewegt sich schneller als die Seite.
- **Tiefe auf den dunklen Bändern** durch einen weichen Lichtabfall derselben Navy-Farbe, damit sie nicht als flache Farbrechtecke lesen.
- **Balken der Distanzskala** zeichnen sich beim Einblenden.

### Dabei gefunden

`overflow-x: clip` stand auf `<body>`. Zusammen mit sichtbarem `overflow-y` rechnet der Browser `overflow-y` zu `auto` — damit wird der Body zum Scroll-Container, der Scroller ist nicht mehr die Wurzel, und **jede `animation-timeline: scroll(root)` meldet eine Reichweite von null**. Der Fortschrittsbalken war vorhanden, korrekt angebunden und hat sich nie bewegt. Die Regel steht jetzt auf `<html>`.

## Designdurchgang vom 2. September 2026 (Abend)

Auf Wunsch des Kunden:

- **Entfernt: zehn Standortseiten und die Über-uns-Seite.** Die Routen, Inhalte, Footer- und Seitenleisten-Links sind weg. **Das kostet rund 8.000 Wörter lokalen Suchtext** (Abschnitt 6 verlangte sie ausdrücklich) und die Seite, die Abschnitt 7.4 „den grössten Vertrauensverlust" nennt. Die Karte samt Gemeindeliste bleibt auf der Startseite, die Namen sind dort jetzt nur noch Beschriftung ohne Verlinkung. Rückgängig zu machen ist es: die Inhalte liegen in der Versionsgeschichte, das Routen-Register nimmt sie mit je einem Eintrag wieder auf.
- **Referenzen als horizontale Strecke.** Alle 22 Fotos, Scroll-Snap, nummerierte Bildunterschriften, kein Fliesstext. Der letzte Rahmen ist am rechten Rand angeschnitten — das ist es, was dem Auge sagt, dass rechts weitergeht.
- **Fusszeile aufgeräumt.** Vorher vier Spalten über die volle Breite, eine davon zehn Gemeinden. Jetzt Kontakt links, zwei schmale Linkspalten rechts, alles innerhalb des Lesemasses, und die Pflichtangaben in einer Zeile statt als Block.
- **Vier Flächentöne statt zwei.** `sunken` ist zum Navy des Logos hin gekühlt, `tint` ist eine blasse Waschung des Flaggenblaus. Die hellen Abschnitte wechseln jetzt zwischen warm und kühl, statt eine Note zu wiederholen.
- **Textur im Hintergrund.** Ein Haarlinienraster im Neigungswinkel der Logo-Dächer, bei zwei Prozent Deckkraft. Kein dekorativer Verlauf — auf normale Betrachtungsdistanz sieht man keine Linien, nur den Unterschied zwischen Papier und Flächenfüllung.
- **Das Dachprofil als Motiv.** Ein Zickzack im selben Winkel wie die Marke, als Trennung dort, wo die Seite das Register wechselt.
- **Fotos als Platten.** Haarlinie, gestaffelter Schatten und eine kurze rote Akzentkante unten links, die beim Überfahren auf das Doppelte wächst. Hero und Über-uns sind überlappend gesetzt statt nebeneinander.
- **Unterstrich-Animation** auf allen Navigations-, Fusszeilen- und Titellinks: wächst von links, `transform` statt Breite, auf Touchgeräten abgeschaltet.
- **Abschnittsnummern** vor jeder Rubrik, mit einer kurzen Linie — gibt der Seite ein Rückgrat.

## Designdurchgang vom 3. September 2026

Auf Wunsch des Kunden, in dieser Reihenfolge abgearbeitet:

- **Der Hintergrund, endlich sichtbar.** Er war zweimal gebaut und zweimal unsichtbar, und der
  Grund war nicht die Waschung, sondern was darüberlag: *jeder* Abschnitt malte eine deckende
  Fläche. Die Farbe existierte nur im DOM. Jetzt liegen zwei feste Ebenen hinter allem
  (`body::before` / `::after`, `position: fixed`), die beim Scrollen gegenläufig wandern —
  gesteuert von der Scrollposition selbst, ohne JavaScript. Die Abschnittstöne sind
  durchlässig, `default` malt gar nichts mehr. Oben das Flaggenblau des Logos, unten der warme
  Ziegelton: die Seite geht von Himmel zu Dach, während man sie liest.
- **Die Preisrubrik ist ersatzlos raus** — sechs Seiten × drei Sprachen. Ohne Preisliste konnte
  sie nur „kommt darauf an" sagen, ausführlich, und schob die FAQ unter die Falz. „Wie wir
  vorgehen" ist auf vier Absätze gekürzt. Gesamtinhalt −23 %, jede Seite hält das
  600-Wörter-Minimum aus Abschnitt 7.2 weiterhin (750–900 je Sprache).
- **Die Leistungsseiten lesen sich nicht mehr als Wand.** Methode als nummerierte Folge an einer
  Linie, Materialien als Kartenraster, Symptome zweispaltig. Gleiche Wörter, halbe gefühlte
  Länge. Statt des grauen Platzhalters steht ein echtes Foto je Leistung im Kopf.
- **Balkenmenü als Verzeichnis mit Aufklapper.** Oberste Ebene: Leistungen, Ablauf, Kontakt.
  „Leistungen" klappt die sechs Leistungen an Ort und Stelle auf — ein natives `<details>`,
  damit Tastatur und Screenreader ohne eigene ARIA-Verdrahtung stimmen. Der Auslöser trägt das
  Wort „Menü" neben zwei Balken, die sich beim Öffnen zum Kreuz drehen.
- **Kopfleiste als Schiene.** Drei Ziele auf einer 1440er Leiste lasen sich als drei versprengte
  Wörter. Auf einer getönten Schiene lesen sie sich als Navigation, und jedes Ziel hat eine Form,
  mit der es auf den Zeiger antworten kann. Beim Scrollen rückt die Leiste über die ersten 160
  Pixel zusammen — stetig, nicht als Sprung an einer Schwelle.
- **Die Karte neu gezeichnet.** Der gestrichelte Radiuskreis ist weg; er war das einzige Element
  der Seite, das gekauft statt gemacht aussah. Stattdessen läuft je eine Haarlinie vom Betrieb zu
  jeder Gemeinde — das ist die eigentliche Aussage, aus denselben Koordinaten gezeichnet. Karte,
  Punkte und Markierung sind deutlich vergrössert, die Ortsnamen ziehen als Laufzeile durch.
- **Die Schnittzeichnung kreuzungsfrei.** Alle acht Beschriftungen liegen gleichzeitig an. Die
  Ankerpunkte laufen jetzt die Schräge *hinunter*, während die Beschriftungen den Rand
  hinunterlaufen — in Stapelreihenfolge verankert kreuzte jede der vier oberen jede andere.
  Geprüft mit einem Segmentschnitt-Test über alle 28 Paare, im laufenden DOM.
- **Bewegung, die auch ein Handy sieht.** Hover-Effekte sind auf einem Touchscreen unsichtbar,
  also die Hälfte der Besucher. Fotos, Karten und Linien werden zusätzlich über `view()`
  angetrieben — die eigene Passage durchs Sichtfeld. Die Staffelung kommt aus der Geometrie, nicht
  aus einem Index: eine Dreierreihe kommt als Reihe an, eine Spalte einzeln. Elf verschiedene
  scrollgetriebene Effekte, zusammen 24 laufende Animationen, null zusätzliches JavaScript.
- **Handy-Durchgang.** Leistungen, Ablauf, Kennzahlen, Materialien und die Fusszeilenspalten
  stehen nebeneinander statt untereinander. Abschnittsabstände auf dem Telefon von 72 px auf
  52 px, ohne den Desktop anzufassen. Startseite 13,9 → 12,6 Bildschirme, Leistungsseite 9.
  Kein waagerechter Überlauf, kein Tippziel unter 24 px.
- **Kontaktseite** öffnet auf einem Luftbild statt auf einer nackten Überschrift.

### Dabei gefunden

- **Ein Wachhund gegen die weisse Seite.** `IntersectionObserver` feuert in einem
  Hintergrund-Tab gar nicht. Wer die Seite in einem solchen öffnet und später hinschaut, sah
  potenziell einen Bildschirm leeres Papier. Jetzt zeigt ein Timer nach einer Sekunde alles, was
  im Sichtfeld steht — Beobachter hin oder her.
- **Negatives `inset` verschiebt den Bezugspunkt.** Der erste Anlauf der Hintergrundwaschung
  hatte `inset: -20vmax`; die Prozentangaben der Verläufe messen dann von der vergrösserten
  Box, und die Waschung sass hundert Pixel oberhalb des Bildschirms. Sichtbar nur, wenn man
  nachrechnet.
- **`.area-run li` schlägt `.area-run__origin`.** Nachfahrenselektor gegen einzelne Klasse: 0,1,1
  gegen 0,1,0. Holzem blieb navy statt rot, obwohl die Regel dastand.
- **`inline-flex` in einem Block-`<li>`** wächst nicht mit: die Zeilenbox bleibt textgross und die
  Folgezeile schneidet den Link ab.

## Entscheidungen, die vom Briefing abweichen

**GitHub Pages statt Vercel/Cloudflare** (Wunsch des Kunden, 2. September 2026). Statisches
Hosting ohne Node-Laufzeit. Folgen und Kompensation stehen in PRODUCT.md unter
„Hosting-Einschränkung GitHub Pages". Kurz:

- Keine Server Actions → Formular gegen austauschbaren Endpunkt (`NEXT_PUBLIC_INQUIRY_ENDPOINT`).
- Keine Bildoptimierung zur Laufzeit → AVIF/WebP/JPG zur Build-Zeit, `<picture>` statt `next/image`.
- Keine Middleware → Spracherkennung in `public/index.html`, Cookie `NEXT_LOCALE`.
- **Keine 301-Weiterleitungen.** Die Liste aus 13.3 liegt in `src/content/redirects.ts` und wird
  auf einem Host mit Redirect-Ebene mit einem Env-Wechsel scharf. Auf GitHub Pages bleibt nur eine
  clientseitige Weiterleitung, die SEO-seitig deutlich schwächer ist. **Vor dem Umzug auf die
  echte Domain zu entscheiden.**

Umschalten auf einen Server-Host: `NEXT_PUBLIC_DEPLOY_TARGET=server`.

**Kontaktseite mit eigener Route.** `/kontakt` und `/contact` liegen als echte Ordner unter
`src/app/[locale]/`, nicht im Catch-all. Next teilt JavaScript pro Route auf — im Catch-all
hätte jede Leistungsseite die 33 kB des Formulars mitgeladen, ohne es je zu rendern.

**Formular auf der Startseite verzögert geladen.** React und Next belegen allein 103 kB des
120-kB-Budgets aus Abschnitt 4. Das Formular ist die elfte Sektion und wird geladen, wenn es in
Sichtweite kommt oder ein Tastaturnutzer es fokussiert. Ohne das läge die Startseite bei 152 kB.

**TypeScript 5 statt 7.** TS 7 bricht den Config-Loader von Next 15.5
(`TypeError: Cannot read properties of undefined (reading 'fileExists')`).

**Kein comp-first.** In der Session stand kein Bildgenerierungs-Tool zur Verfügung; die
Referenzgrafiken aus 1.2 sind dort ohnehin als optional markiert.

## Fallen, die schon zugeschnappt sind

Alle drei waren stille Fehler — der Build lief grün, die Seite sah plausibel aus.

1. **`--spacing-*` im `@theme`-Block.** Benannte Schlüssel in diesem Namespace schalten Tailwind v4s
   gesamte numerische Spacing-Skala ab: `p-4`, `h-16`, `mt-12` liefern 0 px. Deshalb heissen die
   Rhythmus-Variablen `--section-y`, `--section-y-tight` und `--gutter-x` und stehen in `:root`,
   nicht im Theme.
2. **`@theme` statt `@theme static`.** Tailwind v4 gibt nur Theme-Variablen aus, die eine
   Utility-Klasse referenziert. Tokens, die nur über `var()` gelesen werden — Inline-Styles,
   SVG-Füllungen —, fehlten ersatzlos und rendern transparent.
3. **Server Actions im statischen Export.** Next bricht den Build ab, sobald ein `'use server'`
   Modul im Graph liegt — auch hinter einer Laufzeitprüfung. Die beiden Transportwege des
   Formulars werden deshalb über einen Bundler-Alias in `next.config.ts` getrennt, statt den
   Server-Action-Pfad zu löschen.
4. **Übersetzte Slugs brauchen Middleware.** next-intl schreibt `/fr/prestations/couverture` per
   Middleware um, die es im statischen Export nicht gibt. Alle Routen ausser Startseite,
   Kontakt und Styleguide laufen deshalb über ein eigenes Register (`src/routes/registry.ts`)
   mit Catch-all. `getPathname` bleibt die einzige Quelle für Pfade — ein Link kann nicht auf
   etwas zeigen, das der Build nicht erzeugt hat.
5. **Deckende Abschnitte fressen den Seitenhintergrund.** Eine Waschung auf `body` existiert nur
   dort, wo kein Kind sie übermalt. Mit `bg-surface` auf jedem Abschnitt war sie vollständig
   verdeckt — im DOM vorhanden, auf dem Schirm nie. Flächentöne sind deshalb durchlässig, und
   `default` setzt gar keine Fläche.
6. **Konfliktierende Display-Utilities.** `className="hidden lg:inline-flex"` an einer Komponente,
   deren Basisklassen `inline-flex` setzen, entscheidet nichts: gleiche Spezifität, es gewinnt die
   Reihenfolge im erzeugten Stylesheet. Sichtbarkeit über ein umschliessendes Element steuern.

## Regeln, die nicht verhandelbar sind

- **Nichts erfinden.** Gründungsjahr, RCS-Nummer, Kundenstimmen, Referenzprojekte: fehlt der Wert,
  steht `null` in `config/client.config.ts` und `<Pending>` in der Seite. `npm run check:pending`
  listet alles auf. Aktuell 20 Markierungen pro Seite.
- **Keine Stock-Fotos, auch keine generierten.** Fehlende Bilder sind `ImageSlot`-Platzhalter mit
  festen Massen und einem Briefing für die Aufnahme.
- **Der Signalton gehört dem Notdienst.** Nirgendwo sonst.
- **Bewertungssektion existiert nicht**, solange keine echten Google-Rezensionen mit Freigabe
  vorliegen. Ihr Platz auf der Startseite ist im Code kommentiert.
- **Keine Sprache geht unfertig live.** `npm run check:i18n` prüft Parität.

## Was der Kunde liefern muss

Zwingend vor Launch, aus Abschnitt 19: Rechtsform, RCS-Nummer, Autorisation d'établissement,
MwSt-Nummer, inhaltlich Verantwortlicher. Recherche am 2. September 2026 blieb ergebnislos —
öffentlich ist keine dieser Angaben auffindbar.

Für den Inhalt: Logo als Vektor, Projektfotos mit Vorher/Nachher, Team- und Fahrzeugfotos,
Gründungsjahr, Teamgrösse, Projektanzahl, Öffnungszeiten, Versicherung, Qualifikationen,
Kundenstimmen mit Freigabe, Zugang zum Google-Business-Profil, Liste der indexierten URLs.

Technisch: `info@daach-hoffmann.lu` einrichten (aktuell steht eine Gmail-Adresse auf der
Bestandsseite), Domainzugang klären — Domain und Hosting laufen möglicherweise auf NET 7.


## Zahlen zum Stand

- 32 statische Seiten, drei Sprachen
- Leistungsseiten 900–1.400 Wörter je Sprache
- JavaScript Startseite: **120,3 kB gzip — 0,3 kB über dem Budget aus Abschnitt 4.** React und Next belegen davon allein 103 kB; der Eigenanteil beträgt 17,3 kB für Header, Mobilmenü mit Fokusfalle, Sprachumschalter mit Routenerhalt, Scroll-Reveals und den verzögerten Formularlader. Karte und Dachquerschnitt wurden bewusst ohne JavaScript gebaut, um das Budget zu schützen. Die Prüfung bleibt absichtlich rot, statt die Zahl anzupassen.
- JSON-LD: RoofingContractor, Service, FAQPage, BreadcrumbList, ImageObject
- 0 Strukturprobleme: genau eine H1 je Seite, lückenlose Hierarchie, canonical und x-default überall
- 22 Fotos, 114 Derivate in AVIF/WebP/JPG

## Was der Kunde noch bestätigen muss

Zusätzlich zu Abschnitt 19: die **Reaktionszeit-Zusage**. Die Seite verspricht derzeit eine
Antwort innerhalb eines Werktags (`client.responseTime`, `confirmedByClient: false`). Das ist die
einzige Aussage auf der Seite, die keine Tatsache über die Vergangenheit ist, sondern ein
Versprechen über die Zukunft — es muss vom Betrieb gedeckt sein, bevor es live geht.

Die Datenschutzerklärung beschreibt die tatsächliche Funktionsweise der Seite, ersetzt aber keine
anwaltliche Prüfung. Vor dem Launch gegenlesen lassen.
