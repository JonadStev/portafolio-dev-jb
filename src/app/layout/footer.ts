import { Component, inject } from '@angular/core';
import { I18n } from '../core/i18n';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <span>{{ i18n.t().footer.rights }}</span>
    </footer>
  `,
  styles: `
    .footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
      max-width: var(--maxw);
      margin-inline: auto;
      padding: var(--space-4) var(--gutter);
      border-top: 1px solid var(--border);
      font-size: var(--fs-small);
      color: var(--text-2);
    }
  `,
})
export class Footer {
  protected readonly i18n = inject(I18n);
}
