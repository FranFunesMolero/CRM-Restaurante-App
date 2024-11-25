import { Component, inject } from '@angular/core';
import { HeaderDashboardComponent } from '../../../../components/dashboard/header-dashboard/header-dashboard.component';
import { TableCardComponent } from '../../../../components/dashboard/table-card/table-card.component';
import { RouterLink } from '@angular/router';
import { TablesService } from '../../../../services/tables.service';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [HeaderDashboardComponent, TableCardComponent, RouterLink],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent {
  // Atributo para almacenar las mesas
  tables: any[] = []
  futureTables: any[] = []
  // Inyección del servicio de mesas
  private tablesServices = inject(TablesService)
  currentDate = new Date()
  today: string = this.currentDate.toLocaleDateString('en-CA')

  // Método de inicialización del componente, carga las mesas
  constructor() {
    this.loadTables()
  }

  // Método asincrónico para cargar las mesas
  async loadTables() {
    this.tables = await this.tablesServices.getTables()
    this.futureTables = await this.tablesServices.getFutureTables(this.today)
    this.futureTables = this.futureTables.map(table => table.table_id)

    this.tables = this.tables.map(table => {
      if (this.futureTables.includes(table.id)) {
        return { ...table, future: true }
      } else {
        return { ...table, future: false }
      }
    })
  }

  // Método asincrónico para recargar las mesas
  async reloadData() {
    await this.loadTables()
  }
}
