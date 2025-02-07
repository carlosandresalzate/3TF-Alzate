import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';

// pipes
import { SharedModule } from '../../../../shared/shared.module';

//
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
  ],
})
export class CoursesModule {}
