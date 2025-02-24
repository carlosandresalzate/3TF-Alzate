import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
import { Validators } from '@angular/forms';
// ! Se usa en el casa asincrono con OnInit, por ejemplo
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from '../../../core/services/auth.service';

/**
 * @description el metodo describe agrupo los tests
 */
describe('LoginComponent', () => {
  // Declaro el componente del tipo LoginComponent
  let loginComponent: LoginComponent;

  // declaro una variable para trabajar con la deteccion de cambios.
  // Esto dispara la deteccion para que se ejecute el ciclo de vida de angular
  // ngOnInit, ect.
  let fixture: ComponentFixture<LoginComponent>;

  // Se inicia una iteracion cada ves que realiza una prueba.
  // ! solo con el constructor
  // beforeEach(() => {
  // Se configura el modulo para exportar, declarar o lo que neecsite para el funcionamiento del componete que se esta probando.
  // ! solo con el constructor
  // TestBed.configureTestingModule({
  //   declarations: [LoginComponent],
  //   imports: [SharedModule],
  // }).compileComponents();

  // esta declaracion funciona en los componentes declarados en el constructor.
  // ! Solo si es en el constructor
  // loginComponent = TestBed.createComponent(LoginComponent).componentInstance;
  // });

  /**
   * @description beforeEach que configrua el testBed para compilar el
   * componente y sus dependencias de forma asincrona
   * ! Solo para usar con OnInit()
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule],
      providers: [provideAnimationsAsync()],
    }).compileComponents();
  });

  /**
   * @description crea la instancia del fixture y del componente antes de cada text.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;

    // Dispara la deteccion de cambios.
    fixture.detectChanges();
  });

  /**
   * @description Verifico que el componente se instancie correctamente
   */
  it('debe instanciarse el login.component', () => {
    expect(loginComponent).toBeTruthy();
  });

  /**
   * @description verifica que username y password debe ser requeridos en el formulario
   * opcion para componentes inicializados en el constuctor.
   */
  // it('username y password deber ser requeridos en loginForm', () => {
  // expect(
  // loginComponent.loginForm
  // .get('username')
  //- ?.hasValidator(Validators.required)
  // ).toBe(true);
  // expect(
  // loginComponent.loginForm
  // .get('password')
  //- ?.hasValidator(Validators.required)
  // ).toBe(true);
  // });

  /**
   * option usando OnInit()
   */
  it('username y password deber ser requeridos en loginForm', () => {
    const usernameControl = loginComponent.loginForm.get('username');
    const passwordControl = loginComponent.loginForm.get('password');

    expect(usernameControl?.hasValidator(Validators.required)).toBe(true);
    expect(passwordControl?.hasValidator(Validators.required)).toBe(true);
  });

  /**
   * @descripcion una prueba muy importanete que se debe hacer es la del metodo * submit()🤓
   */

  it('Si el formulario es invalido, debe llamar a loginForm.markAllAsTouched()', () => {
    loginComponent.loginForm.setValue({
      username: '',
      password: '',
    });

    const spyOnmarkAllAsTouched = spyOn(
      loginComponent.loginForm,
      'markAllAsTouched'
    );

    loginComponent.onSubmit();

    expect(spyOnmarkAllAsTouched).toHaveBeenCalledTimes(1);
  });

  it('Si el formulario es valido, debe llamar a login de authService', () => {
    loginComponent.loginForm.setValue({
      username: 'admin',
      password: 'admin',
    });

    const spyOnLogin = spyOn((loginComponent as any).authService, 'login');

    loginComponent.onSubmit();

    expect(spyOnLogin).toHaveBeenCalledTimes(1);
  });
});
