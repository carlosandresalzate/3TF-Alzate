import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // defino el valor por defecto de la propiedad opened que usa MatDrawer para definir el metodo .toggle();
  isOpen: boolean = false;
}
