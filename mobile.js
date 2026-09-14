// Navegación específica para móvil. No modifica la lógica de escritorio.
(() => {
  const mobileQuery = window.matchMedia("(max-width: 820px)");
  const backButton = document.getElementById("mobileBackBtn");
  const itemListElement = document.getElementById("itemList");

  const backLabels = {
    ca: "Enrere",
    es: "Atrás",
    en: "Back"
  };

  function isMobile() {
    return mobileQuery.matches;
  }

  function setBackLabel() {
    if (!backButton) return;
    const label = backLabels[currentLanguage] || backLabels.ca;
    backButton.setAttribute("aria-label", label);
    backButton.setAttribute("title", label);
  }

  function scrollMobileTop() {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }

  function openMobilePreview() {
    if (!isMobile()) return;
    document.body.classList.add("mobile-preview-open");
    scrollMobileTop();
  }

  function hideMobilePreview() {
    document.body.classList.remove("mobile-preview-open");
  }

  function closeMobilePreview() {
    hideMobilePreview();

    if (!isMobile()) return;

    currentItem = null;
    renderItems(searchInput.value);

    if (currentView === "all") renderAllSummary();
    else if (currentView === "contact") renderContact();
    else renderSectionEmpty();

    updateBreadcrumb();
    scrollMobileTop();
  }

  // La fuente de verdad es el estado de app.js. Así no dependemos de que
  // el click llegue en un orden concreto en Safari/iOS.
  function syncMobileState() {
    if (!isMobile()) {
      hideMobilePreview();
      return;
    }

    if (currentView === "contact" || currentItem) openMobilePreview();
    else hideMobilePreview();
  }

  // Fallback inmediato tras cualquier interacción relevante.
  document.addEventListener("click", event => {
    if (event.target.closest("#itemList .row") || event.target.closest(".side-item[data-view]")) {
      setTimeout(syncMobileState, 0);
    }

    if (event.target.closest("[data-lang]")) {
      setTimeout(() => {
        setBackLabel();
        syncMobileState();
      }, 0);
    }
  });

  // app.js vuelve a crear el listado al seleccionar una pieza/carpeta.
  // Observarlo hace que la apertura funcione también en Safari móvil aunque
  // el evento táctil/click se comporte de forma distinta.
  if (itemListElement) {
    const observer = new MutationObserver(() => {
      setTimeout(syncMobileState, 0);
    });

    observer.observe(itemListElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  backButton?.addEventListener("click", closeMobilePreview);

  const onViewportChange = () => {
    setBackLabel();
    syncMobileState();
  };

  if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", onViewportChange);
  else mobileQuery.addListener(onViewportChange);

  setBackLabel();
  syncMobileState();
})();
