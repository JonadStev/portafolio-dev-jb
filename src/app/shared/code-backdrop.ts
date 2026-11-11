import { Component, computed, input } from '@angular/core';
import { Snippet, SnippetLang } from '../content/snippets';

type Kind = 'k' | 's' | 'c' | 'a' | 'n';

interface Token {
  text: string;
  kind: Kind;
}

const KEYWORDS: Record<SnippetLang, string[]> = {
  java: ['class', 'private', 'final', 'return', 'public', 'new', 'record', 'import'],
  sql: [
    'select',
    'from',
    'join',
    'on',
    'where',
    'order',
    'by',
    'desc',
    'fetch',
    'first',
    'rows',
    'only',
    'and',
    'as',
    'group',
    'trunc',
    'sysdate',
  ],
  bash: ['curl'],
};

// 1 comentario, 2 cadena, 3 anotación o indicador, 4 palabra, 5 resto
const TOKEN_RX =
  /(\/\/.*|--.*|#.*)|("[^"]*"|'[^']*')|(@\w+|\s-{1,2}[A-Za-z][\w-]*)|([A-Za-z_]\w*)|(\s+|[^\s])/g;

function tokenize(line: string, lang: SnippetLang): Token[] {
  const tokens: Token[] = [];
  for (const m of line.matchAll(TOKEN_RX)) {
    if (m[1]) tokens.push({ text: m[1], kind: 'c' });
    else if (m[2]) tokens.push({ text: m[2], kind: 's' });
    else if (m[3]) tokens.push({ text: m[3], kind: 'a' });
    else if (m[4]) {
      const isKeyword = KEYWORDS[lang].includes(m[4].toLowerCase());
      tokens.push({ text: m[4], kind: isKeyword ? 'k' : 'n' });
    } else tokens.push({ text: m[5], kind: 'n' });
  }
  return tokens;
}

/**
 * Fondo decorativo de las secciones oscuras: cuadrícula con degradado suave y un
 * fragmento de código didáctico. Es solo un complemento de diseño, no parte del
 * contenido responsive: se muestra únicamente en pantallas anchas, en el margen
 * derecho que queda libre porque el contenido mide 90rem y va centrado. En pantallas
 * menores no se muestra. `reach` indica cuántos rem puede meterse sobre el borde del
 * contenido: 12 en Stack (sus columnas son cortas) y 0 en las secciones cuyo texto
 * ocupa todo el ancho. Es decorativo, así que se oculta a lectores de pantalla.
 */
@Component({
  selector: 'app-code-backdrop',
  host: {
    'aria-hidden': 'true',
    '[class.near]': 'reach() > 0',
    '[class.far]': 'reach() === 0',
    '[style.--reach]': 'reach() + "rem"',
  },
  template: `
    <div class="bd">
      <div class="bd__fx"></div>
      <div class="bd__panel">
        <p class="bd__file">{{ snippet().file }}</p>
        <code class="bd__code">
          @for (line of lines(); track $index) {
            <span class="line">
              @for (t of line; track $index) {
                <span [class]="t.kind">{{ t.text }}</span>
              }
            </span>
          }
        </code>
      </div>
    </div>
  `,
  styles: `
    /* Adorno de pantallas anchas: en pantallas menores no se muestra */
    :host {
      display: none;
      pointer-events: none;
    }

    .bd {
      position: relative;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding: var(--space-5) 0;
    }

    /* Cuadrícula con degradado suave que se desvanece hacia todos los bordes */
    .bd__fx {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(var(--grid-card) 1px, transparent 1px) 0 0 / 2.5rem 2.5rem,
        linear-gradient(90deg, var(--grid-card) 1px, transparent 1px) 0 0 / 2.5rem 2.5rem,
        radial-gradient(ellipse 70% 55% at 75% 35%, var(--bd-glow-a), transparent 70%),
        radial-gradient(ellipse 60% 50% at 60% 75%, var(--bd-glow-b), transparent 70%);
      mask-image:
        linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%);
      mask-composite: intersect;
      -webkit-mask-composite: source-in;
    }

    .bd__panel {
      position: relative;
      min-width: 0;
      padding-inline: var(--space-3);
      font-family: var(--font-mono);
    }

    .bd__file {
      margin-bottom: var(--space-2);
      font-size: 0.75rem;
      color: var(--text-2);
    }

    .bd__code {
      display: block;
      font-size: 0.8125rem;
      line-height: 1.75;
      color: var(--text-2);
    }

    .line {
      display: block;
      min-height: 1.75em;
      white-space: pre;
    }

    .k {
      color: var(--soft);
    }

    .s {
      color: var(--accent);
    }

    .a {
      color: var(--primary);
    }

    .c {
      color: var(--text-2);
      font-style: italic;
      opacity: 0.75;
    }

    /* Pantallas anchas: el código va en el margen derecho, fuera del contenido */
    @media (min-width: 105rem) {
      :host(.near) {
        display: block;
        position: absolute;
        top: calc(var(--section-y) * -1);
        right: calc((100vw - 100%) / -2);
        bottom: calc(var(--section-y) * -1);
        width: min(40rem, calc(var(--reach) + (100vw - 100%) / 2));
        margin: 0;
      }

      :host(.near) .bd {
        height: 100%;
        margin-left: 0;
        padding: 0;
      }
    }

    @media (min-width: 134rem) {
      :host(.far) {
        display: block;
        position: absolute;
        top: calc(var(--section-y) * -1);
        right: calc((100vw - 100%) / -2);
        bottom: calc(var(--section-y) * -1);
        width: min(40rem, calc((100vw - 100%) / 2));
        margin: 0;
      }

      :host(.far) .bd {
        height: 100%;
        margin-left: 0;
        padding: 0;
      }
    }
  `,
})
export class CodeBackdrop {
  readonly snippet = input.required<Snippet>();
  /** Rem que puede invadir el borde del contenido en pantallas anchas */
  readonly reach = input(0);

  protected readonly lines = computed(() => {
    const { code, lang } = this.snippet();
    return code.split('\n').map((line) => tokenize(line, lang));
  });
}
