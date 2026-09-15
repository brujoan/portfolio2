// Visor de fotos a pantalla completa para todas las galerías.
(() => {
  const labels = {
    ca: { close: "Tanca", previous: "Foto anterior", next: "Foto següent" },
    es: { close: "Cerrar", previous: "Foto anterior", next: "Foto siguiente" },
    en: { close: "Close", previous: "Previous photo", next: "Next photo" }
  };

  let sources = [];
  let index = 0;
  let lightbox = null;
  let image = null;
  let title = null;
  let counter = null;
  let previous = null;
  let next = null;
  let closeButton = null;

  // En escritorio el carrusel captura el puntero para permitir arrastrar.
  // Por eso guardamos el <img> del pointerdown y abrimos en pointerup si no hubo drag.
  let pointerCandidate = null;
  let pointerId = null;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let lastPointerOpenAt = 0;

  function text() {
    return labels[currentLanguage] || labels.ca;
  }

  function itemTitle() {
    try {
      return currentItem ? tr(currentItem.title) : "";
    } catch (_) {
      return "";
    }
  }

  function ensureLightbox() {
    if (lightbox) return;

    lightbox = document.createElement("div");
    lightbox.className = "photo-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");

    lightbox.innerHTML = `
      <div class="photo-lightbox-stage">
        <button class="photo-lightbox-close" type="button">×</button>
        <button class="photo-lightbox-nav previous" type="button"></button>
        <img class="photo-lightbox-image" alt="">
        <button class="photo-lightbox-nav next" type="button"></button>
        <div class="photo-lightbox-meta">
          <span class="photo-lightbox-title"></span>
          <span class="photo-lightbox-counter"></span>
        </div>
      </div>`;

    document.body.appendChild(lightbox);

    image = lightbox.querySelector(".photo-lightbox-image");
    title = lightbox.querySelector(".photo-lightbox-title");
    counter = lightbox.querySelector(".photo-lightbox-counter");
    previous = lightbox.querySelector(".photo-lightbox-nav.previous");
    next = lightbox.querySelector(".photo-lightbox-nav.next");
    closeButton = lightbox.querySelector(".photo-lightbox-close");

    closeButton.addEventListener("click", close);
    previous.addEventListener("click", () => show(index - 1));
    next.addEventListener("click", () => show(index + 1));

    lightbox.addEventListener("click", event => {
      if (event.target === lightbox || event.target.classList.contains("photo-lightbox-stage")) close();
    });
  }

  function updateLabels() {
    if (!lightbox) return;
    const current = text();
    closeButton.setAttribute("aria-label", current.close);
    closeButton.setAttribute("title", current.close);
    previous.setAttribute("aria-label", current.previous);
    previous.setAttribute("title", current.previous);
    next.setAttribute("aria-label", current.next);
    next.setAttribute("title", current.next);
  }

  function show(targetIndex) {
    if (!sources.length) return;

    index = Math.max(0, Math.min(targetIndex, sources.length - 1));
    image.classList.add("changing");

    requestAnimationFrame(() => {
      image.src = sources[index];
      image.alt = `${itemTitle()} ${index + 1}`.trim();
      title.textContent = itemTitle();
      counter.textContent = `${index + 1} / ${sources.length}`;
      previous.disabled = index === 0;
      next.disabled = index === sources.length - 1;

      const done = () => image.classList.remove("changing");
      if (image.complete) done();
      else image.addEventListener("load", done, { once: true });
    });
  }

  function openFrom(img) {
    const carousel = img.closest(".insta-carousel");
    if (!carousel) return;

    const images = [...carousel.querySelectorAll(".insta-slide img")];
    sources = images.map(photo => photo.currentSrc || photo.src).filter(Boolean);
    if (!sources.length) return;

    index = Math.max(0, images.indexOf(img));
    ensureLightbox();
    updateLabels();
    show(index);

    lightbox.classList.add("open");
    document.body.classList.add("lightbox-open");
    closeButton.focus({ preventScroll: true });
  }

  function close() {
    if (!lightbox?.classList.contains("open")) return;
    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
  }

  // Móvil y navegadores donde el click no queda cancelado por el drag del carrusel.
  document.addEventListener("click", event => {
    const img = event.target.closest(".insta-slide img");
    if (!img) return;

    // Evita abrir dos veces después del pointerup de escritorio.
    if (performance.now() - lastPointerOpenAt < 350) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    openFrom(img);
  });

  // Escritorio: app.js hace preventDefault + pointer capture para arrastrar el carrusel,
  // lo que puede suprimir el click del <img>. Detectamos un click real por distancia.
  document.addEventListener("pointerdown", event => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    const img = event.target.closest(".insta-slide img");
    if (!img) return;

    pointerCandidate = img;
    pointerId = event.pointerId;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
  }, true);

  document.addEventListener("pointerup", event => {
    if (!pointerCandidate || event.pointerId !== pointerId) return;

    const candidate = pointerCandidate;
    const distance = Math.hypot(event.clientX - pointerStartX, event.clientY - pointerStartY);

    pointerCandidate = null;
    pointerId = null;

    if (distance > 7) return;

    lastPointerOpenAt = performance.now();
    setTimeout(() => openFrom(candidate), 0);
  }, true);

  document.addEventListener("pointercancel", event => {
    if (event.pointerId !== pointerId) return;
    pointerCandidate = null;
    pointerId = null;
  }, true);

  // Captura antes que desktop.js para que, con el visor abierto,
  // las flechas controlen únicamente la foto ampliada.
  document.addEventListener("keydown", event => {
    if (!lightbox?.classList.contains("open")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      close();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (index > 0) show(index - 1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (index < sources.length - 1) show(index + 1);
    }
  }, true);

  document.addEventListener("click", event => {
    if (event.target.closest("[data-lang]")) setTimeout(updateLabels, 0);
  });
})();
