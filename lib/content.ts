/**
 * content.ts — single source of truth for all copy & data.
 * --------------------------------------------------------
 * Keeping content here (not in JSX) makes the site CMS-ready: swap this file
 * for a CMS fetch later without touching components.
 *
 * Alles wat de klant nog moet bevestigen staat in CONTENT-CHECK.md.
 */

export const site = {
  brand: "Sixtyfold",
  name: "Sixtyfold",
  /** Klein merkdetail naast het wordmark (60 = zestigvoudig / 60 fps). */
  mark: "/60",
  tagline: "Websites op maat uit Haarlem.",
  founders: ["Jayden van den Hoek"],
  role: "Webstudio",
  location: "Haarlem",
  region: "Noord-Holland",
  country: "NL",
  email: "jaydenvdh88@gmail.com",
  url: "https://sixtyfold.nl",
  github: "https://github.com/JVDH08",
};

export const seo = {
  title: "Website laten maken Haarlem | Eerst zien, dan betalen",
  description:
    "Website laten maken in Haarlem? Maatwerk met scroll-animaties en een snelle laadtijd. Je ziet je site vóór je betaalt: vraag een gratis demo aan.",
  /** Plaatsen waar we werken (schema areaServed). */
  areaServed: ["Haarlem", "Heemstede", "Bloemendaal", "Zandvoort"],
  ogAlt: "Sixtyfold, websites op maat uit Haarlem",
};

export const nav = [
  { label: "Werk", href: "#projecten" },
  { label: "Aanpak", href: "#werkwijze" },
  { label: "Pakketten", href: "#pakketten" },
  { label: "Over", href: "#over" },
  { label: "Contact", href: "#contact" },
];

export const navCta = { label: "Gratis demo", href: "#contact" };

export const hero = {
  eyebrow: "Sixtyfold · Webstudio uit Haarlem",
  /** Alleen voor Google/schermlezers (sr-only), niet zichtbaar. */
  titleSeoPrefix: "Website laten maken in Haarlem: ",
  titleLines: ["Websites die", "niemand wegklikt.", "Op maat. In beweging."],
  highlightLine: 1, // index of the line shown in accent
  subtitle:
    "Maatwerk met scroll-animaties, eigen beeld en een site die laadt in een oogwenk. En het mooiste: je ziet je nieuwe site vóór je betaalt.",
  cta: { label: "Vraag je gratis demo aan", href: "#contact" },
  ctaSecondary: { label: "Bekijk ons werk", href: "#projecten" },
  trust: ["Gratis demo", "Vaste prijzen", "Reactie binnen 24 uur"],
  scrollHint: "Scroll",
};

export const statement = {
  eyebrow: "Wat we doen",
  // Each line reveals word-by-word on scroll.
  lines: [
    { text: "Een website is je eerste indruk.", highlight: [] as number[] },
    { text: "Bij ons geen sjabloon,", highlight: [] as number[] },
    { text: "maar een ervaring die blijft hangen.", highlight: [4, 5] },
  ],
  body: "Wij ontwerpen en bouwen websites op maat die laden in een oogwenk, vloeiend bewegen en precies zeggen wat jouw zaak wil zeggen. Van eerste schets tot live: alles uit één hand.",
};

/** Lopende regel tussen Statement en Waarom (decoratief; loopt mee met de scroll). */
export const ticker = {
  words: [
    "Maatwerk",
    "60 fps",
    "Eigen beeld",
    "Gratis demo",
    "Snel en vindbaar",
    "Haarlem",
  ],
};

export type WhyIcon =
  | "custom"
  | "motion"
  | "camera"
  | "eye"
  | "bolt"
  | "shield";

export const why = {
  eyebrow: "Waarom Sixtyfold",
  title: "Het verschil met een site van de plank",
  intro:
    "Zes dingen die je van ons mag verwachten. Van een template krijg je ze niet.",
  points: [
    {
      icon: "custom" as WhyIcon,
      title: "Maatwerk, geen template.",
      text: "Geen WordPress- of Elementor-thema dat op duizend andere sites lijkt. Elk ontwerp begint bij jouw zaak.",
    },
    {
      icon: "motion" as WhyIcon,
      title: "Beweging op 60 fps.",
      text: "Scroll-animaties die vloeiend en snel zijn, ook op je telefoon. Daar komt onze naam vandaan.",
    },
    {
      icon: "camera" as WhyIcon,
      title: "Eigen beeld en video.",
      text: "Geen stockfoto's. We maken beeld en video op maat die bij jouw sfeer passen.",
    },
    {
      icon: "eye" as WhyIcon,
      title: "Je ziet je site vóór je betaalt.",
      text: "Na een kort gesprek bouwen we een demo van jóuw site. Pas als je hem goed vindt, gaan we verder.",
    },
    {
      icon: "bolt" as WhyIcon,
      title: "Snel en vindbaar.",
      text: "Laadt in een oogwenk, scoort hoog in Google Lighthouse en is technisch klaar voor Google.",
    },
    {
      icon: "shield" as WhyIcon,
      title: "Ook ná de livegang.",
      text: "We houden je site in de gaten (online, SSL, snelheid) en je krijgt elke maand een kort rapport.",
    },
  ],
  compare: {
    title: "In het kort",
    columns: { a: "Template-bureau", b: "Sixtyfold" },
    rows: [
      { label: "Ontwerp", a: "Thema van de plank", b: "Op maat voor jouw zaak" },
      { label: "Beweging", a: "Statisch of hakkelig", b: "Vloeiend op 60 fps" },
      { label: "Beeld", a: "Stockfoto's", b: "Eigen beeld en video" },
      { label: "Betalen", a: "Eerst betalen, dan zien", b: "Eerst zien, dan betalen" },
    ],
  },
};

export const showcase = {
  // The scroll-driven signature section (live vector scene, see OrbitScene).
  eyebrow: "Signature",
  title: ["De scroll bestuurt", "de beweging."],
  /** Label bij de voortgangsteller (desktop): "Live gerenderd 045 / 100". */
  liveLabel: "Live gerenderd",
  steps: [
    {
      at: 0,
      title: "Beweging met betekenis",
      text: "Animaties die reageren op jouw scroll. Vooruit en terug, zonder haperen.",
    },
    {
      at: 0.42,
      title: "Gebouwd op 60 fps",
      text: "Live getekend door je browser, geen video of plaatjes. Vloeiend en haarscherp op elk scherm.",
    },
    {
      at: 0.82,
      title: "Premium tot in het detail",
      text: "Elke pixel, elke overgang, elk randje: bewust gekozen.",
    },
  ],
};

export const process = {
  eyebrow: "Aanpak",
  title: "Van eerste gesprek tot live, zonder verrassingen",
  intro:
    "Vier stappen, en je weet bij elke stap waar je aan toe bent. Betalen doe je pas als de demo goed is.",
  steps: [
    {
      no: "01",
      title: "Kennismaking",
      text: "Gratis, 30 minuten, bij jou of online. We vragen naar je zaak, je klanten en wat je wilt uitstralen.",
    },
    {
      no: "02",
      title: "Gratis demo",
      text: "Binnen een paar dagen zie je een eerste versie van jóuw site. Niet goed? Dan betaal je niets.",
    },
    {
      no: "03",
      title: "Bouwen en verfijnen",
      text: "We maken hem af, met correctierondes tot hij klopt. Teksten, beeld, animaties, SEO.",
    },
    {
      no: "04",
      title: "Live en zorg",
      text: "We koppelen je domein, zetten hem live en houden hem daarna in de gaten.",
    },
  ],
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  year: string;
  tags: string[];
  /** local image in /public/images/projecten */
  image: string;
  imageAlt: string;
  /** CSS object-position for the crop */
  imagePosition?: string;
  featured?: boolean;
  /** Heeft een case-pagina op /werk/<caseSlug>; de kaart linkt dan daarheen. */
  caseSlug?: string;
};

export const projectsSection = {
  eyebrow: "Werk",
  title: "Projecten die voor zich spreken",
  intro:
    "Een greep uit recent werk. Elk merk een eigen wereld, elke site op maat gebouwd.",
  visit: "Bekijk live",
  case: "Bekijk de case",
  newTab: "(opent in een nieuw tabblad)",
};

export const projects: Project[] = [
  {
    name: "Victor Brands",
    tagline: "Strak zakelijk merkplatform",
    description:
      "Live op eigen domein, met een contactflow die direct in de inbox landt. Helder, snel en klaar om te groeien.",
    url: "https://victorbrands.nl",
    year: "2026",
    tags: ["Corporate", "Next.js", "Resend"],
    image: "/images/projecten/victor/victor-groep.jpg",
    imageAlt:
      "Lachende ondernemer in overleg aan tafel, beeld uit de Victor Brands-site",
    imagePosition: "50% 35%",
    featured: true,
    caseSlug: "victor-brands",
  },
  {
    name: "VAEKST Hospitality",
    tagline: "Premium hospitality-opleider",
    description:
      "Cinematische site met hero-video, gouden accenten, gepinde scroll-scènes en 3D-detail. Gebouwd om de opleiding te laten voelen zoals hij is: hoogwaardig en persoonlijk.",
    url: "https://vaekst.vercel.app",
    year: "2026",
    tags: ["Hospitality", "Next.js", "GSAP", "3D"],
    image: "/images/projecten/vaekst/hero.jpg",
    imageAlt:
      "Gouden lichtlijn die vertakt over donker marmer, beeld uit de VAEKST-site",
    imagePosition: "50% 60%",
    caseSlug: "vaekst",
  },
  {
    name: "TERRA Ceramics",
    tagline: "Concept · quiet-luxury keramiekmerk",
    description:
      "Rustige, tactiele beweging voor een merk dat met de hand werkt. Elke overgang net zo bedachtzaam als het ambacht zelf.",
    url: "https://terra-three-zeta.vercel.app",
    year: "2026",
    tags: ["Branding", "Next.js", "Motion"],
    image: "/images/projecten/terra/process-throwing.webp",
    imageAlt: "Handen vormen klei op een draaischijf, beeld uit de TERRA-site",
    imagePosition: "50% 42%",
    caseSlug: "terra",
  },
  {
    name: "NOORDVAART",
    tagline: "Concept · luxe jachten, filmisch gepresenteerd",
    description:
      "Donkere, filmische webshop voor luxe jachten. Conceptproject waarin beeld en scroll de hele ervaring dragen.",
    url: "https://noordvaart.vercel.app",
    year: "2026",
    tags: ["E-commerce", "Cinematic", "Motion"],
    image: "/images/projecten/noordvaart/waterlijn.webp",
    imageAlt:
      "Witte jachtromp op de waterlijn in de mist, beeld uit de NOORDVAART-site",
    imagePosition: "50% 45%",
    caseSlug: "noordvaart",
  },
];

/**
 * Concept-redesigns: ongevraagd gemaakt voor lokale zaken, om te laten zien wat er kan.
 * Nadrukkelijk geen klantwerk: het label "Concept" en de tekst zeggen dat, en elke site
 * zelf heeft in de footer "niet in opdracht van …".
 */
export const conceptsSection = {
  title: "Concept-redesigns",
  intro:
    "Ongevraagd ontworpen voor drie zaken in Zandvoort, om te laten zien wat er kan met hun eigen verhaal. Geen opdrachten: zo zou hun site eruit kunnen zien.",
};

export const concepts: Project[] = [
  {
    name: "Visrestaurant De Meerpaal",
    tagline: "Concept · visrestaurant in Zandvoort",
    description:
      "Het oudste visrestaurant van Zandvoort, filmisch verteld: de zee bij zonsondergang, de echte kaart en de geschiedenis van het vissersdorp.",
    url: "https://visrestaurant-de-meerpaal.vercel.app",
    year: "2026",
    tags: ["Concept", "Horeca", "Scroll"],
    image: "/images/projecten/visrestaurant-de-meerpaal/site.jpg",
    imageAlt: "Concept-redesign van Visrestaurant De Meerpaal: zonsondergang bij een paal in zee",
    imagePosition: "50% 30%",
  },
  {
    name: "Hotel Faber",
    tagline: "Concept · familiehotel in Zandvoort",
    description:
      "Rustig en licht, zoals een weekend aan zee hoort te voelen: de kamers in beeld en alles op loopafstand, vijf minuten van het strand.",
    url: "https://hotel-faber.vercel.app",
    year: "2026",
    tags: ["Concept", "Hotel", "Editorial"],
    image: "/images/projecten/hotel-faber/site.jpg",
    imageAlt: "Concept-redesign van Hotel Faber: lichte homepage met de zee",
    imagePosition: "50% 35%",
  },
  {
    name: "Khao Thai",
    tagline: "Concept · Thais afhaalrestaurant",
    description:
      "Wok-vuur, kruiden en een kaart per smaak: zoet, zuur, pittig, zout. Eén grote belknop, want bestellen gaat hier gewoon telefonisch.",
    url: "https://khao-thai.vercel.app",
    year: "2026",
    tags: ["Concept", "Afhaal", "Motion"],
    image: "/images/projecten/khao-thai/site.jpg",
    imageAlt: "Concept-redesign van Khao Thai: wok met vlammen en kruiden",
    imagePosition: "50% 40%",
  },
];

export type PackageId = "start" | "plus" | "signature";

export type Tier = {
  id: PackageId;
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
};

export const packages = {
  eyebrow: "Pakketten",
  title: "Vaste prijzen. Geen verrassingen.",
  intro:
    "Elk pakket begint met een gratis demo. Prijzen zijn vanaf-prijzen, excl. btw.",
  pricePrefix: "vanaf",
  cta: "Vraag een demo aan",
  tiers: [
    {
      id: "start",
      name: "Start",
      price: "€ 750",
      description:
        "Een strakke onepager waarmee je snel en professioneel online staat.",
      features: [
        "Onepager met eigen ontwerp",
        "Contactformulier",
        "Basis-SEO",
        "Koppeling van je domein",
        "1 correctieronde",
        "Live in ± 1 week",
      ],
    },
    {
      id: "plus",
      name: "Plus",
      price: "€ 1.400",
      badge: "Meest gekozen",
      description:
        "Een site die opvalt: eigen ontwerp met scroll-animaties, tot 5 pagina's, en zelf teksten aanpassen.",
      features: [
        "Tot 5 pagina's",
        "Scroll-animaties op maat",
        "Zelf aanpassen via CMS",
        "Contactformulier",
        "SEO + Google Search Console",
        "2 correctierondes",
        "Live in ± 2–3 weken",
      ],
    },
    {
      id: "signature",
      name: "Signature",
      price: "€ 2.500",
      description: "Maatwerk voor een merk dat een ervaring wil.",
      features: [
        "Ontwerp en opbouw op maat",
        "Filmische scroll of 3D",
        "Beeld en video op maat",
        "CMS",
        "Uitgebreide SEO",
        "3 correctierondes",
        "Planning in overleg",
      ],
    },
  ] as Tier[],
  care: {
    title: "Sixtyfold Care",
    intro:
      "Na livegang houden wij je site online, snel en veilig. Maandelijks automatisch afgeschreven, maandelijks opzegbaar.",
    tiers: [
      {
        name: "Care",
        price: "€ 24,99",
        period: "per maand",
        description: "Je site blijft online, snel en veilig. Wij letten op, zodat jij dat niet hoeft.",
        features: [
          "Hosting en SSL",
          "24/7 bewaking: je hoort het van ons als er iets mis is",
          "Elke maand een kort rapport",
          "Updates en back-ups",
        ],
      },
      {
        name: "Care Plus",
        price: "€ 49,99",
        period: "per maand",
        badge: "Zorgeloos",
        description: "Alles uit Care, plus een vast uur per maand voor aanpassingen.",
        features: [
          "Alles uit Care",
          "Tot 1 uur aanpassingen per maand: teksten, foto's, openingstijden",
          "Voorrang: reactie binnen 1 werkdag",
          "Elk kwartaal een check op snelheid en vindbaarheid",
        ],
      },
    ],
    note: "Ongebruikte uren schuiven niet door. Grotere wijzigingen, zoals een nieuwe pagina, krijgen een losse prijs.",
    cta: "Vraag een demo aan",
  },
  payment:
    "Betalen in twee delen: de helft bij akkoord op de demo, de rest bij livegang.",
};

export const about = {
  eyebrow: "Over Sixtyfold",
  title: "Een studio, geen fabriek",
  paragraphs: [
    "Sixtyfold is een kleine webstudio uit Haarlem. Je praat direct met wie je site ontwerpt én bouwt: geen accountmanager ertussen, korte lijnen en snel antwoord. Perfectionistisch en allergisch voor sites die op elkaar lijken, dus we gaan door tot elk detail klopt.",
    "Sixtyfold betekent zestigvoudig. Een knipoog naar 60 frames per seconde, want alles wat we bouwen beweegt vloeiend. En naar wat een goede site oplevert: niet een beetje beter, maar zestig keer.",
  ],
  /** De studiokaart naast de tekst (geen portretfoto's). */
  card: {
    numeral: "60",
    label: "Sixtyfold · Haarlem",
    principles: [
      "Ontwerp en code uit één hand",
      "Geen templates, alles op maat",
      "Je ziet je site vóór je betaalt",
    ],
  },
  stats: [
    { value: "100%", label: "Maatwerk" },
    { value: "<1s", label: "Laadtijd" },
    { value: "60 fps", label: "Vloeiend" },
  ],
};

export const faq = {
  eyebrow: "Veelgestelde vragen",
  title: "Wat mensen ons vaak vragen",
  intro: "Staat je vraag er niet tussen? Mail ons, je hoort binnen 24 uur van ons.",
  items: [
    {
      q: "Wat kost een website?",
      a: "Vanaf € 750 voor een onepager, € 1.400 voor een site met meerdere pagina's en animaties, vanaf € 2.500 voor volledig maatwerk. Na de demo krijg je een vaste prijs.",
    },
    {
      q: "Moet ik betalen voor de demo?",
      a: "Nee. Vind je de demo niet goed, dan stopt het daar en betaal je niets.",
    },
    {
      q: "Hoe snel staat mijn site online?",
      a: "Een onepager meestal binnen een week, grotere sites in twee tot drie weken.",
    },
    {
      q: "Kan ik zelf teksten aanpassen?",
      a: "Ja, vanaf Plus krijg je een eenvoudig CMS.",
    },
    {
      q: "Regelen jullie domein en hosting?",
      a: "Ja. We koppelen je domein en hosten je site snel en veilig; met Sixtyfold Care hoef je er niet meer naar om te kijken.",
    },
    {
      q: "Is de site van mij?",
      a: "Ja. Na oplevering is de site van jou, inclusief alle teksten en beelden.",
    },
  ],
};

export const contact = {
  eyebrow: "Contact",
  title: "Benieuwd hoe jouw site eruit kan zien?",
  subtitle:
    "Vertel kort over je zaak. Binnen 24 uur hoor je van ons, en daarna maken we gratis een demo.",
  form: {
    name: { label: "Je naam", placeholder: "Voor- en achternaam" },
    email: { label: "E-mailadres", placeholder: "naam@jouwzaak.nl" },
    company: { label: "Bedrijf", placeholder: "Naam van je zaak" },
    website: {
      label: "Huidige website (optioneel)",
      placeholder: "www.jouwzaak.nl",
    },
    package: {
      label: "Pakket",
      options: [
        { value: "start", label: "Start" },
        { value: "plus", label: "Plus" },
        { value: "signature", label: "Signature" },
        { value: "unknown", label: "Weet ik nog niet" },
      ],
    },
    message: {
      label: "Bericht",
      placeholder: "Wat doet je zaak en wat moet de site voor je doen?",
    },
    submit: "Vraag je gratis demo aan",
    sending: "Versturen…",
    direct: "Of mail direct naar",
    success: {
      title: "Bedankt, je bericht is binnen.",
      text: "Binnen 24 uur hoor je van ons. Daarna maken we gratis een demo van jouw site.",
    },
    error:
      "Het versturen is niet gelukt. Probeer het nog eens of mail ons direct.",
    rate: "Je hebt net al een bericht gestuurd. Probeer het over een paar minuten opnieuw.",
    unconfigured: {
      title: "Mail ons direct",
      text: "Het formulier kan op dit moment niet versturen. Met de knop hieronder open je een e-mail met je bericht alvast ingevuld.",
      button: "Open je e-mail",
    },
    errors: {
      name: "Vul je naam in.",
      email: "Vul je e-mailadres in.",
      emailInvalid: "Dit lijkt geen geldig e-mailadres.",
      message: "Vertel kort waar het over gaat.",
    },
  },
};

export const footer = {
  tagline: "Websites op maat uit Haarlem.",
  navTitle: "Navigatie",
  contactTitle: "Contact",
  /** Externe links, in de contactkolom onder het e-mailadres. */
  links: [{ label: "GitHub", href: "https://github.com/JVDH08" }],
  /** Losse pagina's, in de navigatiekolom onder de ankers. */
  pages: [
    { label: "Website laten maken Haarlem", href: "/website-laten-maken-haarlem" },
  ],
  copyright: "Sixtyfold · Haarlem",
  toTop: "Naar boven",
};

/* ------------------------------------------------------------------ */
/* Landingspagina: /website-laten-maken-haarlem                         */
/* ------------------------------------------------------------------ */

export const haarlem = {
  path: "/website-laten-maken-haarlem",
  seo: {
    title: "Website laten maken in Haarlem | Vanaf € 750 · Sixtyfold",
    description:
      "Website laten maken in Haarlem? Sixtyfold bouwt websites op maat voor ondernemers in Haarlem en omgeving. Vaste prijzen vanaf € 750 en eerst een gratis demo.",
    breadcrumb: "Website laten maken Haarlem",
  },
  hero: {
    eyebrow: "Webdesign · Haarlem en omgeving",
    titleSeoPrefix: "",
    titleLines: ["Website laten", "maken in Haarlem.", "Eerst zien, dan betalen."],
    highlightLine: 1,
    subtitle:
      "Een website op maat voor jouw zaak in Haarlem, Heemstede, Bloemendaal of Zandvoort. Je ziet eerst gratis een demo van je nieuwe site, en pas als je hem goed vindt, gaan we verder.",
    cta: { label: "Vraag je gratis demo aan", href: "#contact" },
    ctaSecondary: { label: "Bekijk de prijzen", href: "#pakketten" },
    trust: ["Gratis demo", "Vanaf € 750", "Reactie binnen 24 uur"],
    scrollHint: "Scroll",
  },
  intro: {
    eyebrow: "Webdesign uit Haarlem",
    title: "Een website laten maken die bij jouw zaak past",
    paragraphs: [
      "Sixtyfold is een kleine webstudio uit Haarlem. We maken websites voor ondernemers in Haarlem en omgeving: van restaurants en hotels tot kappers, ambachtslieden en dienstverleners. Geen site van de plank, maar een eigen ontwerp dat laat zien wie je bent.",
      "Je praat direct met degene die je site ontwerpt en bouwt. Na een kort gesprek, bij jou in de zaak of online, maken we gratis een demo van jóuw website. Pas als je die goed vindt, bouwen we hem af. Zo weet je precies wat je krijgt voordat je iets betaalt.",
      "Elke site bouwen we met moderne code in plaats van een WordPress-thema. Dat betekent: snel laden, ook op je telefoon, en technisch klaar om gevonden te worden in Google. Met scroll-animaties en eigen beeld blijven bezoekers langer kijken.",
    ],
    areasTitle: "Hier werken we",
    areas: ["Haarlem", "Heemstede", "Bloemendaal", "Zandvoort"],
    areasNote:
      "Zit je ergens anders? Dan doen we het gewoon online. Kennismaken kan bij jou of via een videogesprek.",
    forTitle: "Voor wie",
    forList: [
      "Horeca: restaurants, cafés en afhaalzaken",
      "Hotels en B&B's",
      "Kappers, salons en studio's",
      "Ambacht en lokale merken",
      "Coaches, trainers en dienstverleners",
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    title: "Website laten maken in Haarlem: vragen",
    intro: "Staat je vraag er niet tussen? Mail ons, je hoort binnen 24 uur van ons.",
    items: [
      {
        q: "Wat kost een website laten maken in Haarlem?",
        a: "Bij Sixtyfold betaal je vanaf € 750 voor een onepager, vanaf € 1.400 voor een site tot 5 pagina's met scroll-animaties en vanaf € 2.500 voor volledig maatwerk. Prijzen zijn excl. btw. Na de gratis demo krijg je een vaste prijs, zonder verrassingen achteraf.",
      },
      {
        q: "Hoe lang duurt het om een website te laten maken?",
        a: "Een onepager staat meestal binnen een week online. Een site met meerdere pagina's duurt twee tot drie weken. Bij volledig maatwerk spreken we samen een planning af.",
      },
      {
        q: "Kan ik eerst zien hoe mijn website eruit komt te zien?",
        a: "Ja. Na een kort gesprek maken we gratis een demo van jouw site. Vind je hem niet goed, dan stopt het daar en betaal je niets.",
      },
      {
        q: "Komen jullie langs voor een kennismaking?",
        a: "In Haarlem en omgeving komen we graag bij je langs. Liever online? Dan plannen we een videogesprek van ongeveer 30 minuten.",
      },
      {
        q: "Bouwen jullie in WordPress?",
        a: "Nee. We bouwen elke site op maat met moderne code. Daardoor laadt hij snel en is hij veilig. Wil je zelf teksten en foto's aanpassen? Vanaf het pakket Plus krijg je daar een eenvoudig CMS voor.",
      },
      {
        q: "Wordt mijn website goed gevonden in Google?",
        a: "Elke site is technisch klaar voor Google: snelle laadtijd, nette code, goede titels en beschrijvingen. Vanaf Plus koppelen we ook Google Search Console, zodat je ziet waarop je gevonden wordt. Een plek bovenaan kan niemand garanderen, maar met deze basis geef je je zaak de beste kans.",
      },
      {
        q: "Ik heb al een website. Kunnen jullie die vernieuwen?",
        a: "Zeker. We laten je in de demo zien hoe je huidige site eruit kan zien als hij opnieuw wordt ontworpen. Je teksten en beelden kunnen we waar nodig meenemen.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Cases: /werk/<slug>                                                  */
/* Alleen feiten die op de live sites te zien zijn. Conceptprojecten    */
/* staan er eerlijk als concept bij.                                    */
/* ------------------------------------------------------------------ */

export type CaseImage = { src: string; alt: string; position?: string };

export type CaseStudy = {
  slug: string;
  /** Naam zoals in `projects` (koppelt jaar, tags en live-link). */
  project: string;
  soort: "Klantproject" | "Conceptproject";
  /** Voor wie (of: wat het concept is). */
  voor: string;
  lead: string;
  opdracht: string;
  aanpak: { title: string; text: string }[];
  inhoud: string[];
  techniek: string[];
  resultaat: string;
  images: CaseImage[];
  seo: { title: string; description: string };
};

export const caseSection = {
  eyebrow: "Case",
  back: "Alle projecten",
  live: "Bekijk de live site",
  labels: {
    soort: "Soort",
    voor: "Voor",
    jaar: "Jaar",
    techniek: "Techniek",
    opdracht: "De opdracht",
    aanpak: "De aanpak",
    inhoud: "Wat erin zit",
    resultaat: "Het resultaat",
  },
  conceptNote:
    "Dit is een conceptproject: een fictief merk dat we zelf hebben bedacht en uitgewerkt, om te laten zien wat er kan. Geen opdracht van een klant.",
  next: "Volgende case",
  cta: {
    title: "Zo'n site voor jouw zaak?",
    text: "Vertel kort over je zaak. Daarna maken we gratis een demo, zodat je eerst ziet wat je krijgt.",
    button: "Vraag je gratis demo aan",
    href: "/#contact",
  },
};

export const cases: CaseStudy[] = [
  {
    slug: "victor-brands",
    project: "Victor Brands",
    soort: "Klantproject",
    voor: "Victor Brands, trainer, trainingsacteur en teamcoach uit Haarlem",
    lead: "Een nieuwe site voor een trainer met een verhaal dat niemand verzint: van KLM-manager en acteur tot coach van managementteams bij overheid en bedrijfsleven.",
    opdracht:
      "Victor had een verouderde WordPress-site. De nieuwe site moest helder laten zien wat hij doet en voor wie, met zijn echte referenties en klanten, en een contactformulier dat gewoon werkt.",
    aanpak: [
      {
        title: "Eerst het verhaal",
        text: "Zijn loopbaan werd een tijdlijn: van grondsteward tot manager, het podium en de televisie, de jaren die alles veranderden en wat hij er nu mee doet. Eerlijk verteld, zoals hij het zelf vertelt.",
      },
      {
        title: "Wat hij doet, zonder omwegen",
        text: "Expertise, visie en zijn drie rollen (trainer, trainingsacteur en coach) staan helder op een rij, met de methodieken waar hij mee werkt.",
      },
      {
        title: "Alles meegenomen",
        text: "De referenties en klantnamen van de oude site zijn overgezet. Zijn feedback is punt voor punt verwerkt voordat de site live ging.",
      },
    ],
    inhoud: [
      "Tijdlijn van zijn loopbaan en levensverhaal",
      "Expertisegebieden, visie en de drie rollen",
      "Klantnamen en referenties van de oude site",
      "Contactformulier dat via zijn eigen domein in zijn inbox landt",
      "Live op zijn eigen domein, de oude WordPress-site vervangen",
    ],
    techniek: ["Next.js", "Tailwind CSS", "Framer Motion", "Resend"],
    resultaat:
      "De site staat live op victorbrands.nl en vervangt de oude WordPress-site. Aanvragen via het formulier komen direct bij Victor binnen.",
    images: [
      { src: "/images/projecten/victor/victor-groep.jpg", alt: "Victor Brands aan het werk met een groep, beeld uit de site", position: "50% 35%" },
      { src: "/images/projecten/victor/victor-hero.jpeg", alt: "Portret van Victor Brands uit de site", position: "50% 25%" },
      { src: "/images/projecten/victor/victor-verhaal.jpg", alt: "Still uit de NPO-serie Stanley H, waarin Victor de rol van Grote Gijs speelt", position: "50% 40%" },
    ],
    seo: {
      title: "Case: Victor Brands | Sixtyfold",
      description:
        "Hoe Sixtyfold de site van trainer en teamcoach Victor Brands bouwde: zijn verhaal als tijdlijn, zijn referenties en een formulier dat werkt. Live op victorbrands.nl.",
    },
  },
  {
    slug: "vaekst",
    project: "VAEKST Hospitality",
    soort: "Klantproject",
    voor: "Jeroen Ketel, trainer, coach en docent in hospitality",
    lead: "Een filmische site voor een trainer die al sinds 2007 in hospitality werkt, in drie werelden: hotellerie, luxe retail en onderwijs.",
    opdracht:
      "Jeroen vroeg om een site die laat voelen hoe hij werkt: persoonlijk, interactief en hoogwaardig. Alles over zijn loopbaan moest kloppen.",
    aanpak: [
      {
        title: "Een sfeer, geen sjabloon",
        text: "Hero-video, gouden accenten en gepinde scroll-scènes. VAEKST (Deens voor groei) kreeg een eigen beeldtaal in plaats van stockfoto's.",
      },
      {
        title: "Drie werelden, één loopbaan",
        text: "Hotellerie, luxe retail en onderwijs staan als drie werelden naast elkaar, met daaronder zijn loopbaan van 2007 tot nu.",
      },
      {
        title: "Zijn manier van werken",
        text: "Manifest, vakgebieden, methode (afgestemd, samen, intrinsiek) en voor wie hij werkt. In zijn eigen woorden.",
      },
    ],
    inhoud: [
      "Hero-video en filmische scroll-scènes",
      "Vier vakgebieden: leidinggeven, gastvrijheid, samenwerken, verandermanagement",
      "Drie werelden en een loopbaan-tijdlijn vanaf 2007",
      "Zijn methode en voor wie hij werkt",
      "Contact via e-mail, LinkedIn en een formulier",
    ],
    techniek: ["Next.js", "GSAP", "3D", "Higgsfield (beeld en video)"],
    resultaat: "De site staat live en wordt verder aangescherpt.",
    images: [
      { src: "/images/projecten/vaekst/hero.jpg", alt: "Gouden lichtlijn die vertakt over donker marmer, beeld uit de VAEKST-site", position: "50% 60%" },
      { src: "/images/projecten/vaekst/hero-jeroen-groep.webp", alt: "Jeroen Ketel met studenten in de Johan Cruijff ArenA, beeld uit de VAEKST-site", position: "50% 40%" },
      { src: "/images/projecten/vaekst/pillar-01.jpg", alt: "Vergaderruimte, beeld uit de VAEKST-site", position: "50% 50%" },
    ],
    seo: {
      title: "Case: VAEKST Hospitality | Sixtyfold",
      description:
        "Hoe Sixtyfold een filmische site bouwde voor trainer en docent Jeroen Ketel (VAEKST Hospitality): hero-video, scroll-scènes en zijn loopbaan in drie werelden.",
    },
  },
  {
    slug: "terra",
    project: "TERRA Ceramics",
    soort: "Conceptproject",
    voor: "TERRA, een fictief keramiekatelier",
    lead: "Een rustige, tactiele site voor een keramiekmerk dat alles met de hand maakt. Elke overgang net zo bedachtzaam als het ambacht zelf.",
    opdracht:
      "Hoe laat je op een website voelen dat iets langzaam en met de hand is gemaakt? Met TERRA wilden we laten zien dat beweging ook rustig kan zijn: geen effecten om de effecten, maar het tempo van een pottenbakker.",
    aanpak: [
      {
        title: "Het maken als verhaal",
        text: "Het proces (draaien, afdraaien, glazuren, stoken) volg je tijdens het scrollen, stap voor stap.",
      },
      {
        title: "Quiet luxury",
        text: "Veel ruimte, warme aardetinten en grote beelden. De collectie, materialen en het atelier krijgen elk een eigen moment.",
      },
      {
        title: "Klaar voor een echte winkel",
        text: "Collectie met stukken en maten, een bezoekpagina en een aanvraagformulier: alles wat een echt atelier nodig heeft.",
      },
    ],
    inhoud: ["Scroll-verhaal van het maakproces", "Collectie met losse stukken", "Materialen en atelier", "Bezoek en aanvraagformulier"],
    techniek: ["Next.js", "Tailwind CSS", "Framer Motion"],
    resultaat: "Een complete conceptsite die laat zien hoe een ambachtelijk merk zich online kan onderscheiden.",
    images: [
      { src: "/images/projecten/terra/process-throwing.webp", alt: "Handen vormen klei op een draaischijf, beeld uit de TERRA-site", position: "50% 42%" },
      { src: "/images/projecten/terra/hero-vessel.webp", alt: "Keramische vaas uit de hero van de TERRA-site", position: "50% 50%" },
      { src: "/images/projecten/terra/atelier.webp", alt: "Het atelier met planken vol keramiek, beeld uit de TERRA-site", position: "50% 50%" },
    ],
    seo: {
      title: "Case: TERRA Ceramics (concept) | Sixtyfold",
      description:
        "TERRA Ceramics: een conceptsite van Sixtyfold voor een ambachtelijk keramiekmerk, met een rustig scroll-verhaal van het maakproces.",
    },
  },
  {
    slug: "noordvaart",
    project: "NOORDVAART",
    soort: "Conceptproject",
    voor: "NOORDVAART, een fictieve jachtwerf",
    lead: "Een donkere, filmische site voor luxe jachten, waarin beeld en scroll de hele ervaring dragen.",
    opdracht:
      "Kun je een product van miljoenen online net zo laten voelen als een bezoek aan de werf? NOORDVAART is ons antwoord: een conceptsite voor handgebouwde jachten, waar je het schip ervaart in plaats van leest.",
    aanpak: [
      {
        title: "Filmisch vanaf de eerste seconde",
        text: "Een hero-video van een echt schip, bewerkt en opgeschaald met Higgsfield, en scènes die je met je scroll bestuurt.",
      },
      {
        title: "Van boven en onder water",
        text: "De vloot, een duik onder de waterlijn met de specificaties en de werf in details: teak, messing, leer en lijnwerk.",
      },
      {
        title: "Zelf samenstellen",
        text: "Een configurator voor rompkleur, dekhout en interieur, die je meeneemt naar je aanvraag.",
      },
    ],
    inhoud: ["Hero-video en scroll-gestuurde scènes", "Vloot met drie modellen", "Onderwater-sectie met specificaties", "Configurator voor romp, dek en interieur", "Aanvraag voor een werfbezoek"],
    techniek: ["Next.js", "GSAP", "Lenis", "Framer Motion", "Higgsfield"],
    resultaat: "Ons visitekaartje voor filmische scroll: een conceptsite die laat zien wat er kan als beeld en beweging het werk doen.",
    images: [
      { src: "/images/projecten/noordvaart/waterlijn.webp", alt: "Witte jachtromp op de waterlijn in de mist, beeld uit de NOORDVAART-site", position: "50% 45%" },
    ],
    seo: {
      title: "Case: NOORDVAART (concept) | Sixtyfold",
      description:
        "NOORDVAART: een filmische conceptsite van Sixtyfold voor handgebouwde jachten, met hero-video, scroll-scènes en een configurator.",
    },
  },
];
