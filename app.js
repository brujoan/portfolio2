const DATA = window.PORTFOLIO_CONTENT;

if (!DATA) {
  throw new Error("No se ha cargado content.js");
}

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

function setSidebarActive(view) {
  document.querySelectorAll(".side-item").forEach(button => button.classList.remove("active"));
  document.querySelector(`.side-item[data-view="${view}"]`)?.classList.add("active");
}

function renderFolderColumn() {
  folderList.innerHTML = "";

  if (currentView === "contact") {
    folderList.innerHTML = '<div class="column-empty-label">Contacto</div>';
    return;
  }

  if (currentView === "all") {
    folderList.innerHTML = `
      <div class="row selected context-folder">
        <div class="folder-icon">◉</div>
        <div class="row-copy">
          <div class="row-title">Todo</div>
          <div class="row-meta">${allItems().length} elementos</div>
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
          <div class="row-title">${folder.label}</div>
          <div class="row-meta">${folder.items.length} elementos</div>
        </div>
        <div class="chevron">›</div>`;

      row.onclick = () => {
        currentPhotoFolder = folderKey;
        currentItem = null;
        renderFolderColumn();
        renderItems(searchInput.value);
        renderSectionEmpty();
        title.textContent = folder.label;
        breadcrumb.textContent = `Macintosh HD › Portfolio › Fotos › ${folder.label}`;
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
        <div class="row-title">${section.label}</div>
        <div class="row-meta">${sectionItems(key).length} elementos</div>
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
            alt="Portada ${index + 1}"
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
        meta: `${folder.items.length} elementos`,
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
    itemHeader.textContent = "Contacto";
    itemList.innerHTML = '<div class="contact-list-note"><span>↗</span><strong>Contacto</strong><small>Instagram y correo</small></div>';
    statusText.textContent = "2 vías de contacto";
    return;
  }

  const items = visibleItems().filter(item =>
    [item.title, item.meta, item.description, item.sectionLabel, item.photoFolderLabel]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(query)
  );

  itemHeader.textContent =
    currentView === "all"
      ? "Todo"
      : currentSection === "fotos"
        ? (currentPhotoFolder ? "Contenido" : "Carpetas")
        : DATA[currentSection].label;

  items.forEach(item => {
    const row = document.createElement("div");
    row.className = "row" + (currentItem?.id === item.id ? " selected" : "");
    row.innerHTML = `
      ${thumbFor(item)}
      <div class="row-copy">
        <div class="row-title">${item.title}</div>
        <div class="row-meta">${currentView === "all" && item.sectionLabel ? item.sectionLabel + " · " : ""}${item.meta}</div>
      </div>
      <div class="chevron">›</div>`;

    row.onclick = () => {
      if (item.kind === "folder") {
        currentPhotoFolder = item.folderKey;
        currentItem = null;
        renderFolderColumn();
        renderItems(searchInput.value);
        renderSectionEmpty();
        title.textContent = DATA.fotos.folders[currentPhotoFolder].label;
        breadcrumb.textContent = `Macintosh HD › Portfolio › Fotos › ${DATA.fotos.folders[currentPhotoFolder].label}`;
      } else {
        selectItem(item);
      }
    };

    itemList.appendChild(row);
  });

  statusText.textContent = `${items.length} elementos`;
}

function selectSection(key) {
  currentView = "folder";
  currentSection = key;
  currentItem = null;

  if (key === "fotos") currentPhotoFolder = null;

  setSidebarActive(key);
  title.textContent = DATA[key].label;
  breadcrumb.textContent = `Macintosh HD › Portfolio › ${DATA[key].label}`;
  renderFolderColumn();
  renderItems(searchInput.value);
  renderSectionEmpty();
}

function showAll() {
  currentView = "all";
  currentItem = null;
  setSidebarActive("todo");
  title.textContent = "Todo";
  breadcrumb.textContent = "Macintosh HD › Portfolio › Todo";
  renderFolderColumn();
  renderItems(searchInput.value);
  renderAllSummary();
}

function showContact() {
  currentView = "contact";
  currentItem = null;
  setSidebarActive("contacto");
  title.textContent = "Contacto";
  breadcrumb.textContent = "Macintosh HD › Portfolio › Contacto";
  renderFolderColumn();
  renderItems();
  renderContact();
}

function renderSectionEmpty() {
  const section = DATA[currentSection];
  const subTitle =
    currentSection === "fotos"
      ? (currentPhotoFolder ? DATA.fotos.folders[currentPhotoFolder].label : "Fotos")
      : section.label;

  preview.innerHTML = `
    <div class="preview-empty">
      <div class="empty-icon">${section.icon}</div>
      <h2>${subTitle}</h2>
      <p>${currentSection === "fotos" && !currentPhotoFolder
        ? "Selecciona una carpeta en la columna central."
        : "Selecciona una pieza para verla aquí."}</p>
    </div>`;
}

function selectItem(item) {
  currentItem = item;
  renderItems(searchInput.value);
  renderPreview(item);

  if (currentView === "all") {
    breadcrumb.textContent = `Macintosh HD › Portfolio › Todo › ${item.title}`;
  } else if (currentSection === "fotos") {
    breadcrumb.textContent = `Macintosh HD › Portfolio › Fotos › ${DATA.fotos.folders[currentPhotoFolder].label} › ${item.title}`;
  } else {
    breadcrumb.textContent = `Macintosh HD › Portfolio › ${DATA[currentSection].label} › ${item.title}`;
  }
}

function contributionHTML(item) {
  if (!item.contributions?.length) return "";

  return `
    <section class="contrib">
      <div class="contrib-label">APORTACIÓN</div>
      <div class="contrib-list">${item.contributions.map(value => `<span>${value}</span>`).join("")}</div>
    </section>`;
}

function details(item) {
  return `
    <h1 class="preview-title">${item.title}</h1>
    <p class="preview-subtitle">${item.meta}</p>
    <p class="preview-copy">${item.description}</p>
    ${contributionHTML(item)}`;
}

function carousel(images) {
  if (!images?.length) {
    return '<div class="missing-media">Fotos pendientes de incorporar</div>';
  }

  return `
    <div class="insta-carousel-wrap">
      <div class="insta-carousel">
        ${images.map((src, index) => `<div class="insta-slide"><img src="${src}" alt="Foto ${index + 1}" draggable="false"></div>`).join("")}
      </div>

      <div class="carousel-dots">
        ${images.map((_, index) => `<span class="dot ${index === 0 ? "active" : ""}"></span>`).join("")}
      </div>

      <div class="folder-preview-strip">
        ${images.map((src, index) => `
          <button class="folder-preview-thumb ${index === 0 ? "active" : ""}" data-index="${index}" aria-label="Ver foto ${index + 1}">
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
    preview.innerHTML = `<a class="youtube-preview" href="${item.externalUrl}" target="_blank" rel="noopener"><img id="ytAnimated" src="https://img.youtube.com/vi/${item.youtubeId}/0.jpg" alt="${item.title}"><div class="youtube-play">▶</div><div class="youtube-open">Ver vídeo ↗</div></a>${details(item)}`;

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
              alt="Portada vídeo ${index + 1} de @mixunets"
              draggable="false"
              onerror="if(this.dataset.fallback){this.onerror=null;this.src=this.dataset.fallback;}"
            >
          `).join("")}
        </div>
        <div class="channel-overlay">
          <div>
            <small>CONTENIDO PERSONAL / OCIO</small>
            <h2>@mixunets</h2>
            <p>Vídeos y contenido personal.</p>
          </div>
          <span>Visitar canal ↗</span>
        </div>
      </a>
      ${details(item)}`;
    return;
  }

  if (item.kind === "audio") {
    const audioType = item.audio.toLowerCase().endsWith(".wav") ? "audio/wav" : "audio/mpeg";
    preview.innerHTML = `<section class="audio-preview"><div class="audio-art"><div class="audio-art-inner"><span class="audio-note">♫</span><small>JOAN BRÚ / ORIGINAL SCORE</small></div></div><div class="audio-player-wrap"><audio controls preload="metadata"><source src="${item.audio}" type="${audioType}"></audio></div></section>${details(item)}`;
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
  preview.innerHTML = `<section class="all-summary"><div class="summary-kicker">PORTFOLIO / ÍNDICE</div><h1>Todo.</h1><p class="summary-intro">Todo el material del portfolio en un único lugar. Selecciona cualquier pieza de la columna central y se abrirá aquí, sin salir de Todo.</p><div class="summary-grid">${Object.entries(DATA).map(([key, section]) => `<div class="summary-card static"><span class="summary-icon">${section.icon}</span><span><strong>${section.label}</strong><small>${sectionItems(key).length} elementos</small></span></div>`).join("")}</div></section>`;
}

function renderContact() {
  preview.innerHTML = `<section class="contact-screen"><div class="contact-kicker">JOAN BRÚ / AUDIOVISUAL</div><h1>Hablemos.</h1><p class="contact-intro">Foto, vídeo, postproducción, música o una idea que todavía no tiene forma.</p><div class="contact-links"><a class="contact-link" href="mailto:joanbru008@gmail.com"><span class="contact-type">Correo</span><strong>joanbru008@gmail.com</strong><span class="contact-arrow">↗</span></a><a class="contact-link" href="https://instagram.com/joan_brru" target="_blank" rel="noopener"><span class="contact-type">Instagram</span><strong>@joan_brru</strong><span class="contact-arrow">↗</span></a></div></section>`;
}

document.querySelectorAll(".side-item[data-view]").forEach(button => {
  button.onclick = () => {
    const view = button.dataset.view;
    if (DATA[view]) selectSection(view);
    else if (view === "todo") showAll();
    else if (view === "contacto") showContact();
  };
});

searchInput.addEventListener("input", event => renderItems(event.target.value));

document.addEventListener("dragstart", event => {
  if (event.target.tagName === "IMG") event.preventDefault();
});

selectSection("proyectos");
