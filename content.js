// Contenido editable del portfolio.
// Los textos se escriben una sola vez por campo con L(català, español, English).
// Aquí puedes cambiar perfil, títulos, descripciones, aportaciones y orden de imágenes
// sin tocar la lógica de la web.

const L = (ca, es, en) => ({ ca, es, en });

window.PORTFOLIO_DEFAULT_LANGUAGE = "ca";
window.PORTFOLIO_LANGUAGES = {
  ca: "Català",
  es: "Español",
  en: "English"
};

window.PORTFOLIO_UI = {
  ca: {
    language: "Idioma",
    favorites: "Preferits",
    library: "Biblioteca",
    all: "Tot",
    contact: "Contacte",
    categories: "Categories",
    content: "Contingut",
    folders: "Carpetes",
    searchPlaceholder: "Cerca projectes...",
    sidebarNote: "Barcelona, Catalunya, Espanya.",
    contactMethods: "Instagram i correu",
    twoContactMethods: "2 vies de contacte",
    element: "element",
    elements: "elements",
    selectFolder: "Selecciona una carpeta a la columna central.",
    selectPiece: "Selecciona una peça per veure-la aquí.",
    missingPhotos: "Fotos pendents d'incorporar",
    photoAlt: "Foto",
    viewPhoto: "Veure foto",
    viewVideo: "Veure vídeo",
    channelKicker: "CONTINGUT PERSONAL / OCI",
    channelText: "Vídeos i contingut personal.",
    visitChannel: "Visita el canal",
    contribution: "APORTACIÓ",
    summaryKicker: "PORTFOLIO / ÍNDEX",
    summaryTitle: "Tot.",
    summaryIntro: "Tot el material del portfolio en un únic lloc. Selecciona qualsevol peça de la columna central i s'obrirà aquí, sense sortir de Tot.",
    contactTitle: "Parlem?",
    email: "Correu",
    originalScore: "JOAN BRÚ / MÚSICA ORIGINAL"
  },
  es: {
    language: "Idioma",
    favorites: "Favoritos",
    library: "Biblioteca",
    all: "Todo",
    contact: "Contacto",
    categories: "Categorías",
    content: "Contenido",
    folders: "Carpetas",
    searchPlaceholder: "Buscar proyectos...",
    sidebarNote: "Barcelona, Cataluña, España.",
    contactMethods: "Instagram y correo",
    twoContactMethods: "2 vías de contacto",
    element: "elemento",
    elements: "elementos",
    selectFolder: "Selecciona una carpeta en la columna central.",
    selectPiece: "Selecciona una pieza para verla aquí.",
    missingPhotos: "Fotos pendientes de incorporar",
    photoAlt: "Foto",
    viewPhoto: "Ver foto",
    viewVideo: "Ver vídeo",
    channelKicker: "CONTENIDO PERSONAL / OCIO",
    channelText: "Vídeos y contenido personal.",
    visitChannel: "Visitar canal",
    contribution: "APORTACIÓN",
    summaryKicker: "PORTFOLIO / ÍNDICE",
    summaryTitle: "Todo.",
    summaryIntro: "Todo el material del portfolio en un único lugar. Selecciona cualquier pieza de la columna central y se abrirá aquí, sin salir de Todo.",
    contactTitle: "¿Hablamos?",
    email: "Correo",
    originalScore: "JOAN BRÚ / MÚSICA ORIGINAL"
  },
  en: {
    language: "Language",
    favorites: "Favorites",
    library: "Library",
    all: "All",
    contact: "Contact",
    categories: "Categories",
    content: "Content",
    folders: "Folders",
    searchPlaceholder: "Search projects...",
    sidebarNote: "Barcelona, Catalonia, Spain.",
    contactMethods: "Instagram and email",
    twoContactMethods: "2 contact methods",
    element: "item",
    elements: "items",
    selectFolder: "Select a folder in the middle column.",
    selectPiece: "Select a piece to view it here.",
    missingPhotos: "Photos pending",
    photoAlt: "Photo",
    viewPhoto: "View photo",
    viewVideo: "Watch video",
    channelKicker: "PERSONAL CONTENT / LEISURE",
    channelText: "Videos and personal content.",
    visitChannel: "Visit channel",
    contribution: "CONTRIBUTION",
    summaryKicker: "PORTFOLIO / INDEX",
    summaryTitle: "All.",
    summaryIntro: "All portfolio material in one place. Select any piece from the middle column and it will open here without leaving All.",
    contactTitle: "Let's talk?",
    email: "Email",
    originalScore: "JOAN BRÚ / ORIGINAL SCORE"
  }
};

window.PORTFOLIO_PROFILE = {
  name: "JOAN BRÚ",
  email: "joanbru008@gmail.com",
  instagramHandle: "@joanbruu",
  instagramUrl: "https://www.instagram.com/joanbruu/",
  contactKicker: "JOAN BRÚ / AUDIOVISUAL",
  contactIntro: L(
    "Foto, vídeo, postproducció, música o una idea que encara no té forma.",
    "Foto, vídeo, postproducción, música o una idea que todavía no tiene forma.",
    "Photography, video, post-production, music, or an idea that has not taken shape yet."
  )
};

window.PORTFOLIO_CONTENT = {
  proyectos: {
    label: L("Projectes", "Proyectos", "Projects"),
    icon: "✦",
    type: "collection",
    items: [
      {
        id: "spot-inmobiliaria",
        title: "Spot iGestió",
        meta: "Spot · YouTube",
        description: L(
          "Espòt publicitari per a una immobiliària amb seu a Sant Feliu de Llobregat.",
          "Spot publicitario para una inmobiliaria basada en Sant Feliu de Llobregat.",
          "Commercial spot for a real-estate agency based in Sant Feliu de Llobregat."
        ),
        contributions: [
          L("Guió", "Guión", "Script"),
          L("Direcció", "Dirección", "Direction"),
          "BSO",
          L("Postproducció", "Postproducción", "Post-production")
        ],
        kind: "youtube",
        youtubeId: "6NvPclCZoAM",
        externalUrl: "https://www.youtube.com/watch?v=6NvPclCZoAM"
      },
      {
        id: "spot-peluqueria-estetica",
        title: "Spot Pilar Marín",
        meta: "Spot · YouTube",
        description: L(
          "Espòt publicitari gravat a l'Hotel Torre Melina per a una perruqueria associada a una floristeria, especialitzades en casaments.",
          "Spot publicitario grabado en el Hotel Torre Melina para una peluquería asociada a una floristería, especializadas en bodas.",
          "Commercial spot shot at Hotel Torre Melina for a hair salon partnered with a florist, both specialized in weddings."
        ),
        contributions: [],
        kind: "youtube",
        youtubeId: "qcvNduSf_RQ",
        externalUrl: "https://www.youtube.com/watch?v=qcvNduSf_RQ"
      },
      {
        id: "ginpasf-proyecto",
        title: L("Documental GINPASF", "Documental GINPASF", "GINPASF Documentary"),
        meta: L("Documental · Activitat paranormal", "Documental · Actividades paranormales", "Documentary · Paranormal activity"),
        description: L(
          "Docureportatge per a GINPASF (Grup d'Investigació Paranormal de Sant Feliu) sobre la llegenda de la Dama de Blanc de Fontcaldetes.",
          "Docu-reportaje para GINPASF (Grupo de Investigación Paranormal de Sant Feliu) sobre la leyenda de la Dama de Blanco de Fontcaldetes.",
          "Documentary report for GINPASF (Sant Feliu Paranormal Research Group) about the legend of the White Lady of Fontcaldetes."
        ),
        contributions: [
          L("Localització", "Localización", "Location scouting"),
          L("Producció", "Producción", "Production"),
          L("Operació de càmera", "Operación de cámara", "Camera operation"),
          L("Tècnic de so", "Técnico de sonido", "Sound technician"),
          "BSO",
          L("Postproducció", "Postproducción", "Post-production")
        ],
        kind: "youtube",
        youtubeId: "WlQeL4UCRCo",
        externalUrl: "https://www.youtube.com/watch?v=WlQeL4UCRCo"
      },
      {
        id: "mixunets",
        title: "Mixunets",
        meta: L("YouTube · Contingut personal", "YouTube · Contenido personal", "YouTube · Personal content"),
        description: L(
          "Canal de YouTube principalment de viatges, el meu contingut més personal i pur.",
          "Canal de YouTube principalmente de viajes, mi contenido más personal y puro.",
          "A YouTube channel focused mainly on travel: my most personal and unfiltered content."
        ),
        contributions: [],
        kind: "channel",
        externalUrl: "https://www.youtube.com/@mixunets",
        thumbnails: [
          { local: "assets/images/mixunets/01.jpg", remote: "https://i.ytimg.com/vi/hi8ji331RJA/maxresdefault.jpg" },
          { local: "assets/images/mixunets/02.jpg", remote: "https://i.ytimg.com/vi/S6jKOkwNUc4/maxresdefault.jpg" },
          { local: "assets/images/mixunets/03.jpg", remote: "https://i.ytimg.com/vi/3sNJUAODwsk/maxresdefault.jpg" },
          { local: "assets/images/mixunets/04.jpg", remote: "https://i.ytimg.com/vi/MIDbMiKg6TE/maxresdefault.jpg" }
        ]
      }
    ]
  },

  vertical: {
    label: "Vertical",
    icon: "🎞️",
    type: "collection",
    items: [
      {
        id: "c80gear",
        title: "Canon C80 Rig",
        meta: "00:41 · Vertical",
        description: L("Vestint des de zero una Canon C80.", "Vistiendo desde cero una Canon C80.", "Building a Canon C80 rig from scratch."),
        contributions: [],
        kind: "video",
        video: "assets/videos/c80gear.mp4",
        poster: "assets/images/video-posters/c80gear.jpg",
        dimensions: "720×1280"
      },
      {
        id: "cadires",
        title: "Prop Chairs",
        meta: "00:05 · Vertical",
        description: L("Stop-motion bàsic i divertit amb cadires d'atrezzo.", "Stop motion básico y divertido con sillas de atrezo.", "A simple, playful stop-motion piece using prop chairs."),
        contributions: [],
        kind: "video",
        video: "assets/videos/cadires.mp4",
        poster: "assets/images/video-posters/cadires.jpg",
        dimensions: "720×1280"
      },
      {
        id: "fxlion",
        title: "FXLion Nano Pro Unboxing",
        meta: "00:26 · Vertical",
        description: L("Unboxing d'un nou model de bateries V-Mount.", "Unboxing de un nuevo modelo de baterías V-Mount.", "Unboxing a new V-Mount battery model."),
        contributions: [],
        kind: "video",
        video: "assets/videos/fxlion.mp4",
        poster: "assets/images/video-posters/fxlion.jpg",
        dimensions: "720×1280"
      },
      {
        id: "studio1-koi",
        title: "Movistar KOI Photoshoot Making Of",
        meta: "00:21 · Vertical",
        description: L("Making of de la sessió fotogràfica per a la nova col·lecció de samarretes de Movistar KOI.", "Making Of del photoshoot para la nueva colección de camisetas de Movistar KOI.", "Behind the scenes of the photoshoot for Movistar KOI's new jersey collection."),
        contributions: [],
        kind: "video",
        video: "assets/videos/studio1-koi.mp4",
        poster: "assets/images/video-posters/studio1-koi.jpg",
        dimensions: "720×1280"
      },
      {
        id: "studio2-irene",
        title: "Model Photoshoot Making Of",
        meta: "00:18 · Vertical",
        description: L("Making of d'una sessió fotogràfica de moda.", "Making Of de photoshoot de moda.", "Behind the scenes of a fashion photoshoot."),
        contributions: [],
        kind: "video",
        video: "assets/videos/studio2-irene.mp4",
        poster: "assets/images/video-posters/studio2-irene.jpg",
        dimensions: "720×1280"
      }
    ]
  },

  fotos: {
    label: "Fotos",
    icon: "📷",
    type: "folders",
    folders: {
      producto: {
        label: L("Foto de producte", "Foto producto", "Product photography"),
        icon: "◫",
        items: [
          {
            id: "cobra-tether",
            title: "Cobra Tether",
            meta: L("Carrusel · 3 fotos", "Carrusel · 3 fotos", "Carousel · 3 photos"),
            description: L("Fotografia de producte centrada en el detall i la textura.", "Fotografía de producto centrada en detalle y textura.", "Product photography focused on detail and texture."),
            contributions: [],
            kind: "photos",
            images: [
              "assets/images/cobra-tether-01.jpg",
              "assets/images/cobra-tether-02.jpg",
              "assets/images/cobra-tether-03.jpg"
            ]
          },
          {
            id: "dzo-vespid",
            title: "DZO Vespid Prime",
            meta: L("Carrusel · 7 fotos", "Carrusel · 7 fotos", "Carousel · 7 photos"),
            description: L("Sèrie de producte del kit d'òptiques DZO Vespid Prime II.", "Serie de producto del kit de ópticas DZO Vespid Prime II.", "Product series featuring the DZO Vespid Prime II lens kit."),
            contributions: [],
            kind: "photos",
            images: [
              "assets/images/dzo-05.jpg",
              "assets/images/dzo-01.jpg",
              "assets/images/dzo-02.jpg",
              "assets/images/dzo-03.jpg",
              "assets/images/dzo-04.jpg",
              "assets/images/dzo-06.jpg",
              "assets/images/dzo-07.jpg"
            ]
          },
          {
            id: "macbook-m5",
            title: "MacBook M5",
            meta: L("Carrusel · 4 fotos", "Carrusel · 4 fotos", "Carousel · 4 photos"),
            description: L("Sèrie visual de l'últim MacBook Pro M5 Max.", "Serie visual del último MacBook Pro M5 Max.", "Visual series featuring the latest MacBook Pro M5 Max."),
            contributions: [],
            kind: "photos",
            images: [
              "assets/images/macbook-m5-01.jpg",
              "assets/images/macbook-m5-02.jpg",
              "assets/images/macbook-m5-03.jpg",
              "assets/images/macbook-m5-04.jpg"
            ]
          },
          {
            id: "nikon-z8",
            title: "Nikon Z8",
            meta: L("Carrusel · 4 fotos", "Carrusel · 4 fotos", "Carousel · 4 photos"),
            description: L("Fotografia de producte de càmera i òptiques de la sèrie Z de Nikon.", "Fotografía de producto de cámara y ópticas de la serie Z de Nikon.", "Product photography of a Nikon Z-series camera and lenses."),
            contributions: [],
            kind: "photos",
            images: [
              "assets/images/nikon-z8-03.jpg",
              "assets/images/nikon-z8-01.jpg",
              "assets/images/nikon-z8-02.jpg",
              "assets/images/nikon-z8-04.jpg"
            ]
          }
        ]
      },

      eventos: {
        label: L("Esdeveniments", "Eventos", "Events"),
        icon: "✺",
        items: [
          {
            id: "night-of-wolves",
            title: "DJ Set · Night of Wolves",
            meta: L("Esdeveniment · 8 fotos", "Evento · 8 fotos", "Event · 8 photos"),
            description: L("Galeria del set Night of Wolves a Tarragona.", "Galería del set Night of Wolves en Tarragona.", "Gallery from the Night of Wolves set in Tarragona."),
            contributions: [],
            kind: "photos",
            images: [
              "assets/images/night-of-wolves/dj-set-01.png",
              "assets/images/night-of-wolves/dj-set-02.png",
              "assets/images/night-of-wolves/dj-set-03.png",
              "assets/images/night-of-wolves/dj-set-04.png",
              "assets/images/night-of-wolves/dj-set-05.jpg",
              "assets/images/night-of-wolves/dj-set-06.jpg",
              "assets/images/night-of-wolves/dj-set-07.jpg",
              "assets/images/night-of-wolves/dj-set-08.jpg"
            ]
          },
          {
            id: "rugby-fem-buc-vs-barca",
            title: L("Rugbi fem. BUC vs Barça", "Rugby Fem. BUC vs Barça", "Women's Rugby · BUC vs Barça"),
            meta: L("Esdeveniment · 6 fotos", "Evento · 6 fotos", "Event · 6 photos"),
            description: L("Selecció del partit BUC vs Barça a la Copa de la Reina de rugbi femení.", "Selección del partido BUC vs Barça en la Copa de la Reina de rugby femenino.", "Selection from the BUC vs Barça match in the women's Copa de la Reina rugby competition."),
            contributions: [],
            kind: "photos",
            images: [
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-06.jpg",
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-01.jpg",
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-02.jpg",
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-03.jpg",
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-04.jpg",
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-05.jpg"
            ]
          }
        ]
      },

      analogico: {
        label: L("Analògic", "Analógico", "Film"),
        icon: "◉",
        items: [
          {
            id: "olympus-mju-ii",
            title: "Olympus Mju II",
            meta: L("Analògic · 7 fotos", "Analógico · 7 fotos", "Film · 7 photos"),
            description: L("Selecció de 35 mm preses amb una Olympus Mju II el passat Sant Joan.", "Selección de 35 mm tomadas con una Olympus Mju II el pasado Sant Joan.", "Selection of 35 mm photographs taken with an Olympus Mju II during Sant Joan."),
            contributions: [],
            kind: "photos",
            images: [
              "assets/images/analogico/olympus-mju-ii/olympus-01.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-02.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-03.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-04.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-05.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-06.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-07.jpg"
            ]
          },
          {
            id: "contax-g2",
            title: "Contax G2",
            meta: L("Analògic · 7 fotos", "Analógico · 7 fotos", "Film · 7 photos"),
            description: L("Selecció d'un rodet de 35 mm disparat amb una Contax G2 en un partit de Divisió d'Honor B Espanyola de rugbi (BUC vs Toro).", "Selección de carrete 35 mm disparado con una Contax G2 en un partido de División de Honor B Española de rugby (BUC vs Toro).", "Selection from a 35 mm roll shot with a Contax G2 at a Spanish División de Honor B rugby match (BUC vs Toro)."),
            contributions: [],
            kind: "photos",
            images: [
              "assets/images/analogico/contax-g2/contax-01.jpg",
              "assets/images/analogico/contax-g2/contax-02.jpg",
              "assets/images/analogico/contax-g2/contax-03.jpg",
              "assets/images/analogico/contax-g2/contax-04.jpg",
              "assets/images/analogico/contax-g2/contax-05.jpg",
              "assets/images/analogico/contax-g2/contax-06.jpg",
              "assets/images/analogico/contax-g2/contax-07.jpg"
            ]
          }
        ]
      }
    }
  },

  retransmisiones: {
    label: L("Retransmissions", "Retransmisiones", "Broadcasts"),
    icon: "◉",
    type: "collection",
    items: [
      {
        id: "operacion-camara-deportes",
        title: L("Operació de càmera · Esports", "Operación de cámara · Deportes", "Camera operation · Sports"),
        meta: L("Retransmissions · 4 fotos", "Retransmisiones · 4 fotos", "Broadcasts · 4 photos"),
        description: L("Operació de càmera en retransmissions de 1a i 2a RFEF.", "Operación de cámara en retransmisiones de 1a y 2a RFEF.", "Camera operation for 1st and 2nd RFEF live broadcasts."),
        contributions: [L("Operació de càmera", "Operación de cámara", "Camera operation")],
        kind: "photos",
        images: [
          "assets/images/retransmisiones/operacion-camara-01.jpg",
          "assets/images/retransmisiones/operacion-camara-02.jpg",
          "assets/images/retransmisiones/operacion-camara-03.jpg",
          "assets/images/retransmisiones/operacion-camara-04.jpg"
        ]
      }
    ]
  },

  musica: {
    label: L("Producció musical", "Producción musical", "Music production"),
    icon: "♫",
    type: "collection",
    items: [
      {
        id: "ginpasf-bso",
        title: "GINPASF",
        meta: L("01:33 · BSO documental", "01:33 · BSO documental", "01:33 · Documentary score"),
        description: L("Banda sonora per a un documental sobre activitat paranormal.", "Banda sonora para un documental sobre actividades paranormales.", "Original score for a documentary about paranormal activity."),
        contributions: ["BSO"],
        kind: "audio",
        audio: "assets/audio/ginpasf.mp3"
      },
      {
        id: "spot-inmobiliaria-bso",
        title: "Spot iGestió",
        meta: L("00:40 · BSO espot", "00:40 · BSO spot", "00:40 · Commercial score"),
        description: L("Banda sonora original per a un espot immobiliari.", "Banda sonora original para un spot de inmobiliaria.", "Original score for a real-estate commercial."),
        contributions: ["BSO"],
        kind: "audio",
        audio: "assets/audio/musica-inmobiliaria.wav"
      },
      {
        id: "IMPACTKD",
        title: "War",
        meta: L("01:30 · BSO esdeveniment", "01:30 · BSO evento", "01:30 · Event score"),
        description: L("Banda sonora per a una vetllada de MMA al gimnàs IMPACTKD.", "Banda sonora para una velada de MMA en el gimnasio IMPACTKD.", "Original score for an MMA event at the IMPACTKD gym."),
        contributions: ["BSO"],
        kind: "audio",
        audio: "assets/audio/war.wav"
      }
    ]
  }
};
