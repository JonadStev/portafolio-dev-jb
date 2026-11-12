import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../core/i18n';
import { DiagramCarousel } from '../shared/diagram-carousel';
import { Reveal } from '../shared/reveal';

const REPLICA_OPTIONS = [1, 3, 6, 9] as const;
const NODES = 3;
const SLOTS_PER_NODE = 3;

@Component({
  selector: 'app-architecture',
  imports: [DiagramCarousel, Reveal],
  template: `
    <section class="section" id="arquitectura" aria-labelledby="architecture-title">
      <div class="section__inner">
        <div class="section__intro" appReveal>
          <h2 id="architecture-title">{{ t().title }}</h2>
          <p>{{ t().intro }}</p>
        </div>

        <div class="section__body blocks" appReveal="120">
          <!-- 1. Arquitectura que uso a diario -->
          <div class="block">
            <h3>{{ t().daily.title }}</h3>
            <p class="block__lead">{{ t().daily.intro }}</p>
            <ul class="styles">
              @for (item of t().daily.items; track item.key) {
                <li class="style">
                  <svg
                    class="style__art"
                    viewBox="0 0 160 100"
                    aria-hidden="true"
                    focusable="false"
                  >
                    @switch (item.key) {
                      @case ('hexagonal') {
                        <line class="s-line" x1="14" y1="50" x2="42" y2="50" />
                        <line class="s-line" x1="118" y1="50" x2="146" y2="50" />
                        <polygon
                          class="s-box s-box--on"
                          points="80,10 118,32 118,68 80,90 42,68 42,32"
                        />
                        <circle class="s-fill" cx="80" cy="50" r="13" />
                        <circle class="s-port" cx="42" cy="50" r="5" />
                        <circle class="s-port" cx="118" cy="50" r="5" />
                        <rect class="s-box" x="4" y="38" width="14" height="24" rx="4" />
                        <rect class="s-box" x="142" y="38" width="14" height="24" rx="4" />
                      }
                      @case ('microservices') {
                        <line class="s-line" x1="40" y1="50" x2="80" y2="20" />
                        <line class="s-line" x1="40" y1="50" x2="80" y2="50" />
                        <line class="s-line" x1="40" y1="50" x2="80" y2="80" />
                        <rect class="s-box s-box--on" x="8" y="36" width="34" height="28" rx="6" />
                        <rect class="s-box" x="80" y="8" width="56" height="24" rx="6" />
                        <rect class="s-box" x="80" y="38" width="56" height="24" rx="6" />
                        <rect class="s-box" x="80" y="68" width="56" height="24" rx="6" />
                        <circle class="s-fill" cx="146" cy="20" r="4" />
                        <circle class="s-fill" cx="146" cy="50" r="4" />
                        <circle class="s-fill" cx="146" cy="80" r="4" />
                      }
                      @case ('events') {
                        <rect class="s-box s-box--on" x="6" y="36" width="32" height="28" rx="6" />
                        <rect class="s-box" x="122" y="10" width="32" height="26" rx="6" />
                        <rect class="s-box" x="122" y="64" width="32" height="26" rx="6" />
                        <line class="s-line" x1="38" y1="50" x2="52" y2="50" />
                        <rect class="s-bus" x="52" y="42" width="58" height="16" rx="8" />
                        <path class="s-line" d="M110 50H116V23H122M116 50V77H122" />
                        <circle class="s-dot s-dot--1" cx="62" cy="50" r="3.5" />
                        <circle class="s-dot s-dot--2" cx="62" cy="50" r="3.5" />
                        <circle class="s-dot s-dot--3" cx="62" cy="50" r="3.5" />
                      }
                      @case ('layers') {
                        <rect class="s-box s-box--on" x="20" y="8" width="120" height="24" rx="6" />
                        <rect class="s-box" x="20" y="38" width="120" height="24" rx="6" />
                        <rect class="s-box" x="20" y="68" width="120" height="24" rx="6" />
                        <text class="s-text" x="80" y="24" text-anchor="middle">Controller</text>
                        <text class="s-text" x="80" y="54" text-anchor="middle">Service</text>
                        <text class="s-text" x="80" y="84" text-anchor="middle">Repository</text>
                        <path class="s-line" d="M80 32V38M80 62V68" />
                      }
                    }
                  </svg>
                  <div class="style__text">
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.text }}</p>
                  </div>
                </li>
              }
            </ul>
          </div>

          <!-- 2. Patrones de diseño -->
          <div class="block">
            <h3>{{ t().patterns.title }}</h3>
            <p class="block__lead">{{ t().patterns.intro }}</p>
            <div class="chips" role="tablist" [attr.aria-label]="t().patterns.title">
              @for (group of t().patterns.groups; track group.name; let i = $index) {
                <button
                  type="button"
                  role="tab"
                  class="chip"
                  [attr.aria-selected]="family() === i"
                  [class.is-on]="family() === i"
                  (click)="family.set(i)"
                >
                  {{ group.name }}
                  <span class="chip__count" aria-hidden="true">{{ group.items.length }}</span>
                </button>
              }
            </div>
            <ul class="patterns" role="tabpanel">
              @for (pattern of currentPatterns(); track pattern.name) {
                <li class="pattern">
                  <span class="pattern__name">{{ pattern.name }}</span>
                  <span class="pattern__use">{{ pattern.use }}</span>
                </li>
              }
            </ul>
          </div>

          <!-- 3. Escalado horizontal -->
          <div class="block">
            <h3>{{ t().scale.title }}</h3>
            <p class="block__lead">{{ t().scale.intro }}</p>

            <div class="picker" role="radiogroup" [attr.aria-label]="t().scale.replicasLabel">
              <span class="picker__label">{{ t().scale.replicasLabel }}</span>
              @for (n of options; track n) {
                <button
                  type="button"
                  role="radio"
                  class="picker__opt"
                  [attr.aria-checked]="replicas() === n"
                  [class.is-on]="replicas() === n"
                  (click)="replicas.set(n)"
                >
                  {{ n }}
                </button>
              }
            </div>

            <div class="swarm" role="group" [attr.aria-label]="t().scale.cluster">
              <div class="swarm__col swarm__col--in">
                <div class="actor">
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
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <path d="M8 20h8M12 16v4" />
                  </svg>
                  <span>{{ t().scale.client }}</span>
                </div>
                <span class="link" aria-hidden="true"></span>
                <div class="actor actor--lb">
                  <strong>{{ t().scale.balancer }}</strong>
                  <span class="actor__note">{{ t().scale.balancerNote }}</span>
                </div>
                <span class="link" aria-hidden="true"></span>
              </div>

              <div class="cluster">
                <p class="cluster__title">{{ t().scale.cluster }}</p>
                @for (node of nodes(); track node.id) {
                  <div class="node">
                    <p class="node__title">
                      {{ node.id === 0 ? t().scale.manager : t().scale.worker }}
                      <span class="node__id">node-{{ node.id + 1 }}</span>
                    </p>
                    <ul class="slots">
                      @for (slot of node.slots; track slot.key) {
                        @if (slot.replica) {
                          <li class="replica">api.{{ slot.replica }}</li>
                        } @else {
                          <li class="replica replica--empty">{{ t().scale.emptySlot }}</li>
                        }
                      }
                    </ul>
                  </div>
                }
              </div>
            </div>

            <pre
              class="code"
              aria-label="docker"
            ><code><span class="tk-c"># docker-compose.yml (stack)</span>
<span class="tk-k">services</span>:
  <span class="tk-k">payment-api</span>:
    <span class="tk-k">deploy</span>:
      <span class="tk-k">replicas</span>: <span class="tk-s">{{ replicas() }}</span>
      <span class="tk-k">update_config</span>: {{ '{' }} order: start-first {{ '}' }}

<span class="tk-c"># live</span>
$ docker service scale payment-api=<span class="tk-s">{{ replicas() }}</span></code></pre>

            <ul class="points">
              @for (point of t().scale.points; track point.title) {
                <li>
                  <h4>{{ point.title }}</h4>
                  <p>{{ point.text }}</p>
                </li>
              }
            </ul>
          </div>

          <!-- 4. Evidencia -->
          <div class="block">
            <h3>{{ t().evidence.title }}</h3>
            <p class="block__lead">{{ t().evidence.intro }}</p>
            <app-diagram-carousel />
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

    /* Arquitecturas: ilustración + texto */
    .styles {
      display: grid;
      gap: var(--space-2);
    }

    .style {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      padding: var(--space-3);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      background: var(--surface);
      transition: border-color var(--dur-fast) var(--ease);
    }

    .style:hover {
      border-color: var(--primary);
    }

    .style__art {
      width: 100%;
      max-width: 11rem;
      height: auto;
    }

    .style__text p {
      margin-top: 0.375rem;
      font-size: var(--fs-small);
      line-height: 1.7;
      color: var(--text-2);
    }

    .s-box {
      fill: var(--bg);
      stroke: var(--border-strong);
      stroke-width: 1.5;
    }

    .s-box--on {
      stroke: var(--primary);
    }

    .s-fill {
      fill: var(--primary);
      opacity: 0.85;
    }

    .s-port {
      fill: var(--bg);
      stroke: var(--accent);
      stroke-width: 2;
    }

    .s-line {
      fill: none;
      stroke: var(--text-2);
      stroke-width: 1.4;
    }

    .s-bus {
      fill: var(--surface-2);
      stroke: var(--accent);
      stroke-width: 1.4;
    }

    .s-dot {
      fill: var(--accent);
      animation: bus 2.4s linear infinite;
    }

    .s-dot--2 {
      animation-delay: 0.8s;
    }

    .s-dot--3 {
      animation-delay: 1.6s;
    }

    @keyframes bus {
      from {
        opacity: 0;
        transform: translateX(0);
      }
      15% {
        opacity: 1;
      }
      85% {
        opacity: 1;
      }
      to {
        opacity: 0;
        transform: translateX(44px);
      }
    }

    .s-text {
      fill: var(--text-2);
      font-family: var(--font-sans);
      font-size: 10.5px;
    }

    /* Patrones */
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      min-height: 2.5rem;
      padding: 0 0.5rem 0 1rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
      background: transparent;
      font-size: var(--fs-small);
      color: var(--text-2);
      cursor: pointer;
      transition:
        border-color var(--dur-fast) var(--ease),
        color var(--dur-fast) var(--ease),
        background-color var(--dur-fast) var(--ease);
    }

    .chip:hover {
      border-color: var(--primary);
      color: var(--text);
    }

    .chip.is-on {
      border-color: var(--primary);
      background: var(--surface);
      color: var(--text);
    }

    .chip__count {
      display: grid;
      place-items: center;
      min-width: 1.5rem;
      height: 1.5rem;
      border-radius: var(--radius-pill);
      background: var(--surface-2);
      font-size: 0.75rem;
    }

    .chip.is-on .chip__count {
      background: var(--grad);
      color: var(--on-primary);
    }

    .patterns {
      display: grid;
      gap: var(--space-1);
      margin-top: var(--space-3);
    }

    .pattern {
      display: grid;
      gap: 0.25rem;
      padding: var(--space-2) var(--space-3);
      border: 1px solid var(--border);
      border-radius: var(--radius-field);
      background: var(--surface);
      animation: rise var(--dur-base) var(--ease) backwards;
    }

    .pattern:nth-child(2) {
      animation-delay: 60ms;
    }

    .pattern:nth-child(3) {
      animation-delay: 120ms;
    }

    .pattern:nth-child(4) {
      animation-delay: 180ms;
    }

    @keyframes rise {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
    }

    .pattern__name {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-mono);
      font-size: var(--fs-small);
      color: var(--soft);
    }

    .pattern__name::before {
      content: '';
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: var(--accent);
    }

    .pattern__use {
      font-size: var(--fs-small);
      line-height: 1.65;
      color: var(--text-2);
    }

    /* Selector de réplicas */
    .picker {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-1);
      margin-bottom: var(--space-2);
    }

    .picker__label {
      margin-right: var(--space-1);
      font-size: var(--fs-small);
      color: var(--text-2);
    }

    .picker__opt {
      min-width: 3rem;
      min-height: 2.5rem;
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-pill);
      background: transparent;
      font-family: var(--font-mono);
      cursor: pointer;
      transition:
        border-color var(--dur-fast) var(--ease),
        background-color var(--dur-fast) var(--ease);
    }

    .picker__opt:hover {
      border-color: var(--primary);
    }

    .picker__opt.is-on {
      border-color: transparent;
      background: var(--grad);
      color: var(--on-primary);
    }

    /* Maqueta del clúster */
    .swarm {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding: var(--space-3);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      background:
        linear-gradient(var(--grid) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(90deg, var(--grid) 1px, transparent 1px) 0 0 / 24px 24px,
        var(--surface);
    }

    .swarm__col {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .actor {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-width: 9rem;
      padding: 0.75rem 1rem;
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-field);
      background: var(--bg);
      font-size: var(--fs-small);
    }

    .actor--lb {
      flex-direction: column;
      gap: 0;
      border-color: var(--primary);
    }

    .actor__note {
      font-size: 0.75rem;
      color: var(--text-2);
    }

    .link {
      width: 2px;
      height: 1.75rem;
      background: repeating-linear-gradient(180deg, var(--accent) 0 6px, transparent 6px 12px);
      background-size: 2px 12px;
      animation: flow-y 0.7s linear infinite;
    }

    @keyframes flow-y {
      to {
        background-position: 0 12px;
      }
    }

    @keyframes flow-x {
      to {
        background-position: 12px 0;
      }
    }

    .cluster {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
      padding: var(--space-2);
      border: 1.5px dashed var(--accent);
      border-radius: var(--radius-card);
      background: var(--bg);
    }

    .cluster__title {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.04em;
      color: var(--accent);
    }

    .node {
      padding: var(--space-1) var(--space-2) var(--space-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-field);
      background: var(--surface);
    }

    .node__title {
      display: flex;
      justify-content: space-between;
      gap: var(--space-1);
      margin-bottom: 0.5rem;
      font-size: 0.8125rem;
      color: var(--text-2);
    }

    .node__id {
      font-family: var(--font-mono);
    }

    .slots {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.5rem;
    }

    .replica {
      display: grid;
      place-items: center;
      min-height: 2.25rem;
      padding: 0 0.25rem;
      border: 1px solid var(--primary);
      border-radius: 0.5rem;
      background: var(--surface-2);
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      animation: pop var(--dur-base) var(--ease) backwards;
    }

    .replica--empty {
      border-style: dashed;
      border-color: var(--border);
      background: transparent;
      color: var(--text-2);
      animation: none;
      opacity: 0.6;
    }

    @keyframes pop {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
    }

    .code {
      margin: var(--space-2) 0 0;
      padding: var(--space-2) var(--space-3);
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: var(--radius-field);
      background: var(--panel);
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      line-height: 1.7;
      color: var(--text);
    }

    .points {
      display: grid;
      gap: var(--space-2);
      margin-top: var(--space-3);
    }

    .points p {
      margin-top: 0.25rem;
      font-size: var(--fs-small);
      line-height: 1.7;
      color: var(--text-2);
    }

    .points li {
      padding-left: var(--space-2);
      border-left: 2px solid var(--accent);
    }

    @media (min-width: 48rem) {
      .styles {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .patterns {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .points {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .swarm {
        flex-direction: row;
        align-items: center;
        padding: var(--space-4);
      }

      .swarm__col {
        flex-direction: row;
        flex: none;
      }

      .link {
        width: 2rem;
        height: 2px;
        background: repeating-linear-gradient(90deg, var(--accent) 0 6px, transparent 6px 12px);
        background-size: 12px 2px;
        animation: flow-x 0.7s linear infinite;
      }

      .cluster {
        flex: 1;
        min-width: 0;
      }

      .replica {
        font-size: 0.75rem;
      }
    }

    @media (min-width: 75rem) {
      .section__intro {
        position: sticky;
        top: 8rem;
        align-self: start;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .link,
      .s-dot,
      .replica,
      .pattern {
        animation: none;
      }

      .s-dot {
        opacity: 1;
      }
    }
  `,
})
export class Architecture {
  private readonly i18n = inject(I18n);

  protected readonly t = computed(() => this.i18n.t().architecture);
  protected readonly options = REPLICA_OPTIONS;
  protected readonly replicas = signal<number>(3);
  protected readonly family = signal(0);

  protected readonly currentPatterns = computed(
    () => this.t().patterns.groups[this.family()].items,
  );

  /** Reparte las réplicas por turnos entre los nodos, como lo hace Swarm por defecto */
  protected readonly nodes = computed(() => {
    const total = this.replicas();
    return Array.from({ length: NODES }, (_, id) => ({
      id,
      slots: Array.from({ length: SLOTS_PER_NODE }, (_, slot) => {
        const replica = slot * NODES + id + 1;
        return { key: `${id}-${slot}`, replica: replica <= total ? replica : 0 };
      }),
    }));
  });
}
