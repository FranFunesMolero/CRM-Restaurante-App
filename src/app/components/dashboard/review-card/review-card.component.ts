import { ApiService } from './../../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReviewsService } from '../../../services/reviews.service';
import Swal from 'sweetalert2';
import { IUserResponse } from '../../../interfaces/user.interfaces';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {

  // Entradas para recibir la calificación, el comentario, un indicador de si debe mostrar el botón de eliminar y el identificador del usuario
  @Input() rating: number = 5;
  @Input() comment: string = '';
  @Input() hasDeleteButton: boolean = false;
  @Input() userid: string = '';

  // Salida para emitir un evento cuando se elimina una reseña
  @Output() reviewDeleted = new EventEmitter<void>();
  // Entrada para recibir el identificador de la reseña
  @Input() reviewId: string = '';
  // Inyección de servicios
  private service = inject(ReviewsService);
  private router = inject(Router);
  private userService = inject(ApiService);
  // Variable para almacenar el nombre del usuario
  userName: string = '';


  // Método de inicialización asincrónico para obtener el nombre del usuario
  async ngOnInit() {
    const userName = await this.userService.getUserByIdAdmin(this.userid);
    this.userName = userName.data.name
  }



  // Método asincrónico para eliminar una reseña
  async deleteReview() {
    const result = await Swal.fire({
      title: '¿Estás seguro de borrar esta reseña?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    });
    if (result.isConfirmed) {
      try {
        await this.service.deleteReviewAdmin(this.reviewId);

        this.reviewDeleted.emit();
        Swal.fire({
          icon: 'success',
          title: 'La reseña ha sido eliminada.',
        }
        );
        this.router.navigate(['/dashboard/reviews']);
      } catch (error: any) {
        const errorResponse = error.error as IUserResponse;
        const { status, title, message } = errorResponse;
        console.error('Error:', 'Status:', status, 'Title:', title, 'Message:', message);
      }
    }
  }


}
