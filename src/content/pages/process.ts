import type { Localized } from '@/content/types';

/**
 * The process page.
 *
 * Visitor type B from section 5.1 — the planner comparing three firms over
 * several weeks — decides on process as much as on price. Three quotes for the
 * same roof rarely differ enough to choose between; what differs is whether
 * anyone explained what happens after signature.
 */
export const processPage = {
  meta: {
    de: {
      title: 'Ablauf: von der Anfrage bis zur Abnahme',
      description:
        'Vier Schritte, keine Überraschungen: Anfrage, kostenloser Vor-Ort-Termin, schriftliches Angebot nach Positionen, Ausführung mit gemeinsamer Abnahme.',
    },
    fr: {
      title: 'Déroulement : de la demande à la réception',
      description:
        "Quatre étapes, sans surprise : demande, visite gratuite sur place, devis écrit poste par poste, exécution et réception commune des travaux.",
    },
    en: {
      title: 'How it works: from first enquiry to sign-off',
      description:
        'Four steps and no surprises: enquiry, free site visit, an itemised written quote, then the work and a joint inspection at the end.',
    },
  },

  title: {
    de: 'Von der Anfrage bis zur Abnahme',
    fr: 'De la demande à la réception des travaux',
    en: 'From first enquiry to sign-off',
  } satisfies Localized,

  lead: {
    de: 'Ein Dach zu erneuern ist für die meisten Menschen eine einmalige Sache. Entsprechend unbekannt ist, was zwischen dem ersten Anruf und dem abgeräumten Gerüst eigentlich passiert. Hier steht es — inklusive der Stellen, an denen es unangenehm werden kann.',
    fr: "Refaire un toit est, pour la plupart des gens, une expérience unique. Ce qui se passe entre le premier appel et l'échafaudage démonté reste donc largement méconnu. Voici le déroulement — y compris les moments qui peuvent être désagréables.",
    en: 'Replacing a roof is a once-in-a-lifetime job for most people. What actually happens between the first phone call and the scaffold coming down is correspondingly unfamiliar. Here it is — including the parts that can get uncomfortable.',
  } satisfies Localized,

  steps: [
    {
      title: { de: 'Anfrage', fr: 'La demande', en: 'The enquiry' },
      body: [
        {
          de: 'Ein Foto vom Schaden sagt mehr als eine Seite Beschreibung. Zwei bis drei Bilder — die betroffene Stelle von aussen, der Fleck von innen, das ganze Dach von der Strasse — reichen uns meist, um vorher zu wissen, worum es geht und was wir mitbringen müssen.',
          fr: "Une photo du dommage en dit plus qu'une page de description. Deux ou trois images — la zone concernée depuis l'extérieur, la tache à l'intérieur, l'ensemble du toit depuis la rue — nous suffisent généralement pour savoir de quoi il retourne et quoi emporter.",
          en: 'One photo of the damage says more than a page of description. Two or three images — the affected area from outside, the stain from inside, the whole roof from the street — usually tell us in advance what this is and what to bring.',
        },
        {
          de: 'Wir melden uns innerhalb eines Werktags. Bei einer Anfrage, die als Notfall markiert ist, rufen wir an, statt zu schreiben.',
          fr: "Nous répondons sous un jour ouvrable. Pour une demande signalée comme urgente, nous appelons au lieu d'écrire.",
          en: 'We come back to you within one working day. For an enquiry marked as an emergency we call rather than write.',
        },
      ],
    },
    {
      title: { de: 'Vor-Ort-Termin', fr: 'La visite sur place', en: 'The site visit' },
      body: [
        {
          de: 'Kostenlos, im ganzen Grossherzogtum, auch wenn daraus kein Auftrag wird. Wir steigen aufs Dach und gehen in den Dachboden — beides, weil sich ein Dach weder von aussen noch von innen allein beurteilen lässt.',
          fr: "Gratuite, dans tout le Grand-Duché, même si cela ne débouche sur aucun chantier. Nous montons sur le toit et nous allons dans les combles — les deux, car un toit ne se juge ni de l'extérieur ni de l'intérieur seulement.",
          en: 'Free, anywhere in the Grand Duchy, even when no job comes of it. We get onto the roof and into the loft — both, because a roof cannot be judged from outside alone or from inside alone.',
        },
        {
          de: 'Rechnen Sie mit vierzig Minuten bis einer Stunde. Am Ende sagen wir Ihnen, was wir gesehen haben, was davon dringend ist und was noch Zeit hat. Falls wir Ihnen abraten müssen — weil eine Reinigung Ihrem Dach schaden würde oder weil eine Reparatur nicht mehr lohnt —, sagen wir das dort und nicht erst im Angebot.',
          fr: "Comptez quarante minutes à une heure. À la fin, nous vous disons ce que nous avons vu, ce qui est urgent et ce qui peut attendre. Si nous devons vous déconseiller quelque chose — parce qu'un nettoyage abîmerait votre toit ou qu'une réparation n'en vaut plus la peine —, nous le disons sur place, pas dans le devis.",
          en: 'Allow forty minutes to an hour. At the end we tell you what we saw, what is urgent and what can wait. If we have to advise against something — because a clean would damage your roof, or a repair no longer pays — we say so there, not later in the quote.',
        },
      ],
    },
    {
      title: { de: 'Angebot', fr: 'Le devis', en: 'The quote' },
      body: [
        {
          de: 'Schriftlich und nach Positionen aufgeschlüsselt: Gerüst, Abbruch und Entsorgung, Dachstuhlarbeiten, Unterdeckung, Dämmung, Eindeckung, Spenglerarbeiten, Anschlüsse. Eine Pauschale, die sich hinterher erklären muss, gibt es bei uns nicht — Sie sollen die Positionen mit einem zweiten Angebot vergleichen können.',
          fr: "Par écrit et décomposé poste par poste : échafaudage, dépose et évacuation, charpente, sous-toiture, isolation, couverture, ferblanterie, raccords. Pas de forfait qui devrait se justifier après coup — vous devez pouvoir comparer les postes avec un second devis.",
          en: 'In writing and itemised: scaffold, strip-out and disposal, structural work, underlay, insulation, covering, sheet metal, junctions. No lump sum that has to be explained afterwards — you should be able to compare line by line against a second quote.',
        },
        {
          de: 'Wo etwas erst nach dem Öffnen des Dachs beurteilt werden kann — der Zustand der Sparren ist der klassische Fall —, steht im Angebot, was bei welchem Befund dazukommt. Das ist die ehrlichere Variante als eine niedrige Summe, die auf der Schlussrechnung wächst.',
          fr: "Là où un point ne peut être apprécié qu'une fois le toit ouvert — l'état des chevrons est le cas classique —, le devis indique ce qui s'ajoute selon le constat. C'est plus honnête qu'un montant bas qui enfle sur la facture finale.",
          en: 'Where something can only be assessed once the roof is open — the state of the rafters is the classic case — the quote states what gets added under which finding. That is more honest than a low figure that grows on the final invoice.',
        },
      ],
    },
    {
      title: { de: 'Ausführung und Abnahme', fr: 'Exécution et réception', en: 'The work and sign-off' },
      body: [
        {
          de: 'Der Termin steht vorher fest. Am ersten Tag kommt das Gerüst, danach wird nur so viel Dachfläche geöffnet, wie am selben Abend wieder regensicher geschlossen werden kann. Sie müssen nicht ausziehen. Räume direkt unter dem Dach sind während der Arbeiten laut und staubig — wenn dort jemand im Homeoffice arbeitet, planen Sie das besser ein.',
          fr: "La date est fixée à l'avance. L'échafaudage arrive le premier jour, puis nous n'ouvrons que la surface que nous pouvons refermer à l'abri de la pluie le soir même. Vous n'avez pas à déménager. Les pièces situées directement sous le toit sont bruyantes et poussiéreuses pendant le chantier — si quelqu'un y travaille à domicile, mieux vaut l'anticiper.",
          en: 'The date is fixed in advance. The scaffold arrives on day one, and after that we only open as much roof as can be made watertight again the same evening. You do not have to move out. Rooms directly under the roof are loud and dusty while the work runs — if someone works from home there, plan around it.',
        },
        {
          de: 'Zum Schluss gehen wir gemeinsam übers Gerüst. Abnahme heisst, dass Sie gesehen haben, was gemacht wurde — nicht, dass Sie eine Rechnung unterschreiben. Was Ihnen dabei auffällt, wird vor dem Abbau des Gerüsts erledigt, denn danach ist jede Korrektur ungleich teurer.',
          fr: "À la fin, nous parcourons l'échafaudage ensemble. La réception, c'est que vous avez vu ce qui a été fait — pas que vous signez une facture. Ce que vous relevez est corrigé avant le démontage, car ensuite toute reprise coûte bien davantage.",
          en: 'At the end we walk the scaffold together. Sign-off means you have seen what was done — not that you are signing an invoice. Anything you notice is dealt with before the scaffold comes down, because after that every correction costs several times as much.',
        },
      ],
    },
  ],
};
