import type { Localized } from '@/content/types';
import type { ServiceId } from '~/config/client.config';
import type { ServiceContent } from './types';
import { roofing } from './roofing';
import { sheetMetal } from './sheet-metal';
import { chimney } from './chimney';
import { cleaning } from './cleaning';
import { emergency } from './emergency';
import { other } from './other';

/**
 * One entry per service in client.config.ts. The build fails if a service is
 * declared there without content here, which is the point: a navigation entry
 * that leads to an empty page is worse than no entry at all.
 */
export const serviceContent = {
  roofing,
  'sheet-metal': sheetMetal,
  chimney,
  cleaning,
  emergency,
  other,
} as Partial<Record<ServiceId, ServiceContent>>;

export function getServiceContent(id: ServiceId): ServiceContent | undefined {
  return serviceContent[id];
}

/**
 * Copy for the services overview page.
 *
 * It lives here rather than in its own file because this is a hub: its job is
 * to route a visitor to the right service page in one read, not to rank on its
 * own. The pages it links to carry the depth.
 */
export const servicesOverview = {
  meta: {
    de: {
      title: 'Leistungen — Dachdecker & Spengler in Luxemburg',
      description:
        'Dacheindeckung, Spenglerei, Kaminkopf, Dachreinigung, Notdienst 7/7 und Terrassenarbeiten. Ein Betrieb für alles am Dach, im ganzen Grossherzogtum.',
    },
    fr: {
      title: 'Prestations — couvreur & ferblantier au Luxembourg',
      description:
        "Couverture, ferblanterie, souche de cheminée, nettoyage de toiture, dépannage 7j/7 et terrasses. Une seule entreprise pour tout le toit, dans tout le Grand-Duché.",
    },
    en: {
      title: 'Services — roofing & sheet metal in Luxembourg',
      description:
        'Roofing, sheet metal, chimney stacks, roof cleaning, seven-day emergency call-outs and terrace work. One company for the whole roof, across Luxembourg.',
    },
  } satisfies Localized<{ title: string; description: string }>,

  title: {
    de: 'Alles am Dach, von einem Betrieb',
    fr: 'Tout ce qui touche au toit, par une seule entreprise',
    en: 'Everything on the roof, from one company',
  } satisfies Localized,

  lead: {
    de: 'Sechs Leistungen, ein Ansprechpartner. Das klingt nach einer Floskel, hat aber einen sehr praktischen Grund: Fast jede Dacharbeit berührt mindestens zwei davon. Wer die Ziegel erneuert, fasst die Kehlen und die Dachrinne mit an. Wer einen Kaminkopf abdichtet, arbeitet an der Eindeckung ringsherum. Getrennt vergeben heisst zweimal Gerüst, zwei Termine und eine Naht dazwischen, für die sich am Ende niemand zuständig fühlt.',
    fr: "Six prestations, un seul interlocuteur. Cela ressemble à une formule, mais la raison est très concrète : presque tout chantier de toiture en touche au moins deux. Refaire les tuiles, c'est reprendre les noues et la gouttière. Étancher une souche de cheminée, c'est travailler la couverture tout autour. Confier cela séparément, c'est deux échafaudages, deux rendez-vous et, entre les deux, une jonction dont plus personne ne se sent responsable.",
    en: 'Six services, one point of contact. That sounds like a slogan, but the reason is entirely practical: almost any roof job touches at least two of them. Renewing the tiles means dealing with the valleys and the gutter. Sealing a chimney stack means working the covering all around it. Split the work between firms and you get two scaffolds, two appointments, and a seam between them that nobody ends up owning.',
  } satisfies Localized,
};
