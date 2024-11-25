import { Component, inject } from '@angular/core';
import { HeaderDashboardComponent } from '../../../../components/dashboard/header-dashboard/header-dashboard.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TablesService } from '../../../../services/tables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-new',
  standalone: true,
  imports: [HeaderDashboardComponent, ReactiveFormsModule],
  templateUrl: './table-new.component.html',
  styleUrl: './table-new.component.css'
})
export class TableNewComponent {

  form: FormGroup;
  private tableService = inject(TablesService)

  constructor() {
    this.form = new FormGroup({
      number: new FormControl('1', [Validators.required, Validators.min(1)]),
      capacity: new FormControl('1', [Validators.required, Validators.min(1)]),
      location: new FormControl('', [Validators.required]),
    }, [])
  }

  async ngSubmit() {
    const table = this.form.value
    try {
      // Submit reservation and reset form
      await this.tableService.createTable(table);
      this.form.reset({
        number: 1,
        capacity: 1,
        location: ''
      });

      Swal.fire({
        title: 'Mesa creada',
        icon: 'success',
      })
    } catch (error: any) {

      if (error.error.message === 'Table with the selected number already exists')
        error.error.message = 'El numero de mesa seleccionado ya existe'


      Swal.fire({
        title: "Error",
        text: error.error.message,
        icon: "error"
      })
    }
  }
}
