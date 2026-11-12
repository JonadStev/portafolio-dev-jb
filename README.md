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
| Foto, imagen para redes, logos y CV | `public/images`, `public/og-image-v2.png`, `public/logos`, `public/cv` |

El CV en PDF se espera en `public/cv/Jonathan-Burgos-CV-es.pdf` y `public/cv/Jonathan-Burgos-CV-en.pdf`.

## Despliegue en Cloudflare

El sitio se publica como un Worker que sirve archivos estáticos, configurado en `wrangler.jsonc`. Cada `git push` a `main` vuelve a compilar y publicar.

- **Proyecto:** `portafolio-dev-jb` (el nombre debe coincidir con el `name` de `wrangler.jsonc`).
- **Build:** `npm run build`. **Deploy:** `npx wrangler deploy`. Node 24, tomado de `.node-version`.
- **Dominio:** `https://jonathanburgosdev.com`, agregado en el proyecto, en **Domains & Routes**.
- **Analítica:** **Web Analytics** de Cloudflare, sin cookies.

Si cambia el dominio, edita la dirección en `src/app/core/config.ts` (`SITE_URL`), `public/sitemap.xml` y `public/robots.txt`.

`public/_redirects` lleva la raíz `/` a `/es`, y `public/_headers` define cabeceras de seguridad y caché.