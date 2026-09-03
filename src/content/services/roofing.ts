import type { ServiceContent } from './types';

export const roofing: ServiceContent = {
  id: 'roofing',

  meta: {
    de: {
      title: 'Dacheindeckung & Dachstuhl in Luxemburg',
      description:
        'Neueindeckung und Dachsanierung im ganzen Grossherzogtum: Dachstuhl, Unterdeckung, Dämmung, Ziegel oder Schiefer. Kostenloser Vor-Ort-Termin im ganzen Grossherzogtum.',
    },
    fr: {
      title: 'Couverture & charpente au Luxembourg',
      description:
        "Couverture neuve et rénovation de toiture dans tout le Grand-Duché : charpente, sous-toiture, isolation, tuiles ou ardoises. Visite gratuite dans tout le Grand-Duché.",
    },
    en: {
      title: 'Roofing & roof structure in Luxembourg',
      description:
        'New roofs and full re-roofing across Luxembourg: structure, underlay, insulation, tile or slate. Free site visit anywhere in the Grand Duchy.',
    },
  },

  intro: {
    de: 'Das ganze Dach: der Holzbau darunter, die Dämmung dazwischen, die Eindeckung darüber.',
    fr: "Le toit dans son ensemble : la charpente en dessous, l'isolation au milieu, la couverture au-dessus.",
    en: 'The whole roof: the timber structure beneath, the insulation between, the covering on top.',
  },

  lead: {
    de: 'Ob Neubau oder Sanierung — ein Dach ist nie nur die Schicht, die man von der Strasse aus sieht. Darunter liegen Lattung, Unterdeckbahn, oft eine Dämmung und immer ein Holzbau, der die ganze Last trägt. Wer nur die Ziegel tauscht und den Rest so lässt, wie er ist, hat in zehn Jahren dasselbe Problem an derselben Stelle. Wir nehmen das Dach als Ganzes auf und sagen Ihnen, was davon wirklich erneuert werden muss und was noch dreissig Jahre hält.',
    fr: "Construction neuve ou rénovation, un toit n'est jamais seulement la couche que l'on voit depuis la rue. En dessous se trouvent le lattage, l'écran de sous-toiture, souvent une isolation, et toujours une charpente qui porte l'ensemble. Remplacer les tuiles et laisser le reste en l'état, c'est retrouver le même problème au même endroit dix ans plus tard. Nous relevons le toit dans son ensemble et vous disons ce qui doit réellement être refait — et ce qui tiendra encore trente ans.",
    en: 'New build or renovation, a roof is never just the layer you see from the street. Below it sit the battens, the underlay, often insulation, and always a timber structure carrying the whole load. Replace the tiles and leave the rest as it is, and the same problem returns in the same place within ten years. We survey the roof as one system and tell you what genuinely needs replacing — and what has another thirty years in it.',
  },

  symptoms: {
    title: {
      de: 'Wann Sie uns brauchen',
      fr: 'Quand nous appeler',
      en: 'When to call us',
    },
    intro: {
      de: 'Die meisten Dächer melden sich, bevor sie ausfallen. Diese Zeichen sind ernst zu nehmen:',
      fr: "La plupart des toits préviennent avant de lâcher. Ces signaux méritent d'être pris au sérieux :",
      en: 'Most roofs give warning before they fail. These signs are worth taking seriously:',
    },
    items: [
      {
        de: 'Ein Wasserfleck an der Zimmerdecke im Obergeschoss, der nach Westwind grösser wird.',
        fr: "Une auréole au plafond de l'étage, qui s'agrandit après un vent d'ouest.",
        en: 'A water stain on an upstairs ceiling that grows after a westerly wind.',
      },
      {
        de: 'Nach einem Sturm liegen Ziegel im Garten oder auf der Terrasse.',
        fr: 'Après une tempête, des tuiles se retrouvent dans le jardin ou sur la terrasse.',
        en: 'After a storm, tiles end up in the garden or on the terrace.',
      },
      {
        de: 'Von der Strasse aus sind Wellen, Senken oder verrutschte Reihen in der Dachfläche zu erkennen.',
        fr: 'Depuis la rue, on distingue des ondulations, des creux ou des rangs déplacés.',
        en: 'From the street you can see waves, dips or slipped courses in the roof surface.',
      },
      {
        de: 'Im Dachboden fallen bei Tageslicht helle Punkte auf, oder es riecht muffig nach Regen.',
        fr: 'Dans les combles, des points de lumière apparaissent en journée, ou une odeur de moisi persiste après la pluie.',
        en: 'In the loft, points of daylight show through, or it smells damp after rain.',
      },
      {
        de: 'Die Ziegelkanten platzen ab, oder auf der Nordseite hält dichtes Moos die Nässe fest.',
        fr: "Les bords des tuiles s'effritent, ou une mousse dense retient l'humidité au nord.",
        en: 'Tile edges are flaking, or thick moss on the north side is holding water against them.',
      },
      {
        de: 'Das Obergeschoss heizt sich im Sommer stark auf und lässt sich im Winter kaum warm halten.',
        fr: "L'étage surchauffe en été et se réchauffe difficilement en hiver.",
        en: 'The top floor overheats in summer and is hard to keep warm in winter.',
      },
      {
        de: 'Das Dach ist über vierzig Jahre alt und wurde nie grundlegend saniert.',
        fr: "Le toit a plus de quarante ans et n'a jamais été rénové en profondeur.",
        en: 'The roof is over forty years old and has never had a proper overhaul.',
      },
    ],
  },

  approach: {
    title: {
      de: 'Wie wir vorgehen',
      fr: 'Comment nous procédons',
      en: 'How we work',
    },
    body: [
      {
        de: 'Wir steigen aufs Dach und gehen auch in den Dachboden. Ein Dach lässt sich vom Boden aus nicht beurteilen — die Stellen, an denen Wasser eintritt, sind fast nie die Stellen, an denen der Fleck erscheint. Von innen sieht man an den Sparren, wie lange ein Schaden schon läuft.',
        fr: "Nous montons sur le toit et nous allons aussi dans les combles. Un toit ne se juge pas depuis le sol : l'endroit où l'eau entre n'est presque jamais celui où la tache apparaît. De l'intérieur, les chevrons montrent depuis combien de temps le dégât dure.",
        en: 'We get onto the roof and we also go into the loft. A roof cannot be judged from the ground — where the water gets in is almost never where the stain shows. From inside, the rafters tell you how long a leak has been running.',
      },
      {
        de: 'Der Dachstuhl wird zuerst geprüft: Sparren auf Fäulnis und Insektenbefall, die Auflager an der Mauerkrone, Durchbiegung im First. Ist das Holz gesund, bleibt es. Sind einzelne Sparren angegriffen, werden sie ausgetauscht oder beigelascht — ein kompletter neuer Dachstuhl ist bei einem gepflegten Altbau selten nötig.',
        fr: "La charpente est examinée en premier : chevrons attaqués par la pourriture ou les insectes, appuis sur l'arase, flèche au faîtage. Si le bois est sain, il reste. Si des chevrons sont touchés, ils sont remplacés ou moisés — une charpente entièrement neuve est rarement nécessaire sur une maison ancienne bien entretenue.",
        en: 'The structure is checked first: rafters for rot and insect damage, the bearings on the wall plate, any sag at the ridge. Sound timber stays. Where individual rafters are affected they are replaced or sistered — a complete new roof structure is rarely necessary on a well-kept older house.',
      },
      {
        de: 'Dann fällt die Entscheidung zwischen Umdeckung und Neueindeckung. Bei einer Umdeckung werden die Ziegel abgenommen, Lattung und Unterdeckbahn erneuert und die brauchbaren Ziegel wieder verlegt. Das lohnt sich, solange die Ziegel frostfest sind. Sind sie mürbe, wird neu eingedeckt — alles andere ist Geld, das man zweimal ausgibt.',
        fr: "Vient ensuite le choix entre reprise de couverture et couverture neuve. Dans le premier cas, les tuiles sont déposées, le lattage et l'écran de sous-toiture refaits, puis les tuiles réutilisables reposées. Cela vaut la peine tant que les tuiles résistent au gel. Si elles sont friables, on recouvre à neuf — sinon, c'est une dépense que l'on fait deux fois.",
        en: 'Then comes the choice between relaying and re-covering. Relaying means stripping the tiles, renewing the battens and underlay, and putting the sound tiles back. That is worth doing while the tiles are still frost-resistant. Once they are perished, the roof is re-covered — anything else is money spent twice.',
      },
      {
        de: 'Auf die Sparren kommt eine diffusionsoffene Unterdeckbahn, darauf Konterlattung und Traglattung. Diese Ebene ist die eigentliche zweite wasserführende Schicht. Sie ist unsichtbar, und sie ist der Grund, warum ein Dach einen abgehobenen Ziegel übersteht, ohne dass es im Haus tropft.',
        fr: "Sur les chevrons vient un écran de sous-toiture perméable à la vapeur, puis contre-lattage et lattage. Cette couche est le véritable second niveau d'étanchéité. Elle est invisible, et c'est elle qui permet à un toit de perdre une tuile sans que cela coule à l'intérieur.",
        en: 'A vapour-permeable underlay goes over the rafters, then counter-battens and battens. That layer is the roof’s real second line of defence. It is invisible, and it is why a roof can lose a tile without anything dripping indoors.',
      },
    ],
  },

  materials: {
    title: {
      de: 'Womit wir arbeiten',
      fr: 'Avec quoi nous travaillons',
      en: 'What we build with',
    },
    intro: {
      de: 'Welches Material passt, entscheidet die Dachneigung, der Bestand in der Strasse und was die Gemeinde zulässt — nicht der Katalog.',
      fr: "Le matériau adapté dépend de la pente, du bâti existant dans la rue et de ce que la commune autorise — pas du catalogue.",
      en: 'The right material is decided by the pitch, by what the street already looks like and by what the commune allows — not by a catalogue.',
    },
    items: [
      {
        name: { de: 'Tonziegel', fr: 'Tuiles en terre cuite', en: 'Clay tiles' },
        why: {
          de: 'Der Standard in Luxemburg. Frostfest, farbstabil, und einzelne Ziegel lassen sich jederzeit tauschen, ohne die Fläche zu öffnen. Falzziegel halten bei üblicher Neigung problemlos ein halbes Jahrhundert.',
          fr: "Le standard au Luxembourg. Résistantes au gel, stables en teinte, et remplaçables à l'unité sans ouvrir la surface. Sur une pente courante, une tuile à emboîtement tient sans peine un demi-siècle.",
          en: 'The standard in Luxembourg. Frost-resistant, colour-stable, and individual tiles can be swapped at any time without opening up the field. At a normal pitch, interlocking clay tiles will hold for half a century.',
        },
      },
      {
        name: { de: 'Betondachsteine', fr: 'Tuiles en béton', en: 'Concrete tiles' },
        why: {
          de: 'Günstiger in der Anschaffung, aber schwerer — der Dachstuhl muss die Last tragen können. Die Oberfläche verliert über die Jahre Farbe und wird rauer, was Moos begünstigt.',
          fr: "Moins chères à l'achat, mais plus lourdes — la charpente doit pouvoir encaisser la charge. La surface se décolore avec les années et devient rugueuse, ce qui favorise la mousse.",
          en: 'Cheaper to buy but heavier — the structure has to carry the load. The surface loses colour over the years and roughens, which encourages moss.',
        },
      },
      {
        name: { de: 'Naturschiefer', fr: 'Ardoise naturelle', en: 'Natural slate' },
        why: {
          de: 'Die längste Lebensdauer von allem, was auf ein Dach kommt, und in der Region seit jeher zu Hause. Aufwendiger zu verlegen und entsprechend teurer, dafür auch auf flacheren Neigungen und an Gauben und Türmen einsetzbar.',
          fr: "La plus longue durée de vie de tout ce qui se pose sur un toit, et une tradition régionale ancienne. Pose plus exigeante et donc plus coûteuse, mais utilisable sur des pentes plus faibles comme sur les lucarnes et les tourelles.",
          en: 'The longest-lived covering there is, and long at home in this region. More demanding to lay and priced accordingly, but it works on shallower pitches and on dormers and turrets where tiles will not.',
        },
      },
      {
        name: { de: 'Trapezblech und Stehfalz', fr: 'Bac acier et joint debout', en: 'Profiled steel and standing seam' },
        why: {
          de: 'Für Scheunen, Nebengebäude, Carports und flach geneigte Flächen, auf denen Ziegel nicht mehr sicher sind. Leicht, schnell verlegt, und in der Farbe frei wählbar.',
          fr: "Pour granges, dépendances, carports et faibles pentes où la tuile n'est plus fiable. Léger, rapide à poser, teinte libre.",
          en: 'For barns, outbuildings, carports and shallow pitches where tiles are no longer safe. Light, quick to lay, and available in any colour.',
        },
      },
      {
        name: { de: 'Konstruktionsvollholz', fr: 'Bois de charpente massif', en: 'Structural timber' },
        why: {
          de: 'Für ausgetauschte Sparren und Aufdopplungen. Technisch getrocknet, damit es sich nach dem Einbau nicht mehr verzieht — bei frischem Bauholz merkt man das ein Jahr später am First.',
          fr: "Pour les chevrons remplacés et les moisages. Séché en séchoir, afin qu'il ne travaille plus après la pose — avec du bois frais, cela se voit un an plus tard au faîtage.",
          en: 'For replaced rafters and doubling-up. Kiln-dried so it stops moving after installation — with green timber you see the difference at the ridge a year later.',
        },
      },
      {
        name: { de: 'Zink für Kehlen und Anschlüsse', fr: 'Zinc pour noues et raccords', en: 'Zinc for valleys and junctions' },
        why: {
          de: 'Überall dort, wo zwei Flächen zusammenlaufen oder ein Bauteil das Dach durchdringt. Zink lässt sich sauber an jede Form anpassen und hält länger als jede Dichtmasse.',
          fr: "Partout où deux pans se rejoignent ou qu'un élément traverse la toiture. Le zinc épouse proprement toutes les formes et dure plus longtemps que n'importe quel mastic.",
          en: 'Wherever two planes meet or something passes through the roof. Zinc can be dressed cleanly to any shape and outlasts any sealant.',
        },
      },
    ],
  },

  faq: [
    {
      question: {
        de: 'Wie lange dauert eine komplette Dachsanierung?',
        fr: 'Combien de temps dure une rénovation complète de toiture ?',
        en: 'How long does a full re-roofing take?',
      },
      answer: {
        de: 'Ein Einfamilienhaus mit Satteldach von etwa 120 Quadratmetern Dachfläche liegt bei trockener Witterung meist bei ein bis zwei Wochen reiner Arbeitszeit. Das Gerüst steht davor und danach jeweils ein paar Tage länger. Gauben, Kehlen und ein Dachstuhl, der Reparaturen braucht, verlängern das spürbar.',
        fr: "Une maison individuelle à deux pans d'environ 120 mètres carrés de toiture demande généralement une à deux semaines de travail effectif par temps sec. L'échafaudage reste quelques jours de plus avant et après. Les lucarnes, les noues et une charpente à reprendre allongent sensiblement ce délai.",
        en: 'A detached house with a gable roof of around 120 square metres usually takes one to two weeks of actual work in dry weather. The scaffold stands a few days longer at either end. Dormers, valleys and a structure needing repair extend that noticeably.',
      },
    },
    {
      question: {
        de: 'Müssen wir während der Arbeiten ausziehen?',
        fr: 'Devons-nous quitter la maison pendant les travaux ?',
        en: 'Do we have to move out while the work is done?',
      },
      answer: {
        de: 'Nein. Es wird nur so viel Dachfläche geöffnet, wie am selben Tag wieder regensicher geschlossen werden kann. Wohnräume direkt unter dem Dach sind während der Arbeiten staubig und laut — wer im Homeoffice arbeitet, plant das besser ein.',
        fr: "Non. Nous n'ouvrons que la surface que nous pouvons refermer à l'abri de la pluie le jour même. Les pièces situées directement sous le toit sont poussiéreuses et bruyantes pendant le chantier — à prévoir si vous travaillez à domicile.",
        en: 'No. We only open as much roof as can be made watertight again the same day. Rooms directly under the roof are dusty and loud while the work runs — worth planning around if you work from home.',
      },
    },
    {
      question: {
        de: 'Lohnt es sich, das Dach in Etappen zu sanieren?',
        fr: 'Est-il intéressant de rénover le toit par étapes ?',
        en: 'Is it worth doing the roof in stages?',
      },
      answer: {
        de: 'Meistens nicht. Das Gerüst muss dann zweimal gestellt werden, die Anschlüsse zwischen altem und neuem Teil sind zusätzliche Arbeit und zugleich die Stellen, an denen später am ehesten Wasser eintritt. Sinnvoll ist eine Etappierung, wenn zwei Gebäudeteile ohnehin baulich getrennt sind — etwa Haupthaus und Anbau.',
        fr: "En général, non. L'échafaudage doit être monté deux fois, les raccords entre partie ancienne et partie neuve représentent un travail supplémentaire et constituent justement les points où l'eau entrera le plus probablement. Le phasage a du sens lorsque deux volumes sont de toute façon séparés — maison principale et annexe, par exemple.",
        en: 'Usually not. The scaffold has to go up twice, the junction between old and new is extra work, and that junction is precisely where water is most likely to get in later. Staging makes sense when two parts of the building are structurally separate anyway — a main house and an extension, say.',
      },
    },
    {
      question: {
        de: 'Brauche ich eine Genehmigung der Gemeinde?',
        fr: "Faut-il une autorisation de la commune ?",
        en: 'Do I need permission from the commune?',
      },
      answer: {
        de: 'Wird in gleicher Form und gleicher Farbe eingedeckt, ist meist keine Baugenehmigung nötig. Sobald sich Dachform, Farbe oder Höhe ändern, Gauben oder Dachfenster dazukommen oder das Haus in einem geschützten Ortskern steht, sieht das anders aus — und jede Gemeinde regelt es etwas anders. Wir sagen Ihnen beim Termin, was in Ihrem Fall zu klären ist.',
        fr: "Si la couverture est refaite à forme et teinte identiques, aucune autorisation de bâtir n'est généralement requise. Dès que la forme, la couleur ou la hauteur changent, que des lucarnes ou des fenêtres de toit s'ajoutent, ou que la maison se trouve dans un secteur protégé, la situation diffère — et chaque commune l'encadre à sa manière. Lors de la visite, nous vous indiquons ce qui doit être clarifié dans votre cas.",
        en: 'Re-covering in the same shape and colour usually needs no building permission. As soon as shape, colour or height change, dormers or roof windows are added, or the house sits in a protected village centre, that changes — and every commune handles it slightly differently. At the visit we tell you what needs clarifying in your case.',
      },
    },
    {
      question: {
        de: 'Was ist, wenn unter der alten Eindeckung Asbest liegt?',
        fr: "Et s'il y a de l'amiante sous l'ancienne couverture ?",
        en: 'What if there is asbestos under the old covering?',
      },
      answer: {
        de: 'Bei Material, das vor 1990 verbaut wurde, ist das möglich — vor allem bei Wellplatten. Nehmen Sie nichts selbst ab und brechen Sie nichts. Der Verdacht wird vor Arbeitsbeginn abgeklärt, und die Entsorgung läuft über einen dafür zugelassenen Fachbetrieb. Das kostet zusätzlich, ist aber nicht verhandelbar.',
        fr: "Sur des matériaux posés avant 1990, c'est possible — en particulier les plaques ondulées. Ne déposez rien vous-même et ne cassez rien. Le doute est levé avant le début des travaux, et l'évacuation passe par une entreprise agréée. Cela représente un coût supplémentaire, mais ce n'est pas négociable.",
        en: 'With material laid before 1990 it is possible — corrugated sheeting in particular. Do not take anything down yourself and do not break anything. The question is settled before work starts, and disposal goes through a firm licensed for it. That costs extra and is not negotiable.',
      },
    },
  ],

  cta: {
    title: {
      de: 'Lassen Sie uns aufs Dach schauen',
      fr: 'Laissez-nous monter voir le toit',
      en: 'Let us take a look at the roof',
    },
    body: {
      de: 'Der Termin und die Anfahrt kosten nichts, auch wenn daraus kein Auftrag wird. Schreiben Sie kurz, was Ihnen aufgefallen ist, und hängen Sie zwei, drei Fotos an — dann wissen wir vorher, worum es geht.',
      fr: "La visite et le déplacement sont gratuits, même si cela ne débouche sur aucun chantier. Décrivez brièvement ce que vous avez remarqué et joignez deux ou trois photos — nous saurons ainsi de quoi il retourne avant même de venir.",
      en: 'The visit and the journey cost nothing, even if no job comes of it. Write a line about what you have noticed and attach two or three photos — then we know what we are looking at before we arrive.',
    },
  },
};
