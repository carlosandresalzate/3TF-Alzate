import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  ngOnInit(): void {}
}
