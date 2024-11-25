import { firstValueFrom } from 'rxjs';
import { Component, inject } from '@angular/core';
import { HeaderDashboardComponent } from "../../components/dashboard/header-dashboard/header-dashboard.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { IUserResponse } from '../../interfaces/user.interfaces';
import { ReservationService } from '../../services/reservation.service';
import { ReservationsCardComponent } from '../../components/dashboard/reservations-card/reservations-card.component';

@Component({
  selector: 'app-view-user-dashboard',
  standalone: true,
  imports: [HeaderDashboardComponent, RouterLink, ReservationsCardComponent],
  templateUrl: './view-user-dashboard.component.html',
  styleUrl: './view-user-dashboard.component.css'
})
export class ViewUserDashboardComponent {

  // Inyección del servicio de reservas, usuarios y rutas
  private reservationService = inject(ReservationService)
  private usersService = inject(ApiService);
  private route = inject(ActivatedRoute);

  // Atributo para almacenar los datos del usuario
  user?: any;
  // Array para almacenar las reservas del usuario
  reservations: any[] = []

  // Método de inicialización del componente
  ngOnInit() {
    this.loadData()
  }

  // Método para cargar los datos del usuario
  async loadUser() {
    try {
      // Obtener el ID del usuario de los parámetros de la ruta
      const params = await firstValueFrom(this.route.params);
      const userId = params['id'];
      // Obtener los datos del usuario
      this.user = await this.usersService.getUserByIdAdmin(userId);
      this.user = this.user.data;

    } catch (error: any) {
      const errorResponse = error.error as IUserResponse;
      const { status, title, message } = errorResponse;
      console.error('Error:', 'Status:', status, 'Title:', title, 'Message:', message);
    }
  }

  // Método para cargar las reservas del usuario
  async loadReservation() {
    // Obtener las reservas del usuario
    this.reservations = await this.reservationService.getReservationByUserId(this.user?.id)
  }

  // Método para cargar los datos del usuario y sus reservas
  async loadData() {
    await this.loadUser()
    await this.loadReservation()
  }

}
