import { Component, OnInit } from '@angular/core';
import { Enrollments } from './models/enrollments';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Componente que muestra el listado de las inscripciones
 */
@Component({
  selector: 'app-enrollments',
  standalone: false,

  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss',
})
export class EnrollmentsComponent implements OnInit {
  /**
   * Array de inscripciones para mostrar la tabla
   */
  enrollments: Enrollments[] = [];

  displayedColumns: string[] = ['edit', 'student', 'course', 'date', 'delete'];

  constructor(
    private enrollmentsService: EnrollmentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @description se suscribe al servicio para obtener la lista actualizada de inscripciones
   */
  ngOnInit(): void {
    this.enrollmentsService.getEnrollments().subscribe((data) => {
      this.enrollments = data;
    });
  }

  /**
   * @description Muestra un snackbar con el mensaje indicado.
   * @param {string} message - mensaje que se va a mostrar
   */
  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
