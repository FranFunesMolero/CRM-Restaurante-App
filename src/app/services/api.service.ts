import { Injectable, inject } from '@angular/core';
import { IUserRegister, IUserResponse, IUserLogin, IUserUpdate, IUserLoginResponse } from '../interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private rootUrl = 'https://crm-restaurantapi-z9vj.onrender.com/api';
  private http = inject(HttpClient);

  /**
   * Registers a new user in the system
   * @param user The user data to register
   * @returns Promise that resolves with the registration response
   */
  /**
   * Registers a new user in the system by making a POST request to the API
   * @param user The user registration data containing email, password, name, surname and phone
   * @returns Promise that resolves with the API response containing status, title and message
   * @throws Will throw an error if the registration fails (e.g. email already exists)
   */
  async registerUser(user: IUserRegister): Promise<IUserResponse> {
    // Convert the HTTP observable to a Promise and make POST request to /user endpoint
    return await firstValueFrom(
      this.http.post<IUserResponse>(`${this.rootUrl}/user`, user)
    );
  }

  async getAllUsersAdmin(): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(
      this.http.get<any>(`${this.rootUrl}/admin/user`, { headers })
    );
  }

  async getUserByIdAdmin(userId: string): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(
      this.http.get<any>(`${this.rootUrl}/admin/user/${userId}`, { headers })
    );
  }


  async getSomeUsers(limit: number, order: string): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(
      this.http.get<any>(`${this.rootUrl}/admin/user?limit=${limit}&order=${order}`, { headers })
    );
  }

  async getUser(): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(
      this.http.get<any>(`${this.rootUrl}/user`, { headers })
    );
  }

  async loginUser(user: IUserLogin): Promise<IUserLoginResponse> {
    return await firstValueFrom(
      this.http.post<IUserLoginResponse>(`${this.rootUrl}/user/login`, user)
    );
  }

  async updateUser(user: IUserUpdate): Promise<IUserResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(
      this.http.put<IUserResponse>(`${this.rootUrl}/user`, user, { headers })
    );
  }

  async deleteUser(id: string): Promise<any> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(
      this.http.delete<any>(`${this.rootUrl}/admin/user/${id}`, { headers })
    );
  }

  async updateUserAdmin(id: string, userData: IUserUpdate): Promise<IUserResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = { 'Authorization': token };
    return await firstValueFrom(
      this.http.put<IUserResponse>(`${this.rootUrl}/admin/user/${id}`, userData, { headers })
    );
  }
}
