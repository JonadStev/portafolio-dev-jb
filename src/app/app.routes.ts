import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'es' },
  { path: 'es', component: Home, data: { lang: 'es' } },
  { path: 'en', component: Home, data: { lang: 'en' } },
  { path: '**', redirectTo: 'es' },
];
