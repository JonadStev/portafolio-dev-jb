import { Component, inject } from '@angular/core';
import { STACK_GROUPS } from '../content/stack';
import { I18n } from '../core/i18n';
import { Reveal } from '../shared/reveal';
import { SNIPPETS } from '../content/snippets';
import { CodeBackdrop } from '../shared/code-backdrop';
import { Orb } from '../shared/orb';

@Component({
  selector: 'app-stack',
  imports: [Orb, CodeBackdrop, Reveal],
  template: `
    <section class="section" id="stack" aria-labelledby="stack-title">
      <div class="section__inner">
        <div class="section__intro" appReveal>
          <h2 id="stack-title">{{ i18n.t().stack.title }}</h2>
          <p>{{ i18n.t().stack.intro }}</p>
          <app-orb [size]="13" top="10rem" left="3rem" [dur]="26" [delay]="3">
            <span class="tk-k">FROM</span> temurin:21<br />
            <span class="tk-k">COPY</span> app.jar .<br />
            <span class="tk-k">CMD</span> java -jar<br />
            &nbsp;&nbsp;app.jar
          </app-orb>
          <app-orb logo="/logos/svg/docker.svg" [size]="4.75" top="20rem" left="13rem" [dur]="19" />
        </div>
        <div class="section__body" appReveal="120">
          <div class="groups">
            @for (group of groups; track group.key) {
              <div>
                <h3>{{ i18n.t().stack.groups[group.key].title }}</h3>
                <p class="note">{{ i18n.t().stack.groups[group.key].note }}</p>
                <ul class="tiles">
                  @for (item of group.items; track item.name) {
                    <li class="tile">
                      <span class="tile__box">
                        <img
                          [src]="item.src"
                          [alt]="item.name"
                          [class.mono]="item.mono"
                          width="40"
                          height="40"
                          loading="lazy"
                        />
                      </span>
                      <span class="tile__name">{{ item.name }}</span>
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
          <p class="also">{{ i18n.t().stack.also }}</p>
        </div>
        <app-code-backdrop [snippet]="snippets.controller" [reach]="12" />
      </div>
    </section>
  `,
  styles: `
    .groups {
      display: grid;
      gap: var(--space-5) var(--space-4);
    }

    h3 {
      font-size: 1.125rem;
      font-weight: 500;
    }

    .note {
      margin: 0.25rem 0 1.125rem;
      font-size: var(--fs-small);
      color: var(--text-2);
    }

    .tiles {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      width: 5.5rem;
    }

    .tile__box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4.5rem;
      height: 4.5rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-logo);
      background: var(--surface);
      transition: border-color var(--dur-fast) var(--ease);
    }

    .tile:hover .tile__box {
      border-color: var(--primary);
    }

    .tile img {
      width: 2.5rem;
      height: 2.5rem;
      object-fit: contain;
    }

    /* Logos de un solo color oscuro: en el tema oscuro se invierten para que se vean */
    :host-context([data-theme='dark']) .tile img.mono {
      filter: invert(1);
    }

    .tile__name {
      font-size: 0.8125rem;
      text-align: center;
      color: var(--text-2);
    }

    .also {
      margin-top: var(--space-5);
      padding-top: var(--space-3);
      border-top: 1px solid var(--border);
      line-height: 1.7;
      color: var(--text-2);
    }

    @media (min-width: 48rem) {
      .groups {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `,
})
export class Stack {
  protected readonly i18n = inject(I18n);
  protected readonly groups = STACK_GROUPS;
  protected readonly snippets = SNIPPETS;
}
