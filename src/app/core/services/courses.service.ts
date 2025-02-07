import { Injectable } from '@angular/core';
import { Course } from '../../modules/dashboard/pages/courses/models/course';
import { generateRandomID } from '../../shared/utils/generateRandomID';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  // Array privado que almacena los cursos
  private courses: Course[] = [
    {
      id: generateRandomID(6),
      name: 'Programación Web con Angular',
      description:
        'Curso de desarrollo web utilizando Angular, enfocado en la creación de aplicaciones dinámicas.',
      schedule: 'Lunes y Miércoles 18:00 - 20:00',
    },
    {
      id: generateRandomID(6),
      name: 'JavaScript para Principiantes',
      description:
        'Introducción a JavaScript, cubriendo desde los fundamentos hasta técnicas básicas de programación.',
      schedule: 'Martes y Jueves 17:00 - 19:00',
    },
    {
      id: generateRandomID(6),
      name: 'Angular Avanzado',
      description:
        'Curso avanzado de Angular que aborda temas como servicios, rutas y modularidad.',
      schedule: 'Lunes y Miércoles 20:00 - 22:00',
    },
    {
      id: generateRandomID(6),
      name: 'Desarrollo Web Full Stack',
      description:
        'Curso integral de desarrollo web, combinando frontend con Angular y conceptos de backend.',
      schedule: 'Sábados 10:00 - 14:00',
    },
    {
      id: generateRandomID(6),
      name: 'UX/UI: Diseño de Interfaces',
      description:
        'Aprendé los principios del diseño UX/UI para crear interfaces atractivas y funcionales.',
      schedule: 'Viernes 16:00 - 18:00',
    },
    {
      id: generateRandomID(6),
      name: 'JavaScript Moderno',
      description:
        'Curso enfocado en las nuevas características de ECMAScript y la programación asíncrona.',
      schedule: 'Martes y Jueves 20:00 - 22:00',
    },
    {
      id: generateRandomID(6),
      name: 'Angular: Componentes y Servicios',
      description:
        'Profundizá en la creación de componentes y servicios en Angular para construir aplicaciones escalables.',
      schedule: 'Lunes y Miércoles 14:00 - 16:00',
    },
    {
      id: generateRandomID(6),
      name: 'Introducción al Desarrollo Web',
      description:
        'Curso básico que cubre HTML, CSS y fundamentos de JavaScript para el desarrollo web.',
      schedule: 'Martes y Jueves 10:00 - 12:00',
    },
    {
      id: generateRandomID(6),
      name: 'UX/UI Avanzado',
      description:
        'Curso avanzado de diseño de interfaces y experiencia de usuario, con proyectos prácticos para aplicar lo aprendido.',
      schedule: 'Viernes 18:00 - 20:00',
    },
    {
      id: generateRandomID(6),
      name: 'JavaScript y Frameworks',
      description:
        'Explorá los diferentes frameworks de JavaScript y aprendé a elegir el adecuado para cada proyecto.',
      schedule: 'Sábados 14:00 - 18:00',
    },
  ];

  // repaso: BehaviorSubject para manejar de forma reactiva el listado de cursos
  private coursesSubject = new BehaviorSubject<Course[]>(this.courses);

  /**
   * @description Retorna un obsevable con la lista de los cursos actuales.
   * @returns {Observable<Course[]>} Observable que emite la lista de cursos.
   *
   */
  getCourses(): Observable<Course[]> {
    return this.coursesSubject.asObservable();
  }

  /**
   * @description Agrega un nuevo curso.
   * @param { Omit<Course, 'id'>} newCourse - Objeto con la informacion del curso (sin id).
   */
  addCourse(newCourse: Omit<Course, 'id'>): void {
    const courseToAdd: Course = { id: generateRandomID(6), ...newCourse };
    this.courses.push(courseToAdd);
    this.coursesSubject.next([...this.courses]);
  }

  /**
   * @descripcion Actualiza un curso existente.
   * @param {string} id - Identificador del curso que se actualiza.
   * @param {Partial<Course>} updateData - Objeto con los campos a actualizar.
   */
  updateCourse(id: string, updateData: Partial<Course>): void {
    this.courses = this.courses.map((course) =>
      course.id === id ? { ...course, ...updateData } : course
    );
    this.coursesSubject.next([...this.courses]);
  }
  /**
   * @description Elimina un curso por su identificador
   * @param {string} id -Identificador del curso que se va eliminar.
   *
   */
  deleteCourse(id: string): void {
    this.courses = this.courses.filter((course) => course.id !== id);
    this.coursesSubject.next([...this.courses]);
  }

  constructor() {}
}
