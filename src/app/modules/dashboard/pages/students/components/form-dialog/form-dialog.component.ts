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
      if (this.isEditMode && this.data) {
        // Edicion, manteniendo el id
        const updatedStudent: Student = {
          ...this.data,
          ...this.studentForm.value,
        };
        this.dialogRef.close(updatedStudent);
      } else {
        // Creacion, envio de datos sin el id (El Servicio student.service.ts genera el id)
        this.dialogRef.close(this.studentForm.value);
      }
    }
  }
}
