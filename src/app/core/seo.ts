import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Lang } from '../content/types';
import { LINKEDIN_URL, OG_IMAGE, SITE_URL } from './config';
import { I18n } from './i18n';

const OG_LOCALE: Record<Lang, string> = { es: 'es_EC', en: 'en_US' };
const GITHUB = 'https://github.com/JonadStev';

/**
 * Mantiene al día los metadatos de la página según el idioma: título, descripción,
 * Open Graph, Twitter, canonical, hreflang y datos estructurados Person. Como corre
 * durante el prerender, todo queda escrito en el HTML estático de /es y /en.
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(I18n);

  constructor() {
    effect(() => this.update(this.i18n.lang()));
  }

  private update(lang: Lang): void {
    const { seo } = this.i18n.t();
    const url = `${SITE_URL}/${lang}`;
    const image = `${SITE_URL}${OG_IMAGE}`;
    const other: Lang = lang === 'es' ? 'en' : 'es';

    this.title.setTitle(seo.title);
    const tags: Record<string, string> = {
      description: seo.description,
      'og:type': 'website',
      'og:site_name': 'Jonathan Burgos',
      'og:title': seo.title,
      'og:description': seo.description,
      'og:url': url,
      'og:image': image,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': seo.imageAlt,
      'og:locale': OG_LOCALE[lang],
      'og:locale:alternate': OG_LOCALE[other],
      'twitter:card': 'summary_large_image',
      'twitter:title': seo.title,
      'twitter:description': seo.description,
      'twitter:image': image,
      'twitter:image:alt': seo.imageAlt,
    };
    for (const [key, content] of Object.entries(tags)) {
      const attr = key.startsWith('og:') ? 'property' : 'name';
      this.meta.updateTag({ [attr]: key, content }, `${attr}="${key}"`);
    }

    this.setLink('canonical', url);
    this.setAlternates();
    this.setStructuredData(lang, url);
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]:not([hreflang])`;
    let link = this.document.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', rel);
      if (hreflang) {
        link.setAttribute('hreflang', hreflang);
      }
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setAlternates(): void {
    this.setLink('alternate', `${SITE_URL}/es`, 'es');
    this.setLink('alternate', `${SITE_URL}/en`, 'en');
    this.setLink('alternate', `${SITE_URL}/es`, 'x-default');
  }

  private setStructuredData(lang: Lang, url: string): void {
    const { seo } = this.i18n.t();
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Jonathan Burgos',
      url,
      image: `${SITE_URL}/images/jonathan.webp`,
      jobTitle: seo.jobTitle,
      description: seo.description,
      inLanguage: lang,
      worksFor: { '@type': 'Organization', name: 'Banco del Litoral' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad de Guayaquil' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Guayaquil',
        addressCountry: 'EC',
      },
      knowsAbout: [
        'Java',
        'Spring Boot',
        'Angular',
        'Kafka',
        'gRPC',
        'Keycloak',
        'Oracle Database',
        'PL/SQL',
        'PostgreSQL',
        'Docker',
        'Software architecture',
      ],
      sameAs: [LINKEDIN_URL, GITHUB],
    };

    let script = this.document.head.querySelector<HTMLScriptElement>('script#ld-person');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'ld-person';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
