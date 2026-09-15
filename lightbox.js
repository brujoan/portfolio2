// Visor superpuesto / Quick Look para el contenido del portfolio.
(() => {
  const desktopQuery = window.matchMedia("(min-width: 821px)");
  const labels = {
    ca: { close: "Tanca", previous: "Foto anterior", next: "Foto següent", open: "Obre" },
    es: { close: "Cerrar", previous: "Foto anterior", next: "Foto siguiente", open: "Abrir" },
    en: { close: "Close", previous: "Previous photo", next: "Next photo", open: "Open" }
  };

  let sources = [];
  let index = 0;
  let mode = "photo";
  let lightbox = null;
  let stage = null;
  let mediaHost = null;
  let title = null;
  let counter = null;
  let previous = null;
  let next = null;
  let closeButton = null;

  // En escritorio el carrusel captura el puntero para permitir arrastrar.
  // Guardamos el <img> del pointerdown y abrimos en pointerup si no hubo drag.
  let pointerCandidate = null;
  let pointerId = null;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let lastPointerOpenAt = 0;

  function text() {
    return labels[currentLanguage] || labels.ca;
  }

  function itemTitle(item = currentItem) {
    try {
      return item ? tr(item.title) : "";
    } catch (_) {
      return "";
    }
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
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
        <div class="quicklook-media-host"></div>
        <button class="photo-lightbox-nav next" type="button"></button>
        <div class="photo-lightbox-meta">
          <span class="photo-lightbox-title"></span>
          <span class="photo-lightbox-counter"></span>
        </div>
      </div>`;

    document.body.appendChild(lightbox);

    stage = lightbox.querySelector(".photo-lightbox-stage");
    mediaHost = lightbox.querySelector(".quicklook-media-host");
    title = lightbox.querySelector(".photo-lightbox-title");
    counter = lightbox.querySelector(".photo-lightbox-counter");
    previous = lightbox.querySelector(".photo-lightbox-nav.previous");
    next = lightbox.querySelector(".photo-lightbox-nav.next");
    closeButton = lightbox.querySelector(".photo-lightbox-close");

    closeButton.addEventListener("click", close);
    previous.addEventListener("click", () => showPhoto(index - 1));
    next.addEventListener("click", () => showPhoto(index + 1));

    lightbox.addEventListener("click", event => {
      if (event.target === lightbox || event.target === stage) close();
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

  function setMode(nextMode) {
    mode = nextMode;
    lightbox.classList.toggle("media-mode", mode !== "photo");
    previous.hidden = mode !== "photo";
    next.hidden = mode !== "photo";
  }

  function showPhoto(targetIndex) {
    if (!sources.length) return;
    ensureLightbox();
    setMode("photo");

    index = Math.max(0, Math.min(targetIndex, sources.length - 1));
    mediaHost.innerHTML = `<img class="photo-lightbox-image changing" alt="">`;
    const image = mediaHost.querySelector(".photo-lightbox-image");

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

  function openShell(nextMode) {
    ensureLightbox();
    updateLabels();
    setMode(nextMode);
    lightbox.classList.add("open");
    document.body.classList.add("lightbox-open");
    closeButton.focus({ preventScroll: true });
  }

  function activeCarouselIndex(carousel) {
    const thumbs = [...carousel.closest(".insta-carousel-wrap")?.querySelectorAll(".folder-preview-thumb") || []];
    const thumbIndex = thumbs.findIndex(thumb => thumb.classList.contains("active"));
    if (thumbIndex >= 0) return thumbIndex;

    const dots = [...carousel.closest(".insta-carousel-wrap")?.querySelectorAll(".carousel-dots .dot") || []];
    const dotIndex = dots.findIndex(dot => dot.classList.contains("active"));
    if (dotIndex >= 0) return dotIndex;

    if (!carousel.clientWidth) return 0;
    return Math.round(carousel.scrollLeft / carousel.clientWidth);
  }

  function openPhotoCarousel(carousel, requestedIndex = null) {
    if (!carousel) return false;
    const images = [...carousel.querySelectorAll(".insta-slide img")];
    sources = images.map(photo => photo.currentSrc || photo.src).filter(Boolean);
    if (!sources.length) return false;

    index = requestedIndex == null
      ? Math.max(0, Math.min(activeCarouselIndex(carousel), sources.length - 1))
      : Math.max(0, Math.min(requestedIndex, sources.length - 1));

    openShell("photo");
    showPhoto(index);
    return true;
  }

  function openFrom(img) {
    const carousel = img.closest(".insta-carousel");
    if (!carousel) return false;
    const images = [...carousel.querySelectorAll(".insta-slide img")];
    return openPhotoCarousel(carousel, Math.max(0, images.indexOf(img)));
  }

  function renderGenericItem(item) {
    const safeTitle = escapeHTML(itemTitle(item));
    let html = "";

    if (item.kind === "video" && item.video) {
      const poster = item.poster ? ` poster="${escapeHTML(item.poster)}"` : "";
      html = `<video class="quicklook-video" controls autoplay playsinline${poster}><source src="${escapeHTML(item.video)}" type="video/mp4"></video>`;
    } else if (item.kind === "youtube" && item.youtubeId) {
      html = `<iframe class="quicklook-youtube" src="https://www.youtube.com/embed/${encodeURIComponent(item.youtubeId)}?autoplay=1&rel=0" title="${safeTitle}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    } else if (item.kind === "audio" && item.audio) {
      const audioType = item.audio.toLowerCase().endsWith(".wav") ? "audio/wav" : "audio/mpeg";
      html = `<div class="quicklook-audio"><div class="quicklook-audio-icon">♫</div><strong>${safeTitle}</strong><audio controls autoplay><source src="${escapeHTML(item.audio)}" type="${audioType}"></audio></div>`;
    } else if (item.kind === "channel" && item.thumbnails?.length) {
      html = `<a class="quicklook-channel" href="${escapeHTML(item.externalUrl || "#")}" target="_blank" rel="noopener">
        <div class="quicklook-channel-grid">${item.thumbnails.slice(0,4).map(thumb => `<img src="${escapeHTML(thumb.local || thumb.remote || "")}" alt="">`).join("")}</div>
        <strong>${safeTitle}</strong><span>${escapeHTML(text().open)} ↗</span>
      </a>`;
    } else {
      const previewImage = item.images?.[0] || item.poster || "";
      if (previewImage) html = `<img class="photo-lightbox-image" src="${escapeHTML(previewImage)}" alt="${safeTitle}">`;
      else return false;
    }

    sources = [];
    openShell("media");
    mediaHost.innerHTML = html;
    title.textContent = itemTitle(item);
    counter.textContent = "";
    return true;
  }

  function openSelectedItem() {
    // Quick Look solo debe actuar cuando un contenido está realmente seleccionado
    // (azul) en la columna de contenido, igual que Finder.
    const selectedRow = document.querySelector("#itemList .row.selected");
    if (!selectedRow || !currentItem) return false;

    if (currentItem.kind === "photos") {
      const carousel = document.querySelector("#previewPanel .insta-carousel");
      if (carousel) return openPhotoCarousel(carousel);

      sources = (currentItem.images || []).slice();
      if (!sources.length) return false;
      index = 0;
      openShell("photo");
      showPhoto(0);
      return true;
    }

    return renderGenericItem(currentItem);
  }

  function close() {
    if (!lightbox?.classList.contains("open")) return;

    // Detiene vídeo/audio/iframe inmediatamente al cerrar Quick Look.
    mediaHost.innerHTML = "";
    lightbox.classList.remove("open", "media-mode");
    document.body.classList.remove("lightbox-open");
    sources = [];
  }

  function isEditableTarget(target) {
    if (!(target instanceof HTMLElement)) return false;
    return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
  }

  // Móvil y navegadores donde el click no queda cancelado por el drag del carrusel.
  document.addEventListener("click", event => {
    const img = event.target.closest(".insta-slide img");
    if (!img) return;

    if (performance.now() - lastPointerOpenAt < 350) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    openFrom(img);
  });

  // Escritorio: app.js hace preventDefault + pointer capture para arrastrar el carrusel.
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

  // Quick Look estilo Finder. Se captura antes que la navegación de desktop.js.
  document.addEventListener("keydown", event => {
    const isOpen = lightbox?.classList.contains("open");

    if (isOpen) {
      if (event.key === "Escape" || event.code === "Space") {
        event.preventDefault();
        event.stopImmediatePropagation();
        close();
        return;
      }

      if (mode === "photo" && event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (index > 0) showPhoto(index - 1);
        return;
      }

      if (mode === "photo" && event.key === "ArrowRight") {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (index < sources.length - 1) showPhoto(index + 1);
      }
      return;
    }

    if (!desktopQuery.matches || event.code !== "Space" || isEditableTarget(event.target)) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (openSelectedItem()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  document.addEventListener("click", event => {
    if (event.target.closest("[data-lang]")) setTimeout(updateLabels, 0);
  });
})();
