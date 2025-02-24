import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * LABS: Aqui hay que implementar map de rxjs y entender mejor la logica
 * TODO: falta hacer este guard " Mas Serio "
 * @param route
 * @param state
 * @returns
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated() && authService.getUserRole() === 'admin') {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
