import { Component, EventEmitter, Output } from '@angular/core';
import { Theme, ThemeService } from '../../../../core/services/theme.service';

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
  themeSelected: Theme = this.isChecked ? 'dark' : 'light';

  constructor(private themeService: ThemeService) {}

  // TODO: esto se puede refactorizar usando inject(ThemeService): Se debe estudiar sobre como funciona la inyeccion de un servicio
  toggleTheme(): void {
    this.themeSelected = this.isChecked ? 'dark' : 'light';
    this.themeService.setTheme(this.themeSelected);
  }
}
