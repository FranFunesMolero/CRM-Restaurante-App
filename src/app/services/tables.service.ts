import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  private http = inject(HttpClient);
  private rootUrl = 'https://crm-restaurantapi-z9vj.onrender.com/api';

  getTables(): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(
      this.http.get<any>(`${this.rootUrl}/tables`, { headers }));
  }

  createTable(table: any): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(
      this.http.post<any>(`${this.rootUrl}/tables`, table, { headers })
    )
  }

  updateTableCapacity(id: number, capacity: number): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(
      this.http.put<any>(`${this.rootUrl}/tables/${id}/capacity/${capacity}`, null, { headers })
    )
  }

  deleteTable(id: number): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(
      this.http.delete<any>(`${this.rootUrl}/tables/${id}`, { headers })
    )
  }

  getFutureTables(date: string): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(
      this.http.get<any>(`${this.rootUrl}/tables/future/${date}`, { headers }));
  }

}
