import { Component, OnInit } from '@angular/core';

//
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from './models/course';
//
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  // Array de cursos que se muestran en la tabla
  courses: Course[] = [];

  // columnas que se mostraran en la tabla de angular material
  displayedColumns: string[] = [
    'edit',
    'name',
    'description',
    'schedule',
    'delete',
  ];

  constructor(
    private coursesServices: CoursesService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @description Metodo que se ejecuta al inicializar el componente.
   * se suscribe al servicio para obtener la lista de cursos.
   */
  ngOnInit(): void {
    this.coursesServices.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  /**
   * @description Muestra un snackbar con un mensaje
   * @param {string} message - Mensaje a mostrar en el snackbar.
   *
   */
  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  // Metodo para editar

  // TODO: falta agregar los metodos para editar y eliminar cursos. (¿Deberia hacer un utilidad para copartirla en diferentes modulos?)
}
