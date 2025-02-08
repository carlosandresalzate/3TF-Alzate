import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';

// pipes
import { SharedModule } from '../../../../shared/shared.module';

//
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CoursesComponent, CourseFormDialogComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class CoursesModule {}
