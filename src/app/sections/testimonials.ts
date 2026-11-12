import { Component, inject, signal } from '@angular/core';
import { I18n } from '../core/i18n';
import { Reveal } from '../shared/reveal';

@Component({
  selector: 'app-testimonials',
  imports: [Reveal],
  template: `
    <section class="section" aria-labelledby="testimonials-title">
      <div class="section__inner">
        <div class="section__intro" appReveal>
          <h2 id="testimonials-title">{{ i18n.t().testimonials.title }}</h2>
          <p>{{ i18n.t().testimonials.intro }}</p>
        </div>
        <div class="section__body" appReveal="120">
          <div
            class="quotes"
            [style.--count]="count()"
            role="group"
            [attr.aria-label]="i18n.t().testimonials.title"
            tabindex="-1"
          >
            @for (d of backDepths(); track d) {
              <div
                class="zone"
                aria-hidden="true"
                [style.top]="'calc(' + (count() - 1 - d) + ' * var(--peek))'"
                (pointerenter)="hover(d)"
                (pointerleave)="locked = false"
              ></div>
            }
            @for (q of i18n.t().testimonials.items; track q.text; let i = $index) {
              <article
                class="review"
                [class.is-front]="depth(i) === 0"
                [style.--depth]="depth(i)"
                [tabindex]="depth(i) === 0 ? -1 : 0"
                (click)="select(i)"
                (focus)="select(i)"
                (keydown.enter)="select(i)"
              >
                <header class="review__head">
                  <span class="avatar" aria-hidden="true">{{ initials(q.who) }}</span>
                  <div class="review__who">
                    <p class="review__name">{{ q.who }}</p>
                    <p class="review__role">{{ q.role }}</p>
                    <p class="review__meta">{{ q.date }} · {{ q.context }}</p>
                  </div>
                </header>

                <blockquote>{{ q.text }}</blockquote>

                <footer class="review__foot">
                  <span class="badge">
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
                      />
                    </svg>
                    {{ i18n.t().testimonials.source }}
                  </span>
                  @if (q.note) {
                    <span class="review__note">{{ q.note }}</span>
                  }
                  @if (q.url) {
                    <a
                      class="btn btn--secondary btn--small review__link"
                      [href]="q.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ i18n.t().testimonials.viewProfile }}
                      <span class="sr-only">{{ i18n.t().newTab }}</span></a
                    >
                  }
                </footer>
              </article>
            }
          </div>
          @if (count() > 1) {
            <div class="dots">
              @for (q of i18n.t().testimonials.items; track q.text; let i = $index) {
                <button
                  type="button"
                  class="dot"
                  [class.is-on]="active() === i"
                  [attr.aria-label]="q.who"
                  [attr.aria-current]="active() === i ? 'true' : null"
                  (click)="select(i)"
                ></button>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    /* Tarjetas apiladas: todas ocupan la misma celda; la activa va al frente y las
       demás asoman por arriba. Al pasar el mouse por una de atrás, pasa al frente. */
    .quotes {
      --peek: 4.25rem;
      display: grid;
      position: relative;
      max-width: 46rem;
      padding-top: calc((var(--count) - 1) * var(--peek));
    }

    /* Zonas de hover fijas sobre cada tarjeta que asoma: no se mueven con la animación,
       así el puntero no "cae" sobre otra tarjeta mientras estas se reacomodan. */
    .zone {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 20;
      height: var(--peek);
      cursor: pointer;
    }

    .dots {
      display: flex;
      gap: 0.5rem;
      margin-top: var(--space-2);
    }

    .dot {
      width: 0.625rem;
      height: 0.625rem;
      padding: 0;
      border: 1px solid var(--border-strong);
      border-radius: 50%;
      background: transparent;
      cursor: pointer;
      transition:
        background-color var(--dur-fast) var(--ease),
        transform var(--dur-fast) var(--ease);
    }

    .dot.is-on {
      border-color: transparent;
      background: var(--grad);
      transform: scale(1.3);
    }

    /* Reseña real: tarjeta con avatar, quién la escribe, el texto y su origen */
    .review {
      grid-area: 1 / 1;
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      padding: var(--space-3);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      background: var(--surface);
      position: relative;
      transform-origin: 50% 0;
      transform: translateY(calc(var(--depth) * var(--peek) * -1))
        scale(calc(1 - var(--depth) * 0.045));
      z-index: calc(var(--count) - var(--depth));
      cursor: pointer;
      transition:
        transform 0.5s var(--ease),
        filter var(--dur-base) var(--ease),
        border-color var(--dur-base) var(--ease);
    }

    .review:not(.is-front) {
      border-color: var(--border-strong);
      filter: brightness(calc(1 - var(--depth) * 0.18));
    }

    .review:not(.is-front):hover,
    .review:not(.is-front):focus-visible {
      border-color: var(--primary);
    }

    .review.is-front {
      cursor: default;
      box-shadow: 0 1.5rem 3rem -1.5rem rgb(0 0 0 / 55%);
    }

    .review__head {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .avatar {
      display: grid;
      flex: none;
      place-items: center;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      background: var(--grad);
      font-size: 1.125rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      color: var(--on-primary);
    }

    .review__who {
      display: flex;
      flex-direction: column;
      min-width: 0;
      gap: 0.125rem;
    }

    .review__name {
      font-size: 1.0625rem;
      font-weight: 500;
    }

    .review__role,
    .review__meta {
      font-size: var(--fs-small);
      line-height: 1.5;
      color: var(--text-2);
    }

    .review__meta {
      font-size: 0.8125rem;
    }

    blockquote {
      font-size: var(--fs-lead);
      font-weight: 300;
      line-height: 1.65;
    }

    .review__foot {
      margin-top: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-1) var(--space-2);
      padding-top: var(--space-2);
      border-top: 1px solid var(--border);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      color: var(--text-2);
    }

    .review__note {
      font-size: 0.8125rem;
      font-style: italic;
      color: var(--text-2);
    }

    .review__link {
      margin-left: auto;
    }

    @media (min-width: 48rem) {
      .quotes {
        --peek: 5rem;
      }

      .review {
        padding: var(--space-4);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .review {
        transition: none;
      }
    }
  `,
})
export class Testimonials {
  protected readonly i18n = inject(I18n);

  /** Tarjeta que está al frente */
  protected readonly active = signal(0);
  /** Mientras el puntero sigue dentro de la misma zona, no se vuelve a cambiar */
  protected locked = false;

  protected count(): number {
    return this.i18n.t().testimonials.items.length;
  }

  /** 0 = al frente; 1, 2… = lugar que ocupa detrás, en orden */
  protected depth(i: number): number {
    const n = this.count();
    return (i - this.active() + n) % n;
  }

  /** Lugares que asoman detrás de la tarjeta del frente: 1, 2… */
  protected backDepths(): number[] {
    return Array.from({ length: this.count() - 1 }, (_, k) => k + 1);
  }

  /** La zona fija `d` trae al frente la tarjeta que esté en ese lugar */
  protected hover(d: number): void {
    if (this.locked) {
      return;
    }
    this.locked = true;
    this.select(this.items().findIndex((_, i) => this.depth(i) === d));
  }

  private items() {
    return this.i18n.t().testimonials.items;
  }

  protected select(i: number): void {
    this.active.set(i);
  }

  /** Iniciales para el avatar: primera letra de las dos primeras palabras */
  protected initials(name: string): string {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('');
  }
}
