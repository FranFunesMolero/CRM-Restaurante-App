import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ReservationService } from '../../services/reservation.service';
import { IReservation } from '../../interfaces/ireservation.interface';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

  // Formulario de reservas con validaciones
  form: FormGroup;
  // Inyección del servicio de reservas
  reservationService = inject(ReservationService)
  // Fecha actual para el formulario
  currentDate = new Date()
  // Fecha de hoy formateada para el formulario
  today: string = this.currentDate.toLocaleDateString('en-CA')


  constructor() {
    // Inicialización del formulario de reservas
    this.form = new FormGroup({
      date: new FormControl(this.today, [Validators.required]),
      time: new FormControl('', [Validators.required]),
      guests: new FormControl(1, [Validators.required, Validators.min(1)]),
      location: new FormControl('', [Validators.required])
    }, [])
  }


  // Método para enviar el formulario de reservas
  ngSubmit() {
    // Obtener los valores del formulario y crear una reserva
    const reservation: IReservation = this.form.value;
    reservation.status = 'pending';

    // Obtener y validar el token de autenticación
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Cuenta requerida',
        icon: 'error',
        background: 'var(--color-primary)'
      })
      return;
    }

    // Extraer el ID del usuario del token y agregarlo a la reserva
    const decodedToken = jwtDecode(token) as { id: number };
    reservation.user_id = decodedToken.id;


    try {
      // Enviar la reserva y resetear el formulario
      this.reservationService.createReservation(reservation);
      this.form.reset({
        date: this.today,
        time: '',
        guests: 1,
        location: ''
      });

      Swal.fire({
        title: 'Reservation created successfully',
        icon: 'success',
        background: 'var(--color-primary-dark)'
      })
    } catch (error) {
      Swal.fire({
        title: 'Error creating reservation',
        icon: 'error',
        background: 'var(--color-primary)'
      })
    }
  }
}
