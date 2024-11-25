import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.css']
})
export class HeaderDashboardComponent {

  // Inyección del router para manejo de rutas
  private router = inject(Router);

  // Estado inicial de la barra de navegación y función para cambiar su estado.
  isCollapsed = true;

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  // Cerrar sesión y redirigir al inicio
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
