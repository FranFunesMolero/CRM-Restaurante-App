import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IReviews } from '../interfaces/ireviews.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private http = inject(HttpClient);
  // private rootUrl = 'http://localhost:3000/api';
  private rootUrl = 'https://crm-restaurantapi-z9vj.onrender.com/api';

  // Solo lo puede hacer el usuario para si mismo
  getReviews(): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(this.http.get<any>(`${this.rootUrl}/review`, { headers }));
  }

  getReviewsAll(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.rootUrl}/review/all`));
  }

  getSomeReviews(amount: number, order: string): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.rootUrl}/review/all?limit=${amount}&order=${order}`));
  }

  createReview(review: any): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(this.http.post<any>(`${this.rootUrl}/review`, review, { headers }));
  }

  deleteReview(id: string): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(this.http.delete<any>(`${this.rootUrl}/review/${id}`, { headers }));
  }


  deleteReviewAdmin(id: string): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(this.http.delete<any>(`${this.rootUrl}/admin/review/${id}`, { headers }));
  }



}
