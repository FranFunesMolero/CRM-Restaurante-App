import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ApiService } from '../../services/api.service';
import { IUserResponse } from '../../interfaces/user.interfaces';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Inyección del servicio de API y del router
  private apiService = inject(ApiService);
  private router = inject(Router);
  loginForm: FormGroup;


  constructor() {
    // Inicialización del formulario de inicio de sesión con validaciones.
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  // Método para enviar el formulario de inicio de sesión.
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginUser();
    }
  }

  // Método para iniciar sesión.
  async loginUser() {
    try {
      // Obtención de los valores del formulario.
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      // Llamada al API para iniciar sesión.
      const user = await this.apiService.loginUser({ email, password });
      // Almacenamiento del token de autenticación en localStorage.
      localStorage.setItem('token', user.token);
      // Obtención de los datos del usuario.
      const response = await this.apiService.getUser();
      // Redirección a la página de inicio si el usuario no es 'admin'.
      if (response.data.role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    } catch (error: any) {
      // Manejo de errores.
      const errorResponse = error.error as IUserResponse;
      const { status, title, message } = errorResponse;
      console.error('Error:', 'Status:', status, 'Title:', title, 'Message:', message);
      // Mensaje de error con SweetAlert2.
      Swal.fire({
        icon: 'error',
        text: 'Usuario y/o contraseña incorrectos',
        background: 'var(--color-primary)',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  // Método para obtener el mensaje de error del campo de contraseña.
  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.errors?.['required']) {
      return 'Password is required';
    }
    return '';
  }

  // Método para comprobar la validación de un campo.
  checkValidation(field: string) {
    return this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched;
  }
}
