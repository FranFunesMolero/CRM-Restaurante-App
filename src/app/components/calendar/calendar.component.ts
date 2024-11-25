import { Component, EventEmitter, Output } from '@angular/core';

// Componente de calendario
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  // Evento emitido cuando se selecciona una fecha
  @Output() dateSelected = new EventEmitter<string>();

  // Fecha seleccionada
  selectedDate: string = '';

  // Función se ejecuta cuando cambia la fecha
  dateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
    this.dateSelected.emit(this.selectedDate);
  }

}
