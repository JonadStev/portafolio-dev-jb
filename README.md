# Portafolio de Jonathan Burgos

Sitio estático hecho con Angular, SCSS con design tokens y GSAP. Se genera con prerender en español (`/es`) e inglés (`/en`).

## Comandos

```bash
npm start          # servidor de desarrollo en http://localhost:4200
npm run build      # build de producción en dist/portafolio-dev-jb/browser
npm run lint       # ESLint
npm run format     # Prettier
```

## Dónde se cambia cada cosa

| Qué | Dónde |
|---|---|
| Textos en español e inglés | `src/app/content/es.ts` y `src/app/content/en.ts` |
| Ejemplos de código de los fondos | `src/app/content/snippets.ts` |
| Colores, tipografía y espaciado | `src/styles/_tokens.scss` |
| ID del formulario (Formspree) y dominio | `src/app/core/config.ts` |
| Foto, imagen para redes, logos y CV | `public/images`, `public/og-image.png`, `public/logos`, `public/cv` |

El CV en PDF se espera en `public/cv/Jonathan-Burgos-CV-es.pdf` y `public/cv/Jonathan-Burgos-CV-en.pdf`.

## Despliegue en Cloudflare Pages

1. Sube el repositorio a GitHub y, en Cloudflare, crea un proyecto de Pages conectado a él.
2. Configuración de build:
   - Comando: `npm run build`
   - Directorio de salida: `dist/portafolio-dev-jb/browser`
   - Versión de Node: la toma de `.node-version` (24).
3. Cloudflare te da una dirección `https://<proyecto>.pages.dev`. Úsala como dirección provisional.
4. En el proyecto, activa **Web Analytics** (no usa cookies).
5. Cuando tengas dominio propio, agrégalo en **Custom domains** y cambia la dirección en:
   - `src/app/core/config.ts` (`SITE_URL`)
   - `public/sitemap.xml`
   - `public/robots.txt`

`public/_redirects` lleva la raíz `/` a `/es`, y `public/_headers` define cabeceras de seguridad y caché.
