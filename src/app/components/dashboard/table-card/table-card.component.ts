import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.css'
})
export class TableCardComponent {
  // Propiedad de entrada que recibe la información de la mesa.
  @Input() table: any;
  // Evento de salida que se emite al borrar una mesa.
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();

  form: FormGroup;
  private tableService = inject(TablesService)

  // Inicializar el formulario con la capacidad de la mesa y validaciones.
  constructor() {
    this.form = new FormGroup({
      capacity: new FormControl(this.table?.capacity, [Validators.required, Validators.min(1)]),
    }, [])
  }

  // Método que se ejecuta al enviar el formulario para actualizar la capacidad de la mesa.
  async ngSubmit() {
    const id = this.table?.id
    const capacity = this.form.value.capacity

    try {
      // Submit reservation and reset form
      await this.tableService.updateTableCapacity(id, capacity);

      Swal.fire({
        title: 'Mesa editada',
        icon: 'success',
      })
    } catch (error: any) {

      Swal.fire({
        title: "Error",
        text: error.error.message,
        icon: "error"
      })
    }
  }

  // Método que se ejecuta al borrar la mesa.
  async borrar() {
    const id = this.table?.id

    try {
      // Submit reservation and reset form
      await this.tableService.deleteTable(id);

      Swal.fire({
        title: 'Mesa borrada',
        icon: 'success',
      })

      this.deleteEvent.emit("true")

    } catch (error: any) {

      Swal.fire({
        title: "Error",
        text: error.error.message,
        icon: "error"
      })
    }
  }
}
