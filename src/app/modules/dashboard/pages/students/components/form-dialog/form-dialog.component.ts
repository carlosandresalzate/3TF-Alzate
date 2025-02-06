import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models/student';

@Component({
  selector: 'app-form-dialog',
  standalone: false,

  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class FormDialogComponent implements OnInit {
  studentForm!: FormGroup;
  // defino si es una edicion
  isEditMode: boolean = false;

  //
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student | null
  ) {}

  //
  ngOnInit(): void {
    // uso !! para convertir un valor en un booleano
    this.isEditMode = !!this.data;

    // configuracion de el formulario con validaciones
    this.studentForm = this.fb.group({
      name: [this.data ? this.data.name : '', Validators.required],
      lastName: [this.data ? this.data.lastName : '', Validators.required],
      email: [
        this.data ? this.data.email : '',
        [Validators.required, Validators.email],
      ],
      phoneNumber: [
        this.data ? this.data.phoneNumber : '',
        Validators.required,
      ],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      // Guarda los valores del formulario.
      let formData = this.studentForm.value;

      // normaliza los datos: los nombres y apellidos se guardan en minusculas,
      // y el correo tambien en minusculas.
      formData = {
        ...formData,
        name: formData.name.trim().toLowerCase(),
        lastName: formData.lastName.trim().toLowerCase(),
        email: formData.email.trim().toLowerCase(),
        phoneNumber: formData.phoneNumber.trim(),
      };

      if (this.isEditMode && this.data) {
        // Modo Edicion: Preserca el id y actualiza con los datos normalizados
        // Edicion, manteniendo el id
        const updatedStudent: Student = {
          ...this.data,
          ...formData,
        };
        this.dialogRef.close(updatedStudent);
      } else {
        // Modo creacion: envia los datos normalizados ( sin ID, ques e genera)
        this.dialogRef.close(formData);
      }
    } else {
      // Si el formulario no es valido, se marcan todos los controles como "touched", asi se marcan los errores en todos los campos.
      this.studentForm.markAllAsTouched();
    }
  }
}
