import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // Inyección del servicio de API y del router
  private apiService = inject(ApiService);
  private router = inject(Router);

  // Estado de colapsado del menú y función para cambiarlo
  isCollapsed = true;
  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  // Rol del usuario y estado de inicio de sesión
  userRole: string = '';
  isLoggedIn: boolean = false;

  // Inicialización  del componente que obtiene el usuario 
  async ngOnInit() {
    const user = await this.apiService.getUser();
    this.userRole = user.data.role;

  }

  // Función para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
