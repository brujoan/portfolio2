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

// Orden de las galerías solicitado.
const fotoProducto = DATA.fotos?.folders?.producto?.items || [];
const dzo = fotoProducto.find(i => i.id === "dzo-vespid");
if (dzo?.images?.length >= 7) {
  dzo.images = [dzo.images[4], ...dzo.images.slice(0, 4), ...dzo.images.slice(5)];
}
const nikon = fotoProducto.find(i => i.id === "nikon-z8");
if (nikon?.images?.length >= 4) {
  nikon.images = [nikon.images[2], nikon.images[0], nikon.images[1], nikon.images[3]];
}
const rugby = DATA.fotos?.folders?.eventos?.items?.find(i => i.id === "rugby-fem-buc-vs-barca");
if (rugby?.images?.length) {
  rugby.images = [rugby.images[rugby.images.length - 1], ...rugby.images.slice(0, -1)];
}

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

// Carrusel: desplazamiento táctil/trackpad, arrastre con ratón y miniaturas/puntos clicables.
wireCarousel = function () {
  const track = preview.querySelector(".insta-carousel");
  if (!track) return;

  const dots = [...preview.querySelectorAll(".carousel-dots .dot")];
  const thumbs = [...preview.querySelectorAll(".folder-preview-thumb")];
  const slides = [...track.querySelectorAll(".insta-slide")];

  slides.forEach(slide => {
    slide.style.flex = "0 0 100%";
    slide.style.minWidth = "100%";
  });
  track.style.cursor = "grab";
  track.style.userSelect = "none";
  track.style.touchAction = "pan-y";

  function setActive(idx) {
    const safeIdx = Math.max(0, Math.min(idx, Math.max(dots.length - 1, 0)));
    dots.forEach((d, n) => d.classList.toggle("active", n === safeIdx));
    thumbs.forEach((t, n) => t.classList.toggle("active", n === safeIdx));
  }

  function goTo(idx, smooth = true) {
    const safeIdx = Math.max(0, Math.min(idx, Math.max(slides.length - 1, 0)));
    track.scrollTo({ left: safeIdx * track.clientWidth, behavior: smooth ? "smooth" : "auto" });
    setActive(safeIdx);
  }

  track.addEventListener("scroll", () => requestAnimationFrame(() => {
    if (!track.clientWidth) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  }), { passive: true });

  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener("click", () => goTo(idx));
  });
  dots.forEach((dot, idx) => {
    dot.style.cursor = "pointer";
    dot.addEventListener("click", () => goTo(idx));
  });

  let dragging = false;
  let startX = 0;
  let startScroll = 0;
  let pointerId = null;

  track.addEventListener("pointerdown", e => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    dragging = true;
    pointerId = e.pointerId;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    track.style.cursor = "grabbing";
    track.setPointerCapture?.(e.pointerId);
    e.preventDefault();
  });

  track.addEventListener("pointermove", e => {
    if (!dragging || e.pointerId !== pointerId) return;
    track.scrollLeft = startScroll - (e.clientX - startX);
  });

  const endDrag = e => {
    if (!dragging || (e?.pointerId != null && e.pointerId !== pointerId)) return;
    dragging = false;
    track.style.cursor = "grab";
    if (pointerId != null) {
      try { track.releasePointerCapture?.(pointerId); } catch (_) {}
    }
    pointerId = null;
    if (track.clientWidth) goTo(Math.round(track.scrollLeft / track.clientWidth));
  };
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);

  track.querySelectorAll("img").forEach(img => {
    img.draggable = false;
    img.addEventListener("dragstart", e => e.preventDefault());
  });
};

// Redibujar la vista actual para que los cambios estén disponibles desde el inicio.
if (currentView === "all") {
  showAll();
} else if (currentView === "contact") {
  showContact();
} else {
  selectSection(currentSection || "proyectos");
}
