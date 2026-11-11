import { Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { Reveal } from '../shared/reveal';
import { Orb } from '../shared/orb';

@Component({
  selector: 'app-projects',
  imports: [Orb, Reveal],
  template: `
    <section class="section" id="proyectos" aria-labelledby="projects-title">
      <div class="section__inner">
        <div class="section__intro" appReveal>
          <h2 id="projects-title">{{ i18n.t().projects.title }}</h2>
          <p>{{ i18n.t().projects.intro }}</p>
          <app-orb [size]="14" top="11rem" left="1rem" [dur]="25">
            <span class="tk-k">&#64;PostMapping</span><br />
            Pago crear(<br />
            &nbsp;&nbsp;<span class="tk-k">&#64;Valid</span> Req r<br />
            ) &#123;<br />
            &nbsp;&nbsp;return svc.go(r);
          </app-orb>
          <app-orb
            logo="/logos/svg/spring-boot.svg"
            [size]="5"
            top="23rem"
            left="13rem"
            [dur]="20"
            [delay]="6"
          />
          <app-orb [size]="13" top="40rem" left="4rem" [dur]="28" [delay]="2">
            <span class="tk-k">SELECT</span> estado,<br />
            &nbsp;&nbsp;<span class="tk-k">COUNT</span>(*)<br />
            <span class="tk-k">FROM</span> pagos<br />
            <span class="tk-k">GROUP BY</span> estado;
          </app-orb>
          <app-orb
            logo="/logos/svg/oracle-db.svg"
            [size]="4.5"
            top="38rem"
            left="0"
            [dur]="21"
            [delay]="9"
          />
          <app-orb [size]="13" top="62rem" left="1.5rem" [dur]="27" [delay]="5">
            <span class="tk-k">curl</span> -s <br />
            &nbsp;/pagos <br />
            &nbsp;-H "Authorization:<br />
            &nbsp;<span class="tk-s">Bearer $TOKEN"</span>
          </app-orb>
          <app-orb
            logo="/logos/webp/linux.webp"
            [size]="4.5"
            top="72rem"
            left="12rem"
            [dur]="21"
            [delay]="4"
          />
        </div>

        <div class="section__body stack" appReveal="120">
          <article class="feature">
            <header>
              <h3>{{ featured().title }}</h3>
              <p class="meta">{{ featured().meta }}</p>
            </header>
            <div class="trio">
              <div>
                <h4>{{ i18n.t().projects.labels.problem }}</h4>
                <p>{{ featured().problem }}</p>
              </div>
              <div>
                <h4>{{ i18n.t().projects.labels.solution }}</h4>
                <p>{{ featured().solution }}</p>
              </div>
              <div>
                <h4>{{ i18n.t().projects.labels.result }}</h4>
                <p>{{ featured().result }}</p>
              </div>
            </div>
            <ol class="chain" aria-hidden="true">
              @for (node of featured().chain; track node; let i = $index) {
                @if (i > 0) {
                  <li class="chain__link"></li>
                }
                <li class="chain__node" [class.is-active]="i === featured().activeNode">
                  {{ node }}
                </li>
              }
            </ol>
            <ul class="tags">
              @for (tag of featured().tags; track tag) {
                <li>{{ tag }}</li>
              }
            </ul>
          </article>

          <div class="rows">
            @for (p of i18n.t().projects.more; track p.title) {
              <article class="row">
                <div>
                  <h3 class="row__title">{{ p.title }}</h3>
                  <p class="row__stack">{{ p.stack }}</p>
                </div>
                <div class="row__text">
                  <p>
                    <strong>{{ i18n.t().projects.labels.problem }}.</strong> {{ p.problem }}
                  </p>
                  <p>
                    <strong>{{ i18n.t().projects.labels.solution }}.</strong> {{ p.solution }}
                  </p>
                </div>
                <p class="row__result">{{ p.result }}</p>
              </article>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .stack {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }

    .feature {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding: var(--space-3);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      background: var(--surface);
    }

    .meta {
      margin-top: 0.5rem;
      color: var(--text-2);
    }

    .trio {
      display: grid;
      gap: var(--space-3);
    }

    h4 {
      margin: 0 0 0.5rem;
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--soft);
    }

    .trio p,
    .row__text p {
      line-height: 1.65;
      color: var(--text-2);
    }

    .chain {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      row-gap: var(--space-1);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .chain__node {
      padding: 0.625rem 1.125rem;
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-field);
      background: var(--surface-2);
      font-size: var(--fs-small);
    }

    .chain__node.is-active {
      border-color: var(--primary);
    }

    /* Los conectores se dibujan de izquierda a derecha cuando el caso aparece */
    .chain__link {
      width: 2.25rem;
      height: 2px;
      background: var(--grad);
      transform-origin: left;
      transition: transform 800ms var(--ease) 500ms;
    }

    .reveal:not(.is-in) .chain__link {
      transform: scaleX(0);
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.625rem;
      font-size: 0.8125rem;
      color: var(--text-2);
    }

    .tags li {
      padding: 0.375rem 0.875rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
    }

    .row {
      display: grid;
      gap: var(--space-2);
      padding: var(--space-4) 0;
      border-top: 1px solid var(--border);
    }

    .row__title {
      font-size: 1.25rem;
    }

    .row__stack {
      margin-top: 0.5rem;
      font-size: 0.8125rem;
      line-height: 1.6;
      color: var(--text-2);
    }

    .row__text {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    strong {
      font-weight: 500;
      color: var(--soft);
    }

    .row__result {
      font-size: var(--fs-small);
      line-height: 1.6;
      color: var(--text-2);
    }

    @media (min-width: 48rem) {
      .feature {
        padding: var(--space-5);
      }

      .trio {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--space-4);
      }
    }

    @media (min-width: 64rem) {
      .row {
        grid-template-columns: 15rem minmax(0, 1fr) 12.5rem;
        gap: 2.5rem;
      }
    }
  `,
})
export class Projects {
  protected readonly i18n = inject(I18n);

  protected featured() {
    return this.i18n.t().projects.featured;
  }
}
