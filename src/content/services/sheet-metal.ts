import type { ServiceContent } from './types';

export const sheetMetal: ServiceContent = {
  id: 'sheet-metal',

  meta: {
    de: {
      title: 'Spenglerei & Dachrinnen in Luxemburg',
      description:
        'Dachrinnen, Fallrohre, Kehlen und Wandanschlüsse in Zink oder Kupfer. Reparatur und Neuanfertigung im ganzen Grossherzogtum. Kostenloser Vor-Ort-Termin.',
    },
    fr: {
      title: 'Ferblanterie & gouttières au Luxembourg',
      description:
        "Gouttières, descentes, noues et raccords muraux en zinc ou en cuivre. Réparation et fabrication dans tout le Grand-Duché. Visite sur place gratuite.",
    },
    en: {
      title: 'Sheet metal & gutters in Luxembourg',
      description:
        'Gutters, downpipes, valleys and wall junctions in zinc or copper. Repair and fabrication across Luxembourg. Free site visit.',
    },
  },

  intro: {
    de: 'Alles am Dach, was aus Metall ist: Rinnen, Fallrohre, Kehlen, Wandanschlüsse und Ortgangbleche.',
    fr: "Tout ce qui est en métal sur un toit : gouttières, descentes, noues, raccords muraux et bandes de rive.",
    en: 'Everything metal on a roof: gutters, downpipes, valleys, wall junctions and verge flashings.',
  },

  lead: {
    de: 'Die Spenglerarbeiten sind der am meisten unterschätzte Teil eines Daches. Die Ziegelfläche selbst wird fast nie undicht — Wasser kommt dort ins Haus, wo zwei Bauteile aufeinandertreffen: an der Kehle zwischen zwei Dachflächen, am Anschluss zur Hauswand, an der Traufe. Das sind Zentimeter, nicht Quadratmeter, und sie entscheiden darüber, ob ein Dach vierzig Jahre trocken bleibt oder nach fünfzehn den Dachstuhl mitnimmt.',
    fr: "La ferblanterie est la partie la plus sous-estimée d'une toiture. La surface de tuiles ne fuit presque jamais : l'eau entre là où deux éléments se rencontrent — dans la noue entre deux pans, au raccord avec le mur, à l'égout. On parle de centimètres, pas de mètres carrés, et ce sont eux qui décident si un toit reste sec quarante ans ou s'il emporte la charpente au bout de quinze.",
    en: 'Sheet metal is the most underrated part of a roof. The tiled field itself almost never leaks — water gets into a house where two elements meet: the valley between two roof planes, the junction with a wall, the eaves. That is centimetres, not square metres, and it decides whether a roof stays dry for forty years or takes the structure with it after fifteen.',
  },

  symptoms: {
    title: { de: 'Wann Sie uns brauchen', fr: 'Quand nous appeler', en: 'When to call us' },
    intro: {
      de: 'Fast alles davon sieht man vom Boden aus — man muss nur wissen, worauf zu achten ist:',
      fr: "Presque tout cela se voit depuis le sol — encore faut-il savoir quoi regarder :",
      en: 'Almost all of this is visible from the ground — you only need to know what to look for:',
    },
    items: [
      {
        de: 'Bei Regen läuft Wasser an der Hauswand herunter statt durch das Fallrohr, und der Putz darunter ist dauerhaft dunkel.',
        fr: "Sous la pluie, l'eau ruisselle sur le mur au lieu de descendre dans la gouttière, et l'enduit reste sombre en dessous.",
        en: 'In rain, water runs down the wall instead of through the downpipe, and the render below stays permanently dark.',
      },
      {
        de: 'Die Rinne läuft an einer bestimmten Stelle über, auch bei mässigem Regen — ein Zeichen für fehlendes Gefälle oder eine verstopfte Stelle.',
        fr: "La gouttière déborde toujours au même endroit, même par pluie modérée — signe d'une pente insuffisante ou d'un point obstrué.",
        en: 'The gutter overflows at one particular point even in moderate rain — a sign of lost fall or a blockage.',
      },
      {
        de: 'Unter der Rinne zieht sich ein grüner oder rostbrauner Streifen über die Fassade.',
        fr: "Sous la gouttière, une traînée verte ou rouille descend le long de la façade.",
        en: 'A green or rust-brown streak runs down the façade beneath the gutter.',
      },
      {
        de: 'Im Winter bilden sich immer an derselben Stelle Eiszapfen, während der Rest der Traufe frei bleibt.',
        fr: "En hiver, des stalactites se forment toujours au même endroit alors que le reste de l'égout reste libre.",
        en: 'Icicles form in the same place every winter while the rest of the eaves stays clear.',
      },
      {
        de: 'Bei Starkregen steht Wasser am Kellerabgang oder auf der Terrasse — das Fallrohr bringt die Menge nicht weg.',
        fr: "Lors de fortes pluies, l'eau stagne devant la descente de cave ou sur la terrasse — la descente n'évacue pas le débit.",
        en: 'In heavy rain, water stands at the cellar steps or on the terrace — the downpipe cannot take the volume.',
      },
      {
        de: 'Das Fallrohr gluckert oder bleibt bei Regen ganz still, obwohl die Rinne voll ist.',
        fr: 'La descente glougloute, ou reste silencieuse alors que la gouttière est pleine.',
        en: 'The downpipe gurgles, or stays silent while the gutter is full.',
      },
      {
        de: 'Im Dachboden zeigen sich Wasserspuren entlang der Kehle zwischen zwei Dachflächen oder am Übergang zur Hauswand.',
        fr: "Dans les combles, des traces d'eau apparaissent le long de la noue entre deux pans ou au raccord avec le mur.",
        en: 'In the loft, water marks appear along the valley between two roof planes or where the roof meets a wall.',
      },
    ],
  },

  approach: {
    title: { de: 'Wie wir vorgehen', fr: 'Comment nous procédons', en: 'How we work' },
    body: [
      {
        de: 'Zuerst wird das Gefälle geprüft, denn das ist die häufigste Ursache. Eine Dachrinne muss durchgehend zum Fallrohr fallen — wenige Millimeter je Meter reichen, aber sie müssen da sein. Alte Rinnenhalter geben über die Jahre nach, meist ungleichmässig, und dann steht das Wasser in der Mitte, statt abzulaufen. Eine Rinne, die an einer Stelle überläuft, ist selten zu klein und fast immer falsch aufgehängt.',
        fr: "On vérifie d'abord la pente, car c'est la cause la plus fréquente. Une gouttière doit descendre régulièrement vers la descente — quelques millimètres par mètre suffisent, mais ils doivent être là. Les crochets se déforment avec les années, rarement de façon régulière, et l'eau stagne au milieu au lieu de s'écouler. Une gouttière qui déborde à un endroit est rarement trop petite : elle est presque toujours mal posée.",
        en: 'We check the fall first, because that is the most common cause. A gutter has to run continuously toward the downpipe — a few millimetres per metre is enough, but it has to be there. Old brackets give way over the years, usually unevenly, and then the water sits in the middle instead of running off. A gutter that overflows in one place is rarely too small; it is almost always hung wrong.',
      },
      {
        de: 'Dann folgt die ganze Kette: Rinne, Halter, Rinnenstutzen, Fallrohr, Bogen, und der Übergang in die Grundleitung im Erdreich. Bei einem Rückstau nützt die schönste neue Rinne nichts, wenn unten das Rohr voll Wurzeln ist. Der Übergang ist die Stelle, die am seltensten kontrolliert wird und am häufigsten der eigentliche Grund ist.',
        fr: "Vient ensuite toute la chaîne : gouttière, crochets, naissance, descente, coudes, et le raccordement à la canalisation enterrée. En cas de refoulement, la plus belle gouttière neuve ne sert à rien si le tuyau du bas est colonisé par des racines. Ce raccordement est le point le moins souvent contrôlé et le plus souvent en cause.",
        en: 'Then comes the whole chain: gutter, brackets, outlet, downpipe, bends, and the transition into the drain below ground. Where there is a backup, the finest new gutter is useless if the pipe underneath is full of roots. That transition is the least often inspected point and the most often the real reason.',
      },
      {
        de: 'Zink wird gelötet, nicht geklebt. Eine mit Dichtmasse geflickte Naht hält einen Sommer und reisst beim ersten Frost wieder auf, weil sich Metall und Masse unterschiedlich stark ausdehnen. Eine gelötete Naht ist so dicht wie das Blech selbst und hält genauso lange. Das ist der Unterschied zwischen einer Reparatur und einer Verzögerung.',
        fr: "Le zinc se soude, il ne se colle pas. Une soudure rafistolée au mastic tient un été et se rouvre au premier gel, parce que le métal et le mastic ne se dilatent pas de la même façon. Une soudure à l'étain est aussi étanche que la tôle elle-même et dure aussi longtemps. C'est la différence entre une réparation et un report.",
        en: 'Zinc is soldered, not glued. A seam patched with sealant lasts one summer and reopens at the first frost, because metal and sealant expand at different rates. A soldered seam is as tight as the sheet itself and lasts just as long. That is the difference between a repair and a postponement.',
      },
      {
        de: 'Kehlen bekommen eine eingelegte Zinkkehle mit ausreichender Breite und aufgekantetem Rand. Wird sie zu schmal ausgeführt, schiesst das Wasser bei Starkregen darüber hinaus und unter die Ziegel — ein Fehler, der jahrelang unbemerkt bleibt und den Dachstuhl von innen aufarbeitet.',
        fr: "Les noues reçoivent une bande de zinc de largeur suffisante, à bords relevés. Trop étroite, l'eau la franchit lors de fortes pluies et passe sous les tuiles — une erreur qui reste invisible des années et qui attaque la charpente de l'intérieur.",
        en: 'Valleys get a laid-in zinc valley of adequate width with upstands. Made too narrow, water shoots past it in heavy rain and runs under the tiles — a fault that goes unnoticed for years while it works on the structure from inside.',
      },
    ],
  },

  materials: {
    title: { de: 'Womit wir arbeiten', fr: 'Avec quoi nous travaillons', en: 'What we build with' },
    intro: {
      de: 'Bei Metall am Dach gilt eine Regel vor allen anderen: nicht mischen. Welche Materialien zusammen verbaut werden, entscheidet oft mehr über die Lebensdauer als die Qualität des einzelnen Stücks.',
      fr: "Pour le métal en toiture, une règle prime sur toutes les autres : ne pas mélanger. La combinaison des matériaux détermine souvent la durée de vie davantage que la qualité de chaque pièce.",
      en: 'With metal on a roof one rule outranks all the others: do not mix. Which materials sit together often decides service life more than the quality of any single piece.',
    },
    items: [
      {
        name: { de: 'Titanzink', fr: 'Zinc-titane', en: 'Titanium zinc' },
        why: {
          de: 'Der Standard und für die meisten Häuser die richtige Wahl. Patiniert zu einem gleichmässigen Grau, ist lötbar, lässt sich vor Ort an jede Form anpassen und hält bei ordentlicher Belüftung von unten rund fünfzig Jahre.',
          fr: "Le standard, et le bon choix pour la plupart des maisons. Il patine en un gris régulier, se soude, s'adapte sur place à toutes les formes et tient une cinquantaine d'années s'il est correctement ventilé par-dessous.",
          en: 'The standard, and the right choice for most houses. It weathers to an even grey, takes solder, can be dressed to any shape on site, and lasts around fifty years given proper ventilation from below.',
        },
      },
      {
        name: { de: 'Kupfer', fr: 'Cuivre', en: 'Copper' },
        why: {
          de: 'Teurer in der Anschaffung, dafür praktisch unbegrenzt haltbar. Die grüne Patina bildet sich über Jahrzehnte und schützt das Metall darunter. Sinnvoll bei denkmalgeschützten Gebäuden und dort, wo das Blech ohnehin sichtbar ist.',
          fr: "Plus cher à l'achat, mais d'une durée de vie pratiquement illimitée. La patine verte se forme sur des décennies et protège le métal en dessous. Pertinent sur le bâti protégé et là où la tôle reste visible.",
          en: 'More expensive to buy, but effectively unlimited in service life. The green patina forms over decades and protects the metal beneath. Worth it on listed buildings and wherever the metal is on show anyway.',
        },
      },
      {
        name: { de: 'Beschichtetes Stahlblech', fr: 'Acier laqué', en: 'Coated steel' },
        why: {
          de: 'Die günstigere Variante, in vielen Farben erhältlich und damit passend zu Fensterrahmen oder Fassade. Die Beschichtung ist die Schutzschicht — wird sie beschädigt, rostet es genau dort.',
          fr: "La variante économique, disponible en de nombreuses teintes, donc accordable aux menuiseries ou à la façade. Le laquage est la protection : s'il est entaillé, la rouille démarre exactement là.",
          en: 'The cheaper option, available in many colours and so matchable to window frames or the façade. The coating is the protection — damage it and rust starts exactly there.',
        },
      },
      {
        name: { de: 'Bleiersatz für Anschlüsse', fr: 'Bandes souples pour raccords', en: 'Lead-substitute flashing' },
        why: {
          de: 'Für Anschlüsse an unebenes Mauerwerk und um Durchdringungen herum. Lässt sich von Hand in jede Kontur drücken und behält die Form — dort, wo ein starres Blech immer eine Fuge lassen würde.',
          fr: "Pour les raccords sur maçonnerie irrégulière et autour des pénétrations. Se façonne à la main dans tous les reliefs et garde la forme — là où une tôle rigide laisserait toujours un jour.",
          en: 'For junctions against uneven masonry and around penetrations. It can be pressed into any contour by hand and holds the shape — where a rigid sheet would always leave a gap.',
        },
      },
      {
        name: { de: 'Kunststoffrinnen', fr: 'Gouttières PVC', en: 'PVC gutters' },
        why: {
          de: 'Am günstigsten, aber mit starker Wärmedehnung: bei langen Strecken arbeiten die Stösse hörbar und werden mit der Zeit undicht. Für Gartenhäuser und Carports in Ordnung, am Wohnhaus selten die bessere Rechnung.',
          fr: "Les moins chères, mais très dilatables : sur de grandes longueurs, les jonctions travaillent de façon audible et finissent par fuir. Acceptable pour un abri de jardin ou un carport, rarement le meilleur calcul sur une maison.",
          en: 'The cheapest, but with strong thermal movement: over long runs the joints work audibly and eventually leak. Fine on a garden shed or carport, rarely the better sum on a house.',
        },
      },
    ],
  },

  faq: [
    {
      question: {
        de: 'Wie oft muss eine Dachrinne gereinigt werden?',
        fr: 'À quelle fréquence faut-il nettoyer une gouttière ?',
        en: 'How often does a gutter need cleaning?',
      },
      answer: {
        de: 'Einmal im Jahr nach dem Laubfall reicht bei den meisten Häusern. Stehen Bäume direkt über dem Dach, sind zwei Durchgänge sinnvoll — einer im Frühsommer nach der Blüte, einer im November. Wichtiger als die Häufigkeit ist der Zeitpunkt: eine Rinne, die mit nassem Laub in den Frost geht, wird von innen aufgesprengt.',
        fr: "Une fois par an après la chute des feuilles suffit pour la plupart des maisons. Si des arbres surplombent le toit, deux passages sont utiles — un début d'été après la floraison, un en novembre. Le moment compte plus que la fréquence : une gouttière qui aborde le gel pleine de feuilles humides éclate de l'intérieur.",
        en: 'Once a year after leaf fall is enough for most houses. Where trees stand directly over the roof, two visits make sense — one in early summer after blossom, one in November. Timing matters more than frequency: a gutter that goes into frost full of wet leaves is split open from inside.',
      },
    },
    {
      question: {
        de: 'Kann eine alte Rinne repariert werden oder muss sie ersetzt werden?',
        fr: 'Peut-on réparer une vieille gouttière ou faut-il la remplacer ?',
        en: 'Can an old gutter be repaired, or does it have to be replaced?',
      },
      answer: {
        de: 'Einzelne undichte Nähte lassen sich löten, solange das Blech insgesamt gesund ist. Ist der Rinnenboden durchgerostet, das Zink kreidig und mit dem Fingernagel abriebfähig, oder sind die Halter grossflächig durchgebogen, lohnt Flicken nicht mehr — dann kostet die Reparatur ein Drittel der Erneuerung und hält ein Zehntel so lange.',
        fr: "Des soudures ponctuelles se reprennent tant que la tôle est globalement saine. Si le fond est percé, si le zinc est farineux et s'effrite à l'ongle, ou si les crochets sont affaissés sur une grande longueur, la réparation n'a plus de sens : elle coûte un tiers du remplacement et dure dix fois moins.",
        en: 'Individual leaking seams can be soldered while the sheet is otherwise sound. Once the base is rusted through, the zinc is chalky and rubs off under a fingernail, or the brackets have sagged over a long run, patching stops paying: it costs a third of a replacement and lasts a tenth as long.',
      },
    },
    {
      question: {
        de: 'Dürfen Kupfer und Zink am selben Dach verbaut werden?',
        fr: 'Peut-on associer cuivre et zinc sur un même toit ?',
        en: 'Can copper and zinc be used on the same roof?',
      },
      answer: {
        de: 'Nicht übereinander. Regenwasser, das über Kupfer läuft, nimmt Kupferionen mit; treffen die auf Zink weiter unten, zersetzt sich das Zink innerhalb weniger Jahre. Eine Kupferrinne unter einem Kupferdach ist richtig, eine Zinkrinne darunter ist ein Schaden mit Ankündigung. Umgekehrt ist es unproblematisch.',
        fr: "Pas l'un au-dessus de l'autre. L'eau de pluie qui ruisselle sur le cuivre emporte des ions cuivre ; s'ils atteignent du zinc en aval, celui-ci se décompose en quelques années. Une gouttière en cuivre sous un toit en cuivre est correcte ; une gouttière en zinc dessous est un sinistre annoncé. L'inverse ne pose pas de problème.",
        en: 'Not one above the other. Rainwater running over copper carries copper ions with it; where those reach zinc further down, the zinc breaks down within a few years. A copper gutter under a copper roof is right; a zinc gutter under one is damage with advance notice. The other way round is harmless.',
      },
    },
    {
      question: {
        de: 'Sind Laubschutzgitter sinnvoll?',
        fr: 'Les grilles anti-feuilles sont-elles utiles ?',
        en: 'Are leaf guards worth fitting?',
      },
      answer: {
        de: 'Unter Bäumen ja, sonst meistens nicht. Ein Gitter hält grobes Laub oben, lässt aber Nadeln, Blütenreste und Feinmaterial durch — und muss selbst abgekehrt werden, sonst bildet sich darauf eine Matte, über die das Wasser einfach hinwegläuft. Wir sagen beim Termin, ob es sich in Ihrem Fall rechnet.',
        fr: "Sous des arbres, oui ; ailleurs, rarement. Une grille retient les grosses feuilles mais laisse passer aiguilles, résidus de floraison et fines — et doit elle-même être balayée, faute de quoi un tapis se forme dessus et l'eau passe simplement par-dessus. Lors de la visite, nous vous disons si cela vaut la peine chez vous.",
        en: 'Under trees, yes; otherwise usually not. A guard holds back coarse leaves but lets needles, blossom and fine debris through — and has to be swept itself, or a mat forms on top and the water simply runs over it. At the visit we say whether it pays in your case.',
      },
    },
  ],

  cta: {
    title: {
      de: 'Zeigen Sie uns, wo das Wasser hinläuft',
      fr: "Montrez-nous où l'eau s'en va",
      en: 'Show us where the water is going',
    },
    body: {
      de: 'Ein Foto der Fassade unter der Rinne bei Regen sagt uns oft schon, worum es geht. Termin und Anfahrt kosten nichts.',
      fr: "Une photo de la façade sous la gouttière par temps de pluie nous en dit souvent déjà long. La visite et le déplacement sont gratuits.",
      en: 'A photo of the wall beneath the gutter while it is raining often tells us most of the story. The visit and the journey cost nothing.',
    },
  },
};
