import { Component, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { I18n } from '../core/i18n';
import { Reveal } from '../shared/reveal';

/** Iconos de 24x24 (trazo) para cada paso del flujo, en el mismo orden que el contenido */
const FLOW_ICONS = [
  'M9 4h6v3H9z M7 5H5v15h14V5h-2 M9 12h6 M9 16h4',
  'M8 11a3 3 0 100-6 3 3 0 000 6z M2 20c0-3.3 2.7-5 6-5s6 1.7 6 5 M16 11a3 3 0 100-6 M18 15c2.2.4 4 1.9 4 5',
  'M12 3l9 5-9 5-9-5 9-5z M3 12.5l9 5 9-5 M3 16.5l9 5 9-5',
  'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  'M8 7l-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16',
  'M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z M8.5 12l2.5 2.5 4.5-5',
  'M12 3c3 2 5 5.5 5 9l-2 3H9l-2-3c0-3.5 2-7 5-9z M9 15l-2 4 3-1 M15 15l2 4-3-1',
];

const TOOL_ICONS: Record<string, string> = {
  agents:
    'M12 3v3 M6 8h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z M9 13v1.5 M15 13v1.5 M9.5 18h5',
  skills: 'M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z M5 17a3 3 0 013-3h11',
  design:
    'M12 3a9 9 0 100 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2H19a2 2 0 002-2c0-5-4-9.4-9-9.4z M7.5 11h.01 M10 7.5h.01 M15 7.5h.01',
  impeccable:
    'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z M19 16l.7 2 2 .7-2 .7L19 21l-.7-1.6-2-.7 2-.7z',
};

@Component({
  selector: 'app-ai',
  imports: [Reveal],
  template: `
    <section class="section" id="ia" aria-labelledby="ai-title">
      <div class="section__inner">
        <div class="section__intro" appReveal>
          <h2 id="ai-title">{{ t().title }}</h2>
          <p>{{ t().intro }}</p>
        </div>

        <div class="section__body blocks" appReveal="120">
          <!-- 1. Nivel -->
          <div class="block">
            <h3>{{ t().level.title }}</h3>
            <p class="block__lead">{{ t().level.text }}</p>
            <div class="meter" role="img" [attr.aria-label]="levelLabel()">
              @for (mark of t().level.marks; track mark; let i = $index) {
                <div class="meter__step" [class.is-on]="i <= t().level.current">
                  @if (i === t().level.current) {
                    <span class="meter__badge">{{ t().level.badge }}</span>
                  }
                  <span class="meter__bar"></span>
                  <span class="meter__mark" [class.is-here]="i === t().level.current">{{
                    mark
                  }}</span>
                </div>
              }
            </div>
          </div>

          <!-- 2. Flujo de backend -->
          <div class="block">
            <h3>{{ t().flow.title }}</h3>
            <p class="block__lead">{{ t().flow.intro }}</p>

            <ol class="flow">
              @for (step of t().flow.steps; track step.title; let i = $index) {
                <li>
                  <button
                    type="button"
                    class="flow__btn"
                    [class.is-on]="step_() === i"
                    [class.is-done]="i < step_()"
                    [attr.aria-pressed]="step_() === i"
                    (click)="step_.set(i)"
                  >
                    <span class="flow__icon">
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path [attr.d]="icons[i]" />
                      </svg>
                    </span>
                    <span class="flow__num">{{ i + 1 }}</span>
                    <span class="flow__title">{{ step.title }}</span>
                  </button>
                </li>
              }
            </ol>
            <div class="flow__track" aria-hidden="true">
              <span class="flow__fill" [style.width.%]="progress()"></span>
            </div>

            <div class="detail" aria-live="polite">
              @for (s of [currentStep()]; track s.title) {
                <div class="detail__body">
                  <h4>{{ step_() + 1 }}. {{ s.title }}</h4>
                  <p>{{ s.text }}</p>
                </div>
                <div class="detail__out">
                  <span class="detail__label">{{ t().flow.outputLabel }}</span>
                  <code>{{ s.output }}</code>
                </div>
              }
            </div>
          </div>

          <!-- 3. Herramientas -->
          <div class="block">
            <h3>{{ t().toolkit.title }}</h3>
            <p class="block__lead">{{ t().toolkit.intro }}</p>
            <ul class="tools">
              @for (item of t().toolkit.items; track item.key) {
                <li class="tool">
                  <span class="tool__icon">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path [attr.d]="toolIcons[item.key]" />
                    </svg>
                  </span>
                  <h4 [class.is-code]="item.key === 'design' || item.key === 'impeccable'">
                    {{ item.title }}
                  </h4>
                  <p>{{ item.text }}</p>
                </li>
              }
            </ul>
          </div>

          <!-- 4. Sesión -->
          <div class="block">
            <h3>{{ t().session.title }}</h3>
            <figure class="term" [class.is-live]="live()" [attr.aria-label]="t().session.label">
              <div class="term__bar" aria-hidden="true">
                <span></span><span></span><span></span>
                <em>claude</em>
              </div>
              <ul class="term__body">
                @for (line of t().session.lines; track line.text; let i = $index) {
                  <li class="term__line" [attr.data-kind]="line.kind" [style.--i]="i">
                    <span class="term__sigil" aria-hidden="true">{{
                      line.kind === 'user' ? '>' : line.kind === 'ok' ? '✓' : '●'
                    }}</span>
                    {{ line.text }}
                  </li>
                }
                <li class="term__line term__line--cursor" aria-hidden="true">
                  <span class="term__sigil">&gt;</span><span class="term__caret"></span>
                </li>
              </ul>
            </figure>
          </div>

          <!-- 5. Ciclo -->
          <div class="block">
            <h3>{{ t().loop.title }}</h3>
            <p class="block__lead">{{ t().loop.text }}</p>
            <div class="loop">
              <svg class="loop__art" viewBox="0 0 360 360" aria-hidden="true" focusable="false">
                <defs>
                  <marker
                    id="ai-arr"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto"
                  >
                    <path d="M1 1l8 4-8 4z" class="l-head" />
                  </marker>
                </defs>
                <path
                  class="l-arc"
                  d="M215.1 65.2A120 120 0 0 1 294.8 144.9"
                  marker-end="url(#ai-arr)"
                />
                <path
                  class="l-arc"
                  d="M294.8 215.1A120 120 0 0 1 215.1 294.8"
                  marker-end="url(#ai-arr)"
                />
                <path
                  class="l-arc"
                  d="M144.9 294.8A120 120 0 0 1 65.2 215.1"
                  marker-end="url(#ai-arr)"
                />
                <path
                  class="l-arc"
                  d="M65.2 144.9A120 120 0 0 1 144.9 65.2"
                  marker-end="url(#ai-arr)"
                />

                <circle class="l-node l-node--me" cx="180" cy="60" r="30" />
                <circle class="l-node" cx="300" cy="180" r="30" />
                <circle class="l-node l-node--test" cx="180" cy="300" r="30" />
                <circle class="l-node l-node--me" cx="60" cy="180" r="30" />
                <text class="l-num" x="180" y="66" text-anchor="middle">1</text>
                <text class="l-num" x="300" y="186" text-anchor="middle">2</text>
                <text class="l-num" x="180" y="306" text-anchor="middle">3</text>
                <text class="l-num" x="60" y="186" text-anchor="middle">4</text>

                <text class="l-center" x="180" y="176" text-anchor="middle">
                  {{ t().loop.center }}
                </text>
                <text class="l-sub" x="180" y="198" text-anchor="middle">1 → 2 → 3 → 4</text>
              </svg>
              <ol class="loop__list">
                @for (node of t().loop.nodes; track node.title; let i = $index) {
                  <li>
                    <span
                      class="loop__n"
                      [class.loop__n--claude]="i === 1"
                      [class.loop__n--test]="i === 2"
                      >{{ i + 1 }}</span
                    >
                    <div>
                      <h4>{{ node.title }}</h4>
                      <p>{{ node.text }}</p>
                    </div>
                  </li>
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .blocks {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }

    .block h3 {
      font-size: var(--fs-h3);
      font-weight: 300;
      line-height: 1.2;
    }

    .block__lead {
      max-width: 44rem;
      margin: var(--space-1) 0 var(--space-3);
      color: var(--text-2);
    }

    h4 {
      margin: 0;
      font-size: 1.0625rem;
      font-weight: 500;
    }

    /* Nivel */
    .meter {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.5rem;
      padding-top: 2.25rem;
    }

    .meter__step {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    .meter__bar {
      height: 0.75rem;
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-pill);
      background: transparent;
    }

    .meter__step.is-on .meter__bar {
      border-color: transparent;
      background: var(--grad);
    }

    .meter__mark {
      font-size: var(--fs-small);
      color: var(--text-2);
    }

    .meter__mark.is-here {
      font-weight: 500;
      color: var(--text);
    }

    .meter__badge {
      position: absolute;
      top: -2.25rem;
      right: 0;
      padding: 0.125rem 0.75rem;
      border: 1px solid var(--primary);
      border-radius: var(--radius-pill);
      background: var(--surface);
      font-size: 0.75rem;
      white-space: nowrap;
      animation: bob 2.4s ease-in-out infinite;
    }

    @keyframes bob {
      50% {
        transform: translateY(-3px);
      }
    }

    /* Flujo */
    .flow {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--space-1);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .flow__btn {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      width: 100%;
      height: 100%;
      padding: var(--space-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-field);
      background: var(--surface);
      text-align: left;
      cursor: pointer;
      transition:
        border-color var(--dur-fast) var(--ease),
        transform var(--dur-fast) var(--ease);
    }

    .flow__btn:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
    }

    .flow__btn.is-done {
      border-color: var(--border-strong);
    }

    .flow__btn.is-on {
      border-color: var(--primary);
      background: var(--surface-2);
    }

    .flow__icon {
      display: grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background: var(--bg);
      color: var(--soft);
    }

    .flow__btn.is-on .flow__icon {
      background: var(--grad);
      color: var(--on-primary);
    }

    .flow__num {
      position: absolute;
      top: var(--space-2);
      right: var(--space-2);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-2);
    }

    .flow__title {
      font-size: var(--fs-small);
      font-weight: 500;
      line-height: 1.35;
    }

    .flow__track {
      height: 4px;
      margin-top: var(--space-2);
      border-radius: var(--radius-pill);
      background: var(--border);
      overflow: hidden;
    }

    .flow__fill {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: var(--grad);
      transition: width var(--dur-base) var(--ease);
    }

    .detail {
      display: grid;
      gap: var(--space-2);
      margin-top: var(--space-2);
      padding: var(--space-3);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      background: var(--surface);
    }

    .detail__body {
      animation: rise var(--dur-base) var(--ease) backwards;
    }

    @keyframes rise {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
    }

    .detail__body p {
      margin-top: 0.375rem;
      line-height: 1.7;
      color: var(--text-2);
    }

    .detail__out {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-1);
      padding-top: var(--space-2);
      border-top: 1px solid var(--border);
    }

    .detail__label {
      font-size: 0.8125rem;
      color: var(--text-2);
    }

    code {
      padding: 0.25rem 0.75rem;
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-pill);
      background: var(--panel);
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      color: var(--accent);
    }

    /* Herramientas */
    .tools {
      display: grid;
      gap: var(--space-2);
    }

    .tool {
      padding: var(--space-3);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      background: var(--surface);
      transition: border-color var(--dur-fast) var(--ease);
    }

    .tool:hover {
      border-color: var(--primary);
    }

    .tool__icon {
      display: grid;
      place-items: center;
      width: 3rem;
      height: 3rem;
      margin-bottom: var(--space-2);
      border-radius: var(--radius-logo);
      background: var(--grad);
      color: var(--on-primary);
    }

    .tool h4.is-code {
      font-family: var(--font-mono);
      font-size: 1rem;
      color: var(--soft);
    }

    .tool p {
      margin-top: 0.375rem;
      font-size: var(--fs-small);
      line-height: 1.7;
      color: var(--text-2);
    }

    /* Terminal ilustrativa */
    .term {
      max-width: 46rem;
      margin: var(--space-3) 0 0;
      overflow: hidden;
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-card);
      background: var(--panel);
    }

    .term__bar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem var(--space-2);
      border-bottom: 1px solid var(--border);
      background: var(--surface);
    }

    .term__bar span {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      background: var(--border-strong);
    }

    .term__bar em {
      margin-left: auto;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-style: normal;
      color: var(--text-2);
    }

    .term__body {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      margin: 0;
      padding: var(--space-3) var(--space-2);
      list-style: none;
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      line-height: 1.6;
    }

    .term__line {
      display: flex;
      gap: 0.75rem;
      opacity: 0;
    }

    .term.is-live .term__line {
      animation: line-in 0.5s var(--ease) calc(var(--i, 6) * 0.9s) forwards;
    }

    .term__line--cursor {
      opacity: 1;
    }

    @keyframes line-in {
      from {
        opacity: 0;
        transform: translateX(-8px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }

    .term__sigil {
      flex: none;
      color: var(--text-2);
    }

    .term__line[data-kind='user'] {
      color: var(--text);
    }

    .term__line[data-kind='agent'],
    .term__line[data-kind='agent'] .term__sigil {
      color: var(--soft);
    }

    .term__line[data-kind='ok'],
    .term__line[data-kind='ok'] .term__sigil {
      color: var(--accent);
    }

    .term__caret {
      width: 0.5rem;
      height: 1.1em;
      background: var(--accent);
      animation: blink 1s steps(2) infinite;
    }

    @keyframes blink {
      50% {
        opacity: 0;
      }
    }

    /* Ciclo */
    .loop {
      display: grid;
      gap: var(--space-4);
      align-items: center;
    }

    .loop__art {
      width: 100%;
      max-width: 20rem;
      height: auto;
      margin-inline: auto;
    }

    .l-arc {
      fill: none;
      stroke: var(--accent);
      stroke-width: 2;
      stroke-dasharray: 7 6;
      animation: march 1.2s linear infinite;
    }

    @keyframes march {
      to {
        stroke-dashoffset: -26;
      }
    }

    .l-head {
      fill: var(--accent);
    }

    .l-node {
      fill: var(--surface);
      stroke: var(--primary);
      stroke-width: 2;
    }

    .l-node--test {
      stroke: var(--accent);
    }

    .l-num {
      fill: var(--text);
      font-family: var(--font-sans);
      font-size: 20px;
      font-weight: 500;
    }

    .l-center {
      fill: var(--text);
      font-family: var(--font-sans);
      font-size: 17px;
    }

    .l-sub {
      fill: var(--text-2);
      font-family: var(--font-mono);
      font-size: 12px;
    }

    .loop__list {
      display: grid;
      gap: var(--space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .loop__list li {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
    }

    .loop__list p {
      font-size: var(--fs-small);
      color: var(--text-2);
    }

    .loop__n {
      display: grid;
      flex: none;
      place-items: center;
      width: 2.25rem;
      height: 2.25rem;
      border: 2px solid var(--primary);
      border-radius: 50%;
      font-weight: 500;
    }

    .loop__n--claude {
      border-color: var(--primary);
      background: var(--surface-2);
    }

    .loop__n--test {
      border-color: var(--accent);
    }

    @media (min-width: 48rem) {
      .flow {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .tools {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .detail {
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        padding: var(--space-4);
      }

      .detail__out {
        flex-direction: column;
        align-items: flex-start;
        padding: 0 0 0 var(--space-3);
        border-top: 0;
        border-left: 1px solid var(--border);
      }

      .term__body {
        padding: var(--space-3);
        font-size: 0.875rem;
      }

      .loop {
        grid-template-columns: 20rem minmax(0, 1fr);
      }
    }

    @media (min-width: 75rem) {
      .section__intro {
        position: sticky;
        top: 8rem;
        align-self: start;
      }

      .flow {
        grid-template-columns: repeat(7, minmax(0, 1fr));
      }

      .flow__btn {
        padding: var(--space-2) 0.75rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .meter__badge,
      .l-arc,
      .term__caret,
      .detail__body {
        animation: none;
      }

      .term__line {
        opacity: 1;
        animation: none !important;
      }
    }
  `,
})
export class Ai {
  private readonly i18n = inject(I18n);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly t = computed(() => this.i18n.t().ai);
  protected readonly icons = FLOW_ICONS;
  protected readonly toolIcons = TOOL_ICONS;

  protected readonly step_ = signal(0);
  protected readonly currentStep = computed(() => this.t().flow.steps[this.step_()]);
  protected readonly progress = computed(
    () => ((this.step_() + 1) / this.t().flow.steps.length) * 100,
  );
  protected readonly levelLabel = computed(() => {
    const { marks, current } = this.t().level;
    return `${this.t().level.title}: ${marks[current]}`;
  });

  /** La terminal escribe sus líneas cuando entra en pantalla */
  protected readonly live = signal(false);

  constructor() {
    afterNextRender(() => {
      const target = this.host.nativeElement.querySelector('.term');
      if (!target || typeof IntersectionObserver === 'undefined') {
        this.live.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.live.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(target);
    });
  }
}
