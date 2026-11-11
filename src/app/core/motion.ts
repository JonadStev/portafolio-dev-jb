import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

type Gsap = typeof import('gsap').gsap;

/**
 * Parallax con GSAP, cargado de forma diferida y solo en escritorio:
 *  - Los círculos del hero siguen suavemente al cursor.
 *  - Los círculos de cada sección suben a distinto ritmo mientras se hace scroll.
 * Con prefers-reduced-motion, en pantallas pequeñas o sin cursor fino, no hace nada.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  private gsap?: Gsap;
  private cleanups: (() => void)[] = [];
  private run = 0;

  /** Se llama una vez desde la aplicación, ya en el navegador */
  start(): void {
    const win = this.document.defaultView;
    if (!win || win.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if (!win.matchMedia('(min-width: 75rem) and (hover: hover) and (pointer: fine)').matches) {
      return;
    }

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      // Espera a que Angular pinte la página nueva antes de enlazar los elementos
      win.setTimeout(() => void this.setup(), 50);
    });
    void this.setup();
  }

  private async setup(): Promise<void> {
    this.teardown();
    const run = ++this.run;

    if (!this.gsap) {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      this.gsap = gsap;
    }
    // Si mientras tanto empezó otra configuración, esta ya no vale
    if (run !== this.run) {
      return;
    }
    const gsap = this.gsap;
    const doc = this.document;

    // Cursor: capas a distinta profundidad en el hero
    const hero = doc.querySelector<HTMLElement>('.hero');
    const orbs = doc.querySelector<HTMLElement>('.hero .orbs');
    const card = doc.querySelector<HTMLElement>('.hero .card-wrap');
    if (hero && orbs && card) {
      const orbsX = gsap.quickTo(orbs, 'x', { duration: 1.4, ease: 'power3.out' });
      const orbsY = gsap.quickTo(orbs, 'y', { duration: 1.4, ease: 'power3.out' });
      const cardX = gsap.quickTo(card, 'x', { duration: 1.1, ease: 'power3.out' });
      const cardY = gsap.quickTo(card, 'y', { duration: 1.1, ease: 'power3.out' });

      const onMove = (event: PointerEvent): void => {
        const rect = hero.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;
        orbsX(nx * -32);
        orbsY(ny * -22);
        cardX(nx * 10);
        cardY(ny * 8);
      };
      const onLeave = (): void => {
        orbsX(0);
        orbsY(0);
        cardX(0);
        cardY(0);
      };
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
      this.cleanups.push(() => {
        hero.removeEventListener('pointermove', onMove);
        hero.removeEventListener('pointerleave', onLeave);
        gsap.set([orbs, card], { clearProps: 'transform' });
      });
    }

    // Scroll: los círculos de cada sección suben a distinto ritmo
    const scrollOrbs = Array.from(doc.querySelectorAll<HTMLElement>('.section app-orb'));
    const context = gsap.context(() => {
      scrollOrbs.forEach((el, i) => {
        const section = el.closest('.section');
        if (!section) return;
        gsap.fromTo(
          el,
          { y: 40 },
          {
            y: -(40 + (i % 3) * 25),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    });
    this.cleanups.push(() => context.revert());
  }

  private teardown(): void {
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
  }
}
