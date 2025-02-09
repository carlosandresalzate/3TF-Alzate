import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  standalone: false,

  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  routes = [
    { path: '/home', label: 'Home' },
    { path: '/students', label: 'Estudiantes' },
    { path: '/courses', label: 'Cursos' },
    { path: '/enrollments', label: 'Inscripciones' },
  ];
}
