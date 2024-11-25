import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { IUserResponse } from '../../../interfaces/user.interfaces';

@Component({
  selector: 'app-users-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.css'
})
export class UsersCardComponent {

  // Propiedad de entrada que recibe la información del usuario.
  @Input() user: any = {};

  // Evento de salida que se emite al borrar un usuario.
  @Output() deleteUser = new EventEmitter<number>();

  // Inyección del servicio de API.
  private userService = inject(ApiService);

  // Método asincrónico para eliminar un usuario.
  async onDelete() {
    // Confirmar la eliminación
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro de querer eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmDelete.isConfirmed) {
      try {
        // Función para borrar el usuario
        await this.userService.deleteUser(this.user.id);
        // Mensaje de éxito
        Swal.fire('¡El usuario ha sido eliminado!', 'success');
        // Emitir el ID del usuario para actualizar el componente padre
        this.deleteUser.emit(this.user.id);
      } catch (error: any) {
        const errorResponse = error.error as IUserResponse;
        const { status, title, message } = errorResponse;
        console.error('Error:', 'Status:', status, 'Title:', title, 'Message:', message);
        Swal.fire('Error', 'Ocurrió un error al intentar eliminar el usuario.', 'error'); // Mensaje de error
      }
    }
  }

}
