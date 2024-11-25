import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { ReviewCardComponent } from "../../components/dashboard/review-card/review-card.component";
import { ReservationsCardComponent } from "../../components/dashboard/reservations-card/reservations-card.component";
import { ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { ReviewsService } from '../../services/reviews.service';
import { ReservationService } from '../../services/reservation.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, ReviewCardComponent, ReservationsCardComponent, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  // Array para almacenar las reseñas del usuario
  reviews: any[] = [];
  // Array para almacenar las reservas del usuario
  reservations: any[] = [];

  // Inyección del servicio de API
  private apiService = inject(ApiService);
  // Inyección del servicio de reseñas
  private service = inject(ReviewsService);
  // Inyección del servicio de reservas
  private reservationService = inject(ReservationService);

  // Formulario de usuario con validaciones
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  // Método para enviar el formulario de usuario
  async onSubmit() {
    // Llamada a la función para actualizar el usuario
    const dataUser = [];
    const formValues = this.userForm.value;
    for (const key in formValues) {
      const value = formValues[key].trim()
      if (value) {
        dataUser.push({ [key]: formValues[key] });
      }
    }
    const combinedObject = dataUser.reduce((acumulator, currentObject) => {
      return { ...acumulator, ...currentObject }
    }, {})
    try {
      await this.apiService.updateUser(combinedObject);
      Swal.fire({
        icon: 'success',
        title: 'El usuario se ha actualizado correctamente.',
        confirmButtonText: 'Aceptar'
      });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: error.error.message,
        confirmButtonText: 'Aceptar'
      });
    }
  }

  // Método de inicialización del componente
  ngOnInit() {
    // Carga de reseñas y reservas del usuario
    this.loadReviews();
    this.loadReservations();
    // Carga de los datos del usuario
    this.loadUserData();
  }

  // Método para cargar los datos del usuario
  async loadUserData() {
    try {
      const userData = await this.apiService.getUser();
      const { name, surname, phone, email } = userData.data;
      this.userForm.patchValue({ name, surname, phone, email });
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'No se pudieron cargar los datos del usuario.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  // Método para cargar las reseñas del usuario
  async loadReviews() {
    const result = await this.service.getReviews()
    this.reviews = result.data;
  }

  // Método para cargar las reservas del usuario
  async loadReservations() {
    const user_id = this.getUserId()
    this.reservations = await this.reservationService.getReservationByUserId(user_id);
  }

  // Método para obtener el ID del usuario a partir del token
  getUserId() {
    const token = localStorage.getItem('token') as string;
    const decodedToken = jwtDecode(token) as { id: number };
    const user_id = decodedToken.id;
    return user_id
  }
}
