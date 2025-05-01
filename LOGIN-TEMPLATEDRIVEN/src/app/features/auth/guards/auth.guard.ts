import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('auth-token');

  if (token === 'fake-jwt-token') {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
