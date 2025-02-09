import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';

import { SharedModule } from '../../../../shared/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [EnrollmentsComponent],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    SharedModule,
  ],
})
export class EnrollmentsModule {}
