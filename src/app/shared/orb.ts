import { Component, input } from '@angular/core';

/**
 * Círculo decorativo que flota despacio. Lleva dentro un fragmento de código
 * (contenido proyectado) o un logo. Solo se muestra en escritorio y se oculta
 * a lectores de pantalla: el contenido real del sitio vive en las secciones.
 */
@Component({
  selector: 'app-orb',
  host: {
    'aria-hidden': 'true',
    '[style.top]': 'top()',
    '[style.left]': 'left()',
    '[style.right]': 'right()',
    '[style.bottom]': 'bottom()',
    '[style.width.rem]': 'size()',
    '[style.--dur]': 'dur() + "s"',
    '[style.--delay]': '"-" + delay() + "s"',
    '[style.--dx]': 'dx()',
    '[style.--dy]': 'dy()',
  },
  template: `
    <div class="orb" [class.orb--logo]="logo() !== ''">
      @if (logo() !== '') {
        <img [src]="logo()" alt="" width="40" height="40" loading="lazy" />
      }
      <span class="orb__code"><ng-content /></span>
    </div>
  `,
  styles: `
    :host {
      position: absolute;
      display: none;
      pointer-events: none;
    }

    @media (min-width: 75rem) {
      :host {
        display: block;
      }
    }

    .orb {
      position: relative;
      display: grid;
      place-items: center;
      width: 100%;
      aspect-ratio: 1;
      border: 1px solid var(--orb-code-border);
      border-radius: 50%;
      background:
        radial-gradient(circle at 28% 22%, var(--orb-sheen), transparent 62%), var(--orb-code-bg);
      animation: orb-float var(--dur, 22s) ease-in-out var(--delay, 0s) infinite alternate;
    }

    /* Cuadrícula muy suave que se desvanece hacia el borde del círculo */
    .orb::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background:
        linear-gradient(var(--orb-grid) 1px, transparent 1px) 0 0 / 1.25rem 1.25rem,
        linear-gradient(90deg, var(--orb-grid) 1px, transparent 1px) 0 0 / 1.25rem 1.25rem;
      mask-image: radial-gradient(circle, #000 35%, transparent 80%);
    }

    .orb--logo::before {
      display: none;
    }

    .orb__code {
      position: relative;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      line-height: 1.6;
      white-space: nowrap;
      color: var(--text);
    }

    .orb__code:empty {
      display: none;
    }

    .orb--logo {
      border: 1.5px solid transparent;
      background:
        linear-gradient(var(--surface), var(--surface)) padding-box,
        var(--grad) border-box;
    }

    .orb--logo img {
      width: 52%;
      height: 52%;
      object-fit: contain;
    }

    @keyframes orb-float {
      from {
        transform: translate(0, 0);
      }
      to {
        transform: translate(var(--dx, 0.75rem), var(--dy, 1.25rem));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .orb {
        animation: none;
      }
    }
  `,
})
export class Orb {
  readonly size = input(12);
  readonly top = input<string | null>(null);
  readonly left = input<string | null>(null);
  readonly right = input<string | null>(null);
  readonly bottom = input<string | null>(null);
  readonly logo = input('');
  readonly dur = input(22);
  readonly delay = input(0);
  readonly dx = input('0.75rem');
  readonly dy = input('1.25rem');
}
