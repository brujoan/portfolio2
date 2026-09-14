// Contenido editable del portfolio.
// Aquí puedes cambiar perfil, títulos, descripciones, aportaciones y el orden de las imágenes
// sin tocar la lógica de la web.

window.PORTFOLIO_PROFILE = {
  name: "JOAN BRÚ",
  email: "joanbru008@gmail.com",
  instagramHandle: "@joanbruu",
  instagramUrl: "https://www.instagram.com/joanbruu/",
  contactKicker: "JOAN BRÚ / AUDIOVISUAL",
  contactIntro: "Foto, vídeo, postproducción, música o una idea que todavía no tiene forma."
};

window.PORTFOLIO_CONTENT = {
  proyectos: {
    label: "Proyectos",
    icon: "✦",
    type: "collection",
    items: [
      {
        id: "spot-inmobiliaria",
        title: "Spot iGestió",
        meta: "Spot · YouTube",
        description: "Spot publicitario para una inmobiliaria basada en Sant Feliu de Llobregat.",
        contributions: ["Guión", "Dirección", "BSO", "Postproducción"],
        kind: "youtube",
        youtubeId: "6NvPclCZoAM",
        externalUrl: "https://www.youtube.com/watch?v=6NvPclCZoAM"
      },
      {
        id: "spot-peluqueria-estetica",
        title: "Spot Pilar Marín",
        meta: "Spot · YouTube",
        description: "Spot publicitario grabado en el Hotel Torre Melina para una peluquería asociada a una floristería, especializadas en bodas.",
        contributions: [],
        kind: "youtube",
        youtubeId: "qcvNduSf_RQ",
        externalUrl: "https://www.youtube.com/watch?v=qcvNduSf_RQ"
      },
      {
        id: "ginpasf-proyecto",
        title: "Documental GINPASF",
        meta: "Documental · Actividades paranormales",
        description: "Docu-reportaje para GINPASF (Grupo de Investigación Paranormal de Sant Feliu) sobre la leyenda de la Dama de Blanco de Fontcaldetes.",
        contributions: ["Localización", "Producción", "Operación de cámara", "Técnico de sonido", "BSO", "Postproducción"],
        kind: "youtube",
        youtubeId: "WlQeL4UCRCo",
        externalUrl: "https://www.youtube.com/watch?v=WlQeL4UCRCo"
      },
      {
        id: "mixunets",
        title: "Mixunets",
        meta: "YouTube · Contenido personal",
        description: "Canal de youtube principalmente de viaje, mi contenido más personal y puro.",
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
      { id: "c80gear", title: "Canon C80 Rig", meta: "00:41 · Vertical", description: "Vistiendo desde cero una Canon C80.", contributions: [], kind: "video", video: "assets/videos/c80gear.mp4", poster: "assets/images/video-posters/c80gear.jpg", dimensions: "720×1280" },
      { id: "cadires", title: "Prop Chairs", meta: "00:05 · Vertical", description: "Stop motion básico y divertido con sillas de Atrezo.", contributions: [], kind: "video", video: "assets/videos/cadires.mp4", poster: "assets/images/video-posters/cadires.jpg", dimensions: "720×1280" },
      { id: "fxlion", title: "FXLion Nano Pro Unboxing", meta: "00:26 · Vertical", description: "Unboxing de un nuevo modelo de baterías V-Mount.", contributions: [], kind: "video", video: "assets/videos/fxlion.mp4", poster: "assets/images/video-posters/fxlion.jpg", dimensions: "720×1280" },
      { id: "studio1-koi", title: "Movistar KOI Photoshoot Making Of", meta: "00:21 · Vertical", description: "Making Of del photoshoot para la nueva colección de camisetas de Movistar KOI.", contributions: [], kind: "video", video: "assets/videos/studio1-koi.mp4", poster: "assets/images/video-posters/studio1-koi.jpg", dimensions: "720×1280" },
      { id: "studio2-irene", title: "Model Photoshoot Making Of", meta: "00:18 · Vertical", description: "Making Of de photoshoot de moda.", contributions: [], kind: "video", video: "assets/videos/studio2-irene.mp4", poster: "assets/images/video-posters/studio2-irene.jpg", dimensions: "720×1280" }
    ]
  },

  fotos: {
    label: "Fotos",
    icon: "📷",
    type: "folders",
    folders: {
      producto: {
        label: "Foto producto",
        icon: "◫",
        items: [
          {
            id: "cobra-tether",
            title: "Cobra Tether",
            meta: "Carrusel · 3 fotos",
            description: "Fotografía de producto centrada en detalle y textura.",
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
            meta: "Carrusel · 7 fotos",
            description: "Serie de producto del kit de ópticas DZO Vespid Prime II.",
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
            meta: "Carrusel · 4 fotos",
            description: "Serie visual del úlitmo MacBook Pro M5 Max.",
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
            meta: "Carrusel · 4 fotos",
            description: "Fotografía de producto de cámara y ópticas de la sere Z de Nikon.",
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
        label: "Eventos",
        icon: "✺",
        items: [
          {
            id: "night-of-wolves",
            title: "DJ Set · Night of Wolves",
            meta: "Evento · 8 fotos",
            description: "Galería del set Night of Wolves en Tarragona.",
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
            title: "Rugby Fem. BUC vs Barça",
            meta: "Evento · 6 fotos",
            description: "Selección del partido BUC vs Barça en la Copa de la Reina de rugby femenino.",
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
        label: "Analógico",
        icon: "◉",
        items: [
          {
            id: "olympus-mju-ii",
            title: "Olympus Mju II",
            meta: "Analógico · 7 fotos",
            description: "Selección de 35mm tomadas con una Olympus Mju II el pasado Sant Joan.",
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
            meta: "Analógico · 7 fotos",
            description: "Selección de carrete 35mm disparado con una Contax G2 en un partido de División de Honor B Española de rugby (BUC vs Toro).",
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
    label: "Retransmisiones deportivas",
    icon: "◉",
    type: "collection",
    items: [
      {
        id: "operacion-camara-deportes",
        title: "Operación de cámara · Deportes",
        meta: "Retransmisiones · 4 fotos",
        description: "Operación de cámara en retransmisiones de 1a y 2a RFEF.",
        contributions: ["Operación de cámara"],
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
    label: "Producción musical",
    icon: "♫",
    type: "collection",
    items: [
      {
        id: "ginpasf-bso",
        title: "GINPASF",
        meta: "01:33 · BSO documental",
        description: "Banda sonora para un documental sobre actividades paranormales.",
        contributions: ["BSO"],
        kind: "audio",
        audio: "assets/audio/ginpasf.mp3"
      },
      {
        id: "spot-inmobiliaria-bso",
        title: "Spot iGestió",
        meta: "00:40 · BSO spot",
        description: "Banda sonora original para un spot de inmobiliaria.",
        contributions: ["BSO"],
        kind: "audio",
        audio: "assets/audio/musica-inmobiliaria.wav"
      },
      {
        id: "IMPACTKD",
        title: "War",
        meta: "01:30 · BSO evento",
        description: "Banda sonora para una velada de MMA en el gimnasio IMPACTKD.",
        contributions: ["BSO"],
        kind: "audio",
        audio: "assets/audio/war.wav"
      }
    ]
  }
};
