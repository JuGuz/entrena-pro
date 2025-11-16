# Entrena Pro (PWA) — Archivos proporcionados

Estos archivos conforman una Progressive Web App simple llamada "Entrena Pro". Contenido incluido:
- index.html — Interfaz principal, genera tarjetas de ejercicios y llamadas a APIs para imágenes y texto (placeholders).
- sw.js — Service Worker con caching básico y fallback offline.
- manifest.json — Manifest para instalación PWA.
- offline.html — Página mostrada cuando no hay conexión.

Cómo usar
1. Coloca todos los archivos en la raíz de un servidor estático (ej. GitHub Pages, Netlify, Vercel o un servidor simple).
2. Opcional: si quieres probar localmente con service worker, sirve la carpeta con HTTPS o con `http-server -c-1` y usa `localhost` (algunos navegadores permiten SW en localhost).
3. Abre `index.html` en un navegador compatible con PWA. Cuando el navegador emita `beforeinstallprompt` verás el botón para instalar.
4. API keys: en el código hay dos variables `apiKey` y endpoints para Google Generative APIs. Debes añadir tu clave en `index.html` (variable `apiKey`) para que las llamadas a imagen/texto funcionen. Sin clave, las funciones mostrarán mensajes de fallo.

Notas de seguridad y coste
- Las llamadas a APIs generativas pueden generar coste en tu cuenta Google. Añade límites/controles de uso en producción.
- Nunca expongas claves sensibles en clientes finales para producción. Implementa un backend que firme/mande las peticiones si necesitas seguridad.

Personalización rápida
- Edita `planData` en `index.html` para cambiar ejercicios, descripciones o prompts de imagen.
- Cambia el ícono en `manifest.json` si quieres una imagen real en lugar de emoji inline.

Licencia
- Uso libre para pruebas y experimentos. Si lo subes a público, añade licencia según prefieras.
