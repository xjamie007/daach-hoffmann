import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Pending } from '@/components/Pending';
import { Wordmark } from '@/components/brand/Wordmark';
import { FormShowcase } from './FormShowcase';
import {
  PhoneIcon,
  WhatsAppIcon,
  FormIcon,
  MenuIcon,
  CloseIcon,
  ArrowRightIcon,
  CheckIcon,
  MapPinIcon,
  MailIcon,
} from '@/components/ui/icons';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Internal reference page. It must never enter the index or the sitemap. */
export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
};

const SWATCHES = [
  { group: 'Schiefer — Basis', tokens: ['navy-950', 'navy-900', 'navy-800', 'navy-700', 'navy-600', 'navy-500', 'navy-400', 'navy-300', 'navy-200', 'navy-100', 'navy-50'] },
  { group: 'Ton — Flächen', tokens: ['clay-50', 'clay-100', 'clay-200', 'clay-300'] },
  { group: 'Kupfer — Akzent', tokens: ['accent-300', 'accent-400', 'accent-500', 'accent-600', 'accent-700', 'accent-800'] },
  { group: 'Signal — nur Notdienst', tokens: ['red-400', 'red-500', 'red-600', 'red-700'] },
  { group: 'Moos — nur Bestätigung', tokens: ['moss-100', 'moss-500', 'moss-600'] },
];

const TYPE_SCALE = [
  { token: 'text-display', label: 'Display', sample: 'Dach undicht' },
  { token: 'text-h1', label: 'H1', sample: 'Dachdecker aus Holzem' },
  { token: 'text-h2', label: 'H2', sample: 'Dacheindeckung & Dachstuhl' },
  { token: 'text-h3', label: 'H3', sample: 'Wann Sie das brauchen' },
  { token: 'text-h4', label: 'H4', sample: 'Verwendete Materialien' },
  { token: 'text-lead', label: 'Lead', sample: 'Kostenvoranschlag und Anfahrt sind kostenlos.' },
  { token: 'text-body', label: 'Fliesstext', sample: 'Ziegeldach, ca. 120 m², Baujahr 1978, Wasserfleck an der Decke.' },
  { token: 'text-small', label: 'Klein', sample: 'Hinweise unter Formularfeldern und Bildunterschriften.' },
  { token: 'text-micro', label: 'Micro (Eyebrow)', sample: 'Notdienst 7 Tage die Woche' },
];

const ICONS = [
  { name: 'PhoneIcon', Icon: PhoneIcon },
  { name: 'WhatsAppIcon', Icon: WhatsAppIcon },
  { name: 'FormIcon', Icon: FormIcon },
  { name: 'MailIcon', Icon: MailIcon },
  { name: 'MapPinIcon', Icon: MapPinIcon },
  { name: 'MenuIcon', Icon: MenuIcon },
  { name: 'CloseIcon', Icon: CloseIcon },
  { name: 'ArrowRightIcon', Icon: ArrowRightIcon },
  { name: 'CheckIcon', Icon: CheckIcon },
];

export default async function StyleguidePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Section tight>
        <Container>
          <p className="font-heading text-micro font-bold text-accent-text uppercase">Intern · nicht indexiert</p>
          <h1 className="mt-3 font-heading text-h1 font-bold">Styleguide</h1>
          <p className="mt-5 max-w-[60ch] text-lead text-ink-muted">
            Jede Komponente in jedem Zustand. Diese Seite ist das Abnahmekriterium für Phase 1 und
            bleibt danach die Referenz: was hier nicht steht, wird nicht gebaut.
          </p>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section tone="sunken" tight labelledBy="sg-colour">
        <Container>
          <SectionHeader
            id="sg-colour"
            eyebrow="Farbe"
            title="Palette"
            lead={
              <>
                Abgeleitet vom Dach selbst: Schiefer, Ton, Kupfer. Kein reines Schwarz, kein reines
                Grau — jeder Neutralton ist getönt. Alle gerenderten Paarungen werden von{' '}
                <code className="rounded-xs bg-navy-900/8 px-1.5 py-0.5 text-[0.9em]">npm run check:contrast</code>{' '}
                gegen WCAG 2.2 AA geprüft.
              </>
            }
          />
          <div className="mt-12 space-y-10">
            {SWATCHES.map((row) => (
              <div key={row.group}>
                <h3 className="font-heading text-micro font-bold text-ink-muted uppercase">{row.group}</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {row.tokens.map((token) => (
                    <div key={token} className="w-28">
                      <div
                        className="h-16 rounded-sm border border-border"
                        style={{ backgroundColor: `var(--color-${token})` }}
                      />
                      <p className="mt-2 font-mono text-[0.75rem] text-ink-muted">{token}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-[62ch] rounded-sm border-l-2 border-red-600 bg-red-500/6 py-3 pl-4 text-small text-ink">
            <strong className="font-semibold">Signal gehört dem Notdienst.</strong> Wird der Ton
            irgendwo sonst eingesetzt, verliert er genau die Bedeutung, für die er reserviert ist.
          </p>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section tight labelledBy="sg-type">
        <Container>
          <SectionHeader
            id="sg-type"
            eyebrow="Typografie"
            title="Skala"
            lead="Bricolage Grotesque für Überschriften, Public Sans für Fliesstext. Beide selbst gehostet, latin-Subset, kein CDN."
          />
          <div className="mt-12 divide-y divide-border">
            {TYPE_SCALE.map((entry) => (
              <div key={entry.token} className="grid gap-3 py-6 md:grid-cols-[10rem_1fr] md:items-baseline">
                <p className="font-mono text-[0.75rem] text-ink-muted">{entry.token}</p>
                <p
                  className={[
                    entry.token,
                    entry.token.startsWith('text-h') || entry.token === 'text-display'
                      ? 'font-heading font-bold'
                      : '',
                    entry.token === 'text-micro' ? 'font-heading font-bold uppercase' : '',
                  ].join(' ')}
                >
                  {entry.sample}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section tone="sunken" tight labelledBy="sg-buttons">
        <Container>
          <SectionHeader
            id="sg-buttons"
            eyebrow="Aktionen"
            title="Buttons"
            lead="Jede Variante hält 48 px Höhe — die Seite wird draussen auf dem Handy gelesen. Bewegung nur beim Drücken, nie beim Hover."
          />

          <div className="mt-12 space-y-10">
            <ButtonRow title="primary — Hauptaktion, eine pro Bildschirm">
              <Button size="sm">Anfrage stellen</Button>
              <Button size="md">Anfrage stellen</Button>
              <Button size="lg">Kostenlose Anfrage stellen</Button>
              <Button disabled>Deaktiviert</Button>
            </ButtonRow>

            <ButtonRow title="secondary — gleichrangige Alternative, meist „anrufen“">
              <Button variant="secondary" size="sm" icon={<PhoneIcon className="size-4" />}>
                Anrufen
              </Button>
              <Button variant="secondary" size="md" icon={<PhoneIcon className="size-4" />}>
                Jetzt anrufen
              </Button>
              <Button variant="secondary" size="lg">
                Jetzt anrufen
              </Button>
              <Button variant="secondary" disabled>
                Deaktiviert
              </Button>
            </ButtonRow>

            <ButtonRow title="signal — ausschliesslich Notdienst">
              <Button variant="signal" size="sm" icon={<PhoneIcon className="size-4" />}>
                Notdienst
              </Button>
              <Button variant="signal" size="md" icon={<PhoneIcon className="size-4" />}>
                Sofort anrufen
              </Button>
              <Button variant="signal" size="lg">
                Sturmschaden melden
              </Button>
            </ButtonRow>

            <ButtonRow title="ghost — Tertiär, in Listen und Karten">
              <Button variant="ghost" size="sm">
                Mehr erfahren
              </Button>
              <Button variant="ghost" size="md" icon={<ArrowRightIcon className="size-4" />}>
                Alle Referenzen
              </Button>
            </ButtonRow>
          </div>

          <div className="mt-10 rounded-sm bg-surface-inverse p-8">
            <h3 className="font-heading text-micro font-bold text-accent-300 uppercase">
              inverse — auf dunklen Sektionen
            </h3>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button variant="inverse" size="md">
                Anfrage stellen
              </Button>
              <Button variant="signal" size="md" icon={<PhoneIcon className="size-4" />}>
                Notdienst 7/7
              </Button>
              <Button variant="inverse" size="sm">
                Klein
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section tight labelledBy="sg-forms">
        <Container>
          <SectionHeader
            id="sg-forms"
            eyebrow="Formular"
            title="Eingabefelder"
            lead="Label immer sichtbar, nie als Platzhalter. Fehler über aria-describedby verknüpft und in ganzen Sätzen formuliert."
          />
          <div className="mt-12">
            <FormShowcase />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section tone="sunken" tight labelledBy="sg-misc">
        <Container>
          <SectionHeader id="sg-misc" eyebrow="Weitere" title="Marke, Platzhalter, Icons" />

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-heading text-micro font-bold text-ink-muted uppercase">Wortmarke</h3>
              <div className="mt-4 flex flex-col gap-4">
                <Wordmark className="h-10" />
                <Wordmark className="h-16" />
                <div className="rounded-sm bg-surface-inverse p-5">
                  <Wordmark tone="inverse" className="h-12" />
                </div>
              </div>
              <p className="mt-4 max-w-[46ch] text-small text-ink-muted">
                Übergangslösung. Das bestehende Logo ist eine JPG mit weissem Kasten und lässt sich
                auf farbigem Grund nicht platzieren. Ersetzen ist eine Ein-Datei-Änderung.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-micro font-bold text-ink-muted uppercase">
                Fehlende Angabe
              </h3>
              <p className="mt-4 max-w-[46ch] text-body">
                Handelsregister: <Pending id="styleguide.demo" what="RCS" />. Absichtlich auffällig —
                ein Platzhalter, den man beim Durchklicken übersieht, geht irgendwann live.
              </p>
              <p className="mt-4 text-small text-ink-muted">
                <code className="rounded-xs bg-navy-900/8 px-1.5 py-0.5">npm run check:pending</code>{' '}
                listet alle auf, <code className="rounded-xs bg-navy-900/8 px-1.5 py-0.5">--strict</code>{' '}
                lässt den Release daran scheitern.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <h3 className="font-heading text-micro font-bold text-ink-muted uppercase">Icons</h3>
            <p className="mt-3 max-w-[56ch] text-small text-ink-muted">
              Jedes Icon beschriftet eine Aktion. Keine dekorativen Icons über Überschriften — das
              ist der auffälligste AI-Tell überhaupt und wird hier gar nicht erst ermöglicht.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {ICONS.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="flex w-32 flex-col items-center gap-2.5 rounded-sm border border-border bg-surface-raised px-3 py-4"
                >
                  <Icon className="size-6 text-ink" />
                  <span className="font-mono text-[0.7rem] text-ink-muted">{name.replace('Icon', '')}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ButtonRow({ title, children }: { readonly title: string; readonly children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-heading text-micro font-bold text-ink-muted uppercase">{title}</h3>
      <div className="mt-4 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
