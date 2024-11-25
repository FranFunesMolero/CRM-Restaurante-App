import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.css'
})
export class MenuCardComponent {

  // Recibir el menú desde el componente padre
  @Input() menu: any = {};
  private menuService = inject(MenuService);
  @Output() deletedMenu: EventEmitter<any> = new EventEmitter();

  // Método para eliminar un menú
  async deleteMenu(id: number) {
    try {
      const response = await this.menuService.deleteMenu(id);
      if (response.status === 200) {
        this.deletedMenu.emit(true);
      }

    } catch (error) {
      swal("Error al eliminar el menú", {
        icon: "error",
      });
      console.error(error);
    }
  }

}
