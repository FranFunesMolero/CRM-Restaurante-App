import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traductor',
  standalone: true
})
export class TraductorPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'lunch':
        return 'Comida'
      case 'breakfast':
        return 'Desayuno'
      case 'dinner':
        return 'Cena'
      case 'pending':
        return 'Pendiente'
      case 'confirmed':
        return 'Confirmada'
      case 'cancelled':
        return 'Cancelada'
      case 'completed':
        return 'Completada'
    }

    return ''
  }

}
