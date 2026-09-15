# Portfolio audiovisual — Joan Brú

Portfolio audiovisual con interfaz inspirada en Finder.

## Estructura

- `content.js`: contenido editable del portfolio. Aquí están el perfil/contacto, títulos, descripciones, aportaciones, traducciones y el orden de las imágenes.
- `app.js`: lógica e interacción principal de la web, incluido el cambio de idioma.
- `styles.css`: estilos visuales principales de escritorio.
- `language.css`: estilos del selector CA / ES / EN.
- `desktop.css`: controles específicos de escritorio para los carruseles.
- `desktop.js`: navegación por teclado y botones anterior/siguiente de las galerías en escritorio.
- `mobile.css`: layout responsive específico para móvil.
- `mobile.js`: navegación móvil entre listado y vista de cada pieza.
- `index.html`: estructura principal y carga de scripts.
- `assets/`: imágenes, vídeo y audio.

Para cambiar textos, datos de contacto, traducciones o el orden de una galería, edita `content.js`. No hace falta tocar `app.js`.

## Idiomas

La web está disponible en:

- Català (`CA`) — idioma predeterminado.
- Español (`ES`).
- English (`EN`).

El selector está en la barra superior. Cuando el visitante cambia de idioma, la preferencia se guarda en el navegador para próximas visitas.

En `content.js`, los textos traducibles usan esta forma:

```js
L("Text en català", "Texto en español", "Text in English")
```

## Navegación de escritorio

En pantallas de más de 820 px:

- todas las galerías de fotos muestran botones anterior/siguiente sobre el carrusel;
- `←` / `→` cambian de foto cuando hay una galería abierta;
- `↑` / `↓` recorren los elementos de la columna activa;
- cuando no hay una galería abierta, `←` pasa a la columna de carpetas y `→` a la columna de contenido;
- `Enter` abre el elemento seleccionado.

## Versión móvil

Por debajo de 820 px la misma web cambia automáticamente a una interfaz adaptada a móvil:

- Contacto funciona como portada y aparece primero en la navegación;
- categorías en una barra horizontal táctil;
- listado de piezas a ancho completo;
- cada proyecto se abre en una vista propia con botón de volver;
- carruseles optimizados para swipe;
- vídeo vertical, YouTube, audio y contacto adaptados a pantalla pequeña;
- soporte para áreas seguras de iPhone mediante `viewport-fit=cover`.

La versión de escritorio permanece independiente de estos estilos mediante `desktop.css` / `desktop.js`, y la versión móvil mediante `mobile.css` / `mobile.js`.

## Contenido

- Proyectos
  - Spot iGestió
  - Spot Pilar Marín
  - Documental GINPASF
  - @mixunets
- Vertical
- Fotos
  - Foto producto
  - Eventos
    - DJ Set · Night of Wolves
    - Rugby Fem. BUC vs Barça
  - Analógico
    - Olympus Mju II
    - Contax G2
- Retransmisiones deportivas
  - Operación de cámara · Deportes
- Producción musical
- Todo
- Contacto

## Ejecutar en local

Desde Terminal:

```bash
cd ruta/al/proyecto
python3 -m http.server 8000
```

Después abre `http://localhost:8000`.

## GitHub Pages

Es un proyecto HTML/CSS/JS estático, así que puedes publicarlo directamente con GitHub Pages.

## @mixunets

La web busca primero estas cuatro miniaturas locales:

- `assets/images/mixunets/01.jpg`
- `assets/images/mixunets/02.jpg`
- `assets/images/mixunets/03.jpg`
- `assets/images/mixunets/04.jpg`

Si no están, usa las miniaturas oficiales de YouTube como fallback.
