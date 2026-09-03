import type { Localized } from '@/content/types';

/**
 * Mentions légales and the privacy policy.
 *
 * Section 3.3 records the incumbent site as having neither, while running a
 * contact form that collects personal data. That is a live exposure, not a
 * tidiness problem: the amended law of 14 August 2000 on electronic commerce
 * requires the RCS number, the establishment authorisation number and the VAT
 * identification number to be reachable from the site, and the GDPR requires a
 * privacy notice wherever personal data is collected.
 *
 * Everything factual below describes what this site actually does — the
 * processors it uses, the one cookie it sets, the fact that it loads no fonts
 * or analytics from third parties. The identifiers it cannot state are marked,
 * because a wrong RCS number is worse than a missing one.
 *
 * This is written to be accurate, not to be a substitute for legal advice. It
 * should be read by the business's lawyer or its Chambre des Métiers adviser
 * before launch.
 */

export const legalNotice = {
  meta: {
    de: {
      title: 'Impressum',
      description: 'Anbieterkennzeichnung nach dem Gesetz vom 14. August 2000 über den elektronischen Geschäftsverkehr.',
    },
    fr: {
      title: 'Mentions légales',
      description: "Informations légales conformément à la loi modifiée du 14 août 2000 relative au commerce électronique.",
    },
    en: {
      title: 'Legal notice',
      description: 'Provider information under the amended Luxembourg law of 14 August 2000 on electronic commerce.',
    },
  },

  title: { de: 'Impressum', fr: 'Mentions légales', en: 'Legal notice' } satisfies Localized,

  intro: {
    de: 'Angaben gemäss dem geänderten Gesetz vom 14. August 2000 über den elektronischen Geschäftsverkehr.',
    fr: "Informations fournies conformément à la loi modifiée du 14 août 2000 relative au commerce électronique.",
    en: 'Information provided under the amended law of 14 August 2000 on electronic commerce.',
  } satisfies Localized,

  /** Fields whose value comes from client.config; null renders as <Pending>. */
  identity: [
    { key: 'legalName', label: { de: 'Firma und Rechtsform', fr: 'Dénomination et forme juridique', en: 'Company name and legal form' } satisfies Localized },
    { key: 'address', label: { de: 'Anschrift', fr: 'Adresse', en: 'Address' } satisfies Localized },
    { key: 'phone', label: { de: 'Telefon', fr: 'Téléphone', en: 'Telephone' } satisfies Localized },
    { key: 'email', label: { de: 'E-Mail', fr: 'E-mail', en: 'Email' } satisfies Localized },
    { key: 'rcs', label: { de: 'RCS-Nummer', fr: 'Numéro RCS', en: 'Trade register (RCS) number' } satisfies Localized },
    { key: 'autorisation', label: { de: 'Autorisation d’établissement', fr: "Autorisation d'établissement", en: 'Establishment authorisation' } satisfies Localized },
    { key: 'vat', label: { de: 'MwSt-Identifikationsnummer', fr: 'Numéro d’identification TVA', en: 'VAT identification number' } satisfies Localized },
    { key: 'contentResponsible', label: { de: 'Verantwortlich für den Inhalt', fr: 'Responsable du contenu', en: 'Responsible for content' } satisfies Localized },
    { key: 'supervisory', label: { de: 'Zuständige Kammer', fr: 'Chambre professionnelle', en: 'Professional chamber' } satisfies Localized },
    { key: 'host', label: { de: 'Hosting', fr: 'Hébergement', en: 'Hosting' } satisfies Localized },
  ] as const,

  disputeTitle: { de: 'Streitbeilegung', fr: 'Règlement des litiges', en: 'Dispute resolution' } satisfies Localized,
  dispute: {
    de: 'Für Streitigkeiten aus Verbraucherverträgen steht die Plattform der Europäischen Kommission zur Online-Streitbeilegung zur Verfügung. In Luxemburg vermittelt zudem der Service national du Médiateur de la consommation. Wir sind bereit, an einem Streitbeilegungsverfahren teilzunehmen, ziehen aber in jedem Fall das direkte Gespräch vor: Bei einer Beanstandung rufen Sie bitte zuerst an.',
    fr: "Pour les litiges issus de contrats de consommation, la plateforme de règlement en ligne des litiges de la Commission européenne est disponible. Au Luxembourg, le Service national du Médiateur de la consommation intervient également. Nous sommes prêts à participer à une procédure de règlement, mais préférons dans tous les cas le dialogue direct : en cas de réclamation, appelez-nous d'abord.",
    en: 'For disputes arising from consumer contracts, the European Commission’s online dispute resolution platform is available. In Luxembourg the Service national du Médiateur de la consommation also mediates. We are willing to take part in a dispute resolution procedure, but in every case we prefer to talk first: if something is wrong, please call us before anything else.',
  } satisfies Localized,

  contentTitle: { de: 'Haftung für Inhalte', fr: 'Responsabilité du contenu', en: 'Liability for content' } satisfies Localized,
  content: {
    de: 'Die Inhalte dieser Seite wurden mit Sorgfalt erstellt. Angaben zu Bauverfahren, Materialien und Kosten sind allgemeine Orientierung und ersetzen keine Beurteilung des konkreten Objekts. Die Darstellung der steuerlichen Regelungen fasst öffentlich zugängliche Informationen zusammen und ist keine Steuerberatung; verbindlich ist die Auskunft der zuständigen Verwaltung.',
    fr: "Les contenus de ce site ont été établis avec soin. Les indications relatives aux techniques, aux matériaux et aux coûts constituent une orientation générale et ne remplacent pas l'examen d'un bien précis. La présentation des règles fiscales résume des informations publiques et ne constitue pas un conseil fiscal ; seul le renseignement de l'administration compétente fait foi.",
    en: 'The content of this site has been prepared with care. Statements about methods, materials and costs are general orientation and do not replace an assessment of the specific property. The account of the tax rules summarises publicly available information and is not tax advice; only the competent authority’s ruling is binding.',
  } satisfies Localized,
};

export const privacyPolicy = {
  meta: {
    de: {
      title: 'Datenschutzerklärung',
      description: 'Welche Daten diese Seite erhebt, wozu, auf welcher Rechtsgrundlage und wie lange. Keine Analyse-Werkzeuge, keine externen Schriften, kein Tracking.',
    },
    fr: {
      title: 'Protection des données',
      description: "Quelles données ce site collecte, à quelles fins, sur quelle base légale et pour combien de temps. Aucun outil d'analyse, aucune police externe, aucun traçage.",
    },
    en: {
      title: 'Privacy policy',
      description: 'What this site collects, why, on what legal basis and for how long. No analytics, no external fonts, no tracking.',
    },
  },

  title: { de: 'Datenschutzerklärung', fr: 'Protection des données', en: 'Privacy policy' } satisfies Localized,

  lead: {
    de: 'Diese Seite ist so gebaut, dass sie so wenig Daten wie möglich erhebt. Es gibt keine Analyse-Werkzeuge, keine Werbenetzwerke und keine externen Schriftarten — alle Schriften liegen auf demselben Server wie die Seite. Deshalb erscheint hier auch kein Cookie-Banner: Es gibt nichts, dem zugestimmt werden müsste.',
    fr: "Ce site est conçu pour collecter le moins de données possible. Il n'utilise aucun outil d'analyse, aucun réseau publicitaire et aucune police externe — toutes les polices sont hébergées avec le site. C'est pourquoi aucune bannière de cookies n'apparaît : il n'y a rien à accepter.",
    en: 'This site is built to collect as little as possible. There are no analytics tools, no advertising networks and no external fonts — every typeface is served from the same host as the site. That is also why there is no cookie banner: there is nothing to consent to.',
  } satisfies Localized,

  sections: [
    {
      title: { de: 'Verantwortlicher', fr: 'Responsable du traitement', en: 'Controller' } satisfies Localized,
      body: [
        {
          de: 'Verantwortlich im Sinne der Datenschutz-Grundverordnung ist der im Impressum genannte Betrieb. Fragen zum Datenschutz und Anträge auf Auskunft richten Sie bitte an die dort angegebene E-Mail-Adresse oder Telefonnummer.',
          fr: "Le responsable du traitement au sens du RGPD est l'entreprise indiquée dans les mentions légales. Pour toute question relative à la protection des données ou toute demande d'accès, utilisez l'adresse e-mail ou le numéro de téléphone qui y figurent.",
          en: 'The controller for the purposes of the GDPR is the business named in the legal notice. Please direct questions about data protection and access requests to the email address or telephone number given there.',
        },
      ],
    },
    {
      title: { de: 'Aufruf der Seite', fr: 'Consultation du site', en: 'Visiting the site' } satisfies Localized,
      body: [
        {
          de: 'Beim Aufruf werden vom Hosting-Anbieter die technisch notwendigen Verbindungsdaten verarbeitet — IP-Adresse, Zeitpunkt, angeforderte Datei, übertragene Datenmenge, Browserkennung. Diese Daten sind erforderlich, damit die Seite überhaupt ausgeliefert werden kann. Rechtsgrundlage ist das berechtigte Interesse am sicheren Betrieb der Website nach Artikel 6 Absatz 1 Buchstabe f DSGVO.',
          fr: "Lors de la consultation, l'hébergeur traite les données de connexion techniquement nécessaires — adresse IP, horodatage, fichier demandé, volume transféré, identifiant du navigateur. Ces données sont indispensables à la diffusion du site. La base légale est l'intérêt légitime à un fonctionnement sûr, article 6, paragraphe 1, point f, du RGPD.",
          en: 'When you open the site, the hosting provider processes the connection data that is technically necessary — IP address, timestamp, requested file, volume transferred, browser identifier. This is required for the site to be delivered at all. The legal basis is the legitimate interest in secure operation, Article 6(1)(f) GDPR.',
        },
      ],
    },
    {
      title: { de: 'Cookies', fr: 'Cookies', en: 'Cookies' } satisfies Localized,
      body: [
        {
          de: 'Diese Seite setzt genau ein Cookie: NEXT_LOCALE. Es enthält ausschliesslich ein Sprachkürzel — „de“, „fr“ oder „en“ — und sorgt dafür, dass Sie bei einem erneuten Besuch in Ihrer Sprache landen. Es enthält keine Kennung, mit der Sie wiedererkannt werden könnten, wird nicht an Dritte übermittelt und läuft nach einem Jahr ab. Als für den ausdrücklich gewünschten Dienst unbedingt erforderliches Cookie ist es nicht einwilligungspflichtig.',
          fr: "Ce site dépose exactement un cookie : NEXT_LOCALE. Il ne contient qu'un code de langue — « de », « fr » ou « en » — et permet de retrouver votre langue lors d'une prochaine visite. Il ne contient aucun identifiant permettant de vous reconnaître, n'est transmis à aucun tiers et expire au bout d'un an. Strictement nécessaire au service demandé, il n'est pas soumis au consentement.",
          en: 'This site sets exactly one cookie: NEXT_LOCALE. It contains nothing but a language code — “de”, “fr” or “en” — and makes sure a return visit lands in your language. It carries no identifier that could recognise you, is shared with nobody, and expires after a year. As a cookie strictly necessary for the service you asked for, it does not require consent.',
        },
      ],
    },
    {
      title: { de: 'Anfrageformular', fr: 'Formulaire de demande', en: 'Enquiry form' } satisfies Localized,
      body: [
        {
          de: 'Wenn Sie das Formular absenden, verarbeiten wir die von Ihnen eingegebenen Angaben: Name, E-Mail-Adresse, gegebenenfalls Telefonnummer, Dringlichkeit, gewünschte Leistung, Dachtyp, Postleitzahl und Ort, Ihre Nachricht sowie die von Ihnen angehängten Fotos. Zweck ist ausschliesslich die Bearbeitung Ihrer Anfrage und die Erstellung eines Angebots. Rechtsgrundlage ist Ihre Einwilligung nach Artikel 6 Absatz 1 Buchstabe a DSGVO sowie die Durchführung vorvertraglicher Massnahmen nach Buchstabe b.',
          fr: "Lorsque vous envoyez le formulaire, nous traitons les informations que vous avez saisies : nom, adresse e-mail, éventuellement numéro de téléphone, degré d'urgence, prestation souhaitée, type de toiture, code postal et localité, votre message ainsi que les photos jointes. La finalité est exclusivement le traitement de votre demande et l'établissement d'un devis. La base légale est votre consentement, article 6, paragraphe 1, point a, du RGPD, ainsi que l'exécution de mesures précontractuelles, point b.",
          en: 'When you submit the form we process what you entered: name, email address, telephone number where given, urgency, the service you selected, roof type, postcode and town, your message and any photographs you attached. The purpose is solely to handle your enquiry and prepare a quote. The legal basis is your consent under Article 6(1)(a) GDPR together with pre-contractual steps under point (b).',
        },
        {
          de: 'Der Zeitpunkt Ihrer Einwilligung wird gespeichert, weil wir sie nachweisen können müssen. Zusätzlich speichern wir einen gekürzten kryptografischen Hashwert Ihrer IP-Adresse. Dieser dient allein der Abwehr automatisierter Massensendungen; die IP-Adresse selbst wird nicht im Klartext gespeichert und lässt sich aus dem Hashwert nicht zurückrechnen.',
          fr: "L'horodatage de votre consentement est conservé, car nous devons pouvoir en apporter la preuve. Nous stockons en outre une empreinte cryptographique tronquée de votre adresse IP. Elle sert uniquement à contrer les envois automatisés en masse ; l'adresse IP elle-même n'est pas conservée en clair et ne peut être reconstituée à partir de l'empreinte.",
          en: 'The time of your consent is stored because we have to be able to evidence it. We also store a truncated cryptographic hash of your IP address. That serves only to deter automated mass submissions; the address itself is not stored in clear text and cannot be recovered from the hash.',
        },
        {
          de: 'Wir verwenden kein Google reCAPTCHA und kein vergleichbares Werkzeug. Der Schutz vor automatisierten Einsendungen erfolgt über ein für Sie unsichtbares Feld und eine Zeitmessung — beides ohne Datenübermittlung an Dritte.',
          fr: "Nous n'utilisons ni Google reCAPTCHA ni outil équivalent. La protection contre les envois automatisés repose sur un champ invisible pour vous et sur une mesure de durée — sans aucune transmission à des tiers.",
          en: 'We use no Google reCAPTCHA or comparable tool. Protection against automated submissions relies on a field invisible to you and on a timing check — neither of which sends anything to a third party.',
        },
      ],
    },
    {
      title: { de: 'Auftragsverarbeiter', fr: 'Sous-traitants', en: 'Processors' } satisfies Localized,
      body: [
        {
          de: 'Für die Speicherung der Anfragen und der angehängten Fotos setzen wir Supabase ein. Die Fotos liegen in einem nicht öffentlichen Speicher; Zugriff erfolgt ausschliesslich über zeitlich befristete, signierte Links, die nach sieben Tagen ablaufen. Für den Versand der Benachrichtigung an uns und der Bestätigung an Sie setzen wir Resend ein. Mit beiden Anbietern bestehen Auftragsverarbeitungsverträge. Die Auslieferung der Seite selbst erfolgt über den im Impressum genannten Hosting-Anbieter.',
          fr: "Pour la conservation des demandes et des photos jointes, nous utilisons Supabase. Les photos sont stockées dans un espace non public ; l'accès se fait exclusivement par des liens signés à durée limitée, expirant après sept jours. Pour l'envoi de la notification vers nous et de la confirmation vers vous, nous utilisons Resend. Des contrats de sous-traitance sont conclus avec ces deux prestataires. La diffusion du site est assurée par l'hébergeur indiqué dans les mentions légales.",
          en: 'We use Supabase to store enquiries and any attached photographs. The photographs sit in a non-public store; access is only ever through time-limited signed links that expire after seven days. We use Resend to send the notification to us and the confirmation to you. Data processing agreements are in place with both. The site itself is delivered by the hosting provider named in the legal notice.',
        },
      ],
    },
    {
      title: { de: 'Karte', fr: 'Carte', en: 'Map' } satisfies Localized,
      body: [
        {
          de: 'Auf der Kontaktseite befindet sich eine Karte, die erst nach Ihrem Klick geladen wird. Bis dahin wird nichts von einem fremden Server abgerufen und Ihre IP-Adresse an niemanden übermittelt. Klicken Sie auf „Karte laden“, wird die Darstellung von OpenStreetMap bezogen; dabei erhält der Betreiber Ihre IP-Adresse. Rechtsgrundlage ist Ihre durch den Klick erklärte Einwilligung. Google Maps binden wir bewusst nicht ein.',
          fr: "La page de contact comporte une carte qui n'est chargée qu'après votre clic. Jusque-là, rien n'est appelé auprès d'un serveur tiers et votre adresse IP n'est transmise à personne. Si vous cliquez sur « Charger la carte », l'affichage provient d'OpenStreetMap, qui reçoit alors votre adresse IP. La base légale est le consentement exprimé par ce clic. Nous n'intégrons délibérément pas Google Maps.",
          en: 'The contact page carries a map that is only loaded once you click. Until then nothing is fetched from any third-party server and your IP address goes nowhere. If you press “Load map”, the view comes from OpenStreetMap, which then receives your IP address. The legal basis is the consent expressed by that click. We deliberately do not embed Google Maps.',
        },
      ],
    },
    {
      title: { de: 'Speicherdauer', fr: 'Durée de conservation', en: 'Retention' } satisfies Localized,
      body: [
        {
          de: 'Anfragen, aus denen kein Auftrag entsteht, werden spätestens zwölf Monate nach dem letzten Kontakt gelöscht, einschliesslich der Fotos. Entsteht ein Auftrag, gelten die handels- und steuerrechtlichen Aufbewahrungsfristen für die zugehörigen Unterlagen. Auf Wunsch löschen wir Ihre Anfrage früher — eine kurze Mail genügt.',
          fr: "Les demandes qui ne débouchent sur aucun chantier sont supprimées au plus tard douze mois après le dernier contact, photos comprises. En cas de chantier, les délais de conservation commerciaux et fiscaux s'appliquent aux documents correspondants. Sur demande, nous supprimons votre dossier plus tôt — un simple e-mail suffit.",
          en: 'Enquiries that do not lead to a job are deleted no later than twelve months after the last contact, photographs included. Where a job follows, the commercial and tax retention periods apply to the associated records. On request we will delete your enquiry sooner — a short email is enough.',
        },
      ],
    },
    {
      title: { de: 'Ihre Rechte', fr: 'Vos droits', en: 'Your rights' } satisfies Localized,
      body: [
        {
          de: 'Sie haben das Recht auf Auskunft über die zu Ihnen gespeicherten Daten, auf Berichtigung unrichtiger Daten, auf Löschung, auf Einschränkung der Verarbeitung, auf Datenübertragbarkeit und auf Widerspruch gegen eine Verarbeitung, die auf berechtigtem Interesse beruht. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.',
          fr: "Vous disposez d'un droit d'accès aux données vous concernant, de rectification, d'effacement, de limitation du traitement, de portabilité, et d'opposition à un traitement fondé sur l'intérêt légitime. Vous pouvez retirer à tout moment un consentement donné, avec effet pour l'avenir.",
          en: 'You have the right to access the data held about you, to have inaccurate data corrected, to erasure, to restriction of processing, to data portability, and to object to processing based on legitimate interest. Any consent you have given may be withdrawn at any time with effect for the future.',
        },
        {
          de: 'Zuständige Aufsichtsbehörde in Luxemburg ist die Commission nationale pour la protection des données (CNPD), 15, boulevard du Jazz, L-4370 Belvaux. Sie haben das Recht, sich dort zu beschweren. Wir bitten Sie, sich zunächst an uns zu wenden — die meisten Anliegen lassen sich mit einem Anruf klären.',
          fr: "L'autorité de contrôle compétente au Luxembourg est la Commission nationale pour la protection des données (CNPD), 15, boulevard du Jazz, L-4370 Belvaux. Vous avez le droit d'y introduire une réclamation. Nous vous invitons à nous contacter d'abord — la plupart des demandes se règlent par un appel.",
          en: 'The competent supervisory authority in Luxembourg is the Commission nationale pour la protection des données (CNPD), 15, boulevard du Jazz, L-4370 Belvaux. You have the right to lodge a complaint there. We would ask you to come to us first — most matters are settled with a phone call.',
        },
      ],
    },
  ],

  reviewNotice: {
    de: 'Dieser Text beschreibt die tatsächliche Funktionsweise dieser Website und wurde nach bestem Wissen erstellt. Er ersetzt keine anwaltliche Prüfung und sollte vor dem Livegang von einer fachkundigen Stelle gegengelesen werden.',
    fr: "Ce texte décrit le fonctionnement réel de ce site et a été rédigé au mieux de nos connaissances. Il ne remplace pas un examen juridique et devrait être relu par une instance compétente avant la mise en ligne.",
    en: 'This text describes how this website actually works and was written to the best of our knowledge. It does not replace legal review and should be checked by a qualified adviser before launch.',
  } satisfies Localized,
};
