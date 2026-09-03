import type { ServiceContent } from './types';

export const other: ServiceContent = {
  id: 'other',

  meta: {
    de: {
      title: 'Terrassenreinigung & weitere Arbeiten — Luxemburg',
      description:
        'Terrassen, Wege und Pflasterflächen reinigen, Nebendächer und Anschlüsse instand setzen. Alles, wofür ohnehin Gerüst, Hebebühne und Hochdruck vor Ort sind.',
    },
    fr: {
      title: 'Nettoyage de terrasses & autres travaux — Luxembourg',
      description:
        "Nettoyage de terrasses, allées et surfaces pavées, remise en état de petites toitures et de raccords. Tout ce pour quoi échafaudage, nacelle et haute pression sont déjà sur place.",
    },
    en: {
      title: 'Terrace cleaning & further work — Luxembourg',
      description:
        'Cleaning terraces, paths and paved areas, repairing small roofs and junctions. Everything the scaffold, lift and pressure washer are already on site for.',
    },
  },

  intro: {
    de: 'Terrassen, Wege und Pflasterflächen reinigen — und die kleinen Dächer, an die sonst niemand herangeht.',
    fr: "Nettoyer terrasses, allées et surfaces pavées — et s'occuper des petites toitures dont personne ne veut.",
    en: 'Cleaning terraces, paths and paved areas — and the small roofs nobody else wants to touch.',
  },

  lead: {
    de: 'Manches gehört nicht ins Leistungsverzeichnis, wird aber ständig gebraucht. Eine Terrasse, die nach dem Winter grün und rutschig ist. Das Dach vom Carport, das seit zwei Jahren tropft. Ein Anschluss am Anbau, für den kein Gewerk sich zuständig fühlt. Für solche Arbeiten sind wir ohnehin ausgerüstet — Hochdruck, Absturzsicherung und Hebebühne stehen ohnehin auf dem Fahrzeug —, und sie lassen sich meist zusammen mit einem anderen Termin erledigen, statt dafür eigens jemanden kommen zu lassen.',
    fr: "Certaines choses ne figurent dans aucun descriptif et sont pourtant constamment nécessaires. Une terrasse verte et glissante après l'hiver. Le toit du carport qui goutte depuis deux ans. Un raccord sur l'annexe dont aucun corps de métier ne se sent responsable. Pour ces travaux, nous sommes de toute façon équipés — haute pression, sécurité antichute et nacelle sont déjà sur le véhicule — et ils se règlent le plus souvent en même temps qu'un autre rendez-vous, plutôt que de faire venir quelqu'un exprès.",
    en: 'Some jobs appear on nobody’s service list and are constantly needed. A terrace that is green and slippery after winter. The carport roof that has been dripping for two years. A junction on the extension that no trade feels responsible for. We are equipped for this work anyway — the pressure washer, fall protection and lift are already on the van — and it can usually be done alongside another appointment rather than calling someone out specially.',
  },

  symptoms: {
    title: { de: 'Wofür Sie uns rufen können', fr: 'Ce pour quoi vous pouvez nous appeler', en: 'What you can call us for' },
    intro: {
      de: 'Wenn Sie unsicher sind, ob es zu uns gehört: fragen Sie. Gehört es nicht zu uns, sagen wir es Ihnen.',
      fr: "Si vous ne savez pas si cela relève de nous, demandez. Si ce n'est pas le cas, nous vous le dirons.",
      en: 'If you are not sure whether it is our job, ask. If it is not, we will tell you.',
    },
    items: [
      {
        de: 'Die Terrasse ist nach dem Winter grün, dunkel und bei Nässe rutschig.',
        fr: "La terrasse est verte et sombre après l'hiver, et glissante par temps humide.",
        en: 'The terrace is green and dark after winter, and slippery when wet.',
      },
      {
        de: 'Zwischen den Pflastersteinen wächst Moos, und der Fugensand ist grösstenteils ausgespült.',
        fr: "De la mousse pousse entre les pavés et le sable de jointoiement est en grande partie lessivé.",
        en: 'Moss is growing between the pavers and most of the jointing sand has washed out.',
      },
      {
        de: 'Das Dach von Carport, Gartenhaus oder Anbau ist undicht, aber für eine grosse Firma zu klein.',
        fr: "Le toit du carport, de l'abri de jardin ou de l'annexe fuit, mais le chantier est trop petit pour une grande entreprise.",
        en: 'The roof of a carport, garden house or extension leaks, but the job is too small for a big firm.',
      },
      {
        de: 'Ein Vordach oder eine Balkonabdeckung ist undicht oder das Blech darunter ist durchgerostet.',
        fr: "Un auvent ou une couverture de balcon fuit, ou la tôle en dessous est percée par la rouille.",
        en: 'A porch roof or balcony cover leaks, or the sheet metal beneath has rusted through.',
      },
      {
        de: 'Der Anschluss zwischen Anbau und Hauswand zieht Feuchtigkeit, seit der Anbau steht.',
        fr: "Le raccord entre l'annexe et le mur de la maison prend l'humidité depuis sa construction.",
        en: 'The junction between an extension and the house wall has drawn damp ever since the extension went up.',
      },
      {
        de: 'Sie haben ohnehin einen Termin bei uns und möchten die Terrasse gleich mitmachen lassen.',
        fr: "Vous avez déjà un rendez-vous avec nous et souhaitez faire nettoyer la terrasse dans la foulée.",
        en: 'You already have an appointment with us and want the terrace done at the same time.',
      },
    ],
  },

  approach: {
    title: { de: 'Wie wir vorgehen', fr: 'Comment nous procédons', en: 'How we work' },
    body: [
      {
        de: 'Bei Bodenbelägen entscheidet das Material über das Verfahren, nicht die Verschmutzung. Betonstein und Klinker vertragen Druck, Naturstein je nach Sorte deutlich weniger, und bei Holz führt zu hoher Druck dazu, dass die weichen Jahresringe herausgewaschen werden und die Fläche danach faserig ist — sie sieht am selben Tag sauber aus und ist im nächsten Jahr in schlechterem Zustand als vorher.',
        fr: "Pour les revêtements de sol, c'est le matériau qui détermine la méthode, pas l'encrassement. Le béton et le klinker supportent la pression, la pierre naturelle beaucoup moins selon les variétés, et sur le bois une pression trop forte creuse les cernes tendres : la surface paraît propre le jour même et se retrouve, un an plus tard, en plus mauvais état qu'avant.",
        en: 'With paving, the material decides the method, not the dirt. Concrete and clay pavers take pressure; natural stone much less so depending on the type; and on timber, too much pressure washes out the soft growth rings and leaves the surface fibrous — it looks clean the same day and is in worse condition a year later than before.',
      },
      {
        de: 'Nach der Reinigung einer Pflasterfläche fehlt fast immer Fugensand, denn der wird mit ausgespült. Bleibt er weg, verlieren die Steine ihre gegenseitige Verzahnung, kippen unter Last und die Fläche wird über wenige Jahre wellig. Neu einkehren gehört deshalb dazu und ist kein Zusatz.',
        fr: "Après le nettoyage d'une surface pavée, il manque presque toujours du sable de joint, entraîné par le rinçage. S'il n'est pas remis, les pavés perdent leur imbrication, basculent sous charge et la surface ondule en quelques années. Le regarnissage fait donc partie de la prestation, ce n'est pas un supplément.",
        en: 'After cleaning a paved area, jointing sand is almost always missing, because it washes out with everything else. Leave it out and the pavers lose their interlock, tip under load, and the surface goes wavy within a few years. Re-sanding is therefore part of the job, not an extra.',
      },
      {
        de: 'Bei kleinen Dächern — Carport, Gartenhaus, Vordach — ist die Frage fast immer dieselbe: flicken oder neu machen. Bei Bitumenbahnen, die spröde geworden sind und an den Nähten aufstehen, hält eine Reparatur eine Saison. Bei einer intakten Bahn mit einem einzelnen mechanischen Schaden ist Flicken die richtige Antwort. Wir sagen Ihnen, welcher Fall vorliegt, auch wenn die kleinere Rechnung für uns die uninteressantere ist.',
        fr: "Sur les petites toitures — carport, abri, auvent — la question est presque toujours la même : réparer ou refaire. Sur des membranes bitumineuses devenues cassantes et décollées aux recouvrements, une réparation tient une saison. Sur une membrane saine avec un seul dommage mécanique, la réparation est la bonne réponse. Nous vous disons dans quel cas vous êtes, même si la facture la plus faible est pour nous la moins intéressante.",
        en: 'On small roofs — carport, garden house, porch — the question is nearly always the same: patch or replace. Where bitumen sheeting has gone brittle and is lifting at the laps, a repair lasts one season. Where the sheet is sound and there is a single mechanical injury, patching is the right answer. We tell you which case yours is, even when the smaller invoice is the less interesting one for us.',
      },
      {
        de: 'Anschlüsse zwischen einem Anbau und der Hauswand sind ein klassischer Fall von niemandes Zuständigkeit — der Rohbauer sagt Dachdecker, der Dachdecker sagt Fassade. Technisch ist es ein Wandanschluss wie am Kamin: Blech in eine gefräste Nut, Kappleiste darüber, elastische Fuge als zweite Sicherung. Das gehört zu uns.',
        fr: "Les raccords entre une annexe et le mur de la maison relèvent classiquement de personne : le maçon dit couvreur, le couvreur dit façade. Techniquement, c'est un raccord mural comme à la cheminée : tôle engravée dans une saignée, couvre-joint par-dessus, joint souple en seconde sécurité. Cela relève de nous.",
        en: 'Junctions between an extension and the house wall are a classic case of nobody’s job — the builder says roofer, the roofer says façade. Technically it is a wall junction like the one at a chimney: metal let into a cut chase, a cover flashing over it, a flexible joint as the second line of defence. That is ours.',
      },
    ],
  },

  materials: {
    title: { de: 'Womit wir arbeiten', fr: 'Avec quoi nous travaillons', en: 'What we work with' },
    intro: {
      de: 'Für diese Arbeiten braucht es wenig, aber das Richtige:',
      fr: 'Ces travaux demandent peu de choses, mais les bonnes :',
      en: 'This work needs few things, but the right ones:',
    },
    items: [
      {
        name: { de: 'Flächenreiniger statt Punktstrahl', fr: 'Nettoyeur de surface plutôt que jet ponctuel', en: 'Surface cleaner rather than a point jet' },
        why: {
          de: 'Ein rotierender Flächenreiniger arbeitet gleichmässig und hinterlässt keine Streifen. Der freie Strahl aus der Lanze ist schneller, zeichnet aber jede Bahn dauerhaft in den Stein.',
          fr: "Un nettoyeur de surface rotatif travaille uniformément et ne laisse pas de traces. Le jet libre de la lance va plus vite mais grave durablement chaque passage dans la pierre.",
          en: 'A rotating surface cleaner works evenly and leaves no stripes. The free jet from a lance is faster but writes every pass permanently into the stone.',
        },
      },
      {
        name: { de: 'Fugensand mit passender Körnung', fr: 'Sable de joint à granulométrie adaptée', en: 'Jointing sand of the right grade' },
        why: {
          de: 'Zu grob füllt die Fuge nicht bis unten, zu fein wird beim nächsten Starkregen wieder ausgespült. Die Körnung richtet sich nach der Fugenbreite, nicht nach dem, was gerade im Fahrzeug liegt.',
          fr: "Trop grossier, il ne remplit pas le joint jusqu'en bas ; trop fin, il repart au prochain orage. La granulométrie dépend de la largeur du joint, pas de ce qui traîne dans le véhicule.",
          en: 'Too coarse and it does not fill the joint to the bottom; too fine and it washes out in the next downpour. The grade follows the joint width, not whatever happens to be on the van.',
        },
      },
      {
        name: { de: 'Bitumenschweissbahn', fr: 'Membrane bitumineuse soudable', en: 'Torch-on bitumen membrane' },
        why: {
          de: 'Für Nebendächer mit geringer Neigung die bewährte Lösung. Verschweisste Nähte sind der Unterschied zwischen einer Abdichtung und einer Bahn, die im dritten Sommer an den Rändern aufsteht.',
          fr: "Sur les petites toitures à faible pente, la solution éprouvée. Les recouvrements soudés font la différence entre une étanchéité et une membrane qui se décolle aux bords le troisième été.",
          en: 'The proven answer for low-pitched secondary roofs. Welded laps are the difference between waterproofing and a sheet that lifts at the edges in its third summer.',
        },
      },
      {
        name: { de: 'Wandanschlussblech und Kappleiste', fr: 'Bavette et couvre-joint', en: 'Wall flashing and cover flashing' },
        why: {
          de: 'Dasselbe Prinzip wie am Kamin, nur eine Etage tiefer. Ein Anschluss, der nur verklebt ist, löst sich mit der ersten Setzung im Anbau.',
          fr: "Le même principe qu'à la cheminée, un étage plus bas. Un raccord seulement collé se décolle au premier tassement de l'annexe.",
          en: 'The same principle as at the chimney, one storey lower. A junction that is only glued lets go at the extension’s first settlement.',
        },
      },
    ],
  },

  faq: [
    {
      question: {
        de: 'Wird meine Terrasse durch die Reinigung beschädigt?',
        fr: 'Le nettoyage risque-t-il d’abîmer ma terrasse ?',
        en: 'Will cleaning damage my terrace?',
      },
      answer: {
        de: 'Nicht, wenn das Verfahren zum Material passt. Bei Betonstein ist der Spielraum gross, bei weichem Naturstein und bei Holz ist er klein. Sagen Sie am Telefon, welchen Belag Sie haben — oder schicken Sie ein Foto aus der Nähe. Bei sehr weichen Sandsteinen raten wir manchmal ganz von Hochdruck ab.',
        fr: "Pas si la méthode correspond au matériau. Sur le béton, la marge est large ; sur une pierre naturelle tendre et sur le bois, elle est étroite. Indiquez-nous par téléphone le type de revêtement, ou envoyez une photo rapprochée. Sur certains grès très tendres, il nous arrive de déconseiller totalement la haute pression.",
        en: 'Not if the method matches the material. With concrete there is plenty of latitude; with soft natural stone and with timber there is very little. Tell us on the phone what surface you have, or send a close-up photo. On very soft sandstones we sometimes advise against pressure washing altogether.',
      },
    },
    {
      question: {
        de: 'Machen Sie auch kleine Aufträge?',
        fr: 'Acceptez-vous aussi les petits chantiers ?',
        en: 'Do you take on small jobs?',
      },
      answer: {
        de: 'Ja. Am wirtschaftlichsten wird es, wenn wir ohnehin in der Nähe sind oder bei Ihnen schon etwas anderes anstehen — dann läuft die Anfahrt nicht zweimal. Fragen Sie einfach; wenn wir einen passenden Termin haben, sagen wir es Ihnen.',
        fr: "Oui. C'est le plus économique lorsque nous sommes déjà dans le secteur ou qu'un autre travail est prévu chez vous — le déplacement ne compte alors qu'une fois. Demandez simplement ; si nous avons une date qui s'y prête, nous vous le dirons.",
        en: 'Yes. It works out best when we are nearby anyway or something else is already planned at your place — then the journey only happens once. Just ask; if we have an appointment that fits, we will say so.',
      },
    },
    {
      question: {
        de: 'Reinigen Sie auch Fassaden?',
        fr: 'Nettoyez-vous aussi les façades ?',
        en: 'Do you clean façades as well?',
      },
      answer: {
        de: 'Fassadenflächen sind ein eigenes Thema, weil Putz und Anstrich anders reagieren als ein Bodenbelag und weil Wasser hinter die Fassade laufen kann. Was wir übernehmen, sind die Anschlüsse und Bleche im Übergang zum Dach. Für eine komplette Fassadenreinigung fragen Sie besser jemanden, der das täglich macht.',
        fr: "Les façades sont un sujet à part, car enduit et peinture réagissent autrement qu'un sol et l'eau peut passer derrière le parement. Ce que nous prenons en charge, ce sont les raccords et les tôles à la jonction avec la toiture. Pour un nettoyage complet de façade, adressez-vous plutôt à quelqu'un dont c'est le quotidien.",
        en: 'Façades are their own subject, because render and paint behave differently from paving and because water can get in behind the surface. What we take on are the junctions and flashings where the façade meets the roof. For a full façade clean you are better off with someone who does it daily.',
      },
    },
  ],

  cta: {
    title: {
      de: 'Fragen kostet nichts',
      fr: 'Demander ne coûte rien',
      en: 'Asking costs nothing',
    },
    body: {
      de: 'Beschreiben Sie kurz, worum es geht, und hängen Sie ein Foto an. Wenn es nicht zu uns gehört, sagen wir es Ihnen — und wenn doch, kommt es oft günstiger, wenn wir es mit einem anderen Termin verbinden.',
      fr: "Décrivez brièvement le sujet et joignez une photo. Si cela ne relève pas de nous, nous vous le dirons — et si c'est le cas, il est souvent plus avantageux de le combiner avec un autre rendez-vous.",
      en: 'Describe briefly what it is about and attach a photo. If it is not our job we will say so — and if it is, it often costs less when we combine it with another appointment.',
    },
  },
};
