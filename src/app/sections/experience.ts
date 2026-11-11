import { Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';
import { Reveal } from '../shared/reveal';
import { SNIPPETS } from '../content/snippets';
import { CodeBackdrop } from '../shared/code-backdrop';
import { Orb } from '../shared/orb';

@Component({
  selector: 'app-experience',
  imports: [Orb, CodeBackdrop, Reveal],
  template: `
    <section class="section" id="experiencia" aria-labelledby="experience-title">
      <div class="section__inner">
        <div class="section__intro" appReveal>
          <h2 id="experience-title">{{ i18n.t().experience.title }}</h2>
          <p>{{ i18n.t().experience.intro }}</p>
          <app-orb [size]="13.5" top="13rem" left="2rem" [dur]="25">
            <span class="tk-k">CREATE PROCEDURE</span><br />
            &nbsp;pagar(p_id NUMBER)<br />
            <span class="tk-k">IS BEGIN</span><br />
            &nbsp;&nbsp;<span class="tk-k">UPDATE</span> pagos...<br />
            <span class="tk-k">END</span>;
          </app-orb>
          <app-orb
            logo="/logos/svg/plsql.svg"
            [size]="4.5"
            top="25rem"
            left="14rem"
            [dur]="19"
            [delay]="3"
          />
          <app-orb [size]="13.5" top="42rem" left="5rem" [dur]="29" [delay]="6">
            <span class="tk-c">$</span> kafka-topics<br />
            &nbsp;--create<br />
            &nbsp;--topic<br />
            &nbsp;<span class="tk-s">pagos.nomina</span>
          </app-orb>
          <app-orb
            logo="/logos/webp/linux.webp"
            [size]="4.5"
            top="52rem"
            left="15.5rem"
            [dur]="22"
            [delay]="8"
          />
        </div>
        <ol class="section__body timeline" appReveal="120">
          @for (job of i18n.t().experience.items; track job.date; let i = $index) {
            <li class="job" [class.is-current]="i === 0" [style.--n]="i">
              <p class="job__date">{{ job.date }}</p>
              <span class="job__rail" aria-hidden="true"><span class="job__node"></span></span>
              <div class="job__body">
                <h3>{{ job.role }}</h3>
                <p class="job__company">{{ job.company }}</p>
                <ul class="job__points">
                  @for (point of job.points; track point) {
                    <li>{{ point }}</li>
                  }
                </ul>
              </div>
            </li>
          }
        </ol>
        <app-code-backdrop [snippet]="snippets.sql" />
      </div>
    </section>
  `,
  styles: `
    .timeline {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
      margin: 0;
      padding-block: 0;
      list-style: none;
    }

    /* Trayectoria: un hilo vertical que une los hitos, del más reciente al más antiguo */
    .job {
      display: grid;
      grid-template-columns: 1.5rem minmax(0, 1fr);
      grid-template-areas:
        'rail date'
        'rail body';
      column-gap: var(--space-2);
      row-gap: 0.25rem;
    }

    .job__date {
      grid-area: date;
      margin-top: 0.125rem;
      font-size: var(--fs-small);
      line-height: 1.6;
      color: var(--text-2);
    }

    .job__body {
      grid-area: body;
    }

    .job__rail {
      grid-area: rail;
      position: relative;
    }

    /* El hilo baja desde cada hito hasta el siguiente */
    .job__rail::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0.75rem;
      bottom: calc(var(--space-5) * -1);
      width: 1px;
      background: var(--border-strong);
      transform-origin: top;
      transition: transform 900ms var(--ease) calc(var(--n, 0) * 250ms);
    }

    .job:last-child .job__rail::before {
      bottom: 0;
      background: linear-gradient(var(--border-strong), transparent);
    }

    .job__node {
      position: absolute;
      left: 50%;
      top: 0.25rem;
      width: 0.875rem;
      height: 0.875rem;
      margin-left: -0.4375rem;
      border: 2px solid transparent;
      border-radius: 50%;
      background:
        linear-gradient(var(--bg), var(--bg)) padding-box,
        var(--grad) border-box;
      transition: transform 500ms var(--ease) calc(var(--n, 0) * 250ms);
    }

    /* El cargo actual se marca relleno y con un pulso suave */
    .is-current .job__node {
      background: var(--grad);
      animation: pulse 2.8s ease-out infinite;
    }

    @keyframes pulse {
      from {
        box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 55%, transparent);
      }
      to {
        box-shadow: 0 0 0 0.75rem transparent;
      }
    }

    /* Al aparecer la sección, el hilo se dibuja y los hitos se encienden en orden */
    .reveal:not(.is-in) .job__rail::before {
      transform: scaleY(0);
    }

    .reveal:not(.is-in) .job__node {
      transform: scale(0);
    }

    h3 {
      font-size: 1.375rem;
    }

    .job__company {
      margin: 0.25rem 0 0.875rem;
      color: var(--soft);
    }

    .job__points {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding-left: 1.125rem;
      list-style: disc;
      line-height: 1.6;
      color: var(--text-2);
    }

    @media (min-width: 48rem) {
      .job {
        grid-template-columns: 10.5rem 1.5rem minmax(0, 1fr);
        grid-template-areas: 'date rail body';
        column-gap: var(--space-3);
      }

      .job__date {
        text-align: right;
      }
    }
  `,
})
export class Experience {
  protected readonly i18n = inject(I18n);
  protected readonly snippets = SNIPPETS;
}
