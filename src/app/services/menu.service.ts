import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private http = inject(HttpClient);
  private rootUrl = 'https://crm-restaurantapi-z9vj.onrender.com/api/admin/menu';


  async getAllMenus(order: string): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(this.http.get<any>(`${this.rootUrl}?order=${order}`, { headers }));
  }

  async getMenuById(id: number): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(this.http.get<any>(`${this.rootUrl}/${id}`, { headers }));
  }

  async createMenu(name: string, date: string, dishes: any[], price: number): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(this.http.post<any>(`${this.rootUrl}`, { name, date, dishes, price }, { headers }));
  }

  async updateMenu(id: number, name: string, date: string, dishes: any[], price: number): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(this.http.put<any>(`${this.rootUrl}/${id}`, { name, date, dishes, price }, { headers }));
  }

  async getDailyMenu(date: string): Promise<any> {
    const result = await firstValueFrom(this.http.get<any>(`https://crm-restaurantapi-z9vj.onrender.com/api/menu?date=${date}`));
    return result;
  }

  async deleteMenu(id: number): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(this.http.delete<any>(`${this.rootUrl}/${id}`, { headers }));
  }

}
