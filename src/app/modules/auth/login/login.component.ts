import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { LoginPayload } from '../models/login-payload';

/**
 * @description Componente Login que permite al usuario autentificarse
 */
@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  /**
   * Formulario reactivo para el login
   */
  loginForm!: FormGroup;

  /**
   * Mensaje de error en caso de que algo falle en el login
   */
  // errorMessage: string = '';

  /**
   * @param fb FormBuilder para construir el formulario.
   * @param authService Servicio de autenticacion.
   * @param router Router para redirigir despues de hacer login
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService // private router: Router
  ) {
    // inicializo el formulario en el contructor para obtener datos y comparar
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * @description Inicializa el formulario de login
   * ? para ser llamado durante el test hay que usar .detectChanges()
   * ? solo si se usa OnInit
   */
  // ngOnInit(): void {
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required],
  //   });
  // }

  /**
   * @description Maneja el envio del formulario de login
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const payload: LoginPayload = this.loginForm.value;
      this.authService.login(payload);
    }
    // if (this.loginForm.valid) {
    //   const { email, password } = this.loginForm.value;
    //   this.authService.login(email, password).subscribe((success: boolean) => {
    //     if (success) {
    //       this.router.navigate(['/dashboard']);
    //     } else {
    //       this.errorMessage = 'Credenciales incorrectas';
    //     }
    //   });
    // } else {
    //   this.loginForm.markAllAsTouched();
    // }
  }
}
