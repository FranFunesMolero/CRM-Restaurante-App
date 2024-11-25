import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  http = inject(HttpClient);

  rootURL = 'https://crm-restaurantapi-z9vj.onrender.com/api';
  getAllDishes(): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { Authorization: token };
    const result = firstValueFrom(this.http.get<any>(`${this.rootURL}/admin/dish`, { headers }));
    return result;
  }

  constructor() { }
}
