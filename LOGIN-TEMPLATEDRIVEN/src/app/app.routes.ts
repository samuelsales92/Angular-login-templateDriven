import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
      },
      
      { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
      { path: '**', redirectTo: 'auth/login' }
   
];
