// Interacciones específicas de escritorio: controles de carrusel y navegación tipo Finder.
(() => {
  const desktopQuery = window.matchMedia("(min-width: 821px)");
  const previewPanel = document.getElementById("previewPanel");
  const folderListElement = document.getElementById("folderList");
  const itemListElement = document.getElementById("itemList");
  const sidebarNav = document.querySelector(".sidebar nav");

  // Como en Finder en modo columnas: sidebar -> carpetas -> contenido/preview.
  // Solo la columna activa muestra selección azul.
  let activeColumn = "folders";

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

  function carouselIndex(wrap, track) {
    const thumbs = [...wrap.querySelectorAll(".folder-preview-thumb")];
    const activeThumb = thumbs.findIndex(thumb => thumb.classList.contains("active"));
    if (activeThumb >= 0) return activeThumb;

    const dots = [...wrap.querySelectorAll(".carousel-dots .dot")];
    const activeDot = dots.findIndex(dot => dot.classList.contains("active"));
    if (activeDot >= 0) return activeDot;

    if (!track.clientWidth) return 0;
    return Math.round(track.scrollLeft / track.clientWidth);
  }

  function syncCarouselControls(wrap, track) {
    const slides = [...track.querySelectorAll(".insta-slide")];
    const previous = wrap.querySelector('[data-carousel-action="previous"]');
    const next = wrap.querySelector('[data-carousel-action="next"]');
    if (!previous || !next) return;

    const index = Math.max(0, Math.min(carouselIndex(wrap, track), slides.length - 1));
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
    return goToCarouselIndex(carouselIndex(carousel.wrap, carousel.track) + direction);
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
        normalizeSelection();
        moveCarousel(-1);
      });

      controls.querySelector('[data-carousel-action="next"]').addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        activeColumn = "items";
        normalizeSelection();
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

  function sidebarButtons() {
    if (!sidebarNav) return [];
    return [...sidebarNav.querySelectorAll(".side-item[data-view]")].filter(button => button.offsetParent !== null);
  }

  function filteredVisibleItems() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    return visibleItems().filter(item =>
      [item.title, item.meta, item.description, item.sectionLabel, item.photoFolderLabel]
        .filter(Boolean)
        .map(tr)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }

  function currentSidebarButton() {
    const view = currentView === "all"
      ? "todo"
      : currentView === "contact"
        ? "contacto"
        : currentSection;

    return sidebarNav?.querySelector(`.side-item[data-view="${view}"]`) || sidebarButtons()[0] || null;
  }

  function currentFolderRow() {
    const rows = rowsFor("folders");
    if (!rows.length) return null;

    if (currentView === "all" || currentView === "contact") return rows[0] || null;

    if (currentSection === "fotos" && currentPhotoFolder) {
      const keys = Object.keys(DATA.fotos.folders);
      const index = keys.indexOf(currentPhotoFolder);
      return rows[index] || rows[0] || null;
    }

    const sectionKeys = Object.keys(DATA);
    const index = sectionKeys.indexOf(currentSection);
    return rows[index] || rows[0] || null;
  }

  function currentItemRow() {
    const rows = rowsFor("items");
    if (!rows.length || !currentItem) return null;

    const items = filteredVisibleItems();
    const index = items.findIndex(item => item.id === currentItem.id);
    return index >= 0 ? rows[index] || null : null;
  }

  function clearVisualSelection() {
    folderListElement?.querySelectorAll(".row.selected").forEach(row => row.classList.remove("selected"));
    itemListElement?.querySelectorAll(".row.selected").forEach(row => row.classList.remove("selected"));
    sidebarNav?.querySelectorAll(".side-item.keyboard-selected").forEach(button => button.classList.remove("keyboard-selected"));
  }

  function normalizeSelection() {
    if (!isDesktop()) return;

    clearVisualSelection();

    if (activeColumn === "sidebar") {
      const button = currentSidebarButton();
      button?.classList.add("keyboard-selected");
      button?.scrollIntoView({ block: "nearest" });
      return;
    }

    const row = activeColumn === "folders" ? currentFolderRow() : currentItemRow();
    row?.classList.add("selected");
    row?.scrollIntoView({ block: "nearest" });
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
    setTimeout(normalizeSelection, 0);
    return true;
  }

  function navigateSidebar(direction) {
    const buttons = sidebarButtons();
    if (!buttons.length) return false;

    const currentButton = currentSidebarButton();
    const currentIndex = Math.max(0, buttons.indexOf(currentButton));
    const nextIndex = Math.max(0, Math.min(currentIndex + direction, buttons.length - 1));
    const button = buttons[nextIndex];

    activeColumn = "sidebar";
    button.scrollIntoView({ block: "nearest", behavior: "smooth" });
    button.click();
    setTimeout(normalizeSelection, 0);
    return true;
  }

  function switchToSidebar() {
    activeColumn = "sidebar";
    normalizeSelection();
  }

  function switchToFolders() {
    activeColumn = "folders";
    normalizeSelection();
  }

  function switchToItems() {
    activeColumn = "items";

    if (currentItem) {
      normalizeSelection();
      return;
    }

    const first = rowsFor("items")[0];
    if (first) {
      first.click();
      setTimeout(normalizeSelection, 0);
    } else {
      normalizeSelection();
    }
  }

  function targetIsEditable(target) {
    if (!(target instanceof HTMLElement)) return false;
    return Boolean(target.closest("input, textarea, select, [contenteditable='true'], audio, video"));
  }

  document.addEventListener("click", event => {
    if (!isDesktop()) return;

    if (event.target.closest(".sidebar .side-item[data-view]")) {
      activeColumn = "sidebar";
      setTimeout(normalizeSelection, 0);
      return;
    }

    if (event.target.closest("#folderList .row")) {
      activeColumn = "folders";
      setTimeout(normalizeSelection, 0);
      return;
    }

    if (event.target.closest("#itemList .row")) {
      activeColumn = "items";
      setTimeout(normalizeSelection, 0);
      return;
    }

    if (event.target.closest(".insta-carousel, .folder-preview-strip, .carousel-dots, .desktop-carousel-controls")) {
      activeColumn = "items";
      setTimeout(normalizeSelection, 0);
      return;
    }

    if (event.target.closest("[data-lang]")) {
      setTimeout(() => {
        installCarouselControls();
        normalizeSelection();
      }, 0);
    }
  });

  document.addEventListener("keydown", event => {
    if (!isDesktop() || event.defaultPrevented || targetIsEditable(event.target)) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (activeColumn === "sidebar") navigateSidebar(-1);
      else navigateRows(-1);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (activeColumn === "sidebar") navigateSidebar(1);
      else navigateRows(1);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      if (activeColumn === "items" && currentItem?.kind === "photos") {
        const carousel = getCarousel();
        if (carousel) {
          const index = carouselIndex(carousel.wrap, carousel.track);
          if (index > 0) {
            goToCarouselIndex(index - 1);
            return;
          }
        }
      }

      if (activeColumn === "items") {
        switchToFolders();
        return;
      }

      if (activeColumn === "folders") {
        switchToSidebar();
        return;
      }

      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      if (activeColumn === "sidebar") {
        if (rowsFor("folders").length) switchToFolders();
        else switchToItems();
        return;
      }

      if (activeColumn === "folders") {
        switchToItems();
        return;
      }

      if (activeColumn === "items" && currentItem?.kind === "photos") {
        const carousel = getCarousel();
        if (carousel) {
          const index = carouselIndex(carousel.wrap, carousel.track);
          const last = carousel.track.querySelectorAll(".insta-slide").length - 1;
          if (index < last) goToCarouselIndex(index + 1);
        }
      }
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (activeColumn === "sidebar") {
        const button = currentSidebarButton();
        button?.click();
        setTimeout(normalizeSelection, 0);
        return;
      }

      if (activeColumn === "folders") {
        switchToItems();
        return;
      }

      currentItemRow()?.click();
    }
  });

  [folderListElement, itemListElement].forEach(root => {
    if (!root) return;
    const observer = new MutationObserver(() => setTimeout(normalizeSelection, 0));
    observer.observe(root, { childList: true, subtree: true });
  });

  if (previewPanel) {
    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        installCarouselControls();
        normalizeSelection();
      });
    });

    observer.observe(previewPanel, { childList: true, subtree: true });
  }

  const onViewportChange = () => {
    if (isDesktop()) {
      requestAnimationFrame(() => {
        installCarouselControls();
        normalizeSelection();
      });
    }
  };

  if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", onViewportChange);
  else desktopQuery.addListener(onViewportChange);

  installCarouselControls();
  normalizeSelection();
})();
