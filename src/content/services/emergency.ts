import type { ServiceContent } from './types';

export const emergency: ServiceContent = {
  id: 'emergency',

  meta: {
    de: {
      title: 'Dach-Notdienst 7/7 in Luxemburg — Daach Hoffmann',
      description:
        'Sturmschaden, offenes Dach, Wasser im Haus: Notdienst an sieben Tagen die Woche im ganzen Grossherzogtum. Erst sichern, dann rechnen. Rufen Sie an.',
    },
    fr: {
      title: 'Dépannage toiture 7j/7 au Luxembourg — Daach Hoffmann',
      description:
        "Dégât de tempête, toit ouvert, eau dans la maison : dépannage sept jours sur sept dans tout le Grand-Duché. Sécuriser d'abord, chiffrer ensuite. Appelez-nous.",
    },
    en: {
      title: 'Emergency roof repair 7/7 in Luxembourg — Daach Hoffmann',
      description:
        'Storm damage, an open roof, water indoors: emergency call-outs seven days a week across Luxembourg. We make it safe first and price it afterwards. Call us.',
    },
  },

  intro: {
    de: 'Sturmschaden, offene Stelle, Wasser im Haus — wir sichern zuerst und rechnen später.',
    fr: "Dégât de tempête, toit ouvert, eau dans la maison — nous sécurisons d'abord, nous chiffrons ensuite.",
    en: 'Storm damage, an open roof, water indoors — we make it safe first and work out the cost afterwards.',
  },

  lead: {
    de: 'Bei einem offenen Dach zählt die Stunde, nicht der Werktag. Wasser, das einmal in die Dämmung gelaufen ist, bleibt dort und arbeitet weiter, auch wenn es oben längst aufgehört hat zu regnen — aus einem Schaden von wenigen hundert Euro wird über ein Wochenende ein Schaden am Dachstuhl. Deshalb ist die erste Massnahme immer die Sicherung, und die Kostenfrage kommt danach. Ein Anruf klärt in zwei Minuten, was ein Formular in zwei Tagen klärt.',
    fr: "Sur un toit ouvert, c'est l'heure qui compte, pas le jour ouvrable. L'eau entrée dans l'isolation y reste et continue son travail bien après la fin de la pluie — sur un week-end, un sinistre de quelques centaines d'euros devient un sinistre de charpente. La première mesure est donc toujours la mise en sécurité ; la question du prix vient après. Deux minutes au téléphone valent deux jours de formulaire.",
    en: 'With an open roof it is the hour that counts, not the working day. Water that has once run into the insulation stays there and keeps working long after the rain has stopped — over a weekend, a few hundred euros of damage becomes structural damage. So the first measure is always to make it safe, and the question of cost comes afterwards. Two minutes on the phone settles what a form takes two days to settle.',
  },

  symptoms: {
    title: { de: 'Was ein Notfall ist', fr: "Ce qui constitue une urgence", en: 'What counts as an emergency' },
    intro: {
      de: 'Wenn eines davon zutrifft, rufen Sie an, statt zu schreiben:',
      fr: "Si l'un de ces cas s'applique, appelez plutôt que d'écrire :",
      en: 'If any of these applies, call rather than write:',
    },
    items: [
      {
        de: 'Es tropft sichtbar durch die Decke, oder es steht bereits Wasser auf dem Boden.',
        fr: "Cela goutte visiblement à travers le plafond, ou de l'eau stagne déjà au sol.",
        en: 'Water is visibly dripping through a ceiling, or already standing on the floor.',
      },
      {
        de: 'Nach einem Sturm fehlen Ziegel, und die Unterspannbahn oder blankes Holz ist von unten zu sehen.',
        fr: "Après une tempête, des tuiles manquent et l'écran de sous-toiture ou le bois nu est visible depuis le sol.",
        en: 'After a storm, tiles are missing and the underlay or bare timber is visible from below.',
      },
      {
        de: 'Ein Blech, eine Dachrinne oder ein Teil der Verkleidung hängt lose und kann herunterfallen.',
        fr: "Une tôle, une gouttière ou un élément d'habillage pend et menace de tomber.",
        en: 'A sheet, a gutter or a piece of cladding is hanging loose and could fall.',
      },
      {
        de: 'Ein Baum oder ein grösserer Ast liegt auf dem Dach.',
        fr: "Un arbre ou une grosse branche repose sur le toit.",
        en: 'A tree or a large branch is lying on the roof.',
      },
      {
        de: 'Nach Hagel zeigt die Eindeckung Löcher oder gebrochene Ziegel über die ganze Fläche.',
        fr: "Après la grêle, la couverture présente des trous ou des tuiles cassées sur toute la surface.",
        en: 'After hail, the covering shows holes or broken tiles across the whole surface.',
      },
      {
        de: 'Wasser läuft an der Kaminwange oder entlang eines Dachfensters ins Zimmer.',
        fr: "L'eau coule le long du conduit de cheminée ou d'une fenêtre de toit jusque dans la pièce.",
        en: 'Water is running into a room down the chimney breast or along a roof window.',
      },
    ],
  },

  approach: {
    title: {
      de: 'Was Sie tun sollten, bevor wir da sind',
      fr: 'Ce qu’il faut faire avant notre arrivée',
      en: 'What to do before we get there',
    },
    body: [
      {
        de: 'Gehen Sie nicht selbst aufs Dach. Ein nasses oder beschädigtes Dach ist auch für jemanden gefährlich, der schwindelfrei ist — Ziegel, die von unten fest aussehen, liegen nach einem Sturm oft nur noch lose auf. Fast alle schweren Unfälle an Dächern passieren nicht bei der Arbeit, sondern beim Nachsehen.',
        fr: "Ne montez pas vous-même sur le toit. Un toit mouillé ou endommagé est dangereux même pour quelqu'un qui n'a pas le vertige : après une tempête, des tuiles qui paraissent solides d'en bas ne sont souvent plus que posées. La plupart des accidents graves en toiture n'arrivent pas pendant les travaux, mais pendant l'inspection.",
        en: 'Do not go onto the roof yourself. A wet or damaged roof is dangerous even for someone with a head for heights — tiles that look secure from below are often merely resting there after a storm. Most serious roof accidents happen not during the work but while someone is taking a look.',
      },
      {
        de: 'Wenn Wasser in der Nähe von Leitungen, Steckdosen oder Deckenleuchten läuft, schalten Sie den betroffenen Stromkreis ab. Das ist wichtiger als jeder Eimer.',
        fr: "Si l'eau coule à proximité de câbles, de prises ou de luminaires, coupez le circuit concerné. C'est plus important que n'importe quel seau.",
        en: 'If water is running anywhere near wiring, sockets or ceiling lights, switch off the affected circuit. That matters more than any bucket.',
      },
      {
        de: 'Stellen Sie Gefässe unter, räumen Sie Möbel und Teppiche aus dem Bereich und legen Sie Folie aus. Wölbt sich eine Gipsdecke sichtbar nach unten, weil sich Wasser darüber sammelt, halten Sie sich fern — sie kann auf einmal nachgeben.',
        fr: "Placez des récipients, dégagez meubles et tapis, protégez le sol avec une bâche. Si un plafond en plaques se bombe visiblement parce que l'eau s'accumule au-dessus, tenez-vous à distance : il peut céder d'un coup.",
        en: 'Put containers underneath, move furniture and rugs out of the way, and lay down sheeting. If a plasterboard ceiling is visibly bulging because water has collected above it, keep clear — it can give way all at once.',
      },
      {
        de: 'Fotografieren Sie den Schaden, bevor Sie aufräumen: die Stelle am Dach von der Strasse aus, den Fleck von innen, heruntergefallene Teile dort, wo sie liegen. Die Gebäudeversicherung fragt später genau danach, und nach dem Aufräumen lässt sich der Zustand nicht mehr belegen.',
        fr: "Photographiez les dégâts avant de ranger : la zone du toit depuis la rue, la tache à l'intérieur, les éléments tombés là où ils se trouvent. L'assurance du bâtiment le demandera précisément, et une fois rangé, l'état ne peut plus être prouvé.",
        en: 'Photograph the damage before you clear up: the roof area from the street, the stain indoors, fallen pieces where they lie. The buildings insurer will ask for exactly this, and once it is tidied the condition can no longer be evidenced.',
      },
    ],
  },

  materials: {
    title: { de: 'Womit wir sichern', fr: 'Avec quoi nous sécurisons', en: 'What we make it safe with' },
    intro: {
      de: 'Eine Notsicherung ist keine Reparatur. Sie muss schnell gehen, bei Wind halten und darf nichts zerstören, was danach noch gebraucht wird:',
      fr: "Une mise en sécurité n'est pas une réparation. Elle doit être rapide, tenir au vent et ne rien détruire de ce qui servira ensuite :",
      en: 'A temporary fix is not a repair. It has to be quick, hold in wind, and destroy nothing that is still needed afterwards:',
    },
    items: [
      {
        name: { de: 'Verstärkte Abdeckplane', fr: 'Bâche renforcée', en: 'Reinforced tarpaulin' },
        why: {
          de: 'Ausreichend gross, damit sie über den Schaden hinaus bis über den First reicht. Eine Plane, die nur die offene Stelle deckt, führt Wasser darunter statt darüber hinweg.',
          fr: "Suffisamment grande pour dépasser la zone endommagée jusqu'au-dessus du faîtage. Une bâche qui ne couvre que le trou conduit l'eau dessous au lieu de la détourner.",
          en: 'Big enough to run past the damage and over the ridge. A sheet that covers only the hole channels water underneath it instead of away.',
        },
      },
      {
        name: { de: 'Beschwerung statt Nagelung', fr: 'Lestage plutôt que clouage', en: 'Weighting instead of nailing' },
        why: {
          de: 'Wo es geht, wird die Plane beschwert und verzurrt statt durchs Dach genagelt. Jedes Loch, das für die Sicherung entsteht, muss später mit repariert werden.',
          fr: "Quand c'est possible, la bâche est lestée et arrimée plutôt que clouée à travers la couverture. Chaque trou fait pour sécuriser devra être réparé ensuite.",
          en: 'Where possible the sheet is weighted and lashed rather than nailed through the roof. Every hole made to secure it has to be repaired later.',
        },
      },
      {
        name: { de: 'Ersatzziegel im Fahrzeug', fr: 'Tuiles de rechange dans le véhicule', en: 'Spare tiles in the van' },
        why: {
          de: 'Bei einem überschaubaren Schaden lässt sich die Stelle oft direkt schliessen, statt sie zu verplanen. Das erspart einen zweiten Termin.',
          fr: "Sur un dégât limité, la zone peut souvent être refermée directement plutôt que bâchée. Cela évite un second déplacement.",
          en: 'On limited damage the area can often be closed properly on the spot instead of sheeted. That saves a second visit.',
        },
      },
      {
        name: { de: 'Fotodokumentation', fr: 'Reportage photographique', en: 'Photographic record' },
        why: {
          de: 'Vor der Sicherung, nach der Sicherung. Die Versicherung braucht den Zustand vor dem Eingriff — und wir brauchen ihn, um das Angebot für die endgültige Reparatur belegen zu können.',
          fr: "Avant et après la mise en sécurité. L'assurance a besoin de l'état avant intervention — et nous en avons besoin pour justifier le devis de la réparation définitive.",
          en: 'Before the temporary fix and after it. The insurer needs the condition before intervention — and we need it to substantiate the quote for the permanent repair.',
        },
      },
    ],
  },

  faq: [
    {
      question: {
        de: 'Kommen Sie wirklich auch am Sonntag?',
        fr: 'Intervenez-vous vraiment le dimanche ?',
        en: 'Do you really come out on a Sunday?',
      },
      answer: {
        de: 'Der Notdienst läuft an sieben Tagen die Woche. Ob wir sofort ausrücken oder ob es bis zum nächsten Morgen wartet, entscheidet der Schaden und nicht der Wochentag — bei laufendem Wassereintritt fahren wir, bei einem losen Ziegel auf einem sonst dichten Dach ist der Montag früh genug. Das klären wir ehrlich am Telefon, bevor jemand losfährt.',
        fr: "Le dépannage fonctionne sept jours sur sept. Intervenir immédiatement ou attendre le lendemain dépend du sinistre, pas du jour de la semaine : en cas d'infiltration active, nous partons ; pour une tuile déplacée sur un toit par ailleurs étanche, le lundi suffit. Nous en parlons franchement au téléphone avant tout déplacement.",
        en: 'The emergency service runs seven days a week. Whether we come straight out or it waits until morning depends on the damage, not the day — with water actively coming in we go; for one slipped tile on an otherwise sound roof, Monday is soon enough. We settle that honestly on the phone before anyone sets off.',
      },
    },
    {
      question: {
        de: 'Kann ich selbst eine Plane spannen, bis Sie kommen?',
        fr: "Puis-je bâcher moi-même en attendant votre venue ?",
        en: 'Can I put a tarpaulin up myself until you arrive?',
      },
      answer: {
        de: 'Bitte nicht auf dem Dach. Vom Dachboden aus können Sie viel erreichen: Folie unter die undichte Stelle spannen und in einen Eimer leiten, damit das Wasser nicht in die Dämmung läuft. Das bringt oft mehr als eine Plane oben und ist ungefährlich. Alles, was ein Betreten des Dachs erfordert, sollte warten.',
        fr: "Pas sur le toit, s'il vous plaît. Depuis les combles, vous pouvez faire beaucoup : tendre un film sous la fuite et le diriger vers un seau, pour que l'eau n'aille pas dans l'isolation. C'est souvent plus efficace qu'une bâche en haut, et sans danger. Tout ce qui suppose de monter sur le toit doit attendre.",
        en: 'Not on the roof, please. From inside the loft you can achieve a lot: run a sheet of plastic under the leak into a bucket so the water does not reach the insulation. That often does more than a tarpaulin above, and it is safe. Anything requiring you to get onto the roof should wait.',
      },
    },
    {
      question: {
        de: 'Zahlt die Versicherung den Einsatz?',
        fr: "L'assurance prend-elle en charge l'intervention ?",
        en: 'Will insurance pay for the call-out?',
      },
      answer: {
        de: 'Bei Sturm, Hagel und Baumschaden meistens ja, über die Gebäudeversicherung — und häufig auch die Notsicherung selbst, weil sie den Schaden begrenzt. Melden Sie den Schaden Ihrer Versicherung, sobald es geht, und behalten Sie die Fotos von vorher. Bei Schäden, die auf normalen Verschleiss zurückgehen, zahlt die Versicherung in der Regel nicht.',
        fr: "En cas de tempête, de grêle ou de chute d'arbre, généralement oui, via l'assurance du bâtiment — et souvent aussi la mise en sécurité, car elle limite le sinistre. Déclarez le dommage dès que possible et conservez les photos préalables. Pour des dégâts liés à l'usure normale, l'assurance ne prend en principe pas en charge.",
        en: 'For storm, hail and falling-tree damage, usually yes, through buildings insurance — and often the temporary fix as well, because it limits the loss. Report it to your insurer as soon as you can and keep the photos from beforehand. Damage that comes down to ordinary wear is normally not covered.',
      },
    },
    {
      question: {
        de: 'Was, wenn der Schaden am Wochenende passiert und Sie gerade woanders sind?',
        fr: "Et si le sinistre survient le week-end et que vous êtes ailleurs ?",
        en: 'What if the damage happens at the weekend and you are already somewhere else?',
      },
      answer: {
        de: 'Nach einem grossen Sturm sind alle Betriebe im Land gleichzeitig unterwegs, das ist die ehrliche Antwort. Wir sagen Ihnen dann am Telefon, wann wir realistisch da sein können, und was Sie bis dahin selbst tun können, um den Schaden klein zu halten. Eine Wartezeit, die man kennt, ist besser als eine Zusage, die nicht hält.',
        fr: "Après une grosse tempête, toutes les entreprises du pays sont sur le pont en même temps ; c'est la réponse honnête. Nous vous indiquons alors au téléphone quand nous pouvons réalistement être là, et ce que vous pouvez faire d'ici là pour limiter les dégâts. Un délai connu vaut mieux qu'une promesse intenable.",
        en: 'After a big storm every firm in the country is out at once — that is the honest answer. We will tell you on the phone when we can realistically be there, and what you can do in the meantime to keep the damage down. A wait you know about beats a promise that does not hold.',
      },
    },
  ],

  cta: {
    title: {
      de: 'Rufen Sie an — jetzt, nicht später',
      fr: 'Appelez — maintenant, pas plus tard',
      en: 'Call us — now, not later',
    },
    body: {
      de: 'Bei einem laufenden Wassereintritt ist das Telefon der schnellste Weg. Das Formular ist für alles gedacht, was bis morgen Zeit hat.',
      fr: "En cas d'infiltration active, le téléphone est le chemin le plus rapide. Le formulaire est fait pour tout ce qui peut attendre demain.",
      en: 'With water actively coming in, the phone is the fastest route. The form is for everything that can wait until tomorrow.',
    },
  },
};
