import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { EN } from '../content/en';
import { ES } from '../content/es';
import { Content, Lang } from '../content/types';

const CONTENT: Record<Lang, Content> = { es: ES, en: EN };

@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  readonly lang = signal<Lang>('es');
  readonly other = computed<Lang>(() => (this.lang() === 'es' ? 'en' : 'es'));
  readonly t = computed(() => CONTENT[this.lang()]);

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let route = this.router.routerState.snapshot.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      const lang = route.data['lang'] as Lang | undefined;
      if (lang) {
        this.lang.set(lang);
      }
    });

    effect(() => {
      this.document.documentElement.lang = this.lang();
    });
  }
}
