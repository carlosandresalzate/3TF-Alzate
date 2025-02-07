import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  ngOnInit(): void {
    console.log('Hola mundo');
  }
}
