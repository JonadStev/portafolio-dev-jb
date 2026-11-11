import { DOCUMENT } from '@angular/common';
import { Component, HostListener, afterNextRender, inject, signal } from '@angular/core';
import { I18n } from '../core/i18n';

/** Flecha flotante para volver al inicio. Aparece cuando ya se bajó un buen tramo. */
@Component({
  selector: 'app-back-to-top',
  template: `
    <button
      type="button"
      class="to-top"
      [class.is-visible]="visible()"
      [attr.aria-label]="i18n.t().footer.top"
      [attr.tabindex]="visible() ? 0 : -1"
      [attr.aria-hidden]="visible() ? null : 'true'"
      (click)="toTop()"
    >
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />
      </svg>
    </button>
  `,
  styles: `
    .to-top {
      position: fixed;
      right: clamp(1rem, 3vw, 2rem);
      bottom: clamp(1rem, 3vw, 2rem);
      z-index: 40;
      display: grid;
      place-items: center;
      width: 3rem;
      height: 3rem;
      border: 1.5px solid transparent;
      border-radius: 50%;
      background:
        linear-gradient(
            color-mix(in srgb, var(--surface) 82%, transparent),
            color-mix(in srgb, var(--surface) 82%, transparent)
          )
          padding-box,
        var(--grad) border-box;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      color: var(--text);
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(0.75rem);
      transition:
        opacity var(--dur-base) var(--ease),
        transform var(--dur-base) var(--ease),
        visibility var(--dur-base),
        box-shadow var(--dur-fast) var(--ease);
    }

    .to-top.is-visible {
      opacity: 1;
      visibility: visible;
      transform: none;
    }

    .to-top:hover {
      transform: translateY(-3px);
      box-shadow: 0 0.5rem 1.5rem color-mix(in srgb, var(--primary) 30%, transparent);
    }
  `,
})
export class BackToTop {
  protected readonly i18n = inject(I18n);
  protected readonly visible = signal(false);
  private readonly document = inject(DOCUMENT);

  constructor() {
    afterNextRender(() => this.update());
  }

  @HostListener('window:scroll')
  protected update(): void {
    const win = this.document.defaultView;
    if (win) {
      this.visible.set(win.scrollY > 700);
    }
  }

  protected toTop(): void {
    const win = this.document.defaultView;
    if (!win) {
      return;
    }
    const reduce = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    win.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
}
