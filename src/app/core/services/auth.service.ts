import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, of, throwError } from 'rxjs';
import { User } from '../../shared/models/user';
import { LoginPayload } from '../../modules/auth/models/login-payload';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO: Hacer un login primero un laboratorio y luego de prubas implementar
  // LABS: Simula si el usuario esta autendticado
  //! private isAuthenticated: boolean = false;

  // LABS: Rol del usuario (por ejemplo, 'admin' | 'user')
  //! private userRole: string = '';

  constructor(private httpClient: HttpClient, private router: Router) {}

  /**
   * LABS: Simula el proceso de login
   * @description Simula el proceso de login
   * @returns {void}
   */
  login(payload: LoginPayload): void {
    this.httpClient
      .get<User[]>(
        `${environment.apiUrl}/users?email=${payload.email}&password=${payload.password}`
      )
      .pipe(
        map((users: User[]) => {
          if (users.length === 0) {
            throw new Error('Email o contraseña invalidos');
          }
          return users[0];
        }),
        catchError((err: HttpErrorResponse) => {
          // TODO: cambiar los console por snackbar o dialog
          // manejo de errores: si el servidor no responde o da error
          if (err.status === 0) {
            console.log(
              'Esto debe ser un mensaje de error en un dialog o snackbar'
            );
            console.error('Error de coneccion: El servidor puede estar caido');
          } else {
            console.error(`Error en el servidor: ${err.message}`);
          }
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (user: User) => {
          // Se genera un token (Simulado)
          const token = this.generateToken();
          // Se Guarda la sesion en localStorage con expiracion a la media noche
          this.storeSession(token, user);
          // Opcional: Su se usa NgRx, Se puede despachar la accion para setear
          // el usuario autenticado.
          // this.store.dispach(AuthActions.setAuthUser({user}))
          // Luego se redirige a el dashboard o la que sea ruta principal.
          this.router.navigate(['/dashboard/home']);
        },
        error: (err) => {
          console.error('Error en el login: ', err);
        },
      });
  }

  private generateToken(): string {
    // funcion para simular la generacion d eun token ( se puede remplazar por una funcion, con mejor validacion, escalable y alojada en utilidades)
    return Math.random().toString(36).substring(2);
  }

  private storeSession(token: string, user: User): void {
    const now = new Date();
    const expiration = new Date();
    expiration.setHours(24, 0, 0, 0);
    const session = {
      token,
      user,
      expiration: expiration.getTime(),
    };
    localStorage.setItem('session', JSON.stringify(session));
  }

  /**
   * @description Realiza el logout.
   */
  logout(): void {
    // this.isAuthenticated = false;
    // this.userRole = '';
    localStorage.removeItem('session');
    this.router.navigate(['/auth/login']);
  }

  /**
   * @description Metodo para verificar si la sesion es valida
   */
  isAuthenticated(): boolean {
    const sessionStr = localStorage.getItem('session');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      if (new Date().getTime() < session.expiration) {
        return true;
      } else {
        this.logout();
      }
    }
    return false;
  }

  /**
   * @description Devuelve el estado de autenticacion.
   * @returns {boolean} True si el usuario esta autenticado, false en caso
   * contrario.
   */
  // isLoggedIn(): boolean {
  //   const sessionStr = localStorage.getItem('session');
  //   if (sessionStr) {
  //     const session = JSON.parse(sessionStr);
  //     if (new Date().getTime() < session.expiration) {
  //       return true;
  //     } else {
  //       this.logout();
  //       return false;
  //     }
  //   }
  //   return false;
  // }

  /**
   * @description Devuelve el rol del usuario.
   * @returns {string} Rol del usuario (por ejemplo: 'admin' | 'user').
   */
  getUserRole(): string | null {
    const sessionStr = localStorage.getItem('session');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      if (new Date().getTime() < session.expiration) {
        return session.user.role;
      }
    }
    return null;
  }
}
