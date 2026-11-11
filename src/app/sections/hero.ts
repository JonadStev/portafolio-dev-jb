import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LINKEDIN_URL } from '../core/config';
import { I18n } from '../core/i18n';
import { Orb } from '../shared/orb';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Orb],
  template: `
    <section class="hero" id="top" [attr.aria-label]="i18n.t().hero.name">
      <div class="orbs intro-fade" aria-hidden="true">
        <span class="orb orb--1"></span>
        <span class="orb orb--2"></span>
        <app-orb
          logo="/logos/svg/java.svg"
          [size]="5.5"
          left="46%"
          bottom="3.5rem"
          [dur]="20"
          dx="1rem"
          dy="-1.5rem"
        />
        <app-orb
          logo="/logos/svg/angular.svg"
          [size]="4.5"
          left="49%"
          top="8.5rem"
          [dur]="26"
          [delay]="5"
        />
        <app-orb
          logo="/logos/svg/spring-boot.svg"
          [size]="5"
          right="12%"
          bottom="4rem"
          [dur]="24"
          [delay]="9"
          dx="-1rem"
        />
        <span class="orb orb--4"></span>
      </div>

      <div class="hero__inner">
        <div class="hero__text">
          <div class="hero__name intro" style="--i: 0">
            <h1><span>Jonathan</span>&ngsp;<span>Burgos</span></h1>
          </div>
          <p class="hero__role intro" style="--i: 1">{{ i18n.t().hero.role }}</p>
          <p class="hero__summary intro" style="--i: 2">{{ i18n.t().hero.summary }}</p>
          <div class="hero__actions intro" style="--i: 3">
            <a class="btn btn--primary" [routerLink]="['/', i18n.lang()]" fragment="proyectos">{{
              i18n.t().hero.projects
            }}</a>
            <a class="btn btn--secondary" [href]="i18n.t().cvUrl" download>{{
              i18n.t().hero.cv
            }}</a>
            <a
              class="btn btn--secondary btn--icon"
              [href]="linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
                />
              </svg>
              LinkedIn
              <span class="sr-only">{{ i18n.t().newTab }}</span>
            </a>
          </div>
          <ul class="hero__tags intro" style="--i: 4">
            @for (tag of i18n.t().hero.tags; track tag) {
              <li class="tag">{{ tag }}</li>
            }
          </ul>
        </div>

        <div class="card-wrap intro" style="--i: 3">
          <figure class="card" [attr.aria-label]="i18n.t().hero.card.label">
            <div class="card__bar">
              <span>GET /api/jonathan</span>
              <span class="card__status">200 OK</span>
            </div>
            <pre class="card__body"><code>&#123;
  <span class="k">"name"</span>: "{{ i18n.t().hero.name }}",
  <span class="k">"role"</span>: "{{ i18n.t().hero.card.role }}",
  <span class="k">"location"</span>: "{{ i18n.t().hero.card.location }}",
  <span class="k">"stack"</span>: [
    "Java 21", "Spring Boot",
    "Angular", "Kafka", "Oracle"
  ],
  <span class="k">"open_to"</span>: [{{ openTo() }}]
&#125;<span class="caret" aria-hidden="true">▌</span></code></pre>
          </figure>
        </div>
      </div>
    </section>
  `,
  styles: `
    /* El menú es fijo y flota sobre el hero: los círculos llegan al borde superior */
    .hero {
      position: relative;
      overflow: hidden;
      padding-top: var(--header-h);
    }

    .orbs {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(145deg, var(--orb-1) 0%, var(--orb-2) 55%, var(--orb-3) 100%);
      opacity: var(--orb-opacity);
    }

    .orb--1 {
      top: -8rem;
      left: -9rem;
      width: clamp(12rem, 24vw, 22rem);
      aspect-ratio: 1;
      animation: drift-a 26s ease-in-out infinite alternate;
    }

    .orb--2 {
      top: 5rem;
      right: -6rem;
      width: clamp(14rem, 32vw, 30rem);
      aspect-ratio: 1;
      animation: drift-b 32s ease-in-out infinite alternate;
    }

    .orb--4 {
      right: -4rem;
      bottom: -3rem;
      width: clamp(7rem, 12vw, 11rem);
      aspect-ratio: 1;
      animation: drift-a 28s ease-in-out infinite alternate-reverse;
    }

    .hero__name {
      position: relative;
      padding-left: 1.5rem;
    }

    /* Línea vertical fina con un punto, como en el banner */
    .hero__name::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      bottom: 0.75rem;
      width: 1px;
      background: color-mix(in srgb, var(--text) 55%, transparent);
    }

    .hero__name::after {
      content: '';
      position: absolute;
      left: -3px;
      top: 0.25rem;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--text);
    }

    .card-wrap {
      position: relative;
      isolation: isolate;
    }

    /* Cuadrícula solo alrededor de la tarjeta, que se desvanece hacia afuera */
    .card-wrap::after {
      content: '';
      position: absolute;
      inset: -5rem -4.5rem;
      z-index: -1;
      background-image:
        linear-gradient(var(--grid-card) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-card) 1px, transparent 1px);
      background-size: 2.5rem 2.5rem;
      background-position: center;
      mask-image:
        linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%);
      mask-composite: intersect;
      -webkit-mask-composite: source-in;
      animation: grid-drift 24s linear infinite;
      pointer-events: none;
    }

    @keyframes grid-drift {
      to {
        background-position: calc(50% + 2.5rem) calc(50% + 2.5rem);
      }
    }

    /* Sombra de degradado alrededor de la tarjeta */
    .card-wrap::before {
      content: '';
      position: absolute;
      inset: -0.5rem;
      border-radius: calc(var(--radius-card) + 0.5rem);
      background: var(--grad);
      z-index: -2;
      filter: blur(2.5rem);
      opacity: var(--halo-opacity);
      pointer-events: none;
    }

    .card-wrap .card {
      position: relative;
    }

    .hero__inner {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-5);
      max-width: var(--maxw);
      margin-inline: auto;
      padding: var(--space-4) var(--gutter) var(--space-6);
    }

    .hero__text {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    h1 span {
      display: block;
    }

    .hero__role {
      font-size: var(--fs-role);
      line-height: 1.3;
    }

    .hero__summary {
      max-width: 32.5rem;
      font-size: 1.0625rem;
      font-weight: 300;
      color: var(--text-2);
    }

    .hero__actions,
    .hero__tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .card {
      margin: 0;
      overflow: hidden;
      border: 1px solid transparent;
      border-radius: var(--radius-card);
      background:
        linear-gradient(var(--surface), var(--surface)) padding-box,
        var(--grad) border-box;
      font-family: var(--font-mono);
    }

    .card__bar {
      display: flex;
      justify-content: space-between;
      gap: var(--space-2);
      padding: 1.125rem 1.5rem;
      border-bottom: 1px solid var(--border);
      font-size: var(--fs-small);
    }

    .card__status {
      color: var(--accent);
    }

    .card__body {
      margin: 0;
      padding: var(--space-3);
      overflow-x: auto;
      font-size: var(--fs-code);
      line-height: 1.75;
    }

    .k {
      color: var(--soft);
    }

    .caret {
      color: var(--accent);
      animation: blink 1.1s steps(1) infinite;
    }

    /* Deriva lenta: cada círculo se mueve a su propio ritmo */
    @keyframes drift-a {
      to {
        transform: translate(2.5rem, 3rem) scale(1.06);
      }
    }

    @keyframes drift-b {
      to {
        transform: translate(-3rem, 2rem) scale(0.95);
      }
    }

    @keyframes drift-c {
      to {
        transform: translate(2rem, -2.5rem);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .orb,
      .card-wrap::after {
        animation: none;
      }
    }

    @keyframes blink {
      50% {
        opacity: 0;
      }
    }

    @media (min-width: 75rem) {
      .hero__inner {
        grid-template-columns: minmax(0, 1fr) minmax(0, 34rem);
        align-items: center;
        min-height: 46rem;
        gap: var(--space-6);
      }
    }
  `,
})
export class Hero {
  protected readonly i18n = inject(I18n);
  protected readonly linkedinUrl = LINKEDIN_URL;

  protected openTo(): string {
    return this.i18n
      .t()
      .hero.card.openTo.map((v) => `"${v}"`)
      .join(', ');
  }
}
