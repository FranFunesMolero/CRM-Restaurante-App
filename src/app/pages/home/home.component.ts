import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { ReviewCardComponent } from "../../components/dashboard/review-card/review-card.component";
import { ReviewsService } from '../../services/reviews.service';
import { IUserResponse } from '../../interfaces/user.interfaces';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink, FooterComponent, ReviewCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // Inyección del servicio de reseñas
  private reviewsService = inject(ReviewsService);

  // Arreglo de reseñas
  reviews: any[] = [];

  // Método asincrónico para inicializar el componente
  async ngOnInit(): Promise<void> {
    try {
      // Obtener algunas reseñas
      const response = await this.reviewsService.getSomeReviews(3, 'desc');
      this.reviews = response.data.reviews;
    } catch (error: any) {
      // Manejo de errores
      console.error(error);
      const errorResponse = error as IUserResponse;
      const { status, title, message } = errorResponse;
      console.error('Error:', 'Status:', status, 'Title:', title, 'Message:', message);
    }
  }

}
