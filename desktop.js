// Interacciones específicas de escritorio: controles de carrusel y navegación por teclado.
(() => {
  const desktopQuery = window.matchMedia("(min-width: 821px)");
  const previewPanel = document.getElementById("previewPanel");
  const folderListElement = document.getElementById("folderList");
  const itemListElement = document.getElementById("itemList");

  // Como en Finder en modo columnas: la navegación por teclado alterna
  // entre la columna de carpetas y la columna de contenido/preview.
  let activeColumn = "items";

  const carouselLabels = {
    ca: { previous: "Foto anterior", next: "Foto següent" },
    es: { previous: "Foto anterior", next: "Foto siguiente" },
    en: { previous: "Previous photo", next: "Next photo" }
  };

  function isDesktop() {
    return desktopQuery.matches;
  }

  function currentLabels() {
    return carouselLabels[currentLanguage] || carouselLabels.ca;
  }

  function getCarousel() {
    if (!previewPanel) return null;
    const wrap = previewPanel.querySelector(".insta-carousel-wrap");
    const track = wrap?.querySelector(".insta-carousel");
    if (!wrap || !track) return null;
    return { wrap, track };
  }

  function carouselIndex(track) {
    if (!track.clientWidth) return 0;
    return Math.round(track.scrollLeft / track.clientWidth);
  }

  function syncCarouselControls(wrap, track) {
    const slides = [...track.querySelectorAll(".insta-slide")];
    const previous = wrap.querySelector('[data-carousel-action="previous"]');
    const next = wrap.querySelector('[data-carousel-action="next"]');
    if (!previous || !next) return;

    const index = Math.max(0, Math.min(carouselIndex(track), slides.length - 1));
    previous.disabled = index <= 0;
    next.disabled = index >= slides.length - 1;
  }

  function goToCarouselIndex(index) {
    const carousel = getCarousel();
    if (!carousel) return false;

    const { wrap, track } = carousel;
    const slides = [...track.querySelectorAll(".insta-slide")];
    if (slides.length < 2 || !track.clientWidth) return false;

    const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
    track.scrollTo({
      left: safeIndex * track.clientWidth,
      behavior: "smooth"
    });

    const dots = [...wrap.querySelectorAll(".carousel-dots .dot")];
    const thumbs = [...wrap.querySelectorAll(".folder-preview-thumb")];
    dots.forEach((dot, i) => dot.classList.toggle("active", i === safeIndex));
    thumbs.forEach((thumb, i) => thumb.classList.toggle("active", i === safeIndex));

    requestAnimationFrame(() => syncCarouselControls(wrap, track));
    return true;
  }

  function moveCarousel(direction) {
    const carousel = getCarousel();
    if (!carousel) return false;
    return goToCarouselIndex(carouselIndex(carousel.track) + direction);
  }

  function installCarouselControls() {
    if (!isDesktop()) return;

    const carousel = getCarousel();
    if (!carousel) return;

    const { wrap, track } = carousel;
    const slides = [...track.querySelectorAll(".insta-slide")];
    if (slides.length < 2) return;

    let controls = wrap.querySelector(".desktop-carousel-controls");
    if (!controls) {
      const labels = currentLabels();
      controls = document.createElement("div");
      controls.className = "desktop-carousel-controls";
      controls.innerHTML = `
        <button class="desktop-carousel-nav previous" type="button" data-carousel-action="previous" aria-label="${labels.previous}" title="${labels.previous}">‹</button>
        <button class="desktop-carousel-nav next" type="button" data-carousel-action="next" aria-label="${labels.next}" title="${labels.next}">›</button>`;
      wrap.appendChild(controls);

      controls.querySelector('[data-carousel-action="previous"]').addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        activeColumn = "items";
        moveCarousel(-1);
      });

      controls.querySelector('[data-carousel-action="next"]').addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        activeColumn = "items";
        moveCarousel(1);
      });

      track.addEventListener("scroll", () => {
        requestAnimationFrame(() => syncCarouselControls(wrap, track));
      }, { passive: true });
    } else {
      const labels = currentLabels();
      const previous = controls.querySelector('[data-carousel-action="previous"]');
      const next = controls.querySelector('[data-carousel-action="next"]');
      previous?.setAttribute("aria-label", labels.previous);
      previous?.setAttribute("title", labels.previous);
      next?.setAttribute("aria-label", labels.next);
      next?.setAttribute("title", labels.next);
    }

    syncCarouselControls(wrap, track);
  }

  function rowsFor(column) {
    const root = column === "folders" ? folderListElement : itemListElement;
    if (!root) return [];
    return [...root.querySelectorAll(".row")].filter(row => row.offsetParent !== null);
  }

  function selectedIndex(rows) {
    const index = rows.findIndex(row => row.classList.contains("selected"));
    return index >= 0 ? index : -1;
  }

  function navigateRows(direction) {
    const rows = rowsFor(activeColumn);
    if (!rows.length) return false;

    const current = selectedIndex(rows);
    const nextIndex = current < 0
      ? (direction > 0 ? 0 : rows.length - 1)
      : Math.max(0, Math.min(current + direction, rows.length - 1));

    const row = rows[nextIndex];
    row.scrollIntoView({ block: "nearest", behavior: "smooth" });
    row.click();
    return true;
  }

  function switchColumn(column) {
    activeColumn = column;

    const rows = rowsFor(activeColumn);
    const selected = rows.find(row => row.classList.contains("selected")) || rows[0];
    selected?.scrollIntoView({ block: "nearest" });
  }

  function targetIsEditable(target) {
    if (!(target instanceof HTMLElement)) return false;
    return Boolean(
      target.closest("input, textarea, select, [contenteditable='true'], audio, video")
    );
  }

  document.addEventListener("click", event => {
    if (!isDesktop()) return;

    if (event.target.closest("#folderList .row")) {
      activeColumn = "folders";
    } else if (event.target.closest("#itemList .row")) {
      activeColumn = "items";
    } else if (event.target.closest(".insta-carousel-wrap")) {
      // Si el usuario toca directamente la galería, las flechas vuelven a
      // controlar las fotos hasta llegar a la primera.
      activeColumn = "items";
    }

    if (event.target.closest("[data-lang]")) {
      setTimeout(installCarouselControls, 0);
    }
  });

  document.addEventListener("keydown", event => {
    if (!isDesktop() || event.defaultPrevented || targetIsEditable(event.target)) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    const carousel = getCarousel();
    const photoCarouselOpen = currentItem?.kind === "photos" && Boolean(carousel);

    // Finder en columnas: si estamos en la columna izquierda, → vuelve al
    // contenido. Mientras esa columna está activa, las flechas no cambian foto.
    if (activeColumn === "folders") {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        switchColumn("items");
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        navigateRows(-1);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        navigateRows(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        return;
      }
    }

    // En una galería, ←/→ recorren las fotos. Al llegar a la primera foto,
    // otro ← abandona el carrusel y devuelve el control a la columna de carpetas.
    if (photoCarouselOpen && activeColumn === "items" && event.key === "ArrowLeft") {
      event.preventDefault();
      const index = carouselIndex(carousel.track);
      if (index > 0) moveCarousel(-1);
      else switchColumn("folders");
      return;
    }

    if (photoCarouselOpen && activeColumn === "items" && event.key === "ArrowRight") {
      event.preventDefault();
      moveCarousel(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      navigateRows(-1);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      navigateRows(1);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      switchColumn("folders");
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      switchColumn("items");
      return;
    }

    if (event.key === "Enter") {
      const rows = rowsFor(activeColumn);
      const selected = rows.find(row => row.classList.contains("selected"));
      if (selected) {
        event.preventDefault();
        selected.click();
      }
    }
  });

  if (previewPanel) {
    const observer = new MutationObserver(() => {
      requestAnimationFrame(installCarouselControls);
    });

    observer.observe(previewPanel, {
      childList: true,
      subtree: true
    });
  }

  const onViewportChange = () => {
    if (isDesktop()) requestAnimationFrame(installCarouselControls);
  };

  if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", onViewportChange);
  else desktopQuery.addListener(onViewportChange);

  installCarouselControls();
})();
