import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewsService } from '../../services/reviews.service';
import { IUserResponse } from '../../interfaces/user.interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent {

  reviewForm: FormGroup;

  // Inyección del servicio de reseñas y router para la navegación
  private reviewsService = inject(ReviewsService);
  private router = inject(Router);

  constructor() {
    // Inicialización del formulario de reseña con validaciones.
    this.reviewForm = new FormGroup({
      rating: new FormControl(5, [Validators.required]),
      comment: new FormControl('', [Validators.required]),
    });
  }

  // Método para enviar el formulario de reseña.
  onSubmit() {
    if (this.reviewForm.valid) {
      this.createReview();
    }
  }

  // Método para crear una reseña.
  async createReview() {
    try {
      if (this.reviewForm.valid) {
        // Actualización del formulario con los valores actuales.
        this.reviewForm.patchValue({
          rating: this.reviewForm.get('rating')?.value,
          comment: this.reviewForm.get('comment')?.value
        });
        // Obtención de los valores del formulario.
        const rating = this.reviewForm.get('rating')?.value;
        const comment = this.reviewForm.get('comment')?.value;
        // Creación de la reseña.
        const reviews = await this.reviewsService.createReview({
          comment: comment,
          rating: rating
        });
        Swal.fire({
          title: "¡Gracias por tu comentario!",
          icon: "success",
          preConfirm: () => {
            this.router.navigate(['/user']);
          }
        });

        this.reviewForm.reset();
      }
    } catch (error: any) {
      // Manejo de errores.
      const errorResponse = error.error as IUserResponse;
      const { status, title, message } = errorResponse;
      console.error('Error:', 'Status:', status, 'Title:', title, 'Message:', message);

      // Traducción del mensaje de error específico.
      if (error.error.message === 'Need a completed reservation before making a review')
        error.error.message = 'Se necesita al menos una reserva completada para hacer reviews'

      // Mensaje de error con SweetAlert2.
      Swal.fire({
        title: "Error",
        text: error.error.message,
        icon: "error"
      });
    }
  }

}
