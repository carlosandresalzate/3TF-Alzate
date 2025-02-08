import { Component, OnInit } from '@angular/core';

//
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from './models/course';
//
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

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
    private dialog: MatDialog,
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
   * @description Abre el dialogo para crear o editar un curso.
   * @param {course} [course] - Curso a editar. Si es undefined, se abrira en modo de creacion.
   */
  openCourseFormDialog(course?: Course): void {
    const dialogRef = this.dialog.open(CourseFormDialogComponent, {
      width: '500px',
      data: course ? course : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (course) {
          // Modo Edicion: Actualiza el curso existente.
          this.coursesServices.updateCourse(course.id, result);
          this.showSnackbar(`${result.name} fue editado`);
        } else {
          // Modo creacion: Agrega un nuevo curso.
          this.coursesServices.addCourse(result);
          this.showSnackbar(`${result.name} fue creado`);
        }
      }
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
