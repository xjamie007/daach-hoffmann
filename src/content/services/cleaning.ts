import type { ServiceContent } from './types';

export const cleaning: ServiceContent = {
  id: 'cleaning',

  meta: {
    de: {
      title: 'Dachreinigung & Beschichtung in Luxemburg',
      description:
        'Moos und Flechten entfernen, Rinnen mitreinigen, auf Wunsch beschichten. Wir sagen auch, wann sich eine Reinigung nicht mehr lohnt. Kostenlose Einschätzung vor Ort.',
    },
    fr: {
      title: 'Nettoyage & peinture de toiture au Luxembourg',
      description:
        "Élimination des mousses et lichens, nettoyage des gouttières, mise en peinture sur demande. Nous disons aussi quand un nettoyage n'a plus de sens. Évaluation gratuite.",
    },
    en: {
      title: 'Roof cleaning & coating in Luxembourg',
      description:
        'Moss and lichen removal, gutters cleaned at the same time, coating on request. We also say when cleaning no longer makes sense. Free assessment on site.',
    },
  },

  intro: {
    de: 'Moos runter, Rinnen frei, Poren geschlossen — dort, wo das Dach das noch verträgt.',
    fr: "Mousse retirée, gouttières dégagées, pores refermés — là où le toit le supporte encore.",
    en: 'Moss off, gutters clear, pores closed — where the roof can still take it.',
  },

  lead: {
    de: 'Eine Dachreinigung ist keine Sanierung und ersetzt auch keine. Sie nimmt dem Dach die Last, die Feuchtigkeit hält, und macht die Rinnen wieder frei. Bei einer intakten Eindeckung verlängert das die Nutzungsdauer spürbar. Bei einer Eindeckung, die schon mürbe ist, richtet dieselbe Arbeit Schaden an. Deshalb ist der erste Schritt bei uns immer die Frage, ob eine Reinigung überhaupt das Richtige ist — und wir sagen es Ihnen auch, wenn die Antwort nein lautet.',
    fr: "Un nettoyage de toiture n'est pas une rénovation et n'en remplace aucune. Il retire au toit la masse qui retient l'humidité et redégage les gouttières. Sur une couverture saine, cela prolonge nettement la durée d'usage. Sur une couverture déjà friable, le même travail fait des dégâts. C'est pourquoi notre première étape est toujours de déterminer si un nettoyage est bien la bonne réponse — et nous le disons aussi quand ce n'est pas le cas.",
    en: 'Roof cleaning is not renovation and does not replace it. It takes off the growth that holds moisture and clears the gutters again. On a sound covering that noticeably extends its working life. On a covering that has already perished, the same work does damage. So our first step is always to establish whether cleaning is the right answer at all — and we say so when it is not.',
  },

  symptoms: {
    title: { de: 'Wann eine Reinigung sinnvoll ist', fr: 'Quand un nettoyage a du sens', en: 'When cleaning makes sense' },
    intro: {
      de: 'Nicht jedes bewachsene Dach muss gereinigt werden. Diese Anzeichen sprechen dafür:',
      fr: "Tout toit couvert de mousse n'a pas besoin d'être nettoyé. Ces signes plaident pour :",
      en: 'Not every roof with growth on it needs cleaning. These signs argue for it:',
    },
    items: [
      {
        de: 'Auf der Nordseite sitzt ein dichtes, dickes Moospolster, das nach Regen tagelang nass bleibt.',
        fr: "Au nord, un tapis de mousse épais reste humide plusieurs jours après la pluie.",
        en: 'A thick, dense mat of moss on the north side stays wet for days after rain.',
      },
      {
        de: 'In der Dachrinne liegen regelmässig Moosbrocken, und das Fallrohr verstopft mehrmals im Jahr.',
        fr: "Des paquets de mousse se retrouvent régulièrement dans la gouttière et la descente se bouche plusieurs fois par an.",
        en: 'Lumps of moss regularly end up in the gutter and the downpipe blocks several times a year.',
      },
      {
        de: 'Moos wächst in die Überlappungen der Ziegel hinein und hebt sie sichtbar an.',
        fr: "La mousse pénètre dans les recouvrements des tuiles et les soulève visiblement.",
        en: 'Moss is growing into the tile overlaps and visibly lifting them.',
      },
      {
        de: 'Dunkle Algen- und Flechtenflecken breiten sich über die ganze Fläche aus, obwohl die Ziegel selbst noch fest sind.',
        fr: "Des taches sombres d'algues et de lichens s'étendent sur toute la surface alors que les tuiles restent solides.",
        en: 'Dark algae and lichen spread across the whole surface while the tiles themselves are still sound.',
      },
      {
        de: 'Das Dach ist zwischen fünfzehn und dreissig Jahre alt und wurde nie gereinigt.',
        fr: "Le toit a entre quinze et trente ans et n'a jamais été nettoyé.",
        en: 'The roof is between fifteen and thirty years old and has never been cleaned.',
      },
    ],
  },

  approach: {
    title: { de: 'Wie wir vorgehen', fr: 'Comment nous procédons', en: 'How we work' },
    body: [
      {
        de: 'Vor allem anderen prüfen wir, ob die Eindeckung eine Reinigung noch verträgt. Ein einfacher Test: lässt sich mit dem Fingernagel Material von der Ziegeloberfläche abtragen, ist die Deckschicht bereits verloren. Ein solches Dach wird durch die Reinigung nicht sauber, sondern offenporig — es saugt danach mehr Wasser als vorher und geht beim nächsten Frost schneller kaputt. In dem Fall raten wir ab und rechnen Ihnen stattdessen die Sanierung.',
        fr: "Avant tout, nous vérifions si la couverture supporte encore un nettoyage. Test simple : si l'ongle arrache de la matière à la surface de la tuile, la couche de protection est déjà partie. Un tel toit ne devient pas propre après nettoyage, il devient poreux — il absorbe alors plus d'eau qu'avant et se dégrade plus vite au gel suivant. Dans ce cas, nous déconseillons et chiffrons plutôt la rénovation.",
        en: 'Before anything else we check whether the covering can still take a clean. A simple test: if a fingernail lifts material off the tile surface, the protective skin has already gone. Such a roof does not come out clean, it comes out porous — it then takes up more water than before and fails faster at the next frost. In that case we advise against it and price the re-covering instead.',
      },
      {
        de: 'Gereinigt wird mit dosiertem Druck und einem flachen Strahl, nicht mit dem Rotordüsen-Maximum. Zu hoher Druck aus zu kurzer Distanz treibt Wasser unter die Ziegel und in die Überlappungen, und bei Betondachsteinen schiesst er die eingefärbte Deckschicht regelrecht ab. Der Unterschied ist am selben Tag nicht zu sehen — nach zwei Wintern schon.',
        fr: "Le nettoyage se fait à pression maîtrisée et en jet plat, pas au maximum avec une buse rotative. Une pression trop forte à trop courte distance pousse l'eau sous les tuiles et dans les recouvrements ; sur les tuiles béton, elle arrache littéralement la couche colorée. La différence ne se voit pas le jour même — au bout de deux hivers, si.",
        en: 'Cleaning is done with measured pressure and a flat jet, not at full power through a rotary nozzle. Too much pressure from too close drives water under the tiles and into the laps, and on concrete tiles it strips the coloured surface layer outright. The difference is invisible on the day — after two winters it is not.',
      },
      {
        de: 'Die Rinnen werden im selben Durchgang geleert und gespült, das gehört bei uns dazu. Der gesamte Abtrag geht in der Rinne nach unten, und ein Dach zu reinigen, ohne anschliessend die Rinne freizumachen, verlagert das Problem nur um ein paar Meter.',
        fr: "Les gouttières sont vidées et rincées dans la foulée, cela fait partie de la prestation. Tout ce qui est décroché descend dans la gouttière ; nettoyer un toit sans dégager ensuite la gouttière ne fait que déplacer le problème de quelques mètres.",
        en: 'The gutters are emptied and flushed in the same visit; that is part of the job here. Everything that comes off goes down into the gutter, and cleaning a roof without then clearing the gutter only moves the problem a few metres.',
      },
      {
        de: 'Über eine Beschichtung sprechen wir erst danach und nüchtern. Eine Beschichtung schliesst die Poren, lässt Wasser abperlen und macht die Fläche optisch wieder gleichmässig. Was sie nicht kann: einen mürben Ziegel wieder frostfest machen, eine undichte Stelle abdichten oder eine fällige Sanierung ersetzen. Wer sie als Alternative zum neuen Dach verkauft, verkauft Ihnen fünf gewonnene Jahre zum Preis von fünfzehn.',
        fr: "La mise en peinture, nous en parlons ensuite et sans emballement. Elle referme les pores, fait perler l'eau et redonne un aspect homogène. Ce qu'elle ne peut pas : rendre au gel une tuile friable, étancher une fuite, ni remplacer une rénovation nécessaire. Qui la vend comme alternative à une toiture neuve vous vend cinq ans gagnés au prix de quinze.",
        en: 'Coating is something we discuss afterwards, and soberly. A coating closes the pores, makes water bead off and evens out the appearance. What it cannot do is make a perished tile frost-resistant again, seal a leak, or replace a re-covering that is due. Anyone selling it as an alternative to a new roof is selling you five years gained at the price of fifteen.',
      },
    ],
  },

  materials: {
    title: { de: 'Womit wir arbeiten', fr: 'Avec quoi nous travaillons', en: 'What we work with' },
    intro: {
      de: 'Wenig, und bewusst zurückhaltend dosiert:',
      fr: 'Peu de choses, et volontairement dosées avec retenue :',
      en: 'Not much, and deliberately used sparingly:',
    },
    items: [
      {
        name: { de: 'Dosierter Wasserdruck', fr: 'Pression maîtrisée', en: 'Measured water pressure' },
        why: {
          de: 'Das Hauptwerkzeug. Entscheidend ist nicht der maximale Druck des Geräts, sondern der Abstand und der Winkel zur Fläche — beides lässt sich nur von Hand steuern, nicht durch die Anschaffung einer stärkeren Maschine.',
          fr: "L'outil principal. Ce qui compte n'est pas la pression maximale de la machine, mais la distance et l'angle par rapport à la surface — deux paramètres qui se règlent à la main, pas en achetant un appareil plus puissant.",
          en: 'The main tool. What matters is not the machine’s maximum pressure but the distance and angle to the surface — both of which are controlled by hand, not by buying a stronger machine.',
        },
      },
      {
        name: { de: 'Algenentferner ohne Chlorbleiche', fr: 'Anti-algues sans eau de Javel', en: 'Algae treatment without chlorine bleach' },
        why: {
          de: 'Wirkt langsamer, greift aber Zinkrinnen, Fugen und die Bepflanzung darunter nicht an. Chlorhaltige Mittel sparen eine Stunde Arbeit und kosten mitunter die Dachrinne.',
          fr: "Plus lent, mais sans agressivité pour les gouttières en zinc, les joints et les plantations en dessous. Les produits chlorés font gagner une heure et coûtent parfois la gouttière.",
          en: 'Slower acting, but it does not attack zinc gutters, mortar joints or the planting below. Chlorine-based products save an hour of work and sometimes cost you the gutter.',
        },
      },
      {
        name: { de: 'Beschichtung auf Silikonharzbasis', fr: 'Peinture à base de résine silicone', en: 'Silicone-resin coating' },
        why: {
          de: 'Bleibt diffusionsoffen, sodass Feuchtigkeit aus dem Ziegel entweichen kann. Reine Acrylbeschichtungen bilden einen dichteren Film — hübsch am ersten Tag, aber sie halten Restfeuchte im Material fest.',
          fr: "Reste perméable à la vapeur, de sorte que l'humidité peut sortir de la tuile. Les peintures purement acryliques forment un film plus fermé — joli le premier jour, mais elles enferment l'humidité résiduelle.",
          en: 'Stays vapour-permeable, so moisture can leave the tile. Pure acrylic coatings form a tighter film — handsome on day one, but they trap residual moisture in the material.',
        },
      },
      {
        name: { de: 'Auffangvorrichtung für das Ablaufwasser', fr: "Dispositif de collecte des eaux de ruissellement", en: 'Run-off collection' },
        why: {
          de: 'Pflicht, sobald ein Mittel im Spiel ist. Der Abtrag eines Dachs ist kein Gartenkompost, und in eine Regenwasserzisterne gehört er unter keinen Umständen.',
          fr: "Obligatoire dès qu'un produit est utilisé. Ce qui est décroché d'un toit n'est pas du compost, et n'a en aucun cas sa place dans une citerne d'eau de pluie.",
          en: 'Mandatory as soon as any product is involved. What comes off a roof is not garden compost, and it has no business in a rainwater tank under any circumstances.',
        },
      },
    ],
  },

  faq: [
    {
      question: {
        de: 'Macht Hochdruck das Dach kaputt?',
        fr: 'Le nettoyage haute pression abîme-t-il le toit ?',
        en: 'Does high-pressure washing damage the roof?',
      },
      answer: {
        de: 'Es kann. Der Druck selbst ist nicht das Problem, der Abstand ist es: aus zehn Zentimetern mit einer Rotordüse trägt man die Oberfläche eines Betondachsteins in Sekunden ab, und Wasser wird unter die Ziegel gedrückt. Aus dem richtigen Abstand mit flachem Strahl passiert nichts davon. Wer besonders billig anbietet, spart genau an dieser Sorgfalt — das Ergebnis sieht am ersten Tag gleich aus.',
        fr: "Oui, cela peut. Ce n'est pas la pression qui pose problème, c'est la distance : à dix centimètres avec une buse rotative, on arrache la surface d'une tuile béton en quelques secondes et l'eau est poussée sous les tuiles. À bonne distance et en jet plat, rien de tout cela n'arrive. Une offre très bon marché économise précisément sur ce soin — et le résultat paraît identique le premier jour.",
        en: 'It can. The pressure itself is not the problem, the distance is: from ten centimetres with a rotary nozzle you strip the surface off a concrete tile in seconds and force water under the tiles. At the right distance with a flat jet none of that happens. A very cheap quote is saving on exactly that care — and the result looks the same on day one.',
      },
    },
    {
      question: {
        de: 'Wie lange hält eine Dachreinigung?',
        fr: 'Combien de temps dure un nettoyage de toiture ?',
        en: 'How long does a roof clean last?',
      },
      answer: {
        de: 'Fünf bis zehn Jahre, je nach Lage. Ein Dach im Schatten von Bäumen und auf der Nordseite ist deutlich früher wieder bewachsen als eine freie Südfläche. Eine Beschichtung verlängert den optischen Effekt, hält den Bewuchs aber nicht dauerhaft ab — Moos wächst auf beschichteten Ziegeln genauso, nur etwas später.',
        fr: "Cinq à dix ans selon l'exposition. Un toit à l'ombre d'arbres et orienté nord se recolonise nettement plus vite qu'un pan sud dégagé. La peinture prolonge l'effet visuel mais n'empêche pas durablement la repousse — la mousse pousse aussi sur des tuiles peintes, simplement un peu plus tard.",
        en: 'Five to ten years depending on position. A roof shaded by trees and facing north is regrown far sooner than an open south-facing slope. A coating extends the visual effect but does not keep growth off for good — moss grows on coated tiles too, just later.',
      },
    },
    {
      question: {
        de: 'Lohnt sich eine Beschichtung wirklich?',
        fr: 'La mise en peinture en vaut-elle vraiment la peine ?',
        en: 'Is a coating really worth it?',
      },
      answer: {
        de: 'Wenn Ihnen das Aussehen wichtig ist und die Ziegel noch gesund sind: ja, dann bekommen Sie eine gleichmässige Fläche und Wasser perlt ab. Wenn Sie sich davon eine verlängerte Lebensdauer eines bereits mürben Dachs erhoffen: nein. Wir beschichten kein Dach, dessen Ziegel wir für sanierungsreif halten, auch wenn es bestellt wird — das wäre Farbe auf ein Problem.',
        fr: "Si l'aspect compte pour vous et que les tuiles sont saines : oui, vous obtenez une surface homogène et l'eau perle. Si vous en attendez une prolongation de vie pour un toit déjà friable : non. Nous ne peignons pas un toit dont nous estimons les tuiles bonnes pour la rénovation, même si c'est demandé — ce serait de la peinture sur un problème.",
        en: 'If appearance matters to you and the tiles are still sound: yes, you get an even surface and water beads off. If you are hoping it will extend the life of an already perished roof: no. We do not coat a roof whose tiles we judge to be due for replacement, even if it is ordered — that would be paint over a problem.',
      },
    },
    {
      question: {
        de: 'Kann im Winter gereinigt werden?',
        fr: 'Peut-on nettoyer en hiver ?',
        en: 'Can a roof be cleaned in winter?',
      },
      answer: {
        de: 'Nein, und zwar aus einem einfachen Grund: nach der Reinigung ist die Ziegeloberfläche für einige Tage feuchter als sonst. Friert das Wasser in dieser Phase, sprengt es genau die Poren, die man schützen wollte. Wir reinigen von Frühjahr bis Herbst, und bei Frostvorhersage gar nicht.',
        fr: "Non, pour une raison simple : après le nettoyage, la surface des tuiles reste plus humide que d'habitude pendant quelques jours. Si l'eau gèle à ce moment-là, elle fait éclater précisément les pores que l'on voulait protéger. Nous nettoyons du printemps à l'automne, et pas du tout si le gel est annoncé.",
        en: 'No, for a simple reason: after cleaning, the tile surface stays wetter than usual for a few days. If that water freezes, it bursts exactly the pores you were trying to protect. We clean from spring to autumn, and not at all when frost is forecast.',
      },
    },
  ],

  cta: {
    title: {
      de: 'Erst schauen, dann reinigen',
      fr: 'Regarder d’abord, nettoyer ensuite',
      en: 'Look first, clean second',
    },
    body: {
      de: 'Schicken Sie ein Foto der bewachsenen Fläche, am besten von der Nordseite. Wir sagen Ihnen, ob eine Reinigung Ihrem Dach hilft oder schadet — und im zweiten Fall rechnen wir Ihnen etwas anderes.',
      fr: "Envoyez une photo de la surface colonisée, de préférence côté nord. Nous vous dirons si un nettoyage aide votre toit ou lui nuit — et dans le second cas, nous chiffrerons autre chose.",
      en: 'Send a photo of the affected area, ideally the north side. We will tell you whether a clean helps your roof or harms it — and in the second case we will price something else.',
    },
  },
};
