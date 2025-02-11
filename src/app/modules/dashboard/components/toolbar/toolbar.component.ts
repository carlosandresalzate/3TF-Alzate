import { Component, EventEmitter, Output } from '@angular/core';
import { Theme, ThemeService } from '../../../../core/services/theme.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

/**
 * TODO: debe ser actualizado para usar signal (maneja el estado de manera reactiva y hace que los cambios se reflejen automaticamente)
 */
@Component({
  selector: 'app-toolbar',
  standalone: false,

  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  // envia un evento al componete padre
  @Output() toggleDrawer = new EventEmitter<void>();

  // defino la propiedad isChecked:boolean
  // TODO: puede salir de una base de datos con las configuraciones de usuario
  isChecked: boolean = false;

  // Agrego un label que defina si esta en el tema  'Light' | 'Dark'
  // feedback para el usuario.
  // themeSelected: Theme = this.isChecked ? 'dark' : 'light';
  themeSelected: Theme = 'light';

  // ? Informacion roll de usuario
  userRole: string = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {
    // ? Obtener el rol
    this.userRole = this.authService.getUserRole();

    // sincronizacion del estado actual del toggle con el tema actual
    const currentTheme = this.themeService.getCurrentTheme();
    this.isChecked = currentTheme === 'dark';
    this.themeSelected = currentTheme;
  }

  // TODO: esto se puede refactorizar usando inject(ThemeService): Se debe estudiar sobre como funciona la inyeccion de un servicio
  toggleTheme(): void {
    this.themeSelected = this.isChecked ? 'dark' : 'light';
    this.themeService.setTheme(this.themeSelected);
  }

  /**
   * @description Ejecuta el metodo logout, para cerrar la sesion.
   * Limpia el estado de autenticacion y redirige al usuario a la pantalla de login.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
