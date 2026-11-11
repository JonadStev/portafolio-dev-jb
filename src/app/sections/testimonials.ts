import { Component, inject } from '@angular/core';
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
        <div class="section__body quotes" appReveal="120">
          @for (q of i18n.t().testimonials.items; track q.text) {
            <article class="review">
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
      </div>
    </section>
  `,
  styles: `
    .quotes {
      display: grid;
      gap: var(--space-4);
    }

    /* Reseña real: tarjeta con avatar, quién la escribe, el texto y su origen */
    .review {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      max-width: 46rem;
      padding: var(--space-3);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      background: var(--surface);
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
      .review {
        padding: var(--space-4);
      }
    }
  `,
})
export class Testimonials {
  protected readonly i18n = inject(I18n);

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
