# Sabores de Córdoba — Sitio Web Escolar

Sitio web escolar interactivo dedicado a la gastronomía tradicional de la provincia de Córdoba, Argentina. Desarrollado con HTML5 semántico, Tailwind CSS (v4 Play CDN) y JavaScript nativo en arquitectura mobile-first y bilingüe (Español / Inglés).

---

## 1. Cómo ver el proyecto en local

Tenés dos opciones sencillas para ejecutarlo en tu computadora:

### Opción A: Doble clic directo (sin servidor)
Hacé doble clic directamente sobre el archivo `index.html` en el explorador de archivos. Se abrirá en tu navegador predeterminado bajo el protocolo `file://`.
*Nota: Gracias al diseño con scripts clásicos (`defer`) y traducción en archivo JS (sin `fetch`), funciona completamente offline sin restricciones CORS.*

### Opción B: Con servidor local (Recomendado)
Para simular el entorno real de producción y probar el historial de navegación (`pushState` / botón atrás de Android), podés iniciar un servidor HTTP local:

1. Abrí una terminal en la carpeta del proyecto.
2. Si tenés Python instalado, ejecutá:
   ```bash
   python -m http.server 8000
   ```
   *(o `python3 -m http.server 8000` en Linux/Mac)*
3. Abrí en tu navegador:
   ```
   http://localhost:8000
   ```
4. Para simular un celular, abrí las Herramientas de Desarrollador (`F12`), activá el modo dispositivo móvil y probá en resoluciones verticales como 360×640 px o 390×844 px.

---

## 2. Cómo publicar en GitHub Pages

1. Subí la carpeta completa a un nuevo repositorio público en GitHub (por ejemplo `sabores-de-cordoba`).
2. En GitHub, andá a la pestaña **Settings** (Configuración) de tu repositorio.
3. En el menú lateral izquierdo, seleccioná **Pages**.
4. En **Build and deployment** > **Source**, seleccioná **Deploy from a branch**.
5. Elegí la rama `main` (o `master`) y la carpeta `/ (root)`. Hacé clic en **Save**.
6. En un par de minutos, GitHub generará tu sitio en:
   ```
   https://TU-USUARIO.github.io/NOMBRE-REPO/
   ```
*(El archivo `.nojekyll` incluido en la raíz asegura que GitHub Pages no ignore carpetas ni archivos estáticos).*

---

## 3. Cómo editar textos y créditos

El sitio utiliza una **única fuente de verdad** para los textos: [js/translations.js](file:///js/translations.js).

1. Abrí `js/translations.js` con cualquier editor de texto o código.
2. **Créditos del grupo**:
   Buscá dentro de `window.I18N.es.ui` y `window.I18N.en.ui`:
   - `footerGroup`: Reemplazá `'Integrante 1 · Integrante 2 · Integrante 3 · Integrante 4'` por los nombres reales de los 4 integrantes.
   - `footerCourse`: Reemplazá `'Materia — Curso — Año 2026'` por la materia, división y año correspondiente.
3. **Título del sitio**: Modificá `siteName`, `heroTitle` y `meta.title`.
4. **Recetas e ingredientes**: Podés ajustar ingredientes, pasos, tiempos o consejos editando directamente el objeto de cada receta (`alfajores`, `empanadas`, `chivito`) en ambos idiomas (`es` y `en`).

---

## 4. Cómo cambiar las fotos (Reemplazo de Placeholders)

El sitio incluye placeholders vectoriales SVG con degradados elegantes para que nunca se vea una imagen rota. Para usar fotos reales tomadas por el grupo:

1. Tomá o conseguí fotos en buena resolución horizontal (proporción 4:3 o 16:9).
2. Convertilas a formato **WebP** o **JPG** optimizado:
   - Medidas recomendadas: **1200×900 px**.
   - Peso recomendado: **≤ 200 KB** por imagen (podés usar herramientas gratuitas como Squoosh.app o TinyPNG).
3. Guardalas en la carpeta `assets/img/`, por ejemplo:
   - `assets/img/alfajores.webp`
   - `assets/img/empanadas.webp`
   - `assets/img/chivito.webp`
4. En `js/translations.js`, actualizá las rutas en `window.RECIPE_MEDIA`:
   ```javascript
   window.RECIPE_MEDIA = {
     alfajores: {
       img: 'assets/img/alfajores.webp',
       poster: 'assets/img/alfajores.webp',
       video: 'assets/videos/alfajores.mp4',
       videoAvailable: false
     },
     // ...
   };
   ```
5. **Imagen para compartir en redes (Open Graph)**: Guardá una imagen de 1200×630 px en `assets/img/og.jpg` para que WhatsApp, Twitter o Facebook muestren la vista previa al compartir el enlace.

---

## 5. Cómo activar los videos locales

Los videos actualmente tienen el estado **"Video disponible próximamente"** para evitar errores mientras el grupo realiza la grabación.

Para activar cada video:
1. Grabá el video de la preparación (en horizontal 16:9 o vertical 9:16).
2. Exportá el archivo con los siguientes parámetros recomendados para web:
   - Códec de video: **H.264**
   - Códec de audio: **AAC**
   - Resolución: **720p** (1280×720 px)
   - Peso: **≤ 25 MB** por video.
   - Flag de inicio rápido: Si usás `ffmpeg`, usá `-movflags +faststart`:
     ```bash
     ffmpeg -i video_original.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart assets/videos/alfajores.mp4
     ```
   > ⚠️ **Límites de GitHub**: GitHub bloquea subidas de archivos mayores a 100 MB y los sitios de GitHub Pages no deben superar 1 GB en total. Mantener los videos en torno a 15–25 MB asegura fluidez y carga rápida en celulares.
3. Copiá los archivos `.mp4` en la carpeta `assets/videos/`:
   - `assets/videos/alfajores.mp4`
   - `assets/videos/empanadas.mp4`
   - `assets/videos/chivito.mp4`
4. En `js/translations.js`, cambiá la propiedad `videoAvailable` a `true`:
   ```javascript
   window.RECIPE_MEDIA = {
     alfajores: {
       // ...
       videoAvailable: true
     },
     // ...
   };
   ```

---

## 6. Avisos y notas técnicas

> 📌 **Aviso culinario**: Las cantidades, proporciones y tiempos indicados en las recetas son de carácter orientativo para fines educativos; deben validarse y ajustarse según el gusto y experiencia al momento de cocinar. En la receta de chivito, **el manejo del fuego y las brasas debe estar siempre a cargo de un adulto**.

> 📌 **Nota sobre Tailwind CSS**: Se utiliza Tailwind v4 Play CDN (`@tailwindcss/browser@4`), una solución idónea y liviana para desarrollo y proyectos escolares sin necesidad de Node.js, `npm` ni herramientas de compilación.

---

## 7. Estructura de archivos del proyecto

```
sabores-de-cordoba/
├── index.html                       # Estructura semántica HTML5, dialog y fallback
├── .nojekyll                        # Desactiva Jekyll en GitHub Pages
├── README.md                        # Documentación y guía de uso
├── css/
│   └── styles.css                   # Dialog nativo, animaciones, videos y reduced-motion
├── js/
│   ├── translations.js              # Fuente única de verdad i18n (es/en) y RECIPE_MEDIA
│   └── script.js                    # Lógica interactiva, modal, i18n dinámico y eventos
└── assets/
    ├── favicon.svg                  # Ícono representativo de llama/fuego
    ├── img/
    │   ├── placeholder-alfajores.svg # Placeholder decorativo SVG
    │   ├── placeholder-empanadas.svg # Placeholder decorativo SVG
    │   └── placeholder-chivito.svg   # Placeholder decorativo SVG
    └── videos/
        └── .gitkeep                 # Carpeta para colocar los videos .mp4
```
