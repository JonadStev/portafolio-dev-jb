import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../core/i18n';

/**
 * Carrusel con tres vistas del mismo sistema (componentes, clases y secuencia).
 * Los diagramas son SVG propios: heredan los colores del tema y no pesan como imagen.
 */
@Component({
  selector: 'app-diagram-carousel',
  template: `
    <div class="carousel">
      <div class="carousel__tabs" role="tablist" [attr.aria-label]="ev().title">
        @for (slide of ev().slides; track slide.key; let i = $index) {
          <button
            type="button"
            role="tab"
            class="carousel__tab"
            [id]="'dg-tab-' + slide.key"
            [attr.aria-selected]="index() === i"
            [attr.aria-controls]="'dg-panel'"
            [attr.tabindex]="index() === i ? 0 : -1"
            [class.is-on]="index() === i"
            (click)="go(i)"
            (keydown.arrowright)="move(1)"
            (keydown.arrowleft)="move(-1)"
          >
            <span class="carousel__num" aria-hidden="true">{{ i + 1 }}</span>
            {{ slide.tab }}
          </button>
        }
      </div>

      <div class="carousel__frame">
        <button
          type="button"
          class="carousel__arrow carousel__arrow--prev"
          [attr.aria-label]="ev().prev"
          (click)="move(-1)"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <div
          class="carousel__panel"
          id="dg-panel"
          role="tabpanel"
          [attr.aria-labelledby]="'dg-tab-' + slide().key"
        >
          <div class="canvas" tabindex="0" [attr.aria-label]="slide().title">
            @switch (slide().key) {
              @case ('components') {
                <svg class="dg" viewBox="0 0 820 440" role="img" [attr.aria-label]="slide().alt">
                  <defs>
                    <marker
                      id="c-arr"
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="8"
                      markerHeight="8"
                      orient="auto-start-reverse"
                    >
                      <path d="M0 1l9 4-9 4z" class="arrowhead" />
                    </marker>
                  </defs>

                  <!-- Conexiones -->
                  <path class="line" d="M140 210H190" marker-end="url(#c-arr)" />
                  <path class="line" d="M310 190L400 62" marker-end="url(#c-arr)" />
                  <path class="line" d="M310 210H400" marker-end="url(#c-arr)" />
                  <path class="line" d="M550 185L640 70" marker-end="url(#c-arr)" />
                  <path class="line line--ext" d="M550 210H640" marker-end="url(#c-arr)" />
                  <path class="line line--async" d="M550 238L640 345" marker-end="url(#c-arr)" />
                  <path class="line line--async" d="M640 372H550" marker-end="url(#c-arr)" />

                  <!-- Cliente y gateway -->
                  <rect class="box" x="20" y="180" width="120" height="60" rx="10" />
                  <text class="t t--b" x="80" y="207" text-anchor="middle">Web client</text>
                  <text class="t t--s" x="80" y="226" text-anchor="middle">Angular</text>

                  <rect class="box box--accent" x="190" y="170" width="120" height="80" rx="10" />
                  <text class="t t--b" x="250" y="205" text-anchor="middle">API Gateway</text>
                  <text class="t t--s" x="250" y="225" text-anchor="middle">Traefik</text>

                  <!-- Servicios -->
                  <rect class="box" x="400" y="30" width="150" height="64" rx="10" />
                  <text class="t t--b" x="475" y="58" text-anchor="middle">Auth service</text>
                  <text class="t t--s" x="475" y="77" text-anchor="middle">
                    Keycloak · OAuth 2.0
                  </text>

                  <rect class="box box--accent" x="400" y="170" width="150" height="80" rx="10" />
                  <text class="t t--b" x="475" y="205" text-anchor="middle">Payment service</text>
                  <text class="t t--s" x="475" y="225" text-anchor="middle">Spring Boot</text>

                  <rect class="box" x="400" y="340" width="150" height="64" rx="10" />
                  <text class="t t--b" x="475" y="368" text-anchor="middle">
                    Notification service
                  </text>
                  <text class="t t--s" x="475" y="387" text-anchor="middle">Spring Boot</text>

                  <!-- Datos y mensajería -->
                  <rect class="box box--data" x="640" y="40" width="150" height="60" rx="10" />
                  <text class="t t--b" x="715" y="67" text-anchor="middle">Oracle DB</text>
                  <text class="t t--s" x="715" y="86" text-anchor="middle">Payments schema</text>

                  <rect class="box box--ext" x="640" y="180" width="150" height="60" rx="10" />
                  <text class="t t--b" x="715" y="207" text-anchor="middle">Interbank network</text>
                  <text class="t t--s" x="715" y="226" text-anchor="middle">external</text>

                  <rect class="box box--data" x="640" y="340" width="150" height="60" rx="10" />
                  <text class="t t--b" x="715" y="367" text-anchor="middle">Kafka</text>
                  <text class="t t--s" x="715" y="386" text-anchor="middle">payment-events</text>

                  <!-- Leyenda -->
                  <g transform="translate(20 330)">
                    <path class="line" d="M0 10H34" />
                    <text class="t t--s" x="44" y="14">REST</text>
                    <path class="line line--async" d="M0 38H34" />
                    <text class="t t--s" x="44" y="42">events</text>
                    <path class="line line--ext" d="M0 66H34" />
                    <text class="t t--s" x="44" y="70">external</text>
                  </g>
                </svg>
              }
              @case ('class') {
                <svg class="dg" viewBox="0 0 820 540" role="img" [attr.aria-label]="slide().alt">
                  <defs>
                    <marker
                      id="k-open"
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="8"
                      markerHeight="8"
                      orient="auto-start-reverse"
                    >
                      <path d="M1 1l8 4-8 4" class="arrowline" />
                    </marker>
                    <marker
                      id="k-tri"
                      viewBox="0 0 12 12"
                      refX="11"
                      refY="6"
                      markerWidth="11"
                      markerHeight="11"
                      orient="auto-start-reverse"
                    >
                      <path d="M1 1l10 5-10 5z" class="triangle" />
                    </marker>
                  </defs>

                  <!-- Relaciones -->
                  <path class="line" d="M220 57H300" marker-end="url(#k-open)" />
                  <path class="line line--dash" d="M410 170V94" marker-end="url(#k-tri)" />
                  <path class="line line--dash" d="M340 266L220 330" marker-end="url(#k-open)" />
                  <path class="line line--dash" d="M480 266L600 330" marker-end="url(#k-open)" />
                  <path class="line line--dash" d="M520 195L640 94" marker-end="url(#k-open)" />
                  <path class="line line--dash" d="M185 450V404" marker-end="url(#k-tri)" />
                  <path class="line line--dash" d="M615 450V404" marker-end="url(#k-tri)" />

                  <!-- Fila 1 -->
                  <g>
                    <rect class="box" x="20" y="20" width="200" height="74" rx="8" />
                    <path class="rule" d="M20 46H220" />
                    <text class="t t--b" x="120" y="39" text-anchor="middle">
                      PaymentController
                    </text>
                    <text class="t t--m" x="34" y="72">+ create(request)</text>
                  </g>
                  <g>
                    <rect class="box box--accent" x="300" y="20" width="220" height="74" rx="8" />
                    <path class="rule" d="M300 56H520" />
                    <text class="t t--s" x="410" y="34" text-anchor="middle">«interface»</text>
                    <text class="t t--b" x="410" y="50" text-anchor="middle">PaymentUseCase</text>
                    <text class="t t--m" x="314" y="80">+ execute(command)</text>
                  </g>
                  <g>
                    <rect class="box box--data" x="640" y="20" width="160" height="74" rx="8" />
                    <path class="rule" d="M640 46H800" />
                    <text class="t t--b" x="720" y="39" text-anchor="middle">Payment</text>
                    <text class="t t--m" x="654" y="64">- id, amount</text>
                    <text class="t t--m" x="654" y="82">- status</text>
                  </g>

                  <!-- Fila 2 -->
                  <g>
                    <rect class="box" x="300" y="170" width="220" height="96" rx="8" />
                    <path class="rule" d="M300 196H520" />
                    <text class="t t--b" x="410" y="189" text-anchor="middle">PaymentService</text>
                    <text class="t t--m" x="314" y="218">- gateway: PaymentGateway</text>
                    <text class="t t--m" x="314" y="236">- repo: PaymentRepository</text>
                    <text class="t t--m" x="314" y="254">+ execute(command)</text>
                  </g>

                  <!-- Fila 3: puertos -->
                  <g>
                    <rect class="box box--accent" x="60" y="330" width="250" height="74" rx="8" />
                    <path class="rule" d="M60 366H310" />
                    <text class="t t--s" x="185" y="344" text-anchor="middle">«interface»</text>
                    <text class="t t--b" x="185" y="360" text-anchor="middle">PaymentGateway</text>
                    <text class="t t--m" x="74" y="390">+ send(payment): Receipt</text>
                  </g>
                  <g>
                    <rect class="box box--accent" x="490" y="330" width="250" height="74" rx="8" />
                    <path class="rule" d="M490 366H740" />
                    <text class="t t--s" x="615" y="344" text-anchor="middle">«interface»</text>
                    <text class="t t--b" x="615" y="360" text-anchor="middle">
                      PaymentRepository
                    </text>
                    <text class="t t--m" x="504" y="390">+ save(payment)</text>
                  </g>

                  <!-- Fila 4: adaptadores -->
                  <g>
                    <rect class="box box--ext" x="60" y="450" width="250" height="66" rx="8" />
                    <path class="rule" d="M60 476H310" />
                    <text class="t t--b" x="185" y="469" text-anchor="middle">BanredAdapter</text>
                    <text class="t t--m" x="74" y="500">+ send(payment): Receipt</text>
                  </g>
                  <g>
                    <rect class="box box--ext" x="490" y="450" width="250" height="66" rx="8" />
                    <path class="rule" d="M490 476H740" />
                    <text class="t t--b" x="615" y="469" text-anchor="middle">
                      OraclePaymentRepository
                    </text>
                    <text class="t t--m" x="504" y="500">+ save(payment)</text>
                  </g>

                  <!-- Etiquetas de capa -->
                  <text class="t t--s t--layer" x="20" y="316">Domain ports</text>
                  <text class="t t--s t--layer" x="20" y="436">Adapters</text>
                </svg>
              }
              @case ('sequence') {
                <svg class="dg" viewBox="0 0 820 480" role="img" [attr.aria-label]="slide().alt">
                  <defs>
                    <marker
                      id="s-arr"
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="8"
                      markerHeight="8"
                      orient="auto-start-reverse"
                    >
                      <path d="M0 1l9 4-9 4z" class="arrowhead" />
                    </marker>
                    <marker
                      id="s-open"
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="8"
                      markerHeight="8"
                      orient="auto-start-reverse"
                    >
                      <path d="M1 1l8 4-8 4" class="arrowline" />
                    </marker>
                  </defs>

                  <!-- Líneas de vida -->
                  <path class="life" d="M80 62V462M250 62V462M420 62V462M590 62V462M740 62V462" />

                  <!-- Participantes -->
                  <rect class="box" x="30" y="20" width="100" height="42" rx="8" />
                  <text class="t t--b" x="80" y="46" text-anchor="middle">Client</text>
                  <rect class="box box--accent" x="190" y="20" width="120" height="42" rx="8" />
                  <text class="t t--b" x="250" y="46" text-anchor="middle">Gateway</text>
                  <rect class="box box--accent" x="360" y="20" width="120" height="42" rx="8" />
                  <text class="t t--b" x="420" y="46" text-anchor="middle">Payment svc</text>
                  <rect class="box box--ext" x="530" y="20" width="120" height="42" rx="8" />
                  <text class="t t--b" x="590" y="46" text-anchor="middle">Interbank</text>
                  <rect class="box box--data" x="690" y="20" width="100" height="42" rx="8" />
                  <text class="t t--b" x="740" y="46" text-anchor="middle">Kafka</text>

                  <!-- Activaciones -->
                  <rect class="act" x="244" y="108" width="12" height="318" rx="2" />
                  <rect class="act" x="414" y="212" width="12" height="190" rx="2" />

                  <!-- Mensajes -->
                  <path class="line" d="M80 108H244" marker-end="url(#s-arr)" />
                  <text class="t t--m t--msg" x="162" y="100" text-anchor="middle">
                    1 POST /payments + JWT
                  </text>

                  <path class="line" d="M256 144H296V172H256" marker-end="url(#s-arr)" />
                  <text class="t t--m t--msg" x="304" y="162">2 validate token</text>

                  <path class="line" d="M256 214H414" marker-end="url(#s-arr)" />
                  <text class="t t--m t--msg" x="335" y="206" text-anchor="middle">
                    3 forward request
                  </text>

                  <path class="line" d="M426 254H584" marker-end="url(#s-arr)" />
                  <text class="t t--m t--msg" x="505" y="246" text-anchor="middle">
                    4 transfer()
                  </text>

                  <path class="line line--dash" d="M584 292H426" marker-end="url(#s-open)" />
                  <text class="t t--m t--msg" x="505" y="284" text-anchor="middle">5 ack</text>

                  <path class="line line--async" d="M426 336H734" marker-end="url(#s-arr)" />
                  <text class="t t--m t--msg" x="580" y="328" text-anchor="middle">
                    6 publish PaymentCompleted
                  </text>

                  <path class="line line--dash" d="M414 386H256" marker-end="url(#s-open)" />
                  <text class="t t--m t--msg" x="335" y="378" text-anchor="middle">
                    7 201 Created
                  </text>

                  <path class="line line--dash" d="M244 424H86" marker-end="url(#s-open)" />
                  <text class="t t--m t--msg" x="165" y="416" text-anchor="middle">
                    8 201 Created
                  </text>
                </svg>
              }
            }
          </div>
          <p class="carousel__hint">{{ ev().scrollHint }}</p>
        </div>

        <button
          type="button"
          class="carousel__arrow carousel__arrow--next"
          [attr.aria-label]="ev().next"
          (click)="move(1)"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="carousel__caption">
        <h4>{{ slide().title }}</h4>
        <p>{{ slide().caption }}</p>
      </div>
    </div>
    <p class="note">{{ ev().note }}</p>
  `,
  styles: `
    :host {
      display: block;
    }

    .carousel {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .carousel__tabs {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }

    .carousel__tab {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      min-height: 2.5rem;
      padding: 0 1rem 0 0.5rem;
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

    .carousel__tab:hover {
      border-color: var(--primary);
      color: var(--text);
    }

    .carousel__tab.is-on {
      border-color: var(--primary);
      background: var(--surface);
      color: var(--text);
    }

    .carousel__num {
      display: grid;
      place-items: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: var(--surface-2);
      font-size: 0.75rem;
      font-weight: 500;
    }

    .carousel__tab.is-on .carousel__num {
      background: var(--grad);
      color: var(--on-primary);
    }

    .carousel__frame {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
    }

    .carousel__panel {
      min-width: 0;
      padding: var(--space-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      background:
        linear-gradient(var(--grid) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(90deg, var(--grid) 1px, transparent 1px) 0 0 / 24px 24px,
        var(--surface);
    }

    .canvas {
      overflow-x: auto;
      border-radius: calc(var(--radius-card) - 0.5rem);
      animation: dg-in var(--dur-base) var(--ease);
    }

    @keyframes dg-in {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
    }

    .dg {
      width: 100%;
      min-width: 42rem;
      height: auto;
      font-family: var(--font-sans);
    }

    .carousel__hint {
      margin-top: var(--space-1);
      font-size: 0.8125rem;
      text-align: center;
      color: var(--text-2);
    }

    .carousel__arrow {
      position: absolute;
      top: 50%;
      z-index: 2;
      display: none;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      margin-top: -1.375rem;
      border: 1px solid var(--border-strong);
      border-radius: 50%;
      background: var(--bg);
      color: var(--text);
      cursor: pointer;
      transition:
        border-color var(--dur-fast) var(--ease),
        transform var(--dur-fast) var(--ease);
    }

    .carousel__arrow:hover {
      border-color: var(--primary);
    }

    .carousel__arrow--prev {
      left: -1.375rem;
    }

    .carousel__arrow--next {
      right: -1.375rem;
    }

    .carousel__caption {
      max-width: 46rem;
    }

    h4 {
      margin: 0 0 0.25rem;
      font-size: 1.125rem;
      font-weight: 500;
    }

    .carousel__caption p,
    .note {
      font-size: var(--fs-small);
      line-height: 1.7;
      color: var(--text-2);
    }

    .note {
      margin-top: var(--space-2);
      font-style: italic;
    }

    /* Trazos del diagrama: todo sale de los tokens del tema */
    .box {
      fill: var(--bg);
      stroke: var(--border-strong);
      stroke-width: 1.5;
    }

    .box--accent {
      stroke: var(--primary);
    }

    .box--data {
      stroke: var(--accent);
    }

    .box--ext {
      stroke: var(--text-2);
      stroke-dasharray: 5 4;
    }

    .t {
      fill: var(--text);
      font-size: 14px;
    }

    .t--b {
      font-weight: 500;
    }

    .t--s {
      fill: var(--text-2);
      font-size: 12px;
    }

    .t--m {
      fill: var(--text-2);
      font-family: var(--font-mono);
      font-size: 12px;
    }

    .t--msg {
      fill: var(--text);
    }

    .t--layer {
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .line {
      fill: none;
      stroke: var(--soft);
      stroke-width: 1.6;
    }

    .line--async {
      stroke: var(--accent);
      stroke-dasharray: 2 5;
      stroke-linecap: round;
    }

    .line--ext,
    .line--dash {
      stroke: var(--text-2);
      stroke-dasharray: 6 4;
    }

    .rule {
      fill: none;
      stroke: var(--border-strong);
    }

    .life {
      fill: none;
      stroke: var(--border-strong);
      stroke-dasharray: 4 5;
    }

    .act {
      fill: var(--surface-2);
      stroke: var(--primary);
    }

    .arrowhead {
      fill: var(--soft);
    }

    .arrowline {
      fill: none;
      stroke: var(--text-2);
      stroke-width: 1.4;
    }

    .triangle {
      fill: var(--bg);
      stroke: var(--text-2);
      stroke-width: 1.2;
    }

    @media (min-width: 48rem) {
      .carousel__panel {
        padding: var(--space-3);
      }

      .carousel__arrow {
        display: grid;
      }

      .dg {
        min-width: 0;
      }

      .carousel__hint {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .canvas {
        animation: none;
      }
    }
  `,
})
export class DiagramCarousel {
  private readonly i18n = inject(I18n);

  protected readonly ev = computed(() => this.i18n.t().architecture.evidence);
  protected readonly index = signal(0);
  protected readonly slide = computed(() => this.ev().slides[this.index()]);

  protected go(i: number): void {
    this.index.set(i);
  }

  protected move(step: number): void {
    const total = this.ev().slides.length;
    this.index.update((i) => (i + step + total) % total);
  }
}
