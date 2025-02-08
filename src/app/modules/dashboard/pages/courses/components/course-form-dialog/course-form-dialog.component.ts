import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course';

/**
 * @description Componente de dialogo para la creaccion o edicion de cursos.
 * utiliza formularios reactivos para capturar la informacion del curso.
 */
@Component({
  selector: 'app-course-form-dialog',
  standalone: false,

  templateUrl: './course-form-dialog.component.html',
  styleUrl: './course-form-dialog.component.scss',
})
export class CourseFormDialogComponent implements OnInit {
  // defino el formulario para el curso.
  courseForm!: FormGroup;
  // Defini si el dialogo se abre en modo de edicion.
  isEditMode: boolean = false;

  /**
   *
   * @param fb FormBuilder para construir el componente.
   * @param dialogRef Referencia al dialogo abierto
   * @param data Datos inyectados; Contiene la informacion del curso en caso de
   * edicion, o null para la creacion del curso.
   */
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course | null
  ) {}

  /**
   * @description Inicializa el formulario reactivo y, si se esta en modo
   * edicion, precarga los datos del curso.
   */
  ngOnInit(): void {
    this.isEditMode = !!this.data;
    this.courseForm = this.fb.group({
      name: [this.data ? this.data.name : '', Validators.required],
      description: [
        this.data ? this.data.description : '',
        Validators.required,
      ],
      schedule: [this.data ? this.data.schedule : '', Validators.required],
    });

    console.log(this.courseForm);
  }

  /**
   * @description Cierra el Dialogo sin enviar datos.
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * @description Envia los datos del formulario si es valido.
   * Normaliza los datos (convierte a minusculas y elmina espacios extra) antes
   * de cerrar el dialogo
   */
  onSubmit(): void {
    if (this.courseForm.valid) {
      // Normaliza datos: nombre, descripcion a minusculas; schedule se recorta.(por ahora)
      const formData = {
        name: this.courseForm.value.name.trim().toLowerCase(),
        description: this.courseForm.value.description.trim().toLowerCase(),
        schedule: this.courseForm.value.schedule.trim().toLowerCase(),
      };

      if (this.isEditMode && this.data) {
        // Modo edicion: preserva el id del curso y actualiza los datos
        const updatedCourse: Course = { ...this.data, ...formData };
        this.dialogRef.close(updatedCourse);
      } else {
        // Modo creacion: se envia los datos normalizado (el servicio genera el id).
        this.dialogRef.close(formData);
      }
    } else {
      // ! marca toso los controles para mostrar errores de validacion
      this.courseForm.markAllAsTouched();
    }
  }
}
