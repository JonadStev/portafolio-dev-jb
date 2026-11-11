import { Component, afterNextRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18n } from './core/i18n';
import { MotionService } from './core/motion';
import { Seo } from './core/seo';
import { BackToTop } from './layout/back-to-top';
import { Footer } from './layout/footer';
import { Header } from './layout/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, BackToTop],
  template: `
    <a class="skip-link" href="#main">{{ i18n.t().skipLink }}</a>
    <app-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-back-to-top />
  `,
})
export class App {
  protected readonly i18n = inject(I18n);
  private readonly motion = inject(MotionService);
  // Al inyectarlo se activa la actualización de metadatos por idioma
  private readonly seo = inject(Seo);

  constructor() {
    afterNextRender(() => this.motion.start());
  }
}
