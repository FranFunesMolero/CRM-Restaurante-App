import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { HeaderDashboardComponent } from "../../../../components/dashboard/header-dashboard/header-dashboard.component";
import { MenuService } from '../../../../services/menu.service';
import { IUserResponse } from '../../../../interfaces/user.interfaces';
import { DishService } from '../../../../services/dish.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-menu',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderDashboardComponent],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateMenuComponent {
  // Formulario del menú para la actualización
  menuForm: FormGroup;

  // Inyección de los servicios de menú y platos
  private menuService = inject(MenuService);
  private dishService = inject(DishService);
  // Inyección de la ruta activada para obtener el parámetro 'id' del menú
  private route = inject(ActivatedRoute);
  // Atributos para almacenar los platos según su tipo
  desserts?: any;
  mainDishes?: any;
  starters?: any;

  constructor(private fb: FormBuilder) {
    // Inicialización del formulario del menú
    this.menuForm = this.fb.group({
      menuName: ['', Validators.required],
      date: ['', Validators.required],
      menuPrice: ['', [Validators.required, Validators.min(1)]],
      dishes: this.fb.array([]),
    });
  }

  // Método de inicialización del componente, carga los platos y el menú
  async ngOnInit() {
    const result = await this.dishService.getAllDishes();
    const dishes = result.data;
    this.desserts = dishes.filter((dish: any) => dish.type === 'dessert');
    this.mainDishes = dishes.filter((dish: any) => dish.type === 'main');
    this.starters = dishes.filter((dish: any) => dish.type === 'starters');

    const menuId = this.route.snapshot.params['id'];

    try {
      const menu = await this.menuService.getMenuById(menuId);
    } catch (error: any) {
      Swal.fire({
        title: 'Error al obtener el menú',
        icon: 'error',
      })
      console.error('Error al obtener el menú:', error);
    }
  }

  // Método para enviar el formulario de actualización del menú
  async onSubmit() {
    // Check if form is valid before proceeding
    if (!this.menuForm.valid) {
      return;
    }

    // Get form values
    const menuName = this.menuForm.get('menuName')?.value;
    const date = this.menuForm.get('date')?.value;
    const dishes = this.menuForm.get('dishes')?.value;
    const price = this.menuForm.get('menuPrice')?.value;

    const menuId = this.route.snapshot.params['id'];
    try {
      // Extract dish IDs and create menu
      const dishIds = dishes.map((dish: any) => dish.id);
      await this.menuService.updateMenu(menuId, menuName, date, dishIds, price);

      Swal.fire({
        title: 'Menu actualizado correctamente',
        icon: 'success',
      })

    } catch (error: any) {
      // Handle error response
      const errorResponse = error.error as IUserResponse;
      const { status, title, message } = errorResponse;

      console.error('Error actualizando menu:', {
        status,
        title,
        message
      });

      Swal.fire({
        title: 'Error al actualizar el menu',
        icon: 'error',
      })
    }

    this.menuForm.reset();
  }

  // Método para verificar la validación de un control específico
  checkValidation(controlName: string): boolean {
    const control = this.menuForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  // Método para manejar el cambio de estado de los checkboxes de los platos
  onCheckboxChange(event: any, dish: any) {
    const dishesArray = this.menuForm.get('dishes') as FormArray;
    if (event.target.checked) {
      // Add the dish to the array if checked
      dishesArray.push(new FormControl(dish));
    } else {
      // Remove the dish from the array if unchecked
      const index = dishesArray.controls.findIndex(x => x.value.id === dish.id);
      if (index !== -1) {
        dishesArray.removeAt(index);
      }
    }
  }
}