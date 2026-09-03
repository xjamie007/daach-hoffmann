'use client';

import { Field, TextInput, TextArea, Select, Checkbox } from '@/components/ui/Field';

/**
 * Form controls in every state the enquiry form can produce.
 *
 * A client island because Field passes ARIA wiring to its control through a
 * render prop, which cannot cross the server boundary. The rest of the
 * styleguide stays on the server.
 */
export function FormShowcase() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Field id="sg-name" label="Name" required>
        {(aria) => <TextInput aria={aria} placeholder="Jean Weber" autoComplete="name" />}
      </Field>

      <Field
        id="sg-mail"
        label="E-Mail"
        hint="Wir antworten innerhalb eines Werktags."
        required
      >
        {(aria) => <TextInput aria={aria} type="email" placeholder="jean.weber@example.lu" />}
      </Field>

      <Field
        id="sg-phone"
        label="Telefon"
        optionalLabel="optional, beschleunigt die Rückmeldung"
      >
        {(aria) => <TextInput aria={aria} type="tel" placeholder="661 903 200" />}
      </Field>

      <Field
        id="sg-mail-error"
        label="E-Mail"
        error="Bitte geben Sie eine E-Mail-Adresse an, unter der wir Sie erreichen."
        required
      >
        {(aria) => <TextInput aria={aria} type="email" defaultValue="jean.weber@" invalid />}
      </Field>

      <Field id="sg-roof" label="Dachtyp" optionalLabel="optional">
        {(aria) => (
          <Select aria={aria} defaultValue="">
            <option value="">Bitte wählen</option>
            <option value="tile">Ziegel</option>
            <option value="slate">Schiefer</option>
            <option value="metal">Blech</option>
            <option value="flat">Flachdach</option>
            <option value="unknown">Weiss ich nicht</option>
          </Select>
        )}
      </Field>

      <Field id="sg-disabled" label="Leistung" hint="Wird aus der Herkunftsseite vorbelegt.">
        {(aria) => (
          <Select aria={aria} disabled defaultValue="roofing">
            <option value="roofing">Dacheindeckung &amp; Dachstuhl</option>
          </Select>
        )}
      </Field>

      <div className="md:col-span-2">
        <Field id="sg-message" label="Nachricht" required>
          {(aria) => (
            <TextArea
              aria={aria}
              placeholder="Ziegeldach, ca. 120 m², Baujahr 1978, Wasserfleck an der Decke im Obergeschoss."
            />
          )}
        </Field>
      </div>

      <div className="md:col-span-2 flex flex-col gap-6">
        <Checkbox
          name="sg-consent"
          label={
            <>
              Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage gespeichert werden.{' '}
              <a href="#" className="text-accent-text underline">
                Datenschutzerklärung
              </a>
            </>
          }
        />
        <Checkbox
          name="sg-consent-error"
          label="Einwilligung mit Fehlerzustand."
          error="Ohne Ihre Einwilligung dürfen wir die Anfrage nicht speichern."
        />
      </div>
    </div>
  );
}
