const DATA = {
  proyectos: {
    label: "Proyectos",
    icon: "✦",
    type: "collection",
    items: [
      {
        id:"spot-inmobiliaria",
        title:"Spot inmobiliaria",
        meta:"Spot · YouTube",
        description:"Proyecto audiovisual para una inmobiliaria.",
        contributions:["Guión","Dirección","BSO","Postproducción"],
        kind:"youtube",
        youtubeId:"6NvPclCZoAM",
        externalUrl:"https://www.youtube.com/watch?v=6NvPclCZoAM"
      },
      {
        id:"spot-peluqueria-estetica",
        title:"Spot peluquería y estética",
        meta:"Spot · YouTube",
        description:"Spot audiovisual para peluquería y estética.",
        contributions:[],
        kind:"youtube",
        youtubeId:"qcvNduSf_RQ",
        externalUrl:"https://www.youtube.com/watch?v=qcvNduSf_RQ"
      },
      {
        id:"ginpasf-proyecto",
        title:"Ginpasf",
        meta:"Documental · Actividades paranormales",
        description:"Documental sobre actividades paranormales.",
        contributions:["Localización","Producción","Operación de cámara","Técnico de sonido","BSO","Postproducción"],
        tags:["documental","paranormal","bso"],
        kind:"youtube",
        youtubeId:"WlQeL4UCRCo",
        externalUrl:"https://www.youtube.com/watch?v=WlQeL4UCRCo"
      },
      {
        id:"mixunets",
        title:"Mixunets",
        meta:"YouTube · Contenido personal",
        description:"Contenido personal de ocio.",
        contributions:[],
        kind:"channel",
        externalUrl:"https://www.youtube.com/@mixunets",
        thumbnails:[
          {local:"assets/images/mixunets/01.jpg",remote:"https://i.ytimg.com/vi/hi8ji331RJA/maxresdefault.jpg"},
          {local:"assets/images/mixunets/02.jpg",remote:"https://i.ytimg.com/vi/S6jKOkwNUc4/maxresdefault.jpg"},
          {local:"assets/images/mixunets/03.jpg",remote:"https://i.ytimg.com/vi/3sNJUAODwsk/maxresdefault.jpg"},
          {local:"assets/images/mixunets/04.jpg",remote:"https://i.ytimg.com/vi/MIDbMiKg6TE/maxresdefault.jpg"}
        ]
      }
    ]
  },

  vertical: {
    label: "Vertical",
    icon: "🎞️",
    type: "collection",
    items: [
      {id:"c80gear",title:"C80gear",meta:"00:41 · Vertical",description:"Pieza vertical audiovisual.",contributions:[],tags:["vertical","video"],kind:"video",video:"assets/videos/c80gear.mp4",poster:"assets/images/video-posters/c80gear.jpg",dimensions:"720×1280"},
      {id:"cadires",title:"Cadires",meta:"00:05 · Vertical",description:"Pieza vertical audiovisual.",contributions:[],tags:["vertical","video"],kind:"video",video:"assets/videos/cadires.mp4",poster:"assets/images/video-posters/cadires.jpg",dimensions:"720×1280"},
      {id:"fxlion",title:"FXLion",meta:"00:26 · Vertical",description:"Pieza vertical audiovisual.",contributions:[],tags:["vertical","video"],kind:"video",video:"assets/videos/fxlion.mp4",poster:"assets/images/video-posters/fxlion.jpg",dimensions:"720×1280"},
      {id:"studio1-koi",title:"Studio1 · KOI",meta:"00:21 · Vertical",description:"Pieza vertical audiovisual.",contributions:[],tags:["vertical","video"],kind:"video",video:"assets/videos/studio1-koi.mp4",poster:"assets/images/video-posters/studio1-koi.jpg",dimensions:"720×1280"},
      {id:"studio2-irene",title:"Studio2 · Irene",meta:"00:18 · Vertical",description:"Pieza vertical audiovisual.",contributions:[],tags:["vertical","video"],kind:"video",video:"assets/videos/studio2-irene.mp4",poster:"assets/images/video-posters/studio2-irene.jpg",dimensions:"720×1280"}
    ]
  },

  fotos: {
    label: "Fotos",
    icon: "📷",
    type: "folders",
    folders: {
      producto: {
        label:"Foto producto",
        icon:"◫",
        items:[
          {id:"cobra-tether",title:"Cobra Tether",meta:"Carrusel · 3 fotos",description:"Fotografía de producto centrada en detalle y textura.",contributions:[],tags:["producto","tether","detalle"],kind:"photos",images:["assets/images/cobra-tether-01.jpg","assets/images/cobra-tether-02.jpg","assets/images/cobra-tether-03.jpg"]},
          {id:"dzo-vespid",title:"DZO Vespid Prime",meta:"Carrusel · 7 fotos",description:"Serie de producto de ópticas DZO Vespid Prime.",contributions:[],tags:["producto","cine","ópticas"],kind:"photos",images:["assets/images/dzo-01.jpg","assets/images/dzo-02.jpg","assets/images/dzo-03.jpg","assets/images/dzo-04.jpg","assets/images/dzo-05.jpg","assets/images/dzo-06.jpg","assets/images/dzo-07.jpg"]},
          {id:"macbook-m5",title:"MacBook M5",meta:"Carrusel · 4 fotos",description:"Serie visual de MacBook con movimiento y largas exposiciones.",contributions:[],tags:["producto","apple","motion"],kind:"photos",images:["assets/images/macbook-m5-01.jpg","assets/images/macbook-m5-02.jpg","assets/images/macbook-m5-03.jpg","assets/images/macbook-m5-04.jpg"]},
          {id:"nikon-z8",title:"Nikon Z8",meta:"Carrusel · 4 fotos",description:"Fotografía de producto de cámara y ópticas Nikon.",contributions:[],tags:["producto","nikon","camera"],kind:"photos",images:["assets/images/nikon-z8-01.jpg","assets/images/nikon-z8-02.jpg","assets/images/nikon-z8-03.jpg","assets/images/nikon-z8-04.jpg"]}
        ]
      },
      eventos: {
        label:"Eventos",
        icon:"✺",
        items:[
          {
            id:"night-of-wolves",
            title:"DJ Set · Night of Wolves",
            meta:"Evento · 8 fotos",
            description:"Galería del DJ set Night of Wolves.",
            contributions:[],
            tags:[],
            kind:"photos",
            images:[
              "assets/images/night-of-wolves/dj-set-01.png",
              "assets/images/night-of-wolves/dj-set-02.png",
              "assets/images/night-of-wolves/dj-set-03.png",
              "assets/images/night-of-wolves/dj-set-04.png",
              "assets/images/night-of-wolves/dj-set-05.jpg",
              "assets/images/night-of-wolves/dj-set-06.jpg",
              "assets/images/night-of-wolves/dj-set-07.jpg",
              "assets/images/night-of-wolves/dj-set-08.jpg"
            ]
          },
          {
            id:"rugby-fem-buc-vs-barca",
            title:"Rugby Fem. BUC vs Barça",
            meta:"Evento · 6 fotos",
            description:"Galería del partido femenino BUC vs Barça.",
            contributions:[],
            tags:[],
            kind:"photos",
            images:[
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-01.jpg",
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-02.jpg",
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-03.jpg",
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-04.jpg",
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-05.jpg",
              "assets/images/events/rugby-fem-buc-vs-barca/rugby-06.jpg"
            ]
          }
        ]
      },
      analogico: {
        label:"Analógico",
        icon:"◉",
        items:[
          {
            id:"olympus-mju-ii",
            title:"Olympus Mju II",
            meta:"Analógico · 7 fotos",
            description:"Selección fotográfica realizada con Olympus Mju II.",
            contributions:[],
            tags:["analógico","35mm","olympus"],
            kind:"photos",
            images:[
              "assets/images/analogico/olympus-mju-ii/olympus-01.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-02.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-03.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-04.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-05.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-06.jpg",
              "assets/images/analogico/olympus-mju-ii/olympus-07.jpg"
            ]
          },
          {
            id:"contax-g2",
            title:"Contax G2",
            meta:"Analógico · 7 fotos",
            description:"Selección fotográfica realizada con Contax G2.",
            contributions:[],
            tags:["analógico","35mm","contax"],
            kind:"photos",
            images:[
              "assets/images/analogico/contax-g2/contax-01.jpg",
              "assets/images/analogico/contax-g2/contax-02.jpg",
              "assets/images/analogico/contax-g2/contax-03.jpg",
              "assets/images/analogico/contax-g2/contax-04.jpg",
              "assets/images/analogico/contax-g2/contax-05.jpg",
              "assets/images/analogico/contax-g2/contax-06.jpg",
              "assets/images/analogico/contax-g2/contax-07.jpg"
            ]
          }
        ]
      }
    }
  },

  musica: {
    label: "Producción musical",
    icon: "♫",
    type: "collection",
    items: [
      {id:"ginpasf-bso",title:"Ginpasf",meta:"01:33 · BSO documental",description:"Banda sonora para un documental sobre actividades paranormales.",contributions:["BSO"],tags:["bso","documental","paranormal"],kind:"audio",audio:"assets/audio/ginpasf.mp3"},
      {id:"spot-inmobiliaria-bso",title:"Spot inmobiliaria",meta:"00:40 · BSO spot",description:"Banda sonora original para un spot de inmobiliaria.",contributions:["BSO"],tags:["bso","spot","inmobiliaria"],kind:"audio",audio:"assets/audio/musica-inmobiliaria.wav"},
      {id:"war",title:"War",meta:"01:30 · BSO evento",description:"Banda sonora para una velada de MMA.",contributions:["BSO"],tags:["bso","mma","evento"],kind:"audio",audio:"assets/audio/war.wav"}
    ]
  }
};

let currentView="folder", currentSection="proyectos", currentPhotoFolder=null, currentItem=null;
const folderList=document.getElementById("folderList"), itemList=document.getElementById("itemList"),
preview=document.getElementById("previewPanel"), itemHeader=document.getElementById("itemHeader"),
title=document.getElementById("windowTitle"), breadcrumb=document.getElementById("breadcrumb"),
statusText=document.getElementById("statusText"), searchInput=document.getElementById("searchInput");

function sectionItems(key){
  const s=DATA[key];
  if(s.type!=="folders") return s.items||[];
  return Object.entries(s.folders).flatMap(([fk,f])=>f.items.map(i=>({...i,photoFolderKey:fk,photoFolderLabel:f.label})));
}
function allItems(){
  return Object.entries(DATA).flatMap(([sk,s])=>sectionItems(sk).map(i=>({...i,sectionKey:sk,sectionLabel:s.label,sectionIcon:s.icon})));
}
function setSidebarActive(v){
  document.querySelectorAll(".side-item").forEach(b=>b.classList.remove("active"));
  document.querySelector(`.side-item[data-view="${v}"]`)?.classList.add("active");
}
function renderFolderColumn(){
  folderList.innerHTML="";

  if(currentView==="contact"){
    folderList.innerHTML='<div class="column-empty-label">Contacto</div>';
    return;
  }

  if(currentView==="all"){
    folderList.innerHTML=`
      <div class="row selected context-folder">
        <div class="folder-icon">◉</div>
        <div class="row-copy">
          <div class="row-title">Todo</div>
          <div class="row-meta">${allItems().length} elementos</div>
        </div>
      </div>`;
    return;
  }

  // Dentro de una subcarpeta de Fotos:
  // la columna izquierda muestra TODAS las carpetas hermanas de Fotos,
  // dejando seleccionada la actual.
  if(currentSection==="fotos" && currentPhotoFolder){
    Object.entries(DATA.fotos.folders).forEach(([fk,f])=>{
      const row=document.createElement("div");
      row.className="row category-main"+(fk===currentPhotoFolder?" selected":"");
      row.innerHTML=`
        <div class="folder-icon">${f.icon}</div>
        <div class="row-copy">
          <div class="row-title">${f.label}</div>
          <div class="row-meta">${f.items.length} elementos</div>
        </div>
        <div class="chevron">›</div>`;
      row.onclick=()=>{
        currentPhotoFolder=fk;
        currentItem=null;
        renderFolderColumn();
        renderItems(searchInput.value);
        renderSectionEmpty();
        title.textContent=f.label;
        breadcrumb.textContent=`Macintosh HD › Portfolio › Fotos › ${f.label}`;
      };
      folderList.appendChild(row);
    });
    return;
  }

  // En vistas principales, mostrar todas las categorías principales.
  Object.entries(DATA).forEach(([k,s])=>{
    const row=document.createElement("div");
    const selected=currentSection===k;
    row.className="row category-main"+(selected?" selected":"");
    row.innerHTML=`
      <div class="folder-icon">${s.icon}</div>
      <div class="row-copy">
        <div class="row-title">${s.label}</div>
        <div class="row-meta">${sectionItems(k).length} elementos</div>
      </div>
      <div class="chevron">›</div>`;
    row.onclick=()=>selectSection(k);
    folderList.appendChild(row);
  });
}
function thumbFor(i){
  if(i.kind==="folder") return `<div class="thumb fallback-thumb">${i.folderIcon||"📁"}</div>`;

  if(i.kind==="channel" && i.thumbnails?.length){
    return `
      <div class="thumb thumb-collage">
        ${i.thumbnails.slice(0,4).map((t,n)=>`
          <img
            src="${t.local}"
            data-fallback="${t.remote}"
            alt="Portada ${n+1}"
            draggable="false"
            onerror="if(this.dataset.fallback){this.onerror=null;this.src=this.dataset.fallback;}"
          >
        `).join("")}
      </div>`;
  }

  let src=i.images?.[0]||i.poster||i.sets?.[0]?.images?.[0]||"";
  if(i.kind==="youtube") src=`https://img.youtube.com/vi/${i.youtubeId}/hqdefault.jpg`;
  if(src) return `<img class="thumb" src="${src}" alt="" draggable="false">`;
  return `<div class="thumb fallback-thumb">${i.kind==="audio"?"♫":i.kind==="channel"?"▶":"✦"}</div>`;
}
function visibleItems(){
  if(currentView==="all") return allItems();
  if(currentView==="contact") return [];
  if(currentSection==="fotos"){
    if(!currentPhotoFolder) return Object.entries(DATA.fotos.folders).map(([key,f])=>({id:`folder-${key}`,title:f.label,meta:`${f.items.length} elementos`,description:"",kind:"folder",folderKey:key,folderIcon:f.icon}));
    return DATA.fotos.folders[currentPhotoFolder].items;
  }
  return DATA[currentSection].items;
}
function renderItems(filter=""){
  itemList.innerHTML=""; const q=filter.trim().toLowerCase();
  if(currentView==="contact"){itemHeader.textContent="Contacto";itemList.innerHTML='<div class="contact-list-note"><span>↗</span><strong>Contacto</strong><small>Instagram y correo</small></div>';statusText.textContent="2 vías de contacto";return;}
  const items=visibleItems().filter(i=>[i.title,i.meta,i.description,i.sectionLabel,i.photoFolderLabel].filter(Boolean).join(" ").toLowerCase().includes(q));
  itemHeader.textContent=currentView==="all"?"Todo":currentSection==="fotos"?(currentPhotoFolder?"Contenido":"Carpetas"):DATA[currentSection].label;
  items.forEach(i=>{
    const r=document.createElement("div");r.className="row"+(currentItem?.id===i.id?" selected":"");
    r.innerHTML=`${thumbFor(i)}<div class="row-copy"><div class="row-title">${i.title}</div><div class="row-meta">${currentView==="all"&&i.sectionLabel?i.sectionLabel+" · ":""}${i.meta}</div></div><div class="chevron">›</div>`;
    r.onclick=()=>{
      if(i.kind==="folder"){
        currentPhotoFolder=i.folderKey;
        currentItem=null;
        renderFolderColumn();
        renderItems(searchInput.value);
        renderSectionEmpty();
        title.textContent=DATA.fotos.folders[currentPhotoFolder].label;
        breadcrumb.textContent=`Macintosh HD › Portfolio › Fotos › ${DATA.fotos.folders[currentPhotoFolder].label}`;
      } else selectItem(i);
    };itemList.appendChild(r);
  }); statusText.textContent=`${items.length} elementos`;
}
function selectSection(k){
  currentView="folder";currentSection=k;currentItem=null;
  if(k==="fotos") currentPhotoFolder=null;
  setSidebarActive(k);
  title.textContent=DATA[k].label; breadcrumb.textContent=`Macintosh HD › Portfolio › ${DATA[k].label}`;
  renderFolderColumn();renderItems(searchInput.value);renderSectionEmpty();
}
function showAll(){
  currentView="all";currentItem=null;setSidebarActive("todo");title.textContent="Todo";breadcrumb.textContent="Macintosh HD › Portfolio › Todo";
  renderFolderColumn();renderItems(searchInput.value);renderAllSummary();
}
function showContact(){
  currentView="contact";currentItem=null;setSidebarActive("contacto");title.textContent="Contacto";breadcrumb.textContent="Macintosh HD › Portfolio › Contacto";
  renderFolderColumn();renderItems();renderContact();
}
function renderSectionEmpty(){
  const s=DATA[currentSection], sub=currentSection==="fotos"?(currentPhotoFolder?DATA.fotos.folders[currentPhotoFolder].label:"Fotos"):s.label;
  preview.innerHTML=`<div class="preview-empty"><div class="empty-icon">${s.icon}</div><h2>${sub}</h2><p>${currentSection==="fotos"&&!currentPhotoFolder?"Selecciona una carpeta en la columna central.":"Selecciona una pieza para verla aquí."}</p></div>`;
}
function selectItem(i){
  currentItem=i;renderItems(searchInput.value);renderPreview(i);
  breadcrumb.textContent=currentView==="all"?`Macintosh HD › Portfolio › Todo › ${i.title}`:
    currentSection==="fotos"?`Macintosh HD › Portfolio › Fotos › ${DATA.fotos.folders[currentPhotoFolder].label} › ${i.title}`:
    `Macintosh HD › Portfolio › ${DATA[currentSection].label} › ${i.title}`;
}
function contributionHTML(i){
  if(!i.contributions?.length) return "";
  return `<section class="contrib"><div class="contrib-label">APORTACIÓN</div><div class="contrib-list">${i.contributions.map(x=>`<span>${x}</span>`).join("")}</div></section>`;
}
function details(i, sectionLabel){
  return `<h1 class="preview-title">${i.title}</h1><p class="preview-subtitle">${i.meta}</p><p class="preview-copy">${i.description}</p>${contributionHTML(i)}`;
}
function carousel(images){
  if(!images?.length) return `<div class="missing-media">Fotos pendientes de incorporar</div>`;

  return `
    <div class="insta-carousel-wrap">
      <div class="insta-carousel">
        ${images.map((src,n)=>`<div class="insta-slide"><img src="${src}" alt="Foto ${n+1}" draggable="false"></div>`).join("")}
      </div>

      <div class="carousel-dots">
        ${images.map((_,n)=>`<span class="dot ${n===0?"active":""}"></span>`).join("")}
      </div>

      <div class="folder-preview-strip">
        ${images.map((src,n)=>`
          <button class="folder-preview-thumb ${n===0?"active":""}" data-index="${n}" aria-label="Ver foto ${n+1}">
            <img src="${src}" alt="" draggable="false">
          </button>
        `).join("")}
      </div>
    </div>
  `;
}
function renderPreview(i){
  if(i.kind==="photos"){
    preview.innerHTML=carousel(i.images)+details(i);wireCarousel();return;
  }
  if(i.kind==="video"){
    preview.innerHTML=`<div class="${i.dimensions?"vertical-stage":"project-video-stage"}"><video controls playsinline preload="metadata" poster="${i.poster||""}"><source src="${i.video}" type="video/mp4"></video></div>${details(i)}`;return;
  }
  if(i.kind==="youtube"){
    const frames=[0,1,2,3];
    preview.innerHTML=`<a class="youtube-preview" href="${i.externalUrl}" target="_blank" rel="noopener"><img id="ytAnimated" src="https://img.youtube.com/vi/${i.youtubeId}/0.jpg" alt="${i.title}"><div class="youtube-play">▶</div><div class="youtube-open">Ver documental ↗</div></a>${details(i)}`;
    let n=0; const img=document.getElementById("ytAnimated");
    const timer=setInterval(()=>{if(!document.body.contains(img)){clearInterval(timer);return;}n=(n+1)%frames.length;img.src=`https://img.youtube.com/vi/${i.youtubeId}/${frames[n]}.jpg`;},1100);
    return;
  }
  if(i.kind==="channel"){
    preview.innerHTML=`
      <a class="channel-preview visual-channel" href="${i.externalUrl}" target="_blank" rel="noopener">
        <div class="yt-channel-collage">
          ${(i.thumbnails||[]).map((t,n)=>`
            <img
              src="${t.local}"
              data-fallback="${t.remote}"
              alt="Portada vídeo ${n+1} de @mixunets"
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
      ${details(i)}
    `;
    return;
  }
  if(i.kind==="audio"){
    preview.innerHTML=`<section class="audio-preview"><div class="audio-art"><div class="audio-art-inner"><span class="audio-note">♫</span><small>JOAN BRÚ / ORIGINAL SCORE</small></div></div><div class="audio-player-wrap"><audio controls preload="metadata"><source src="${i.audio}" type="audio/mpeg"></audio></div></section>${details(i)}`;return;
  }
}
function wireCarousel(){
  const track=preview.querySelector(".insta-carousel");
  if(!track) return;

  const dots=[...preview.querySelectorAll(".carousel-dots .dot")];
  const thumbs=[...preview.querySelectorAll(".folder-preview-thumb")];

  function setActive(idx){
    dots.forEach((d,n)=>d.classList.toggle("active",n===idx));
    thumbs.forEach((t,n)=>t.classList.toggle("active",n===idx));
    thumbs[idx]?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});
  }

  track.addEventListener("scroll",()=>requestAnimationFrame(()=>{
    const idx=Math.max(0,Math.min(Math.round(track.scrollLeft/track.clientWidth),dots.length-1));
    setActive(idx);
  }),{passive:true});

  thumbs.forEach((thumb,idx)=>{
    thumb.addEventListener("click",()=>{
      track.scrollTo({left:idx*track.clientWidth,behavior:"smooth"});
      setActive(idx);
    });
  });

  track.querySelectorAll("img").forEach(img=>{
    img.draggable=false;
    img.addEventListener("dragstart",e=>e.preventDefault());
  });
}

async function loadMixunetsThumbs(){
  const grid=document.getElementById("mixunetsGrid");
  if(!grid) return;
  const feed="https://www.youtube.com/feeds/videos.xml?user=mixunets";
  const proxies=[
    `https://api.allorigins.win/raw?url=${encodeURIComponent(feed)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(feed)}`
  ];
  for(const url of proxies){
    try{
      const r=await fetch(url); if(!r.ok) continue;
      const xml=await r.text();
      const ids=[...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)].map(m=>m[1]).slice(0,4);
      if(ids.length){
        grid.innerHTML=ids.map(id=>`<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="Vídeo de @mixunets" draggable="false">`).join("");
        return;
      }
    }catch(e){}
  }
  grid.innerHTML=`<div class="mixunets-loading">@mixunets · ver vídeos en YouTube ↗</div>`;
}

function renderAllSummary(){
  preview.innerHTML=`<section class="all-summary"><div class="summary-kicker">PORTFOLIO / ÍNDICE</div><h1>Todo.</h1><p class="summary-intro">Todo el material del portfolio en un único lugar. Selecciona cualquier pieza de la columna central y se abrirá aquí, sin salir de Todo.</p><div class="summary-grid">${Object.entries(DATA).map(([k,s])=>`<div class="summary-card static"><span class="summary-icon">${s.icon}</span><span><strong>${s.label}</strong><small>${sectionItems(k).length} elementos</small></span></div>`).join("")}</div></section>`;
}
function renderContact(){
  preview.innerHTML=`<section class="contact-screen"><div class="contact-kicker">JOAN BRÚ / AUDIOVISUAL</div><h1>Hablemos.</h1><p class="contact-intro">Foto, vídeo, postproducción, música o una idea que todavía no tiene forma.</p><div class="contact-links"><a class="contact-link" href="mailto:joanbru008@gmail.com"><span class="contact-type">Correo</span><strong>joanbru008@gmail.com</strong><span class="contact-arrow">↗</span></a><a class="contact-link" href="https://instagram.com/joan_brru" target="_blank" rel="noopener"><span class="contact-type">Instagram</span><strong>@joan_brru</strong><span class="contact-arrow">↗</span></a></div></section>`;
}
document.querySelectorAll(".side-item[data-view]").forEach(b=>b.onclick=()=>{const v=b.dataset.view;if(DATA[v])selectSection(v);else if(v==="todo")showAll();else if(v==="contacto")showContact();});
searchInput.addEventListener("input",e=>renderItems(e.target.value));
selectSection("proyectos");


document.addEventListener("dragstart",e=>{if(e.target.tagName==="IMG")e.preventDefault();});
