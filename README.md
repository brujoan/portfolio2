# Finder Portfolio

Primer prototipo de portfolio inspirado en Finder de macOS.

## Estructura actual

- **Reels** → los vídeos aparecen directamente en la columna central.
- **Foto producto** → cada proyecto se abre como carrusel en el panel de preview.
- **Proyectos personales** → sección preparada para proyectos mixtos / experimentales.

## Abrir

Simplemente abre `index.html` en el navegador.

Para desarrollo local puedes usar, por ejemplo:

```bash
python3 -m http.server 8000
```

y abrir `http://localhost:8000`.

## Añadir tus vídeos

1. Copia los `.mp4` o `.webm` a `assets/videos/`.
2. Edita `app.js`.
3. En el bloque `reels`, añade la ruta del vídeo y sustituye el placeholder del preview por un `<video>`.

## Añadir fotos de producto

1. Copia las imágenes a `assets/images/`.
2. En `app.js`, dentro de `producto`, cambia el array `images` por rutas como:

```js
images: [
  "assets/images/macbook-01.jpg",
  "assets/images/macbook-02.jpg",
  "assets/images/macbook-03.jpg"
]
```

## Idea visual

La web imita la lógica de Finder:
- sidebar lateral
- navegación por columnas
- preview grande a la derecha
- breadcrumb inferior
- búsqueda
- historial atrás/adelante

La intención es que parezca una interfaz real y no una plantilla de portfolio convencional.
