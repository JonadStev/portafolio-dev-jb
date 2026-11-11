import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../core/i18n';
import { ThemeService } from '../core/theme';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  host: { '[class.is-scrolled]': 'scrolled()' },
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly i18n = inject(I18n);
  protected readonly themeService = inject(ThemeService);
  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly open = signal(false);
  /** El menú queda fijo; al bajar se vuelve translúcido */
  protected readonly scrolled = signal(false);
  /** Id de la sección que se está viendo, para marcarla en el menú */
  protected readonly active = signal<string | null>(null);

  private ticking = false;

  constructor() {
    afterNextRender(() => this.measure());
  }

  protected toggleMenu(): void {
    this.open.update((v) => !v);
  }

  @HostListener('document:keydown.escape')
  protected closeMenu(): void {
    this.open.set(false);
  }

  // Un toque fuera del menú lo cierra
  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: Event): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected onScroll(): void {
    if (this.ticking) {
      return;
    }
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      this.measure();
    });
  }

  private measure(): void {
    const win = this.document.defaultView;
    if (!win) {
      return;
    }
    this.scrolled.set(win.scrollY > 24);

    const items = this.i18n.t().nav.items;
    const line = win.innerHeight * 0.4;
    let current: string | null = null;
    for (const item of items) {
      const el = this.document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= line) {
        current = item.id;
      }
    }
    // Al llegar al final de la página, la última sección queda activa
    const root = this.document.documentElement;
    if (win.scrollY + win.innerHeight >= root.scrollHeight - 2) {
      current = items[items.length - 1].id;
    }
    this.active.set(current);
  }
}
