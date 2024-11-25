import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ApiService } from '../../services/api.service';
import { IUserResponse } from '../../interfaces/user.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // Inyección del servicio de API y del router
  private apiService = inject(ApiService);
  private router = inject(Router);
  // Formulario de registro con validaciones
  registerForm: FormGroup;

  constructor() {
    // Inicialización del formulario de registro con validaciones
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern('^[0-9]*$')]),
    },);
  }

  // Método para enviar el formulario de registro
  onSubmit() {
    if (this.registerForm.valid) {
      if (!this.passwordsMatch()) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las contraseñas no coinciden',
        });
        return;
      }
      this.registerUser();
    }
  }


  // Método asincrónico para registrar un usuario
  async registerUser() {
    try {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      const name = this.registerForm.get('name')?.value;
      const surname = this.registerForm.get('surname')?.value;
      const phone = this.registerForm.get('phone')?.value;
      await this.apiService.registerUser({ email, password, name, surname, phone });
      Swal.fire({
        title: "¡Usuario registrado correctamente!",
        icon: "success",
        preConfirm: () => {
          this.router.navigate(['/login']);
        }
      });
    } catch (error: any) {
      const errorResponse = error.error as IUserResponse;
      const { status, title, message } = errorResponse;
      console.error('Error:', 'Status:', status, 'Title:', title, 'Message:', message);
    }
  }

  // Método para obtener el mensaje de error del campo de contraseña
  getPasswordErrorMessage(): string {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl?.errors?.['required']) {
      return 'Password is required';
    }
    return '';
  }

  // Método para comprobar la validación de un campo
  checkValidation(field: string) {
    return this.registerForm.get(field)?.invalid && this.registerForm.get(field)?.touched;
  }

  // Método para verificar si las contraseñas coinciden
  passwordsMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
