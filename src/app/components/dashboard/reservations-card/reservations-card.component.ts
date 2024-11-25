import { Component, inject, Input } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { DatePipe } from '@angular/common';
import { TraductorPipe } from '../../../pipes/traductor.pipe';
import { TablesPipe } from '../../../pipes/tables.pipe';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-reservations-card',
  standalone: true,
  imports: [DatePipe, TraductorPipe, TablesPipe],
  templateUrl: './reservations-card.component.html',
  styleUrl: './reservations-card.component.css'
})


export class ReservationsCardComponent {

  // Entrada para recibir la reserva desde el componente padre
  @Input() reservation: any;
  // Inyección del servicio de reservas
  reservationServices = inject(ReservationService)
  // Variables para el estado y el identificador de la reserva
  status!: string;
  id!: string;

  // Método para cambiar el estado de una reserva
  async changeStatus(event: MouseEvent) {
    const button = event.target as HTMLInputElement
    this.status = button.value
    const { id } = this.reservation
    await this.reservationServices.changeStatusReservation(id, this.status)
    const [modifiedReservation] = await this.reservationServices.getReservationById(id)
    this.reservation = modifiedReservation
  }

  // Método para verificar si el usuario es administrador
  isUserAdmin() {
    const token = localStorage.getItem('token') as string;
    const decodedToken = jwtDecode(token) as { role: string }
    const role = decodedToken.role
    return role === 'admin' ? true : false
  }
}
