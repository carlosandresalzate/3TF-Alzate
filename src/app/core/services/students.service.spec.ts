/**
 * @file student.service.spec.ts
 * @description Test unitarios para el servicio StudentsService
 */
import { TestBed } from '@angular/core/testing';
import { StudentsService } from './students.service';
import { take } from 'rxjs';

/**
 * @description Grupo de tests para StudentsService
 */
describe('StudentsService', () => {
  let studentsService: StudentsService; // crea una instancia del componente para trabajar con los test

  /**
   * @description Se ejecuta antes de cada test "it()"", configura e inyecta el servicio.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentsService],
    });
    studentsService = TestBed.inject(StudentsService);
  });

  /**
   * @description Defino un test donde veo si el servicio se instancia
   */
  it('should be created', () => {
    expect(studentsService).toBeTruthy();
  });

  /**
   * @description Prueba que getStudents retorne una lista inicial de estuantes (no vacia).
   */
  it('should return a non-empty list of students', (done: DoneFn) => {
    studentsService
      .getStudents()
      .pipe(take(1))
      .subscribe((students) => {
        expect(students).toBeTruthy();
        expect(students.length).toBeGreaterThan(0);
        done();
      });
  });

  /**
   * @description Verifica que se pueda agregar un nuevo estudiante a la lista.
   */
  it('should add a new student', (done: DoneFn) => {
    const newStudent = {
      name: 'Test',
      lastName: 'User',
      email: 'test.user@example.com',
      phoneNumber: '123-456-9999',
    };

    studentsService.addStudents(newStudent);

    studentsService
      .getStudents()
      .pipe(take(1))
      .subscribe((students) => {
        const addedStudent = students.find(
          (students) => students.email === newStudent.email
        );
        expect(addedStudent).toBeTruthy(); // Aqui verifica que exista en la lista
        expect(addedStudent?.name).toBe(newStudent.name); // aqui verifica los datos guardados.
        done();
      });
  });

  /**
   * @description Prueba la funcionalidad de updateStudent para actualizar la informacion de un estudiante.
   */
  it('should update an existing student', (done: DoneFn) => {
    // Toma el primer estudiante existente
    studentsService
      .getStudents()
      .pipe(take(1))
      .subscribe((students) => {
        const originalStudent = students[0];
        const updatedName = 'UpdatedName';

        // Actualiza el estudiante
        studentsService.updateStudent(originalStudent.id, {
          name: updatedName,
        });

        studentsService
          .getStudents()
          .pipe(take(1))
          .subscribe((updatedStudents) => {
            const updatedStudent = updatedStudents.find(
              (s) => s.id === originalStudent.id
            );
            expect(updatedStudent?.name).toBe(updatedName);
            done();
          });
      });
  });

  /**
   * @description Verifica que se pueda eliminar un estudiante por su ID
   */
  it('should delete a student by id', (donde: DoneFn) => {
    // Se toma el primer estudiante existente y se guarda el id
    studentsService
      .getStudents()
      .pipe(take(1))
      .subscribe((students) => {
        const studentToDelete = students[0];
        const studentId = studentToDelete.id;

        // Se elimina el estudiante
        studentsService.deleteStudent(studentId);

        studentsService
          .getStudents()
          .pipe(take(1))
          .subscribe((updatedStudents) => {
            const deleteStudent = updatedStudents.find(
              (s) => s.id === studentId
            );

            // deberia ser undefined, por que se borro.
            expect(deleteStudent).toBeUndefined();
            donde();
          });
      });
  });
});
