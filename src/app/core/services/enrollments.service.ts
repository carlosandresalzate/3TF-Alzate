import { Injectable } from '@angular/core';
import { Enrollments } from '../../modules/dashboard/pages/enrollments/models/enrollments';
import { generateRandomID } from '../../shared/utils/generateRandomID';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * @description Servicio para gestionar la inscripcion
 */
@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  /**
   * Array privado que almacena las inscripciones
   * @private
   */
  private enrollments: Enrollments[] = [
    {
      id: generateRandomID(6),
      studentId: 'student1',
      courseId: 'course1',
      date: new Date('2023-01-15'),
    },
    {
      id: generateRandomID(6),
      studentId: 'student2',
      courseId: 'course2',
      date: new Date('2023-02-20'),
    },
  ];

  /**
   * BehaviorSubject para emitir la lista de inscripciones de forma reactiva
   */
  private enrollmentsSubject = new BehaviorSubject<Enrollments[]>(
    this.enrollments
  );

  constructor() {}

  /**
   * @description Retorna un observable con la lista actual de inscripciones
   * @returns {Observable<Enrollments[]>} observable que emite la lista de inscripciones
   */
  getEnrollments(): Observable<Enrollments[]> {
    return this.enrollmentsSubject.asObservable();
  }

  /**
   * @description Agrega una nueva inscripcion
   * @param {Omit<Enrollments, 'id'>} newEnrollment - Objeto con la Informacion de la Inscripcion
   */
  addEnrollment(newEnrollment: Omit<Enrollments, 'id'>): void {
    const enrollmentsToAdd: Enrollments = {
      id: generateRandomID(6),
      ...newEnrollment,
    };

    this.enrollments.push(enrollmentsToAdd);
    this.enrollmentsSubject.next([...this.enrollments]);
  }

  /**
   * @description Actualiza una inscripcion existente.
   * @param {string} id - Identificador de la inscripcion a actualizar.
   * @param {Partial<Enrollments>} updateData - Objeto con los campos a actualizar
   */
  updateEnrollment(id: string, updateData: Partial<Enrollments>): void {
    this.enrollments = this.enrollments.map((enrollment) =>
      enrollment.id === id ? { ...enrollment, updateData } : enrollment
    );
  }

  deleteEnrollment(id: string): void {
    this.enrollments = this.enrollments.filter(
      (enrollment) => enrollment.id !== id
    );
    this.enrollmentsSubject.next([...this.enrollments]);
  }
}
