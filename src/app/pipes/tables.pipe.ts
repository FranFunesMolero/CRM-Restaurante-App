import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tables',
  standalone: true
})
export class TablesPipe implements PipeTransform {

  transform(value: number[]): string {
    let response: string = ""
    for (const num of value) {
      response += ` ${num},`
    }
    response = response.slice(0, -1)
    return response;
  }

}
