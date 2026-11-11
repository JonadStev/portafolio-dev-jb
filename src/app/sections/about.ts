import { Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { Reveal } from '../shared/reveal';
import { Orb } from '../shared/orb';

@Component({
  selector: 'app-about',
  imports: [Orb, Reveal],
  template: `
    <section class="section" id="sobre" aria-labelledby="about-title">
      <div class="section__inner">
        <div class="section__intro" appReveal>
          <h2 id="about-title">{{ i18n.t().about.title }}</h2>
          <p>{{ i18n.t().about.intro }}</p>
          <app-orb [size]="13" top="9rem" left="1rem" [dur]="24">
            <span class="tk-c">$</span> whoami<br />
            <span class="tk-s">jonathan</span><br />
            <span class="tk-c">$</span> java -version<br />
            <span class="tk-s">openjdk 21</span>
          </app-orb>
          <app-orb
            logo="/logos/webp/linux.webp"
            [size]="4.75"
            top="20rem"
            left="12rem"
            [dur]="18"
            [delay]="4"
          />
        </div>
        <div class="section__body about" appReveal="120">
          <figure class="about__photo">
            <img
              [src]="i18n.t().about.photo"
              [alt]="i18n.t().about.photoAlt"
              width="720"
              height="958"
              loading="lazy"
            />
          </figure>
          <div class="about__text">
            <p class="about__lead">{{ i18n.t().about.lead }}</p>
            @for (paragraph of i18n.t().about.body; track paragraph) {
              <p class="about__body">{{ paragraph }}</p>
            }
            <dl class="about__facts">
              @for (fact of i18n.t().about.facts; track fact.title) {
                <div>
                  <dt>{{ fact.title }}</dt>
                  <dd>{{ fact.text }}</dd>
                </div>
              }
            </dl>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .about {
      display: grid;
      gap: var(--space-4);
    }

    /* Retrato con borde de degradado y un velo azul que lo funde con el fondo */
    .about__photo {
      position: relative;
      width: 100%;
      max-width: 18.75rem;
      aspect-ratio: 300 / 380;
      margin: 0;
      overflow: hidden;
      border: 1px solid transparent;
      border-radius: var(--radius-card);
      background:
        linear-gradient(var(--surface), var(--surface)) padding-box,
        var(--grad) border-box;
    }

    .about__photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 20%;
      filter: saturate(0.92);
    }

    .about__photo::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        transparent 55%,
        color-mix(in srgb, var(--orb-2) 55%, transparent) 100%
      );
      pointer-events: none;
    }

    .about__text {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .about__lead {
      font-size: var(--fs-lead);
      font-weight: 300;
      line-height: 1.6;
    }

    .about__body {
      color: var(--text-2);
      line-height: 1.7;
    }

    .about__facts {
      display: grid;
      gap: var(--space-3);
      margin: var(--space-2) 0 0;
      padding-top: var(--space-3);
      border-top: 1px solid var(--border);
    }

    dt {
      margin-bottom: 0.375rem;
      font-weight: 500;
    }

    dd {
      margin: 0;
      font-size: var(--fs-small);
      line-height: 1.6;
      color: var(--text-2);
    }

    @media (min-width: 48rem) {
      .about {
        grid-template-columns: 18.75rem minmax(0, 1fr);
        gap: var(--space-5);
      }

      .about__facts {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  `,
})
export class About {
  protected readonly i18n = inject(I18n);
}
