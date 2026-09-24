import { BureaucraticCase, ServiceItem, TestimonialItem } from '../types';

export const IMAGES = {
  attilaPortrait: '/src/assets/images/attila_user_night_portrait_1790234197804.jpg',
  undergroundChamberBg: '/src/assets/images/colossal_occult_temple_chamber_1790234442138.jpg',
  darkRitualChamber: '/src/assets/images/dark_ritual_chamber_1790231488474.jpg',
  occultWaxSeal: '/src/assets/images/occult_wax_seal_1790231501776.jpg',
  hauntedApartmentMap: '/src/assets/images/haunted_apartment_map_1790231514601.jpg',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'rontas-ratetele',
    title: 'RONTÁS RÁTÉTELE™',
    subtitle: 'Fekete gyertyára karcolt név, asztalkopogás és aludt vér.',
    price: 19990,
    formattedPrice: '19 990 Ft',
    description: 'Amikor a puszta harag már kevés: fekete gyertyára karcolt névvel, rituális háromszori asztalkopogással intézzük az ügyet. A szomszéd kávéja minden reggel aludt vér ízű lesz, a mennyezetről fekete szurok csepeg, a borítékban döglött darázs érkezik. Hivatalos pátyi iktatás, az ügy lezárva.',
    features: [
      'Név rituális bekarcolása a fekete méhviasz gyertyába',
      'Háromszori kopogás az asztal alatt teljes sötétségben',
      'Szomszéd reggeli kávéjának aludt vér ízűvé tétele',
      'Hivatalos pátyi idézés döglött darázzsal a borítékban',
      '45 másodperc fojtogató, indokolatlan csend',
      'Fellebbezésnek helye nincs záradék'
    ],
    ritualElements: ['Fekete viasz', 'Döglött darázs', 'Rozsdás szög', 'Pátyi nehéz föld'],
    buttonText: 'RÁTENNÉM A RONTÁST',
    iconName: 'Skull'
  },
  {
    id: 'rontas-levetele',
    title: 'RONTÁS LEVÉTELE™',
    subtitle: 'Nyers marhaszív és heti Oldtimer Mitsubishi járőrözés.',
    price: 24990,
    formattedPrice: '24 990 Ft',
    description: 'Ha úgy ébredsz, mintha egy vizes zsákot húztak volna a fejedre, és a spájzban megsavanyodnak a lekvárok, a rontást egy nyers marhaszívbe csatornázzuk át. Ezt követően a heti Oldtimer Mitsubishi járőrözés során egy névtelen pátyi dűlőút mellett mélyre ássuk. A folyamat alatt kaparó hang hallható a vakolat mögül.',
    features: [
      'Negatív energia audit és mérgezési szint bemérése',
      'Rontás fizikai átcsatornázása nyers marhaszívbe',
      'Elhantolás a Páty környéki dűlőúton a heti Oldtimer Mitsubishi járőrözés során',
      'Vakolat mögötti kaparó hangok hivatalos lecsendesítése',
      'Spájz-mentesítés a savanyodó lekvárok ellen',
      'Sötét mentesítési bélyegző az ügyfél törzslapjára'
    ],
    ritualElements: ['Nyers marhaszív', 'Földelt hamu', 'Kaparó szerszám', 'Oldtimer Mitsubishi szenteltföld'],
    buttonText: 'LEVESZEM A RONTÁST',
    iconName: 'Flame',
    popular: true
  },
  {
    id: 'atok-levetele',
    title: 'ÁTOK LEVÉTELE™',
    subtitle: 'Ami nem a tiéd, de mégis téged eszik.',
    price: 29990,
    formattedPrice: '29 990 Ft',
    description: 'Családi átkok, amelyeket még a dédnagyanyád hozott el a monarchia idejéből, és most a te gerincedben lüktet. Válassz hatáskört: [SZEMÉLYES], [CSALÁDI ROVÁS], [INGATLANTERHELÉS], vagy [„NEM TUDOM, DE A MACSKA MÁR HARMADIK NAPJA A FALAT BÁMULJA ÉS SZISZEG”].',
    features: [
      'Generációs átoklánc elvágása obszidián pengével',
      'Monarchia-korabeli karmikus adósság törlése',
      'Macska-fal bámulási anomália kioltása',
      'Gerincben lüktető sötét gócok feloldása',
      'Attila jéghideg, 4 perces némakonzultációja',
      'Iktatott átokmentesítési dekrétum'
    ],
    ritualElements: ['Obszidián penge', 'Megfeketedett pergamen', 'Temetői föld', 'Monarchia-érme'],
    buttonText: 'ÁTOK MENTESÍTÉS',
    iconName: 'ShieldAlert'
  },
  {
    id: 'vedelem-rontas-ellen',
    title: 'VÉDELEM A RONTÁS ELLEN™',
    subtitle: 'Aknazár a lélek körül.',
    price: 18990,
    formattedPrice: '18 990 Ft',
    description: 'Generálj egy egyedi, digitálisan lepecsételt Huszár-féle Okkult Védelmi Bélyeget. Bélyegzőszám: HA-666-ROTT. Kompatibilitás: Sötét. Védettség: Amíg a viasz ki nem hűl.',
    features: [
      'Egyedi HA-666-ROTT bélyegzőszám generálás',
      '99.9%-os szimbolikus asztrális aknazár',
      'Bekeretezhető okkult mentesítési okirat',
      'Védettség szavatossága: Amíg a fekete viasz meleg',
      'Lidércek, rosszakarók és sógorok elriasztása',
      'Pátyi okkult hivatal pecsétje a digitális lenyomaton'
    ],
    ritualElements: ['Vörös és fekete pecsétviasz', 'Szakrális geometria', 'Digitális vérpecsét'],
    buttonText: 'PECSÉT GENERÁLÁSA',
    iconName: 'Shield'
  },
  {
    id: 'negativ-energia-tisztitas',
    title: 'NEGATÍV ENERGIA TISZTÍTÁS',
    subtitle: 'A lakásod lehet penészes. De lehet, hogy a falban laknak.',
    price: 22990,
    formattedPrice: '22 990 Ft',
    description: 'Interaktív lakásdiagram és helyiség-szintű tértisztítás. Konyhától a padláson és pincén át egészen „AZ A SZOBA, AHOVA CSAK BOTTAL NYÚLSZ BE” zónáig. A radiátor mögötti 4 fiktív entitás és a dögszagú levegő azonnali szanálása.',
    features: [
      'Helyiségenkénti fertőzöttségi hőtérkép (Konyha, Pince, Padlás, Bot-szoba)',
      'Radiátor mögötti entitás-telepek füstöléses kilakoltatása',
      'Dögszag és fojtogató hideg fuvallatok elszívása',
      'Bojler vs. Valódi Démon diagnosztikai elválasztás',
      'Szoba-specifikus hamuvonal meghúzása a küszöbökön'
    ],
    ritualElements: ['Fojtogató tömjén', 'Szénporos védvonal', 'Vasreszelék', 'Asztrális lapát'],
    buttonText: 'LAKÁS FELMÉRÉSE',
    iconName: 'Compass'
  },
  {
    id: 'mi-a-franc',
    title: '„MI A FRANC TÖRTÉNIK VELEM?” CSOMAG',
    subtitle: 'Nem tudod. Én sem tudom. A Jóisten sem tudja.',
    price: 13666,
    formattedPrice: '13 666 Ft',
    description: 'Nem tudod. Én sem tudom. A Jóisten sem tudja. De nyitunk rá egy iktatószámot, rágyújtunk egy fekete gyertyára, és kiküldünk egy hivatalos határozatot, hogy a paranormális állapotod megmagyarázhatatlan, de számlázható.',
    features: [
      'Hivatalos megmagyarázhatatlan állapot iktatása',
      'Fekete gyertya gyújtása Pátyon a te nevedben',
      'Számlázott és lepecsételt paranormális bizonytalansági határozat',
      'Döbbent csend protokoll (15 perc Attilával)',
      'Bojler-mentességi bizonyítvány kiállítása'
    ],
    ritualElements: ['Kérdőív', 'Kétely', 'Kialudt méhviasz gyertya', 'Döbbent csend'],
    buttonText: 'NEM TUDOM MI VAN VELEM',
    iconName: 'HelpCircle'
  },
  {
    id: 'teljes-sotetseg',
    title: '☠️ TELJES SÖTÉTSÉG CSOMAG',
    subtitle: 'Az abszolút megsemmisítés és védelem.',
    price: 66666,
    formattedPrice: '66 666 Ft',
    description: 'Az abszolút megsemmisítés és védelem. 66 666 Ft. Ha a lakásodban már konkrétan átjáró nyílt a pokolba, és a gázóra visszafele pörög. Tartalmazza a teljes rituális jegyzőkönyvet, a pátyi sötét pecsétet és az azonnali kiszállási ígéretet a leláncolt E30-as BMW vagy az Oldtimer Mitsubishi bevetésével.',
    badge: 'NEM KEZDŐKNEK',
    features: [
      'Komplett pokol-átjáró lezárási jegyzőkönyv',
      'Visszafelé pörgő mérőórák és elszabadult gravitáció vizsgálata',
      'Marhaszíves és obszidiános kettős megsemmisítés',
      'Személyes HA-666-MAXIMAL Okkult Bélyegző kiállítása',
      'Azonnali kiszállás Pátyról az Oldtimer Mitsubishivel',
      'Örökös nyilvántartási törzslap a Sötét Ügyfélkapuban'
    ],
    ritualElements: ['Hétágú fekete kandeláber', 'Minden rituális tőr', 'Kénkő és föld', 'Ördögűző eskü'],
    buttonText: 'TELJES SÖTÉTSÉGET KÉREK',
    iconName: 'Zap',
    popular: true
  }
];

export const INITIAL_CASES: BureaucraticCase[] = [
  {
    caseId: 'HA-666-2026',
    clientName: 'Kovács B. (Páty)',
    serviceTitle: 'RONTÁS LEVÉTELE™',
    submissionDate: '2026. 09. 21. 23:45',
    darknessLevel: 666,
    status: 'RITUAL_FOLYAMATBAN',
    statusText: 'MARHASZÍV BEÁSÁSA FOLYAMATBAN',
    progressPercent: 88,
    investigationStatus: 'KÉSZ',
    protectionStatus: 'FOLYAMATBAN',
    darknessCompatibility: 'SÖTÉT',
    attilaNotified: true,
    notes: [
      'Ügyfél bejelentette: a spájzban a meggybefőtt aludt vérként bugyogott.',
      'Rontás átcsatornázva a nyers marhaszívbe.',
      'Attila elindult a pátyi dűlőútra az Oldtimer Mitsubishivel és az ásóval.',
      'A vakolat alatti kaparászás frekvenciája 42%-kal csökkent.'
    ],
    location: 'Páty, Külterületi Dűlő'
  },
  {
    caseId: 'HA-131-2026',
    clientName: 'Nagy V. (Biatorbágy)',
    serviceTitle: '„MI A FRANC TÖRTÉNIK VELEM?” CSOMAG',
    submissionDate: '2026. 09. 22. 03:14',
    darknessLevel: 300,
    status: 'VIZSGALAT_ALATT',
    statusText: 'BÜROKRATIKUS TANÁCSTALANSÁG',
    progressPercent: 42,
    investigationStatus: 'FOLYAMATBAN',
    protectionStatus: 'VÁRAKOZIK',
    darknessCompatibility: 'Garázsban rekedt E30-as üvöltés',
    attilaNotified: true,
    notes: [
      'Bojler ellenőrizve: nem a bojler morog, a vízmelegítőből hideg latin szavak szivárognak.',
      'Iktatószám kiállítva. Fekete gyertya meggyújtva.',
      'Attila 4 percig csendben bámulta a jegyzőkönyvet.'
    ],
    location: 'Biatorbágy'
  },
  {
    caseId: 'HA-999-2026',
    clientName: 'Szabó G. (Budapest XI.)',
    serviceTitle: 'TELJES SÖTÉTSÉG CSOMAG',
    submissionDate: '2026. 09. 19. 00:00',
    darknessLevel: 666,
    status: 'VEDELEM_AKTIV',
    statusText: 'POKOL-ÁTJÁRÓ LEPECSÉTELVE',
    progressPercent: 100,
    investigationStatus: 'KÉSZ',
    protectionStatus: 'KÉSZ',
    darknessCompatibility: 'OPTIMÁLISAN SÖTÉT',
    attilaNotified: true,
    notes: [
      'A gázóra visszafele pörgése leállítva.',
      '4 entitás kitelepítve a radiátor mögül.',
      'HA-666-ROTT pecsét ráégetve a bejárati ajtókeretre.',
      'Ügy lezárva. Fellebbezésnek helye nincs.'
    ],
    location: 'Budapest, Kelenföld'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: 'A buszmegállóban végzett gyors rituálé után végre megjött a 784-es busz és a rontás is elmúlt.',
    author: 'K. Bence',
    location: 'Páty',
    service: 'Spontán Volánbusz-megállós Kiszorítás',
    date: '2026. szeptember',
    reply: 'A pátyi Volánbusz-megállós ördögűzés alapvető lakossági szolgáltatás a hetes buszra várva.'
  },
  {
    quote: 'Attila 17 másodpercig nézett rám az Oldtimer Mitsubishijéből. Azóta nem mer a démon visszajönni.',
    author: 'M. Péter',
    location: 'Biatorbágy',
    service: 'Démonológiai Felmérés',
    date: '2026. július',
    reply: 'A csomagtartóban lévő szenteltföld, láncok és viasz aurája kisugárzott a szélvédőn át.'
  },
  {
    quote: 'A rontás levétele óta a vakolat nem hullik a szemembe éjszaka. Attila nem mosolygott, de elhittem neki.',
    author: 'B. Katalin',
    location: 'Páty',
    service: 'Rontás Levétel',
    date: '2026. szeptember',
    reply: 'A marhaszív elásása a heti Mitsubishi járőrözés alatt megtette a hatását.'
  },
  {
    quote: 'Kértem egy rontást a sógoromra. Másnap beverte a könyökét, elvesztette a kulcsát, és a kávéja aludt vér ízű lett.',
    author: 'K. Zoltán',
    location: 'Zsámbék',
    service: 'Rontás Rátétele',
    date: '2026. augusztus',
    reply: 'Fekete gyertyára karcolt név, döglött darázs a borítékban. Ügy lezárva.'
  },
  {
    quote: 'A spájzban a lekvár nem bugyogott többé alvadt vérként. A kiszámlázott összeg pontos volt, a pecsét fekete viaszból készült.',
    author: 'V. Tamás',
    location: 'Biatorbágy',
    service: 'Rontás Levétel',
    date: '2026. augusztus',
    reply: 'A pátyi dűlőúti földelés elszívta a savanyodást.'
  },
  {
    quote: 'A lakásomban a padlás felől nehéz bakancsléptek hallatszottak. Attila felküldött egy füstölőt, és megállapította, hogy generációs terhelés áll fenn. Azóta csak suttogás van.',
    author: 'D. Piroska',
    location: 'Budakeszi',
    service: 'Generációs Átokmentesítés',
    date: '2026. szeptember',
    reply: 'A monarchia-korabeli entitások makacsok. A suttogás már tolerálható normál üzem.'
  }
];

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    question: 'Láttad-e már Attilát egy Oldtimer Mitsubishiből inteni éjfélkor Páty és Biatorbágy között?',
    options: [
      { text: 'Igen, és a szemében nem volt megbánás.', score: 40 },
      { text: 'Nem, csak a garázs mélyén leláncolt E30-as BMW üvöltését hallottam.', score: 35 },
      { text: 'Sajnos igen, azóta hideg van a spájzban és a macska a falat nézi.', score: 45 }
    ]
  },
  {
    id: 2,
    question: 'Vártál-e már a pátyi Volánbusz-megállóban a 784-es buszra, miközben hirtelen kénkőszag és rituális kántálás csapott meg?',
    options: [
      { text: 'Igen, Attila épp egy azonnali kiszorító rituálét végzett a padon.', score: 35 },
      { text: 'Nem, de a busz sosem jön időben és a lámpák vibrálnak.', score: 25 },
      { text: 'A pátyi menetrend szerint ez a normál asztrális üzemmód.', score: 30 }
    ]
  },
  {
    id: 3,
    question: 'Hallottál-e kaparászást a parketta vagy a vakolat alól, amikor a tévé ki volt kapcsolva?',
    options: [
      { text: 'Igen, egyenletes, ritmikus körmök kaparása.', score: 35 },
      { text: 'Nem, nálunk halotti csend honol.', score: 0 },
      { text: 'Igen, de azt mondtam magamnak, hogy a bojler az.', score: 30 }
    ]
  },
  {
    id: 4,
    question: 'Nézett-e már rád a tükörképed 0.5 másodperccel tovább, miközben fekete viasz illatát érezted?',
    options: [
      { text: 'Igen, és gúnyosan elmosolyodott.', score: 35 },
      { text: 'Nem, azonnal követi a mozgásomat.', score: 0 },
      { text: 'Már hónapok óta letakarva tartom az összes tükröt.', score: 40 }
    ]
  },
  {
    id: 5,
    question: 'Hogyan viselkedik a macskád vagy a spájzban lévő befőtt?',
    options: [
      { text: 'A macska 3 napja a csupasz sarokba sziszeg és fújtat.', score: 35 },
      { text: 'A meggybefőtt aludt vérként bugyog a polcon.', score: 40 },
      { text: 'Nincs semmim, csak hideg fuvallat jön a konnektorból.', score: 30 }
    ]
  }
];

export const RANDOM_TOASTS = [
  { title: '⚠ VOLÁNBUSZ-MEGÁLLÓS RITUÁLÉ', description: 'Attila épp a 784-es buszra várva végzett azonnali kiszorítást a pátyi megállóban.' },
  { title: '🚗 OLDTIMER MITSUBISHI JÁRŐRÖZÉS', description: 'Az éjféli kiszállási jármű elindult Pátyról. A csomagtartóban szenteltföld, láncok és viasz.' },
  { title: '🩸 SÖTÉT IKTATÁS', description: 'Fekete gyertyára karcolt név rögzítve. Háromszori kopogás elrendelve az asztal alatt.' },
  { title: '🕯 MARHASZÍV PROTOKOLL', description: 'Egy 24 990 Ft-os rontás elásása folyamatban a névtelen pátyi dűlőútnál.' },
  { title: '⚡ GARÁZSBAN LELÁNCOLT E30', description: 'A legendás E30-as BMW sötétségi moraja érzékelhető a pátyi garázs mélyéről.' },
  { title: '📜 MULASZTÁSI BÍRSÁG', description: 'Rituális késedelem észlelve. Huszár Attila 4 perces némacsendet rendelt el.' }
];
