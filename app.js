const DATA = window.PORTFOLIO_CONTENT;
const PROFILE = window.PORTFOLIO_PROFILE;
const UI = window.PORTFOLIO_UI;
const LANGUAGES = window.PORTFOLIO_LANGUAGES;
const DEFAULT_LANGUAGE = window.PORTFOLIO_DEFAULT_LANGUAGE || "ca";

if (!DATA || !PROFILE || !UI || !LANGUAGES) {
  throw new Error("No se ha cargado correctamente content.js");
}

let currentLanguage = DEFAULT_LANGUAGE;
try {
  const savedLanguage = localStorage.getItem("portfolio-language");
  if (savedLanguage && LANGUAGES[savedLanguage]) currentLanguage = savedLanguage;
} catch (_) {}

let currentView = "folder";
let currentSection = "proyectos";
let currentPhotoFolder = null;
let currentItem = null;

const folderList = document.getElementById("folderList");
const itemList = document.getElementById("itemList");
const preview = document.getElementById("previewPanel");
const itemHeader = document.getElementById("itemHeader");
const title = document.getElementById("windowTitle");
const breadcrumb = document.getElementById("breadcrumb");
const statusText = document.getElementById("statusText");
const searchInput = document.getElementById("searchInput");
const brandLink = document.querySelector(".brand a");
const languageSwitcher = document.querySelector(".language-switcher");

function tr(value) {
  if (value == null) return "";
  if (typeof value === "object" && !Array.isArray(value)) {
    return value[currentLanguage] ?? value[DEFAULT_LANGUAGE] ?? value.es ?? value.en ?? "";
  }
  return String(value);
}

function ui() {
  return UI[currentLanguage] || UI[DEFAULT_LANGUAGE];
}

function elementCount(count) {
  const label = count === 1 ? ui().element : ui().elements;
  return `${count} ${label}`;
}

function sectionItems(key) {
  const section = DATA[key];
  if (!section) return [];
  if (section.type !== "folders") return section.items || [];

  return Object.entries(section.folders).flatMap(([folderKey, folder]) =>
    folder.items.map(item => ({
      ...item,
      photoFolderKey: folderKey,
      photoFolderLabel: folder.label
    }))
  );
}

function allItems() {
  return Object.entries(DATA).flatMap(([sectionKey, section]) =>
    sectionItems(sectionKey).map(item => ({
      ...item,
      sectionKey,
      sectionLabel: section.label,
      sectionIcon: section.icon
    }))
  );
}

function applyStaticTranslations() {
  const text = ui();
  document.documentElement.lang = currentLanguage;

  if (brandLink) {
    brandLink.href = PROFILE.instagramUrl;
    brandLink.textContent = PROFILE.name;
  }

  const favoritesLabel = document.querySelector('[data-ui="favorites"]');
  const libraryLabel = document.querySelector('[data-ui="library"]');
  const categoriesHeader = document.querySelector('[data-ui="categories"]');
  const sidebarNote = document.querySelector('[data-ui="sidebar-note"]');

  if (favoritesLabel) favoritesLabel.textContent = text.favorites;
  if (libraryLabel) libraryLabel.textContent = text.library;
  if (categoriesHeader) categoriesHeader.textContent = text.categories;
  if (sidebarNote) sidebarNote.textContent = text.sidebarNote;
  if (searchInput) searchInput.placeholder = text.searchPlaceholder;

  document.querySelectorAll(".side-item[data-view]").forEach(button => {
    const label = button.querySelector(".side-label");
    if (!label) return;
    const view = button.dataset.view;

    if (DATA[view]) label.textContent = tr(DATA[view].label);
    else if (view === "todo") label.textContent = text.all;
    else if (view === "contacto") label.textContent = text.contact;
  });

  if (languageSwitcher) {
    languageSwitcher.setAttribute("aria-label", text.language);
    languageSwitcher.querySelectorAll("[data-lang]").forEach(button => {
      const active = button.dataset.lang === currentLanguage;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }
}

function setSidebarActive(view) {
  document.querySelectorAll(".side-item").forEach(button => button.classList.remove("active"));
  document.querySelector(`.side-item[data-view="${view}"]`)?.classList.add("active");
}

function renderFolderColumn() {
  folderList.innerHTML = "";

  if (currentView === "contact") {
    folderList.innerHTML = `<div class="column-empty-label">${ui().contact}</div>`;
    return;
  }

  if (currentView === "all") {
    folderList.innerHTML = `
      <div class="row selected context-folder">
        <div class="folder-icon">◉</div>
        <div class="row-copy">
          <div class="row-title">${ui().all}</div>
          <div class="row-meta">${elementCount(allItems().length)}</div>
        </div>
      </div>`;
    return;
  }

  if (currentSection === "fotos" && currentPhotoFolder) {
    Object.entries(DATA.fotos.folders).forEach(([folderKey, folder]) => {
      const row = document.createElement("div");
      row.className = "row category-main" + (folderKey === currentPhotoFolder ? " selected" : "");
      row.innerHTML = `
        <div class="folder-icon">${folder.icon}</div>
        <div class="row-copy">
          <div class="row-title">${tr(folder.label)}</div>
          <div class="row-meta">${elementCount(folder.items.length)}</div>
        </div>
        <div class="chevron">›</div>`;

      row.onclick = () => {
        currentPhotoFolder = folderKey;
        currentItem = null;
        renderFolderColumn();
        renderItems(searchInput.value);
        renderSectionEmpty();
        title.textContent = tr(folder.label);
        updateBreadcrumb();
      };

      folderList.appendChild(row);
    });
    return;
  }

  Object.entries(DATA).forEach(([key, section]) => {
    const row = document.createElement("div");
    row.className = "row category-main" + (currentSection === key ? " selected" : "");
    row.innerHTML = `
      <div class="folder-icon">${section.icon}</div>
      <div class="row-copy">
        <div class="row-title">${tr(section.label)}</div>
        <div class="row-meta">${elementCount(sectionItems(key).length)}</div>
      </div>
      <div class="chevron">›</div>`;

    row.onclick = () => selectSection(key);
    folderList.appendChild(row);
  });
}

function thumbFor(item) {
  if (item.kind === "folder") {
    return `<div class="thumb fallback-thumb">${item.folderIcon || "📁"}</div>`;
  }

  if (item.kind === "channel" && item.thumbnails?.length) {
    return `
      <div class="thumb thumb-collage">
        ${item.thumbnails.slice(0, 4).map((thumb, index) => `
          <img
            src="${thumb.local}"
            data-fallback="${thumb.remote}"
            alt="${ui().photoAlt} ${index + 1}"
            draggable="false"
            onerror="if(this.dataset.fallback){this.onerror=null;this.src=this.dataset.fallback;}"
          >
        `).join("")}
      </div>`;
  }

  let src = item.images?.[0] || item.poster || "";
  if (item.kind === "youtube") {
    src = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
  }

  if (src) {
    return `<img class="thumb" src="${src}" alt="" draggable="false">`;
  }

  const fallback = item.kind === "audio" ? "♫" : item.kind === "channel" ? "▶" : "✦";
  return `<div class="thumb fallback-thumb">${fallback}</div>`;
}

function visibleItems() {
  if (currentView === "all") return allItems();
  if (currentView === "contact") return [];

  if (currentSection === "fotos") {
    if (!currentPhotoFolder) {
      return Object.entries(DATA.fotos.folders).map(([key, folder]) => ({
        id: `folder-${key}`,
        title: folder.label,
        meta: elementCount(folder.items.length),
        description: "",
        kind: "folder",
        folderKey: key,
        folderIcon: folder.icon
      }));
    }

    return DATA.fotos.folders[currentPhotoFolder].items;
  }

  return DATA[currentSection]?.items || [];
}

function renderItems(filter = "") {
  itemList.innerHTML = "";
  const query = filter.trim().toLowerCase();

  if (currentView === "contact") {
    itemHeader.textContent = ui().contact;
    itemList.innerHTML = `<div class="contact-list-note"><span>↗</span><strong>${ui().contact}</strong><small>${ui().contactMethods}</small></div>`;
    statusText.textContent = ui().twoContactMethods;
    return;
  }

  const items = visibleItems().filter(item =>
    [item.title, item.meta, item.description, item.sectionLabel, item.photoFolderLabel]
      .filter(Boolean)
      .map(tr)
      .join(" ")
      .toLowerCase()
      .includes(query)
  );

  itemHeader.textContent =
    currentView === "all"
      ? ui().all
      : currentSection === "fotos"
        ? (currentPhotoFolder ? ui().content : ui().folders)
        : tr(DATA[currentSection].label);

  items.forEach(item => {
    const row = document.createElement("div");
    row.className = "row" + (currentItem?.id === item.id ? " selected" : "");
    row.innerHTML = `
      ${thumbFor(item)}
      <div class="row-copy">
        <div class="row-title">${tr(item.title)}</div>
        <div class="row-meta">${currentView === "all" && item.sectionLabel ? tr(item.sectionLabel) + " · " : ""}${tr(item.meta)}</div>
      </div>
      <div class="chevron">›</div>`;

    row.onclick = () => {
      if (item.kind === "folder") {
        currentPhotoFolder = item.folderKey;
        currentItem = null;
        renderFolderColumn();
        renderItems(searchInput.value);
        renderSectionEmpty();
        title.textContent = tr(DATA.fotos.folders[currentPhotoFolder].label);
        updateBreadcrumb();
      } else {
        selectItem(item);
      }
    };

    itemList.appendChild(row);
  });

  statusText.textContent = elementCount(items.length);
}

function selectSection(key) {
  currentView = "folder";
  currentSection = key;
  currentItem = null;

  if (key === "fotos") currentPhotoFolder = null;

  setSidebarActive(key);
  title.textContent = tr(DATA[key].label);
  renderFolderColumn();
  renderItems(searchInput.value);
  renderSectionEmpty();
  updateBreadcrumb();
}

function showAll() {
  currentView = "all";
  currentItem = null;
  setSidebarActive("todo");
  title.textContent = ui().all;
  renderFolderColumn();
  renderItems(searchInput.value);
  renderAllSummary();
  updateBreadcrumb();
}

function showContact() {
  currentView = "contact";
  currentItem = null;
  setSidebarActive("contacto");
  title.textContent = ui().contact;
  renderFolderColumn();
  renderItems();
  renderContact();
  updateBreadcrumb();
}

function renderSectionEmpty() {
  const section = DATA[currentSection];
  const subTitle =
    currentSection === "fotos"
      ? (currentPhotoFolder ? tr(DATA.fotos.folders[currentPhotoFolder].label) : tr(DATA.fotos.label))
      : tr(section.label);

  preview.innerHTML = `
    <div class="preview-empty">
      <div class="empty-icon">${section.icon}</div>
      <h2>${subTitle}</h2>
      <p>${currentSection === "fotos" && !currentPhotoFolder
        ? ui().selectFolder
        : ui().selectPiece}</p>
    </div>`;
}

function selectItem(item) {
  currentItem = item;
  renderItems(searchInput.value);
  renderPreview(item);
  updateBreadcrumb();
}

function updateBreadcrumb() {
  if (currentView === "contact") {
    breadcrumb.textContent = `Macintosh HD › Portfolio › ${ui().contact}`;
    return;
  }

  if (currentView === "all") {
    breadcrumb.textContent = currentItem
      ? `Macintosh HD › Portfolio › ${ui().all} › ${tr(currentItem.title)}`
      : `Macintosh HD › Portfolio › ${ui().all}`;
    return;
  }

  if (currentSection === "fotos") {
    const parts = ["Macintosh HD", "Portfolio", tr(DATA.fotos.label)];
    if (currentPhotoFolder) parts.push(tr(DATA.fotos.folders[currentPhotoFolder].label));
    if (currentItem) parts.push(tr(currentItem.title));
    breadcrumb.textContent = parts.join(" › ");
    return;
  }

  const parts = ["Macintosh HD", "Portfolio", tr(DATA[currentSection].label)];
  if (currentItem) parts.push(tr(currentItem.title));
  breadcrumb.textContent = parts.join(" › ");
}

function contributionHTML(item) {
  if (!item.contributions?.length) return "";

  return `
    <section class="contrib">
      <div class="contrib-label">${ui().contribution}</div>
      <div class="contrib-list">${item.contributions.map(value => `<span>${tr(value)}</span>`).join("")}</div>
    </section>`;
}

function details(item) {
  return `
    <h1 class="preview-title">${tr(item.title)}</h1>
    <p class="preview-subtitle">${tr(item.meta)}</p>
    <p class="preview-copy">${tr(item.description)}</p>
    ${contributionHTML(item)}`;
}

function carousel(images) {
  if (!images?.length) {
    return `<div class="missing-media">${ui().missingPhotos}</div>`;
  }

  return `
    <div class="insta-carousel-wrap">
      <div class="insta-carousel">
        ${images.map((src, index) => `<div class="insta-slide"><img src="${src}" alt="${ui().photoAlt} ${index + 1}" draggable="false"></div>`).join("")}
      </div>

      <div class="carousel-dots">
        ${images.map((_, index) => `<span class="dot ${index === 0 ? "active" : ""}"></span>`).join("")}
      </div>

      <div class="folder-preview-strip">
        ${images.map((src, index) => `
          <button class="folder-preview-thumb ${index === 0 ? "active" : ""}" data-index="${index}" aria-label="${ui().viewPhoto} ${index + 1}">
            <img src="${src}" alt="" draggable="false">
          </button>
        `).join("")}
      </div>
    </div>`;
}

function renderPreview(item) {
  if (item.kind === "photos") {
    preview.innerHTML = carousel(item.images) + details(item);
    wireCarousel();
    return;
  }

  if (item.kind === "video") {
    preview.innerHTML = `<div class="${item.dimensions ? "vertical-stage" : "project-video-stage"}"><video controls playsinline preload="metadata" poster="${item.poster || ""}"><source src="${item.video}" type="video/mp4"></video></div>${details(item)}`;
    return;
  }

  if (item.kind === "youtube") {
    const frames = [0, 1, 2, 3];
    preview.innerHTML = `<a class="youtube-preview" href="${item.externalUrl}" target="_blank" rel="noopener"><img id="ytAnimated" src="https://img.youtube.com/vi/${item.youtubeId}/0.jpg" alt="${tr(item.title)}"><div class="youtube-play">▶</div><div class="youtube-open">${ui().viewVideo} ↗</div></a>${details(item)}`;

    let frameIndex = 0;
    const image = document.getElementById("ytAnimated");
    const timer = setInterval(() => {
      if (!document.body.contains(image)) {
        clearInterval(timer);
        return;
      }
      frameIndex = (frameIndex + 1) % frames.length;
      image.src = `https://img.youtube.com/vi/${item.youtubeId}/${frames[frameIndex]}.jpg`;
    }, 1100);
    return;
  }

  if (item.kind === "channel") {
    preview.innerHTML = `
      <a class="channel-preview visual-channel" href="${item.externalUrl}" target="_blank" rel="noopener">
        <div class="yt-channel-collage">
          ${(item.thumbnails || []).map((thumb, index) => `
            <img
              src="${thumb.local}"
              data-fallback="${thumb.remote}"
              alt="${ui().photoAlt} ${index + 1} · @mixunets"
              draggable="false"
              onerror="if(this.dataset.fallback){this.onerror=null;this.src=this.dataset.fallback;}"
            >
          `).join("")}
        </div>
        <div class="channel-overlay">
          <div>
            <small>${ui().channelKicker}</small>
            <h2>@mixunets</h2>
            <p>${ui().channelText}</p>
          </div>
          <span>${ui().visitChannel} ↗</span>
        </div>
      </a>
      ${details(item)}`;
    return;
  }

  if (item.kind === "audio") {
    const audioType = item.audio.toLowerCase().endsWith(".wav") ? "audio/wav" : "audio/mpeg";
    preview.innerHTML = `<section class="audio-preview"><div class="audio-art"><div class="audio-art-inner"><span class="audio-note">♫</span><small>${ui().originalScore}</small></div></div><div class="audio-player-wrap"><audio controls preload="metadata"><source src="${item.audio}" type="${audioType}"></audio></div></section>${details(item)}`;
  }
}

function wireCarousel() {
  const track = preview.querySelector(".insta-carousel");
  if (!track) return;

  const slides = [...track.querySelectorAll(".insta-slide")];
  const dots = [...preview.querySelectorAll(".carousel-dots .dot")];
  const thumbs = [...preview.querySelectorAll(".folder-preview-thumb")];

  slides.forEach(slide => {
    slide.style.flex = "0 0 100%";
    slide.style.minWidth = "100%";
  });

  track.style.cursor = "grab";
  track.style.userSelect = "none";
  track.style.touchAction = "auto";

  function setActive(index) {
    const safeIndex = Math.max(0, Math.min(index, Math.max(slides.length - 1, 0)));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === safeIndex));
    thumbs.forEach((thumb, i) => thumb.classList.toggle("active", i === safeIndex));
  }

  function goTo(index, smooth = true) {
    const safeIndex = Math.max(0, Math.min(index, Math.max(slides.length - 1, 0)));
    track.scrollTo({
      left: safeIndex * track.clientWidth,
      behavior: smooth ? "smooth" : "auto"
    });
    setActive(safeIndex);
  }

  track.addEventListener("scroll", () => {
    requestAnimationFrame(() => {
      if (!track.clientWidth) return;
      setActive(Math.round(track.scrollLeft / track.clientWidth));
    });
  }, { passive: true });

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => goTo(index));
  });

  dots.forEach((dot, index) => {
    dot.style.cursor = "pointer";
    dot.addEventListener("click", () => goTo(index));
  });

  let dragging = false;
  let startX = 0;
  let startScroll = 0;
  let pointerId = null;

  track.addEventListener("pointerdown", event => {
    if (event.pointerType === "touch" || event.button !== 0) return;

    dragging = true;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = track.scrollLeft;
    track.style.cursor = "grabbing";
    track.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  track.addEventListener("pointermove", event => {
    if (!dragging || event.pointerId !== pointerId) return;
    track.scrollLeft = startScroll - (event.clientX - startX);
  });

  function endDrag(event) {
    if (!dragging || (event?.pointerId != null && event.pointerId !== pointerId)) return;

    dragging = false;
    track.style.cursor = "grab";

    if (pointerId != null) {
      try {
        track.releasePointerCapture?.(pointerId);
      } catch (_) {}
    }

    pointerId = null;

    if (track.clientWidth) {
      goTo(Math.round(track.scrollLeft / track.clientWidth));
    }
  }

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);

  track.querySelectorAll("img").forEach(image => {
    image.draggable = false;
    image.addEventListener("dragstart", event => event.preventDefault());
  });
}

function renderAllSummary() {
  preview.innerHTML = `<section class="all-summary"><div class="summary-kicker">${ui().summaryKicker}</div><h1>${ui().summaryTitle}</h1><p class="summary-intro">${ui().summaryIntro}</p><div class="summary-grid">${Object.entries(DATA).map(([key, section]) => `<div class="summary-card static"><span class="summary-icon">${section.icon}</span><span><strong>${tr(section.label)}</strong><small>${elementCount(sectionItems(key).length)}</small></span></div>`).join("")}</div></section>`;
}

function renderContact() {
  preview.innerHTML = `<section class="contact-screen"><div class="contact-kicker">${PROFILE.contactKicker}</div><h1>${ui().contactTitle}</h1><p class="contact-intro">${tr(PROFILE.contactIntro)}</p><div class="contact-links"><a class="contact-link" href="mailto:${PROFILE.email}"><span class="contact-type">${ui().email}</span><strong>${PROFILE.email}</strong><span class="contact-arrow">↗</span></a><a class="contact-link" href="${PROFILE.instagramUrl}" target="_blank" rel="noopener"><span class="contact-type">Instagram</span><strong>${PROFILE.instagramHandle}</strong><span class="contact-arrow">↗</span></a></div></section>`;
}

function refreshCurrentView() {
  applyStaticTranslations();

  if (currentView === "contact") {
    setSidebarActive("contacto");
    title.textContent = ui().contact;
    renderFolderColumn();
    renderItems();
    renderContact();
    updateBreadcrumb();
    return;
  }

  if (currentView === "all") {
    setSidebarActive("todo");
    title.textContent = ui().all;
    renderFolderColumn();
    renderItems(searchInput.value);
    if (currentItem) renderPreview(currentItem);
    else renderAllSummary();
    updateBreadcrumb();
    return;
  }

  setSidebarActive(currentSection);
  title.textContent = currentSection === "fotos" && currentPhotoFolder
    ? tr(DATA.fotos.folders[currentPhotoFolder].label)
    : tr(DATA[currentSection].label);
  renderFolderColumn();
  renderItems(searchInput.value);
  if (currentItem) renderPreview(currentItem);
  else renderSectionEmpty();
  updateBreadcrumb();
}

function setLanguage(language) {
  if (!LANGUAGES[language] || language === currentLanguage) return;
  currentLanguage = language;

  try {
    localStorage.setItem("portfolio-language", language);
  } catch (_) {}

  refreshCurrentView();
}

document.querySelectorAll(".side-item[data-view]").forEach(button => {
  button.onclick = () => {
    const view = button.dataset.view;
    if (DATA[view]) selectSection(view);
    else if (view === "todo") showAll();
    else if (view === "contacto") showContact();
  };
});

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

searchInput.addEventListener("input", event => renderItems(event.target.value));

document.addEventListener("dragstart", event => {
  if (event.target.tagName === "IMG") event.preventDefault();
});

applyStaticTranslations();
selectSection("proyectos");
