import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { TransformationsComponent } from './pages/transformations/transformations.component';
import { PlanetsComponent } from './pages/planets/planets.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuardFn } from '@guards/auth-fn.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    canActivate: [authGuardFn],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'characters',
        component: CharactersComponent,
      },
      {
        path: 'transformations',
        component: TransformationsComponent,
      },
      {
        path: 'planets',
        component: PlanetsComponent,
      },
    ],
  },
];
