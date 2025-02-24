import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: false,

  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  /** implementacion de un array de rutas */
  routes: { path: string; label: string }[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    // const role = this.authService.getUserRole();
    // rutas basicas para todos los usuarios:
    this.routes = [
      { path: '/dashboard/home', label: 'Home' },
      { path: '/dashboard/enrollments', label: 'Inscripciones' },
    ];

    // rutas adicionales para administradoes
    if (role === 'admin') {
      this.routes.push(
        { path: '/dashboard/students', label: 'Estudiantes' },
        { path: '/dashboard/courses', label: 'Cursos' }
      );
    }
  }

  // routes = [
  //   { path: '/home', label: 'Home' },
  //   { path: '/students', label: 'Estudiantes' },
  //   { path: '/courses', label: 'Cursos' },
  //   { path: '/enrollments', label: 'Inscripciones' },
  // ];
}
