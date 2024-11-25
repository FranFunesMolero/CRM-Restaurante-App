import { Component, inject } from '@angular/core';
import { HeaderDashboardComponent } from "../../../components/dashboard/header-dashboard/header-dashboard.component";
import { ReviewCardComponent } from "../../../components/dashboard/review-card/review-card.component";
import { ReviewsService } from '../../../services/reviews.service';
import { IReviews } from '../../../interfaces/ireviews.interface';
import { ApiService } from '../../../services/api.service'

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [HeaderDashboardComponent, ReviewCardComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  // Inyección del servicio de reviews para obtener las reseñas y servicio de usuarios
  private service = inject(ReviewsService);
  private userService = inject(ApiService)
  // Atributo para almacenar las reseñas
  reviews: IReviews[] = [];
  // Atributo para almacenar los usuarios
  users: any[] = [];



  // Método de inicialización del componente, carga las reseñas
  async ngOnInit() {
    await this.loadReviews();
  }

  // Método asincrónico para cargar las reseñas
  async loadReviews() {
    try {
      const response = await this.service.getReviewsAll();
      if (response) {
        this.reviews = response.data.reviews;

      }
    } catch (error: any) {
      const errorResponse = error.error as any;
      const { status, title, message } = errorResponse;
      console.error('Error:', 'Status:', status, 'Title:', title, 'Message:', message);
    }
  }

  // Método para desplazarse al principio de la página
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
