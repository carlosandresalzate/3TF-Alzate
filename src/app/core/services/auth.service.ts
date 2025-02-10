import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO: Hacer un login primero un laboratorio y luego de prubas implementar
  // LABS: Simula si el usuario esta autendticado
  private isAuthenticated: boolean = false;

  // LABS: Rol del usuario (por ejemplo, 'admin' | 'user')
  private userRole: string = '';

  constructor() {}

  /**
   * LABS: Simula el proceso de login
   * @description Simula el proceso de login
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {boolean} True si las credenciales son correctas, false en caso
   * contrario
   */
  login(username: string, password: string): boolean {
    /**
     * LABS: Logica simulada: si el usuario es 'admin', asigna el rol 'admin',
     * de lo contrario 'user'
     */
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      this.userRole = 'admin';
      return true;
    } else if (username && password) {
      this.isAuthenticated = true;
      this.userRole = 'user';
      return true;
    }
    this.isAuthenticated = false;
    this.userRole = '';
    return false;
  }

  /**
   * @description Realiza el logout.
   */
  logout(): void {
    this.isAuthenticated = false;
    this.userRole = '';
  }

  /**
   * @description Devuelve el estado de autenticacion.
   * @returns {boolean} True si el usuario esta autenticado, false en caso
   * contrario.
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  /**
   * @description Devuelve el rol del usuario.
   * @returns {string} Rol del usuario (por ejemplo: 'admin' | 'user').
   */
  getUserRole(): string {
    return this.userRole;
  }
}
