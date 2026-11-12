import { Component } from '@angular/core';
import { About } from '../../sections/about';
import { Ai } from '../../sections/ai';
import { Architecture } from '../../sections/architecture';
import { Contact } from '../../sections/contact';
import { Experience } from '../../sections/experience';
import { Hero } from '../../sections/hero';
import { Projects } from '../../sections/projects';
import { Stack } from '../../sections/stack';
import { Testimonials } from '../../sections/testimonials';

@Component({
  selector: 'app-home',
  imports: [Hero, About, Stack, Architecture, Ai, Projects, Experience, Testimonials, Contact],
  template: `
    <app-hero />
    <app-about />
    <app-stack />
    <app-architecture />
    <app-ai />
    <app-projects />
    <app-experience />
    <app-testimonials />
    <app-contact />
  `,
})
export class Home {}
