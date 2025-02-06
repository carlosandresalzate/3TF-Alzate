import { Component, OnInit } from '@angular/core';

import { StudentsService } from '../../../../core/services/students.service';
import { Student } from './models/student';

import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  // Variable para guardar los estudiantes.
  students: Student[] = [];

  // Definicion de las columnas que se van a mostrar en la tabla
  displayedColumns: string[] = [
    'edit',
    'name',
    'lastName',
    'email',
    'phoneNumber',
    'delete',
  ];

  // ---
  constructor(
    private studentsService: StudentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Nos suscribimos al Obsrevable de estudiantes
    this.studentsService.getStudents().subscribe((data) => {
      console.log('Datos recibidos: ', data);
      this.students = data;
    });
  }

  /**
   * @description Este metodo abre una ventana de dialogo para cancelar o confirmar la la eliminacion de un estudiante.
   * @param student
   */
  openDeleteDialog(student: Student): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: student,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.studentsService.deleteStudent(student.id);
        this.showSnackbar(`${student.name} ${student.lastName}`);
      }
    });
  }

  openFormDialog(student?: Student): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: student ? student : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (student) {
          // Modo edicion
          this.studentsService.updateStudent(student.id, result);
          this.showSnackbar(`${result.name} fue editado`);
        } else {
          // Modo creacion
          this.studentsService.addStudents(result);
          this.showSnackbar(`${result.name} fue creado`);
        }
      }
    });
  }

  showSnackbar(studentName: string): void {
    this.snackBar.open(`${studentName} fue eliminado`, `Cerrar`, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
