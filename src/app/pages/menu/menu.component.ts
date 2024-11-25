import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MenuService } from '../../services/menu.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  // Inyección del servicio de menú
  service = inject(MenuService);

  // Atributos para almacenar los datos del menú
  data?: any;
  dishes?: any;
  desserts?: any[];
  mainDishes?: any[];
  starters?: any[];

  // Método de inicialización asincrónico
  async ngOnInit() {
    const date = new Date().toISOString().split('T')[0];
    const result = await this.service.getDailyMenu(date);
    this.data = result;
    this.dishes = this.data.dishes;

    this.desserts = this.getDishByType(this.dishes, 'dessert');
    this.mainDishes = this.getDishByType(this.dishes, 'main');
    this.starters = this.getDishByType(this.dishes, 'starters');

  }

  // Método para filtrar platos por tipo
  getDishByType(array: any[], type: string) {
    return array.filter((dish: any) => {
      return dish.type === type
    });
  }
}
