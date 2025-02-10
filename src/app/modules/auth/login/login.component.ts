import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/**
 * @description Componente Login que permite al usuario autentificarse
 */
@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  /**
   * Formulario reactivo para el login
   */
  loginForm!: FormGroup;

  /**
   * Mensaje de error en caso de que algo falle en el login
   */
  errorMessage: string = '';

  /**
   * @param fb FormBuilder para construir el formulario.
   * @param authService Servicio de autenticacion.
   * @param router Router para redirigir despues de hacer login
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * @description Inicializa el formulario de login
   */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * @description Maneja el envio del formulario de login
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // llama al servicio de autenticacion
      if (this.authService.login(username, password)) {
        // redirige al dashboard o a la ruta protegida segun el rol
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Credenciales incorrectas';
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
