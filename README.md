# Portfolio audiovisual — Joan Brú

Portfolio audiovisual con interfaz inspirada en Finder.

## Estructura

- `content.js`: contenido editable del portfolio. Aquí están el perfil/contacto, títulos, descripciones, aportaciones, traducciones y el orden de las imágenes.
- `app.js`: lógica e interacción de la web, incluido el cambio de idioma.
- `styles.css`: estilos visuales principales.
- `language.css`: estilos del selector CA / ES / EN.
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
