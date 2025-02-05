import { Injectable } from '@angular/core';
import { Student } from '../../modules/dashboard/pages/students/models/student';
import { generateRandomID } from '../../shared/utils/generateRandomID';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  // TODO: Mejorar los comentarios

  private students: Student[] = [
    {
      id: generateRandomID(6),
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
    },
    {
      id: generateRandomID(6),
      name: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '123-555-7890',
    },
    {
      id: generateRandomID(6),
      name: 'Alice',
      lastName: 'Brown',
      email: 'alice.brown@example.com',
      phoneNumber: '123-456-8888',
    },
    {
      id: generateRandomID(6),
      name: 'Bob',
      lastName: 'Davis',
      email: 'bob.davis@example.com',
      phoneNumber: '123-456-1234',
    },
    {
      id: generateRandomID(6),
      name: 'Charlie',
      lastName: 'Evans',
      email: 'charlie.evans@example.com',
      phoneNumber: '555-456-7890',
    },
    {
      id: generateRandomID(6),
      name: 'Diana',
      lastName: 'Garcia',
      email: 'diana.garcia@example.com',
      phoneNumber: '123-999-7890',
    },
    {
      id: generateRandomID(6),
      name: 'Edward',
      lastName: 'Hill',
      email: 'edward.hill@example.com',
      phoneNumber: '456-123-7890',
    },
    {
      id: generateRandomID(6),
      name: 'Fiona',
      lastName: 'Johnson',
      email: 'fiona.johnson@example.com',
      phoneNumber: '987-456-7890',
    },
    {
      id: generateRandomID(6),
      name: 'George',
      lastName: 'King',
      email: 'george.king@example.com',
      phoneNumber: '123-456-0000',
    },
    {
      id: generateRandomID(6),
      name: 'Hannah',
      lastName: 'Lee',
      email: 'hannah.lee@example.com',
      phoneNumber: '123-333-7890',
    },
  ];

  private studentsSubject = new BehaviorSubject<Student[]>(this.students);
  students$ = this.studentsSubject.asObservable();

  constructor() {}

  /**
   * @description Obtiene la lista de estudiantes con un observable.
   * @returns
   */
  getStudents(): Observable<Student[]> {
    return this.students$;
  }

  /**
   * @description Agrega un nuevo estudiante
   * @param student
   */
  addStudents(student: Omit<Student, 'id'>): void {
    const newStudent: Student = { ...student, id: generateRandomID(6) };
    this.students.push(newStudent);
    this.studentsSubject.next([...this.students]);
  }

  /**
   * @description Actualiza un estudiante existente
   * @param id
   * @param updateStudent
   */
  updateStudent(id: string, updateStudent: Partial<Student>): void {
    this.students = this.students.map((student) =>
      student.id === id ? { ...student, ...updateStudent } : student
    );
    this.studentsSubject.next([...this.students]);
  }

  /**
   * @description Elimina un estudiante por su ID
   * @param id
   */
  deleteStudent(id: string): void {
    this.students = this.students.filter((student) => student.id !== id);
    this.studentsSubject.next([...this.students]);
  }
}
