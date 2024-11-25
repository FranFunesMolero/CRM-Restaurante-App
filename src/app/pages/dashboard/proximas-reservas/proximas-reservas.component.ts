import { Component, inject } from '@angular/core';
import { HeaderDashboardComponent } from '../../../components/dashboard/header-dashboard/header-dashboard.component';
import { ReservationsCardComponent } from '../../../components/dashboard/reservations-card/reservations-card.component';
import { ReservationService } from '../../../services/reservation.service';
import { ICustomerReservationResponse } from '../../../interfaces/icustomer-reservation-response.interface';

@Component({
  selector: 'app-proximas-reservas',
  standalone: true,
  imports: [HeaderDashboardComponent, ReservationsCardComponent],
  templateUrl: './proximas-reservas.component.html',
  styleUrl: './proximas-reservas.component.css'
})
export class ProximasReservasComponent {

  // Inyección del servicio de reservaciones para obtener las reservaciones
  reservationService = inject(ReservationService)
  // Atributo para almacenar las reservaciones del cliente
  reservations: ICustomerReservationResponse[] = []

  // Método de inicialización del componente, carga los datos de las reservaciones
  ngOnInit() {
    this.loadData()
  }

  // Método asincrónico para cargar los datos de las reservaciones
  async loadData() {
    this.reservations = await this.reservationService.getReservations({})

    // Ordenamiento de las reservaciones por fecha
    this.reservations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }
}
