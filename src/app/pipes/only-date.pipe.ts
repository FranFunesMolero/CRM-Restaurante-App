import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyDate',
  standalone: true
})
export class OnlyDatePipe implements PipeTransform {

  transform(value: string): string {
    return value.split('T')[0];
  }

}
