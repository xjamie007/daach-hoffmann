import type { Localized } from '@/content/types';
import type { ServiceId } from '~/config/client.config';

/**
 * The layers of a pitched roof, for the cross-section on the home page.
 *
 * This exists because of one sentence that recurs through every service page:
 * a roof is not the layer you see from the street. Homeowners commissioning a
 * re-covering are asked to choose between quotes that differ by five figures,
 * and most have never been told what is under the tiles — which is exactly why
 * the cheapest quote so often wins and then fails.
 *
 * Explaining it is worth more than another photograph, and no competitor in
 * this market does it. Every entry links to the service that deals with that
 * layer, so it doubles as navigation.
 *
 * Ordered from the outside in, which is the order they are removed.
 */
export interface RoofLayer {
  readonly id: string;
  readonly name: Localized;
  readonly body: Localized;
  /** Which service page covers this layer. */
  readonly service?: ServiceId;
}

export const roofAnatomy = {
  eyebrow: { de: 'Aufbau', fr: 'Composition', en: 'Build-up' } satisfies Localized,
  title: {
    de: 'Was über Ihnen liegt',
    fr: 'Ce qu’il y a au-dessus de vous',
    en: 'What is above you',
  } satisfies Localized,
  lead: {
    de: 'Ein Dach ist nicht die Schicht, die man von der Strasse sieht. Darunter liegen fünf weitere, und fast jeder Schaden entsteht in einer davon. Tippen Sie auf eine Schicht.',
    fr: "Un toit n'est pas la couche que l'on voit depuis la rue. Cinq autres se trouvent en dessous, et presque tout sinistre naît dans l'une d'elles. Touchez une couche.",
    en: 'A roof is not the layer you see from the street. Five more sit beneath it, and almost every failure starts in one of them. Tap a layer.',
  } satisfies Localized,
  hint: {
    de: 'Schicht wählen',
    fr: 'Choisir une couche',
    en: 'Choose a layer',
  } satisfies Localized,

  layers: [
    {
      id: 'covering',
      service: 'roofing',
      name: { de: 'Eindeckung', fr: 'Couverture', en: 'Covering' },
      body: {
        de: 'Ziegel, Schiefer oder Blech. Die einzige Schicht, die man sieht — und fast nie die, durch die Wasser eintritt. Sie hält Regen, Hagel und UV ab und schützt alles darunter vor der Sonne.',
        fr: "Tuiles, ardoises ou tôle. La seule couche visible — et presque jamais celle par laquelle l'eau entre. Elle arrête pluie, grêle et UV, et protège tout ce qui se trouve dessous.",
        en: 'Tile, slate or metal. The only layer you see — and almost never the one water gets through. It stops rain, hail and UV, and shields everything below from the sun.',
      },
    },
    {
      id: 'battens',
      service: 'roofing',
      name: { de: 'Traglattung', fr: 'Lattage', en: 'Tiling battens' },
      body: {
        de: 'Die Leisten, auf denen die Ziegel hängen. Ihr Abstand bestimmt die Überdeckung und damit, wie viel Wind das Dach aushält. Bei einer Umdeckung wird sie immer erneuert — sie ist billig und ihr Versagen teuer.',
        fr: "Les liteaux sur lesquels les tuiles reposent. Leur écartement détermine le recouvrement, donc la résistance au vent. En reprise de couverture, on les remplace toujours : peu coûteux à poser, très coûteux à voir céder.",
        en: 'The strips the tiles hang on. Their spacing sets the overlap, and with it how much wind the roof takes. In a re-covering they are always renewed — cheap to fit, expensive to have fail.',
      },
    },
    {
      id: 'counter-battens',
      service: 'roofing',
      name: { de: 'Konterlattung', fr: 'Contre-lattage', en: 'Counter-battens' },
      body: {
        de: 'Zwei Zentimeter Luft zwischen Unterdeckbahn und Lattung. Diese Lücke sieht nach nichts aus und ist der Grund, warum ein Dach von unten abtrocknen kann. Ohne sie bleibt Feuchte im Aufbau stehen.',
        fr: "Deux centimètres d'air entre l'écran de sous-toiture et le lattage. Cet interstice n'a l'air de rien et c'est lui qui permet au toit de sécher par en dessous. Sans lui, l'humidité stagne dans le complexe.",
        en: 'Two centimetres of air between the underlay and the battens. That gap looks like nothing and is the reason a roof can dry from below. Without it, moisture sits in the build-up.',
      },
    },
    {
      id: 'underlay',
      service: 'roofing',
      name: { de: 'Unterdeckbahn', fr: 'Écran de sous-toiture', en: 'Underlay' },
      body: {
        de: 'Die zweite wasserführende Ebene. Sie ist unsichtbar und der Grund, warum ein Dach einen abgehobenen Ziegel übersteht, ohne dass es im Haus tropft. Ältere Dächer haben sie oft gar nicht — dort landet alles, was durchkommt, direkt auf dem Holz.',
        fr: "Le second niveau d'étanchéité. Invisible, c'est lui qui permet à un toit de perdre une tuile sans que cela coule à l'intérieur. Les toitures anciennes en sont souvent dépourvues : tout ce qui passe atterrit alors directement sur le bois.",
        en: 'The second water-carrying plane. Invisible, and the reason a roof can lose a tile without anything dripping indoors. Older roofs often have none at all — there, whatever gets through lands straight on the timber.',
      },
    },
    {
      id: 'insulation',
      service: 'roofing',
      name: { de: 'Dämmung', fr: 'Isolation', en: 'Insulation' },
      body: {
        de: 'Zwischen oder auf den Sparren. Eine Sanierung ist der richtige und praktisch einzige günstige Moment, sie einzubauen — danach müsste das Dach dafür ein zweites Mal geöffnet werden.',
        fr: "Entre ou sur chevrons. Une rénovation est le bon moment — et pratiquement le seul moment économique — pour la poser : après, il faudrait rouvrir le toit une seconde fois.",
        en: 'Between or above the rafters. A re-covering is the right moment, and in practice the only economical one, to fit it — afterwards the roof would have to be opened a second time.',
      },
    },
    {
      id: 'rafters',
      service: 'roofing',
      name: { de: 'Sparren', fr: 'Chevrons', en: 'Rafters' },
      body: {
        de: 'Der Holzbau, der alles trägt. Wenn er nass wird, ist der Schaden nicht mehr am Dach, sondern am Haus. Deshalb steigen wir beim Termin auch in den Dachboden: an den Sparren sieht man, wie lange ein Leck schon läuft.',
        fr: "La charpente qui porte l'ensemble. Si elle prend l'eau, le sinistre n'est plus sur le toit mais dans la maison. C'est pourquoi nous montons aussi dans les combles : les chevrons montrent depuis combien de temps une fuite dure.",
        en: 'The timber that carries everything. Once it gets wet the damage is no longer to the roof but to the house. That is why we go into the loft as well: the rafters show how long a leak has been running.',
      },
    },
    {
      id: 'gutter',
      service: 'sheet-metal',
      name: { de: 'Dachrinne', fr: 'Gouttière', en: 'Gutter' },
      body: {
        de: 'Nimmt das Wasser der ganzen Fläche auf und muss durchgehend Gefälle zum Fallrohr haben. Eine Rinne, die an einer Stelle überläuft, ist selten zu klein — sie ist fast immer falsch aufgehängt.',
        fr: "Elle reçoit l'eau de toute la surface et doit descendre régulièrement vers la descente. Une gouttière qui déborde à un endroit est rarement trop petite : elle est presque toujours mal posée.",
        en: 'Takes the water off the whole surface and must fall continuously toward the downpipe. A gutter that overflows in one place is rarely too small — it is almost always hung wrong.',
      },
    },
    {
      id: 'chimney',
      service: 'chimney',
      name: { de: 'Kaminanschluss', fr: 'Raccord de cheminée', en: 'Chimney junction' },
      body: {
        de: 'Wo etwas durch das Dach geht, wird es undicht — nicht in der Fläche. Das Anschlussblech gehört in eine gefräste Nut und unter eine Kappleiste. Silikon allein ist hier keine Abdichtung, sondern eine Verzögerung.',
        fr: "C'est là où quelque chose traverse le toit que l'eau entre, pas en pleine surface. La bavette doit être engravée et maintenue par un couvre-joint. Le silicone seul n'est pas une étanchéité, c'est un report.",
        en: 'Where something passes through the roof is where it leaks — not in the open field. The flashing belongs in a cut chase under a cover flashing. Silicone alone is not waterproofing here, it is a delay.',
      },
    },
  ] as const satisfies readonly RoofLayer[],
};
