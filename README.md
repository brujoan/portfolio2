# Portfolio audiovisual — Joan Brú

Portfolio audiovisual con interfaz inspirada en Finder.

## Estructura

- `content.js`: contenido editable del portfolio (títulos, descripciones, aportaciones y orden de imágenes).
- `app.js`: lógica e interacción de la web.
- `styles.css`: estilos visuales.
- `index.html`: estructura principal y carga de scripts.
- `assets/`: imágenes, vídeo y audio.

Para cambiar textos o el orden de una galería, edita `content.js`. No hace falta tocar `app.js`.

## Contenido

- Proyectos
  - Spot iGestió
  - Spot Pilar Marín
  - GINPASF
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
