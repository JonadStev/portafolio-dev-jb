import {
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';

/**
 * Hace aparecer un elemento (opacidad y un leve desplazamiento) cuando entra en
 * pantalla. Si el elemento ya está a la vista al cargar, o la persona pidió menos
 * movimiento, no se toca: el contenido nunca queda oculto sin motivo.
 * Uso: `<div appReveal>` o `<div appReveal="120">` (retraso en ms).
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[class.reveal]': 'armed()',
    '[class.is-in]': 'shown()',
    '[style.--reveal-delay]': 'delay() + "ms"',
  },
})
export class Reveal {
  readonly delay = input(0, { alias: 'appReveal', transform: numberAttribute });

  protected readonly armed = signal(false);
  protected readonly shown = signal(false);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      // Ya visible al cargar: se deja tal cual, sin parpadeo
      if (this.el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        return;
      }
      this.armed.set(true);
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.shown.set(true);
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -8% 0px' },
      );
      observer.observe(this.el);
    });
  }
}
