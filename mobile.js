// Navegación específica para móvil. No modifica la lógica de escritorio.
(() => {
  const mobileQuery = window.matchMedia("(max-width: 820px)");
  const backButton = document.getElementById("mobileBackBtn");

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
    backButton.setAttribute("aria-label", backLabels[currentLanguage] || backLabels.ca);
    backButton.setAttribute("title", backLabels[currentLanguage] || backLabels.ca);
  }

  function openMobilePreview() {
    if (!isMobile()) return;
    document.body.classList.add("mobile-preview-open");
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function closeMobilePreview() {
    document.body.classList.remove("mobile-preview-open");

    if (!isMobile()) return;

    currentItem = null;
    renderItems(searchInput.value);

    if (currentView === "all") renderAllSummary();
    else if (currentView === "contact") renderContact();
    else renderSectionEmpty();

    updateBreadcrumb();
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function syncAfterItemClick() {
    if (!isMobile()) return;

    if (currentItem) openMobilePreview();
    else document.body.classList.remove("mobile-preview-open");
  }

  function syncAfterSectionClick(view) {
    if (!isMobile()) return;

    if (view === "contacto") openMobilePreview();
    else document.body.classList.remove("mobile-preview-open");
  }

  document.addEventListener("click", event => {
    const itemRow = event.target.closest("#itemList .row");
    if (itemRow) {
      requestAnimationFrame(syncAfterItemClick);
      return;
    }

    const sectionButton = event.target.closest(".side-item[data-view]");
    if (sectionButton) {
      const view = sectionButton.dataset.view;
      requestAnimationFrame(() => syncAfterSectionClick(view));
      return;
    }

    if (event.target.closest("[data-lang]")) {
      requestAnimationFrame(setBackLabel);
    }
  });

  backButton?.addEventListener("click", closeMobilePreview);

  const onViewportChange = () => {
    setBackLabel();

    if (!isMobile()) {
      document.body.classList.remove("mobile-preview-open");
      return;
    }

    if (currentItem || currentView === "contact") {
      document.body.classList.add("mobile-preview-open");
    }
  };

  if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", onViewportChange);
  else mobileQuery.addListener(onViewportChange);

  setBackLabel();
  onViewportChange();
})();
