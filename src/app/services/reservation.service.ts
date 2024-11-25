import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IReservation } from '../interfaces/ireservation.interface';
import { firstValueFrom } from 'rxjs';
import { ICustomerReservationResponse } from '../interfaces/icustomer-reservation-response.interface';
import { IReservationOptionalParameters } from '../interfaces/ireservation-optional-parameters.interface';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private http = inject(HttpClient);
  private rootUrl = 'https://crm-restaurantapi-z9vj.onrender.com/api';

  createReservation(reservation: IReservation): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(
      this.http.post<IReservation>(`${this.rootUrl}/reservations`, reservation, { headers }));
  }

  getReservationById(id: number): Promise<ICustomerReservationResponse[]> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(
      this.http.get<ICustomerReservationResponse[]>(`${this.rootUrl}/reservations/customer?id=${id}`, { headers }));
  }

  getReservationByUserId(userId: number): Promise<ICustomerReservationResponse[]> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(
      this.http.get<ICustomerReservationResponse[]>(`${this.rootUrl}/reservations/customer?user_id=${userId}`, { headers }));
  }


  getReservations(reservation: IReservationOptionalParameters): Promise<ICustomerReservationResponse[]> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    let parameters: string = "?"
    for (const property in reservation) {
      parameters += `${property}=${reservation[property]}&`
    }
    parameters = parameters.slice(0, -1)
    return firstValueFrom(
      this.http.get<ICustomerReservationResponse[]>(`${this.rootUrl}/reservations/customer${parameters}`, { headers }));
  }

  changeStatusReservation(id: number, status: string): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return firstValueFrom(
      this.http.put<any>(`${this.rootUrl}/reservations/${id}/status/${status}`, null, { headers }))
  }

}
