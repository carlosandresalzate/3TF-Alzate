import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * @description Guard que protege las rutas para usuarios autenticados.
 * @param route
 * @param state
 * @returns
 */

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Aqui se deberia implemetar una logica de autenticacion
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
