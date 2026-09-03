# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vom Briefing (Abschnitt 10) vorgegeben, nicht delegiert: Next.js 15 mit App Router und React Server Components als Standard, TypeScript strict ohne `any`, Tailwind CSS v4 mit Design-Tokens als CSS-Variablen, next-intl für DE/FR/EN, Zod als geteiltes Validierungsschema zwischen Client und Server, next/image, Framer Motion sparsam und nur lokal importiert. Supabase (Postgres, Storage, RLS) für Anfragen, Resend für transaktionale Mails. Kein UI-Framework wie MUI oder Chakra. Keine neue Abhängigkeit ohne vorherigen `pick-ui-library`-Durchlauf.

Hosting: **GitHub Pages**, vom Nutzer am 2. September 2026 gewählt, abweichend vom Briefing-Vorschlag (Vercel oder Cloudflare Pages). GitHub Pages ist reines Statik-Hosting ohne Node-Laufzeit. Konsequenz: `output: 'export'`, kein Server-Action-Endpunkt, keine next-intl-Middleware, keine serverseitige Bildoptimierung, keine 301-Weiterleitungen auf HTTP-Ebene. Die Architektur wird so gebaut, dass ein Wechsel auf Vercel ein Konfigurationswechsel bleibt und kein Neuschreiben. Siehe `## Capabilities and Constraints`.

## Users

Drei Besuchertypen, aus Abschnitt 5.1 des Briefings, in absteigender Dringlichkeit:

**A — Der Notfall.** Sturmschaden in der Nacht, Ziegel im Garten, Wasser tropft durch die Decke. Am Handy, ungeduldig, entscheidet in unter 30 Sekunden. Sucht genau eine Sache: eine Telefonnummer, die jetzt jemanden erreicht. Braucht die Nummer über der Falz, einen sichtbaren Notfall-Einstieg, WhatsApp und die klare Aussage „wir kommen".

**B — Der Planer.** Das Dach ist vierzig Jahre alt, die Sanierung ist für nächstes Jahr eingeplant, drei Betriebe stehen zum Vergleich. Am Laptop, abends, liest gründlich, entscheidet über Wochen. Braucht Referenzprojekte mit echten Details, eine Erklärung des Ablaufs, Materialkunde, das MwSt-Thema, Gesichter und Bewertungen.

**C — Der Preisprüfer.** Hat bereits ein Angebot eines Mitbewerbers und sucht die Einordnung. Will wissen, ob die Grössenordnung plausibel ist. Braucht Transparenz über Ablauf und Kostenfaktoren, das 3-%-MwSt-Thema und das Signal, dass der Vor-Ort-Termin kostenlos ist.

Alle drei sind überwiegend private Hauseigentümer im Süden und Westen Luxemburgs. Ein erheblicher Teil sucht auf Deutsch. Die Bestandsseite ist ausschliesslich französisch und erreicht diese Anfragen nicht.

## Product Purpose

Aus einem Besucher wird eine qualifizierte Anfrage — idealerweise mit Fotos vom Dach.

Die Qualifizierung ist der eigentliche Zweck, nicht die Anfragemenge. Eine Nachricht „Guten Tag, ich hätte gerne ein Angebot" ist für den Betrieb fast wertlos: sie kostet einen Rückruf, einen Terminversuch und eine Anfahrt, bevor überhaupt feststeht, ob es passt. Eine Nachricht „Ziegeldach, ca. 120 m², Baujahr 1978, Wasserfleck an der Decke im Obergeschoss, drei Fotos anbei, Mamer" ist ein Termin. Jede Entscheidung im Formular, in der Sektionsreihenfolge und in der Textführung dient diesem Unterschied.

Erfolg ist messbar an: maximal zwei Klicks bis zur Anfrage, Anruf auf Mobilgeräten jederzeit ohne Scrollen erreichbar, Notfall-Pfad in unter zehn Sekunden auffindbar, Lighthouse Mobile ≥ 95 Performance und 100 in A11y/SEO, LCP < 2.0 s, CLS < 0.05, INP < 200 ms, JavaScript auf der Startseite < 120 KB gzip.

Ausdrückliche Nicht-Ziele für v1: kein Online-Shop, kein Kundenportal, kein Buchungssystem mit Terminkalender.

## Positioning

Der Betrieb verkauft Erreichbarkeit und Verbindlichkeit, nicht Handwerk als Ware. Vier Zusagen tragen das und sind alle auf der Bestandsseite vorhanden, aber als Badges verschenkt statt erklärt: kostenloser Kostenvoranschlag, kostenlose Anfahrt im ganzen Grossherzogtum, Notdienst 7 Tage die Woche, und der reduzierte Mehrwertsteuersatz von 3 % bei Renovierungsarbeiten am Wohnraum.

Das MwSt-Thema ist die stärkste Einzelposition und aktuell die am schlechtesten genutzte. Bei einer Dachsanierung im fünfstelligen Bereich ist der Unterschied zwischen 17 % und 3 % ein vierstelliger Betrag. Der Satz gilt für die Renovierung von Wohnraum zu Hauptwohnzwecken, die Dachsanierung ist ausdrücklich erfasst, die Begünstigung ist auf 50.000 € Mehrwertsteuer pro Wohnung gedeckelt, und die Genehmigung der AED muss **vor Arbeitsbeginn** vorliegen. Genau dieser letzte Punkt macht daraus ein Verkaufsargument statt einer Fussnote: wer den Antrag zu spät stellt, verliert den Vorteil, und ein Betrieb, der das anspricht und begleitet, hat den Auftrag halb gewonnen. Das rechtfertigt eine eigene Seite mit eigenständigem Suchtraffic.

Die zweite Position ist sprachlich und derzeit unbesetzt: Der Firmenname ist Lëtzebuergesch — „Daach" heisst Dach — und die Website ist es an keiner Stelle. Ein deutschsprachiger Auftritt für deutschsprachige Hauseigentümer im Kanton Capellen ist im lokalen Wettbewerb ein echter Vorsprung, kein Zusatz.

## Operating Context

Sitz in 28, Route de Capellen, L-8279 Holzem, Kanton Capellen. Einsatzgebiet nach eigener Aussage das ganze Grossherzogtum, mit Schwerpunkt Süden und Westen. Telefon +352 661 903 200. E-Mail derzeit `daachhoffmann@gmail.com`, obwohl die Domain dem Betrieb gehört.

Leistungen laut Bestandsseite: Couverture (Dacheindeckung, Neubau und Sanierung), Charpente (Dachstuhl), Zinguerie/Ferblanterie (Spenglerei), Nettoyage & Peinture de Toiture (Dachreinigung und -beschichtung), Cheminée de Toit (Kaminkopf), Dépannage 7j/7 (Notdienst), sowie weitere Arbeiten, unter anderem Terrassenreinigung.

Die Entscheidung fällt in einer von zwei Situationen: unter Zeitdruck nach einem Schaden, oder im ruhigen Vergleich mehrerer Angebote über Wochen. Dazwischen gibt es fast nichts. Beide Situationen beginnen auf dem Mobilgerät.

Die Bestandsseite wurde von der französischen Agentur NET 7 (net-7.com) gebaut; der Copyright-Vermerk im Footer gehört der Agentur, nicht dem Betrieb. Sie trägt Spuren eines wiederverwendeten Templates: die URLs `couverture_hobscheid_luxembourg.html` und `cheminee_toiture_hobscheid.html` verweisen auf Hobscheid, der Betrieb sitzt in Holzem.

Wirtschaftlicher Rahmen: Als Handwerksbetrieb mit Autorisation d'établissement ist der Betrieb mit hoher Wahrscheinlichkeit für SME Packages Digital förderfähig, bis 70 % Rückerstattung. Das Projekt wird entsprechend dimensioniert.

## Capabilities and Constraints

**Inhalt liegt im Repository, nicht in der Datenbank.** Leistungen, Referenzprojekte, Standortseiten und Übersetzungen sind typisierte Content-Dateien. Nur Anfragen gehen nach Supabase. Ein Referenzprojekt ist ein Datensatz mit Ort, Jahr, Leistung, Dachtyp, Fläche, Dauer, Herausforderung, Lösung, Materialien und phasenmarkierten Bildern — keine Bilderreihe.

**Drei Sprachen, übersetzte Slugs.** `/de/leistungen/dacheindeckung`, `/fr/prestations/couverture`, `/en/services/roofing`. Sprachpräfix immer im Pfad, auch für Deutsch als Standardsprache. Struktur so angelegt, dass Lëtzebuergesch später ohne Umbau ergänzt werden kann. Keine maschinellen Übersetzungen live: eine Sprache ohne fertigen Text wird nicht veröffentlicht und nicht in die Sitemap aufgenommen. Der Nutzer verfasst DE, FR und EN selbst als eigenständige Texte; das FR sollte vor Launch von einem Muttersprachler gegengelesen werden, weil es die Sprache der Bestandskunden ist.

**Deutsche Komposita sprengen Layouts, die auf französischen Text hin gebaut wurden.** „Dachrinnenreinigung" gegen „gouttières". Jede Komponente muss die längste der drei Sprachen aushalten.

**Datensparsamkeit ist Architekturvorgabe, nicht Nachrüstung.** Schriften selbst gehostet über `next/font/local`, kein Google-Fonts-CDN. Keine externen Skripte ohne Einwilligung. Google Maps nicht direkt eingebunden, sondern statische Karte mit Klick-zum-Laden oder eine einwilligungsfreie OpenStreetMap-Lösung. Kein Google reCAPTCHA — stattdessen Honeypot plus Zeitmessung. IP-Adressen nur gehasht. Ziel ist der Zustand, in dem gar kein Cookie-Banner nötig ist.

**Hosting-Einschränkung GitHub Pages.** Statisches Hosting ohne Node-Laufzeit. Davon betroffen und entsprechend zu lösen:
- Server Actions stehen nicht zur Verfügung. Das Anfrageformular aus Abschnitt 12 wird gegen einen austauschbaren Endpunkt gebaut (`NEXT_PUBLIC_INQUIRY_ENDPOINT`), sodass dieselbe Zod-validierte Nutzlast wahlweise an eine Supabase Edge Function oder später an eine Server Action geht. Der vollständige Server-Action-Pfad wird trotzdem geschrieben und bleibt im Repository.
- `next/image` verliert die Laufzeitoptimierung. Bilder werden zur Build-Zeit in AVIF und WebP mit den benötigten Breiten erzeugt und über einen statischen Loader mit explizitem `sizes` ausgeliefert. Explizite Breite und Höhe bleiben Pflicht.
- Keine Middleware, also keine `Accept-Language`-Erkennung serverseitig. Die Spracherkennung beim ersten Besuch läuft clientseitig mit anschliessendem Cookie, der sichtbare manuelle Umschalter bleibt in jedem Fall die Hauptbedienung.
- Keine 301-Weiterleitungen. Die Liste aus Abschnitt 13.3 wird als Datei im Repository gepflegt und beim Umzug auf einen Host mit Redirect-Fähigkeit scharfgeschaltet; auf GitHub Pages bleibt ersatzweise nur eine clientseitige Weiterleitungsseite, die für SEO deutlich schwächer ist. **Offen und vom Nutzer zu entscheiden, bevor die Seite unter der echten Domain live geht.**

**Rechtlich zwingend, derzeit nicht erfüllbar.** Das Gesetz vom 14. August 2000 über den elektronischen Geschäftsverkehr verlangt in den Mentions légales unter anderem die RCS-Nummer, die Nummer der Autorisation d'établissement und die MwSt-Identifikationsnummer. Keine dieser Angaben ist öffentlich auffindbar oder liegt vor. Bis der Betrieb sie liefert, steht dort ein sichtbar markierter Platzhalter — keine plausible Erfindung.

## Brand Commitments

Name: **Daach Hoffmann**, geführt als „DAACH HOFFMANN LUXEMBOURG" auf der Bestandsseite. Rechtsform unbestätigt.

„Daach" ist Lëtzebuergesch für Dach. Der Name ist die einzige luxemburgische Geste im gesamten Auftritt und wird als Marke ernst genommen, nicht wegerklärt.

Bestehendes Logo liegt nur als JPG vor (`logo3.jpg`), also mit weissem Kasten statt Transparenz. Es muss als SVG neu gezeichnet oder sauber freigestellt werden. Die Markenfarben werden daraus abgeleitet.

Tonalität: sachlich, konkret, ohne Handwerker-Pathos. Der Betrieb wirkt durch Solidität, nicht durch Effekte — das gilt für Text, Bild und Bewegung gleichermassen.

Verbindliche Verbote, die für diese Branche besonders gelten: kein Inter und keine System-Font-Stacks als Markenschrift, keine dekorativen Verläufe, keine Karten in Karten, kein reines Schwarz oder Grau, keine abgerundeten Icon-Kacheln über Überschriften, keine Bounce- oder Elastic-Easings, kein Parallax, keine Stock-Fotos von lächelnden Handwerkern, kein Hero mit zentriertem Text über einem abgedunkelten Vollbild-Foto.

## Evidence on Hand

**Vorhanden und belegt:**
- Anschrift, Telefonnummer, Leistungsspektrum und Einsatzgebiet aus der Bestandsseite.
- Der französische Bestandstext der Leistungsseiten, brauchbar als Faktengrundlage, nicht als Vorlage — er ist dünn, drei bis vier Absätze pro Unterseite, und der Rest ist auf jeder Seite dupliziert.
- Die Rechtslage zum 3-%-Satz aus öffentlichen Quellen (logement.public.lu, pfi.public.lu): Deckelung bei 50.000 € MwSt pro Wohnung, Wohnfläche bis 400 m², Renovierung ab 20 Jahren Gebäudealter, vorherige Genehmigung der AED zwingend vor Arbeitsbeginn.
- Bilder abgeschlossener Arbeiten auf der Bestandsseite, ausschliesslich als JPG in festen Grössen, ohne Alt-Text, ohne Projektangaben.

**Nachweislich nicht vorhanden — darf nicht erfunden werden:**
- Keine RCS-Nummer, keine Autorisation-d'établissement-Nummer, keine MwSt-Identifikationsnummer, keine bestätigte Rechtsform, kein Name eines inhaltlich Verantwortlichen. Recherche am 2. September 2026 blieb ergebnislos.
- Kein Gründungsjahr. Die Bestandsseite sagt „depuis de nombreuses années" und in einer Überschrift den fehlerhaften Satz „A VOTRE SERVICE AU LUXEMBOURG DEPUIS PLUS NOMBREUSES ANNÉES". Daraus lässt sich keine Zahl ableiten.
- Keine Teamgrösse, keine Projektanzahl, keine Öffnungszeiten, keine Versicherungsangaben, keine Zertifikate oder Mitgliedschaften.
- Keine Kundenstimmen und keine auffindbaren Google-Rezensionen. Solange keine mit Freigabe vorliegen, entfällt die Bewertungssektion ersatzlos statt bestückt zu werden.
- Keine Referenzprojekte mit Ort, Jahr, Dachtyp, Fläche, Material oder Dauer. Kein bestätigtes Vorher/Nachher-Material.
- Kein Logo als Vektor, keine Team- oder Fahrzeugfotos.

Der Nutzer hat am 2. September 2026 festgehalten, dass es sich zunächst um eine Demo handelt und Detailgenauigkeit noch nicht entscheidend ist. Das ändert nichts an der Regel: Lücken werden als Platzhalter sichtbar gemacht, nicht plausibel gefüllt. Ein Platzhalter, den man beim Durchklicken übersieht, geht irgendwann live.

## Product Principles

1. **Die Anfrage qualifiziert sich selbst.** Jedes Formularfeld, jede Sektion und jeder Text existiert, um dem Betrieb vor dem ersten Rückruf zu sagen, worum es geht. Fotos vom Dach sind dabei mehr wert als jedes Textfeld.

2. **Der Notfall hat immer Vorfahrt.** Auf Mobilgeräten ist die Telefonnummer jederzeit ohne Scrollen erreichbar. Diese eine Massnahme wiegt schwerer als jede Designentscheidung; sie darf von nichts verdeckt, verschoben oder wegoptimiert werden.

3. **Nur Belegbares steht auf der Seite.** Zahlen, Jahre, Referenzen und Rechtsangaben kommen vom Betrieb oder aus öffentlichen Quellen. Wo nichts vorliegt, steht ein markierter Platzhalter oder die Sektion entfällt.

4. **Drei Sprachen sind drei gleichwertige Seiten.** Nicht eine Seite mit zwei Übersetzungen. Deutsch ist Standard, Französisch bedient die Bestandskunden, Englisch die internationale Wohnbevölkerung. Eine unfertige Sprache geht nicht live.

5. **Solidität statt Effekt.** Ein Dachdecker wird für Verlässlichkeit bezahlt. Zurückhaltung in Bewegung, Klarheit in der Hierarchie und Ehrlichkeit im Bildmaterial sind hier Markenarbeit, nicht Geschmack.

## Accessibility & Inclusion

WCAG 2.2 AA ist Abnahmekriterium, nicht Zielvorstellung: Lighthouse Accessibility 100.

Kontrast mindestens 4.5:1 für Fliesstext und 3:1 für grosse Schrift. Vollständige Tastaturbedienbarkeit mit sichtbarem eigenem Fokus-Indikator, nicht dem Browser-Standard. Jedes Formularfeld mit zugeordnetem `label`, Fehler über `aria-describedby` verknüpft. Semantische Landmarks, Skip-Link zum Hauptinhalt, genau eine H1 pro Seite mit lückenloser Hierarchie. Alt-Texte in allen drei Sprachen, beschreibend statt keyword-gestopft, dekorative Bilder mit `alt=""`. `prefers-reduced-motion` wird ohne Ausnahme respektiert.

Zwei Anforderungen kommen aus der konkreten Nutzungssituation und nicht aus dem Standard: Die Seite wird häufig **draussen bei Tageslicht auf einem Handy** gelesen, teils von einer Leiter aus oder im Regen — das setzt die Untergrenze für Kontrast und Trefferflächen höher, als die Norm verlangt. Und ein Teil der Zielgruppe sind **ältere Hauseigentümer**, für die Schriftgrösse, Zeilenlänge und die Verfügbarkeit des Telefons als Alternative zum Formular keine Komfortfragen sind, sondern die Bedingung dafür, dass sie überhaupt anfragen.
