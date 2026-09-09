
const DATA = {
  reels: {
    label: "Reels",
    type: "video",
    icon: "🎞️",
    items: [
      { id:"reel-01", title:"Reel 01", meta:"00:28 · Vertical", description:"Pieza corta de vídeo. Sustituye el placeholder por tu archivo real en assets/videos.", tags:["reel","video","vertical"] },
      { id:"reel-02", title:"Reel 02", meta:"00:41 · Vertical", description:"Otro reel directo, sin abrir una carpeta intermedia.", tags:["reel","social","motion"] },
      { id:"reel-03", title:"Reel 03", meta:"00:19 · Vertical", description:"Reel para enseñar cámara, montaje o una pieza terminada.", tags:["reel","edit","camera"] }
    ]
  },
  producto: {
    label: "Foto producto",
    type: "carousel",
    icon: "📷",
    items: [
      { id:"macbook-m5", title:"MacBook M5", meta:"Carrusel · 4 fotos", description:"Ejemplo de sesión de producto. Cada proyecto se abre directamente como un carrusel.", tags:["producto","studio","tech"],
        images:[
          "https://picsum.photos/seed/macbook1/1200/700",
          "https://picsum.photos/seed/macbook2/1200/700",
          "https://picsum.photos/seed/macbook3/1200/700",
          "https://picsum.photos/seed/macbook4/1200/700"
        ]
      },
      { id:"watch", title:"Watch", meta:"Carrusel · 5 fotos", description:"Proyecto de producto preparado para sustituir las imágenes de demo.", tags:["producto","detail","light"],
        images:[
          "https://picsum.photos/seed/watch1/1200/700",
          "https://picsum.photos/seed/watch2/1200/700",
          "https://picsum.photos/seed/watch3/1200/700",
          "https://picsum.photos/seed/watch4/1200/700"
        ]
      }
    ]
  },
  personales: {
    label: "Proyectos personales",
    type: "project",
    icon: "✦",
    items: [
      { id:"personal-01", title:"Proyecto personal 01", meta:"Foto + vídeo", description:"Sección preparada para proyectos más libres y narrativos. Puede mezclar fotografía, vídeo, texto y making-of.", tags:["personal","experimental","story"] },
      { id:"personal-02", title:"Proyecto personal 02", meta:"Proyecto abierto", description:"Puedes usar esta zona para piezas que no encajen estrictamente en Reel o Foto producto.", tags:["personal","visual","journal"] }
    ]
  }
};

let currentFolder = "reels";
let currentItem = null;
let historyStack = [];
let historyIndex = -1;

const folderList = document.getElementById("folderList");
const itemList = document.getElementById("itemList");
const preview = document.getElementById("previewPanel");
const itemHeader = document.getElementById("itemHeader");
const title = document.getElementById("windowTitle");
const breadcrumb = document.getElementById("breadcrumb");
const statusText = document.getElementById("statusText");
const searchInput = document.getElementById("searchInput");

function renderFolders(){
  folderList.innerHTML = "";
  Object.entries(DATA).forEach(([key,folder])=>{
    const row = document.createElement("div");
    row.className = "row" + (key===currentFolder ? " selected":"");
    row.innerHTML = `
      <div class="folder-icon">${folder.icon}</div>
      <div class="row-copy">
        <div class="row-title">${folder.label}</div>
        <div class="row-meta">${folder.items.length} elementos</div>
      </div>
      <div class="chevron">›</div>
    `;
    row.onclick = ()=>selectFolder(key,true);
    folderList.appendChild(row);
  });
}

function renderItems(filter=""){
  const folder = DATA[currentFolder];
  itemHeader.textContent = folder.label;
  itemList.innerHTML = "";
  const q = filter.trim().toLowerCase();
  const items = folder.items.filter(x => x.title.toLowerCase().includes(q) || x.meta.toLowerCase().includes(q));
  items.forEach(item=>{
    const row = document.createElement("div");
    row.className = "row" + (currentItem?.id===item.id ? " selected":"");
    const thumb = item.images?.[0] || "";
    row.innerHTML = `
      ${thumb ? `<img class="thumb" src="${thumb}" alt="">` : `<div class="thumb" style="display:grid;place-items:center;font-size:23px">${folder.icon}</div>`}
      <div class="row-copy">
        <div class="row-title">${item.title}</div>
        <div class="row-meta">${item.meta}</div>
      </div>
      <div class="chevron">›</div>
    `;
    row.onclick = ()=>selectItem(item,true);
    itemList.appendChild(row);
  });
  statusText.textContent = `${items.length} elementos`;
}

function selectFolder(key,pushHistory=false){
  currentFolder = key;
  currentItem = null;
  title.textContent = DATA[key].label;
  breadcrumb.textContent = `Macintosh HD › Portfolio › ${DATA[key].label}`;
  renderFolders();
  renderItems(searchInput.value);
  renderEmpty();
  if(pushHistory) addHistory({folder:key,item:null});
}

function selectItem(item,pushHistory=false){
  currentItem = item;
  renderItems(searchInput.value);
  renderPreview(item);
  breadcrumb.textContent = `Macintosh HD › Portfolio › ${DATA[currentFolder].label} › ${item.title}`;
  if(pushHistory) addHistory({folder:currentFolder,item:item.id});
}

function renderEmpty(){
  preview.innerHTML = `
    <div class="preview-empty">
      <div class="empty-icon">${DATA[currentFolder].icon}</div>
      <h2>${DATA[currentFolder].label}</h2>
      <p>Selecciona una pieza de la columna central para verla aquí.</p>
    </div>`;
}

function renderPreview(item){
  const type = DATA[currentFolder].type;
  if(type === "carousel"){
    const imgs = item.images || [];
    preview.innerHTML = `
      <div class="gallery-main"><img id="galleryMain" src="${imgs[0]}" alt="${item.title}"></div>
      <div class="gallery-thumbs">
        ${imgs.map((src,i)=>`<button class="${i===0?'active':''}" data-src="${src}"><img src="${src}" alt=""></button>`).join("")}
      </div>
      ${details(item)}
    `;
    const main = document.getElementById("galleryMain");
    preview.querySelectorAll(".gallery-thumbs button").forEach(btn=>{
      btn.onclick = ()=>{
        main.src = btn.dataset.src;
        preview.querySelectorAll(".gallery-thumbs button").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
      };
    });
  } else if(type === "video"){
    preview.innerHTML = `
      <div class="preview-media">
        <div class="video-placeholder">
          <div class="play">▶</div>
        </div>
      </div>
      ${details(item)}
      <p class="preview-copy"><strong>Para usar vídeo real:</strong> coloca el archivo en <code>assets/videos/</code> y sustituye este bloque por una etiqueta &lt;video&gt;.</p>
    `;
  } else {
    preview.innerHTML = `
      <div class="preview-media">
        <div class="video-placeholder">
          <div style="font-size:60px">✦</div>
        </div>
      </div>
      ${details(item)}
    `;
  }
}

function details(item){
  return `
    <h1 class="preview-title">${item.title}</h1>
    <p class="preview-subtitle">${item.meta}</p>
    <p class="preview-copy">${item.description}</p>
    <div class="tag-row">${item.tags.map(t=>`<span class="tag">#${t}</span>`).join("")}</div>
    <div class="meta-grid">
      <div class="meta-cell"><small>Tipo</small>${DATA[currentFolder].label}</div>
      <div class="meta-cell"><small>Estado</small>Portfolio</div>
      <div class="meta-cell"><small>Vista</small>Finder</div>
    </div>
  `;
}

function addHistory(state){
  historyStack = historyStack.slice(0, historyIndex+1);
  historyStack.push(state);
  historyIndex = historyStack.length-1;
}

function restore(state){
  currentFolder = state.folder;
  currentItem = null;
  renderFolders();
  renderItems();
  title.textContent = DATA[currentFolder].label;
  if(state.item){
    const item = DATA[currentFolder].items.find(x=>x.id===state.item);
    if(item) selectItem(item,false);
  } else {
    renderEmpty();
  }
}

document.getElementById("backBtn").onclick = ()=>{
  if(historyIndex>0){ historyIndex--; restore(historyStack[historyIndex]); }
};
document.getElementById("forwardBtn").onclick = ()=>{
  if(historyIndex<historyStack.length-1){ historyIndex++; restore(historyStack[historyIndex]); }
};
searchInput.addEventListener("input",e=>renderItems(e.target.value));

document.querySelectorAll(".side-item[data-view]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".side-item").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const view = btn.dataset.view;
    if(DATA[view]) selectFolder(view,true);
    else if(view==="home") selectFolder("reels",true);
  });
});

selectFolder("reels");
addHistory({folder:"reels",item:null});
