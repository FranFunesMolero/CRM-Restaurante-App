import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

// Definición de un guardia de rutas para autenticar el acceso
export const authGuard: CanActivateFn = async (route, state) => {
  
  // Inyección del servicio de API y el enrutador
  const apiService = inject(ApiService);
  const router = inject(Router);

  // Recupera el token de autenticación almacenado en localStorage
  const token = localStorage.getItem('token') as string;

  // Verifica si el token existe
  if (token) {
    // Realiza una llamada al API para obtener los datos del usuario
    const response = await apiService.getUser();

    // Comprueba si la respuesta no es nula
    if (response !== null) {
      // Recupera el rol del usuario desde la respuesta del API
      const role = response.data.role;

      // Permite el acceso solo si el rol del usuario es 'admin'
      if (role === 'admin') {
        return true; // Acceso permitido
      }

      // Redirige al usuario a la página de inicio si no es 'admin'
      router.navigate(['/']);
    }
  }

  // Devuelve false si no hay token o si el acceso no está permitido
  return false;
};
