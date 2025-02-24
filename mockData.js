/**
 * @file mockData.js
 * @description Estructura de datos simulada para json-server con:
 *  - users
 *  - students
 *  - teachers
 *  - courses
 *
 * Cada entidad tiene IDs alfanuméricos de 6 caracteres (por ejemplo: "usr001").
 *
 * NOTA sobre las relaciones:
 *  - El curso guarda teacherId para saber qué profesor lo dicta (1 profesor por curso).
 *  - El curso guarda studentsEnrolledIds para saber qué estudiantes están inscriptos.
 *  - Cada student mantiene:
 *       activeCoursesId => IDs de cursos activos
 *       completedCourses => [{ courseId, approved }]
 *  - El teacher mantiene coursesId => IDs de cursos que imparte.
 *
 * @example
 *   Para usar con json-server:
 *   1) Copia el objeto (sin JSDoc) a db.json
 *   2) npx json-server --watch db.json --port 3000
 */

/**
 * @typedef {Object} User
 * @property {string} id - ID único del usuario (6 caracteres alfanuméricos).
 * @property {string} username - Nombre de usuario para login.
 * @property {string} email - Correo electrónico.
 * @property {string} password - Contraseña.
 * @property {string} role - Rol del usuario (e.g. 'admin' o 'user').
 * @property {string} name - Nombre real de la persona.
 * @property {string} lastName - Apellido de la persona.
 * @property {string} phoneNumber - Número de teléfono de contacto.
 */

/**
 * @typedef {Object} Student
 * @property {string} id - ID único del estudiante (6 caracteres alfanuméricos).
 * @property {string} name - Nombre del estudiante.
 * @property {string} lastName - Apellido del estudiante.
 * @property {string} email - Correo electrónico de contacto.
 * @property {string} phoneNumber - Teléfono de contacto.
 * @property {string[]} activeCoursesId - Lista de IDs de cursos que está cursando.
 * @property {{ courseId: string, approved: boolean }[]} completedCourses - Cursos finalizados y si los aprobó.
 */

/**
 * @typedef {Object} Teacher
 * @property {string} id - ID único del profesor (6 caracteres alfanuméricos).
 * @property {string} name - Nombre del profesor.
 * @property {string} lastName - Apellido del profesor.
 * @property {string} email - Correo electrónico de contacto.
 * @property {string} phoneNumber - Teléfono de contacto.
 * @property {string} expertise - Área de experiencia (p.ej. 'Angular').
 * @property {string[]} coursesId - Lista de IDs de cursos que imparte.
 */

/**
 * @typedef {Object} Course
 * @property {string} id - ID único del curso (6 caracteres alfanuméricos).
 * @property {string} title - Título o nombre del curso.
 * @property {string} teacherId - ID del profesor que lo dicta (1 profesor por curso).
 * @property {string[]} studentsEnrolledIds - IDs de estudiantes inscritos en el curso.
 * @property {string} startDate - Fecha de inicio (formato libre, ej. '2025-03-01').
 * @property {string} endDate - Fecha de finalización (formato libre, ej. '2025-06-01').
 * @property {string[]} daysOfWeek - Días de cursada (ej. ['Monday','Wednesday'] o ['Saturday']).
 * @property {string} schedule - Horario de la cursada (ej. '09:00 - 11:00' o '09:00 - 13:00').
 * @property {string} description - Breve descripción del curso.
 */

/**
 * Estructura completa de la base de datos simulada.
 * @type {{
*   users: User[],
*   students: Student[],
*   teachers: Teacher[],
*   courses: Course[]
* }}
*/
const mockData = {
 users: [
   {
     id: "usr001",
     username: "admin1",
     email: "admin1@example.com",
     password: "admin1pwd",
     role: "admin",
     name: "Alice",
     lastName: "Doe",
     phoneNumber: "555-1111",
   },
   {
     id: "usr002",
     username: "admin2",
     email: "admin2@example.com",
     password: "admin2pwd",
     role: "admin",
     name: "Bob",
     lastName: "Jones",
     phoneNumber: "555-2222",
   },
   {
     id: "usr003",
     username: "user1",
     email: "user1@example.com",
     password: "user1pwd",
     role: "user",
     name: "Charlie",
     lastName: "Smith",
     phoneNumber: "555-3333",
   },
   {
     id: "usr004",
     username: "user2",
     email: "user2@example.com",
     password: "user2pwd",
     role: "user",
     name: "Dana",
     lastName: "Brown",
     phoneNumber: "555-4444",
   },
   {
     id: "usr005",
     username: "user3",
     email: "user3@example.com",
     password: "user3pwd",
     role: "user",
     name: "Eve",
     lastName: "Watson",
     phoneNumber: "555-5555",
   },
 ],

 students: [
   {
     id: "std001",
     name: "Juan",
     lastName: "Gonzalez",
     email: "juan.gonzalez@example.com",
     phoneNumber: "555-1001",
     activeCoursesId: ["crs001"],
     completedCourses: [{ courseId: "crs003", approved: true }],
   },
   {
     id: "std002",
     name: "Ana",
     lastName: "Garcia",
     email: "ana.garcia@example.com",
     phoneNumber: "555-1002",
     activeCoursesId: ["crs002"],
     completedCourses: [],
   },
   {
     id: "std003",
     name: "Pedro",
     lastName: "Rodriguez",
     email: "pedro.rodriguez@example.com",
     phoneNumber: "555-1003",
     activeCoursesId: [],
     completedCourses: [],
   },
   {
     id: "std004",
     name: "Lucia",
     lastName: "Hernandez",
     email: "lucia.hernandez@example.com",
     phoneNumber: "555-1004",
     activeCoursesId: [],
     completedCourses: [{ courseId: "crs001", approved: false }],
   },
   {
     id: "std005",
     name: "Miguel",
     lastName: "Torres",
     email: "miguel.torres@example.com",
     phoneNumber: "555-1005",
     activeCoursesId: ["crs002"],
     completedCourses: [],
   },
   {
     id: "std006",
     name: "Elena",
     lastName: "Alvarez",
     email: "elena.alvarez@example.com",
     phoneNumber: "555-1006",
     activeCoursesId: [],
     completedCourses: [],
   },
   {
     id: "std007",
     name: "Sergio",
     lastName: "Ramos",
     email: "sergio.ramos@example.com",
     phoneNumber: "555-1007",
     activeCoursesId: ["crs005"],
     completedCourses: [{ courseId: "crs003", approved: true }],
   },
   {
     id: "std008",
     name: "Laura",
     lastName: "Vega",
     email: "laura.vega@example.com",
     phoneNumber: "555-1008",
     activeCoursesId: ["crs005"],
     completedCourses: [],
   },
   {
     id: "std009",
     name: "Carlos",
     lastName: "Gomez",
     email: "carlos.gomez@example.com",
     phoneNumber: "555-1009",
     activeCoursesId: [],
     completedCourses: [],
   },
   {
     id: "std010",
     name: "Valentina",
     lastName: "Castro",
     email: "valentina.castro@example.com",
     phoneNumber: "555-1010",
     activeCoursesId: ["crs001", "crs004"],
     completedCourses: [],
   },
 ],

 teachers: [
   {
     id: "tch001",
     name: "Carlos",
     lastName: "Perez",
     email: "carlos.perez@school.com",
     phoneNumber: "555-2001",
     expertise: "Angular",
     coursesId: ["crs001", "crs002"],
   },
   {
     id: "tch002",
     name: "Maria",
     lastName: "Lopez",
     email: "maria.lopez@school.com",
     phoneNumber: "555-2002",
     expertise: "Node.js",
     coursesId: ["crs003", "crs004"],
   },
   {
     id: "tch003",
     name: "John",
     lastName: "Smith",
     email: "john.smith@school.com",
     phoneNumber: "555-2003",
     expertise: "React",
     coursesId: ["crs005"],
   },
   {
     id: "tch004",
     name: "Laura",
     lastName: "Johnson",
     email: "laura.johnson@school.com",
     phoneNumber: "555-2004",
     expertise: "UI/UX",
     coursesId: [],
   },
   {
     id: "tch005",
     name: "Sarah",
     lastName: "Davis",
     email: "sarah.davis@school.com",
     phoneNumber: "555-2005",
     expertise: "Web Design",
     coursesId: [],
   },
 ],

 courses: [
   {
     id: "crs001",
     title: "Angular Basics",
     teacherId: "tch001",
     studentsEnrolledIds: ["std001", "std010"],
     startDate: "2025-03-01",
     endDate: "2025-05-01",
     daysOfWeek: ["Monday", "Wednesday"],
     schedule: "09:00 - 11:00",
     description: "Introducción a Angular, sus conceptos principales y creación de componentes básicos."
   },
   {
     id: "crs002",
     title: "Advanced Angular",
     teacherId: "tch001",
     studentsEnrolledIds: ["std002", "std005"],
     startDate: "2025-03-01",
     endDate: "2025-06-01",
     daysOfWeek: ["Tuesday", "Thursday"],
     schedule: "18:00 - 20:00",
     description: "Curso avanzado de Angular, cubriendo módulos, lazy loading y optimización de performance."
   },
   {
     id: "crs003",
     title: "Node.js Fundamentals",
     teacherId: "tch002",
     studentsEnrolledIds: [],
     startDate: "2025-02-15",
     endDate: "2025-04-15",
     daysOfWeek: ["Saturday"],
     schedule: "09:00 - 13:00",
     description: "Aprende los fundamentos de Node.js, su entorno y la creación de APIs sencillas."
   },
   {
     id: "crs004",
     title: "Node.js Microservices",
     teacherId: "tch002",
     studentsEnrolledIds: ["std010"],
     startDate: "2025-04-20",
     endDate: "2025-07-20",
     daysOfWeek: ["Saturday"],
     schedule: "16:00 - 20:00",
     description: "Crea y despliega microservicios con Node.js, utilizando Docker y patrones avanzados."
   },
   {
     id: "crs005",
     title: "React Intro",
     teacherId: "tch003",
     studentsEnrolledIds: ["std007", "std008"],
     startDate: "2025-03-10",
     endDate: "2025-05-10",
     daysOfWeek: ["Monday", "Wednesday"],
     schedule: "10:00 - 12:00",
     description: "Conoce los fundamentos de React, el manejo de componentes, state y props."
   },
 ],
};

module.exports = mockData;
