// Sincronización de los cambios incorporados en la versión v22.
// Se carga después de app.js para mantener la base del repositorio intacta.

const proyectoIGestio = DATA.proyectos.items.find(i => i.id === "spot-inmobiliaria");
if (proyectoIGestio) {
  proyectoIGestio.title = "Spot iGestió";
  proyectoIGestio.description = "Spot publicitario para una inmobiliaria basada en Sant Feliu de Llobregat.";
}

const proyectoPilarMarin = DATA.proyectos.items.find(i => i.id === "spot-peluqueria-estetica");
if (proyectoPilarMarin) {
  proyectoPilarMarin.title = "Spot Pilar Marín";
  proyectoPilarMarin.description = "Spot publicitario grabado en el Hotel Torre Melina para una peluquería asociada a una floristería, especializadas en bodas.";
}

const proyectoGinpasf = DATA.proyectos.items.find(i => i.id === "ginpasf-proyecto");
if (proyectoGinpasf) {
  proyectoGinpasf.title = "GINPASF";
  proyectoGinpasf.description = "Docu-reportaje para GINPASF (Grupo de Investigación Paranormal de Sant Feliu) sobre la leyenda de la Dama de Blanco de Fontcaldetes.";
}

const nombresVertical = {
  "c80gear": "Canon C80 Rig",
  "cadires": "Prop Chairs",
  "fxlion": "FXLion Nano Pro Unboxing",
  "studio1-koi": "Movistar KOI Photoshoot Making Of",
  "studio2-irene": "Model Photoshoot Making Of"
};
DATA.vertical.items.forEach(i => {
  if (nombresVertical[i.id]) i.title = nombresVertical[i.id];
});

const musicaGinpasf = DATA.musica.items.find(i => i.id === "ginpasf-bso");
if (musicaGinpasf) musicaGinpasf.title = "GINPASF";
const musicaIGestio = DATA.musica.items.find(i => i.id === "spot-inmobiliaria-bso");
if (musicaIGestio) musicaIGestio.title = "Spot iGestió";

DATA.retransmisiones = {
  label: "Retransmisiones deportivas",
  icon: "◉",
  type: "collection",
  items: [
    {
      id: "operacion-camara-deportes",
      title: "Operación de cámara · Deportes",
      meta: "Retransmisiones · 4 fotos",
      description: "Operación de cámara en retransmisiones deportivas en directo.",
      contributions: ["Operación de cámara"],
      tags: [],
      kind: "photos",
      images: [
        "assets/images/retransmisiones/operacion-camara-01.jpg",
        "assets/images/retransmisiones/operacion-camara-02.jpg",
        "assets/images/retransmisiones/operacion-camara-03.jpg",
        "assets/images/retransmisiones/operacion-camara-04.jpg"
      ]
    }
  ]
};

// Redibujar la vista actual para que los cambios estén disponibles desde el inicio.
if (currentView === "all") {
  showAll();
} else if (currentView === "contact") {
  showContact();
} else {
  selectSection(currentSection || "proyectos");
}
