import { Component, inject } from '@angular/core';
import { HeaderDashboardComponent } from '../../../components/dashboard/header-dashboard/header-dashboard.component';
import { UsersCardComponent } from "../../../components/dashboard/users-card/users-card.component";
import { ApiService } from '../../../services/api.service';
import { IUserResponse } from '../../../interfaces/user.interfaces';

@Component({
  selector: 'app-usuarios-registrados',
  standalone: true,
  imports: [HeaderDashboardComponent, UsersCardComponent],
  templateUrl: './usuarios-registrados.component.html',
  styleUrls: ['./usuarios-registrados.component.css']
})
export class UsuariosRegistradosComponent {

  // Inyección del servicio de usuarios para interactuar con la API
  private usersService = inject(ApiService);
  // Atributo para almacenar los usuarios cargados
  users: any[] = [];

  // Método de inicialización del componente, carga los usuarios al iniciar
  async ngOnInit(): Promise<any> {
    await this.loadUsers();
  }

  // Método asincrónico para cargar los usuarios
  async loadUsers() {
    try {
      const users = await this.usersService.getAllUsersAdmin();
      this.users = users.data.users;
    } catch (error: any) {
      const errorResponse = error.error as IUserResponse;
      const { status, title, message } = errorResponse;
      console.error('Error:', 'Status:', status, 'Title:', title, 'Message:', message);
    }
  }

  // Método asincrónico para recargar los usuarios después de eliminar uno
  async onDeleteUser() {
    await this.loadUsers();
  }

  // Método para desplazarse al principio de la página
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}