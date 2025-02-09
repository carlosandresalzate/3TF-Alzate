import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // Rutas existentes: Home, Students
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'students',
        loadChildren: () =>
          import('./pages/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./pages/courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'enrollments',
        loadChildren: () =>
          import('./pages/enrollments/enrollments.module').then(
            (m) => m.EnrollmentsModule
          ),
      },
      {
        path: '',
        redirectTo: 'enrollments',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
