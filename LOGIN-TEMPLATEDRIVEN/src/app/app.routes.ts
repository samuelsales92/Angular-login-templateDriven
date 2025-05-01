import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth.guard';


export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
      },
      
      {
        path: 'page',
        canActivate: [authGuard],
        loadChildren: () => 
            import('./features/pages/pages.routes').then(r => r.PAGE_ROUTES)
      },

      { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
      { path: '**', redirectTo: 'auth/login' },
];
