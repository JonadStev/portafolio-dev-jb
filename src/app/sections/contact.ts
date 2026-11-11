import { Component, inject, signal } from '@angular/core';
import { FORMSPREE_ID } from '../core/config';
import { I18n } from '../core/i18n';
import { Reveal } from '../shared/reveal';
import { SNIPPETS } from '../content/snippets';
import { CodeBackdrop } from '../shared/code-backdrop';
import { Orb } from '../shared/orb';

type Field = 'name' | 'email' | 'message';
const FIELDS: Field[] = ['name', 'email', 'message'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

@Component({
  selector: 'app-contact',
  imports: [Orb, CodeBackdrop, Reveal],
  template: `
    <section class="section" id="contacto" aria-labelledby="contact-title">
      <div class="section__inner">
        <div class="section__intro" appReveal>
          <h2 id="contact-title">{{ i18n.t().contact.title }}</h2>
          <p>{{ i18n.t().contact.intro }}</p>
          <app-orb [size]="13" top="11rem" left="3rem" [dur]="24" [delay]="2">
            <span class="tk-k">curl</span> -X POST <br />
            &nbsp;/api/contacto <br />
            &nbsp;-d '&#123;"msg":<br />
            &nbsp;<span class="tk-s">"hola"</span>&#125;'
          </app-orb>
          <app-orb
            logo="/logos/webp/linux.webp"
            [size]="4.5"
            top="22rem"
            left="13.5rem"
            [dur]="20"
            [delay]="5"
          />
        </div>
        <div class="section__body contact" appReveal="120">
          <div class="links">
            @for (link of i18n.t().contact.links; track link.label) {
              <div>
                <p class="links__label">{{ link.label }}</p>
                <a [href]="link.href" rel="noopener">{{ link.text }}</a>
              </div>
            }
            <a class="btn btn--secondary links__cv" [href]="i18n.t().cvUrl" download>{{
              i18n.t().contact.cv
            }}</a>
          </div>

          <form class="form" (submit)="submit($event)" novalidate>
            <div class="field">
              <label>
                {{ i18n.t().contact.form.name }}
                <input
                  type="text"
                  name="name"
                  autocomplete="name"
                  required
                  [class.is-invalid]="!!errors().name"
                  [attr.aria-invalid]="errors().name ? 'true' : null"
                  [attr.aria-describedby]="errors().name ? 'err-name' : null"
                  (input)="clearError('name')"
                />
              </label>
              @if (errors().name) {
                <span class="field__error" id="err-name" role="alert">{{ errors().name }}</span>
              }
            </div>
            <div class="field">
              <label>
                {{ i18n.t().contact.form.email }}
                <input
                  type="email"
                  name="email"
                  autocomplete="email"
                  required
                  [class.is-invalid]="!!errors().email"
                  [attr.aria-invalid]="errors().email ? 'true' : null"
                  [attr.aria-describedby]="errors().email ? 'err-email' : null"
                  (input)="clearError('email')"
                />
              </label>
              @if (errors().email) {
                <span class="field__error" id="err-email" role="alert">{{ errors().email }}</span>
              }
            </div>
            <div class="field">
              <label>
                {{ i18n.t().contact.form.message }}
                <textarea
                  name="message"
                  rows="5"
                  required
                  [class.is-invalid]="!!errors().message"
                  [attr.aria-invalid]="errors().message ? 'true' : null"
                  [attr.aria-describedby]="errors().message ? 'err-message' : null"
                  (input)="clearError('message')"
                ></textarea>
              </label>
              @if (errors().message) {
                <span class="field__error" id="err-message" role="alert">{{
                  errors().message
                }}</span>
              }
            </div>
            <!-- Campo trampa contra bots: las personas no lo ven ni lo llenan -->
            <input
              class="trap"
              type="text"
              name="_gotcha"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              aria-label="Leave empty"
            />
            <button class="btn btn--primary form__send" type="submit">
              {{
                status() === 'sending' ? i18n.t().contact.form.sending : i18n.t().contact.form.send
              }}
            </button>
            <p
              class="form__status"
              role="status"
              aria-live="polite"
              [class.is-error]="status() === 'error'"
            >
              @switch (status()) {
                @case ('sent') {
                  {{ i18n.t().contact.form.sent }}
                }
                @case ('error') {
                  {{ i18n.t().contact.form.error }}
                }
              }
            </p>
          </form>
        </div>
        <app-code-backdrop [snippet]="snippets.keycloak" />
      </div>
    </section>
  `,
  styles: `
    .contact {
      display: grid;
      gap: var(--space-5);
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 1.375rem;
    }

    .links a:not(.btn) {
      font-size: 1.0625rem;
      overflow-wrap: anywhere;
      transition: color var(--dur-fast) var(--ease);
    }

    .links a:not(.btn):hover {
      color: var(--soft);
    }

    .links__label {
      margin-bottom: 0.25rem;
      font-size: var(--fs-small);
      color: var(--text-2);
    }

    .links__cv {
      align-self: flex-start;
      margin-top: var(--space-1);
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: var(--fs-small);
      color: var(--text-2);
    }

    input,
    textarea {
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-field);
      background: var(--surface);
      color: var(--text);
      padding: 0 var(--space-2);
      font-size: 1rem;
      transition: border-color var(--dur-fast) var(--ease);
    }

    input {
      height: 3.25rem;
    }

    textarea {
      padding-block: 0.875rem;
      resize: vertical;
    }

    input:hover,
    textarea:hover {
      border-color: var(--primary);
    }

    .form__send {
      align-self: flex-start;
      min-height: 3.25rem;
      padding-inline: 2.25rem;
    }

    .form__status {
      min-height: 1.5rem;
      font-size: var(--fs-small);
      color: var(--accent);
    }

    .form__status.is-error {
      color: var(--text);
    }

    .trap {
      position: absolute;
      left: -9999px;
      width: 1px;
      height: 1px;
      opacity: 0;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    input.is-invalid,
    textarea.is-invalid {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
    }

    .field__error {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: var(--fs-small);
      color: var(--text);
    }

    .field__error::before {
      content: '!';
      display: grid;
      flex: none;
      place-items: center;
      width: 1.125rem;
      height: 1.125rem;
      border-radius: 50%;
      background: var(--accent);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--on-primary);
    }

    @media (min-width: 64rem) {
      .contact {
        grid-template-columns: 21rem minmax(0, 1fr);
        gap: 4rem;
      }
    }
  `,
})
export class Contact {
  protected readonly i18n = inject(I18n);
  protected readonly snippets = SNIPPETS;
  protected readonly status = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  protected readonly errors = signal<Partial<Record<Field, string>>>({});

  /** Al escribir en un campo se limpia su error */
  protected clearError(field: Field): void {
    if (this.errors()[field]) {
      this.errors.update((e) => ({ ...e, [field]: undefined }));
    }
  }

  /** Valida con JavaScript (sin los avisos nativos del navegador) y enfoca el primer error */
  private validate(form: HTMLFormElement, data: FormData): boolean {
    const text = this.i18n.t().contact.form;
    const value = (key: Field): string => String(data.get(key) ?? '').trim();
    const errors: Partial<Record<Field, string>> = {};

    if (!value('name')) {
      errors.name = text.required;
    }
    if (!value('email')) {
      errors.email = text.required;
    } else if (!EMAIL_PATTERN.test(value('email'))) {
      errors.email = text.invalidEmail;
    }
    if (!value('message')) {
      errors.message = text.required;
    }

    this.errors.set(errors);
    const first = FIELDS.find((field) => errors[field]);
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
    }
    return !first;
  }

  protected async submit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.status() === 'sending') {
      return;
    }
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    if (!this.validate(form, data)) {
      return;
    }
    // Los bots llenan el campo trampa: se simula el envío y no se manda nada
    if (String(data.get('_gotcha') ?? '') !== '') {
      this.status.set('sent');
      return;
    }
    for (const field of FIELDS) {
      data.set(field, String(data.get(field) ?? '').trim());
    }
    if (!FORMSPREE_ID) {
      this.status.set('error');
      return;
    }
    this.status.set('sending');
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        form.reset();
        this.status.set('sent');
      } else {
        this.status.set('error');
      }
    } catch {
      this.status.set('error');
    }
  }
}
