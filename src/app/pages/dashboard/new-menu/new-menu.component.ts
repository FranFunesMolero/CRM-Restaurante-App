import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { HeaderDashboardComponent } from "../../../components/dashboard/header-dashboard/header-dashboard.component";
import { MenuService } from '../../../services/menu.service';
import { IUserResponse } from '../../../interfaces/user.interfaces';
import { DishService } from '../../../services/dish.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-menu',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderDashboardComponent],
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.css']
})
export class NewMenuComponent {
  menuForm: FormGroup;

  private menuService = inject(MenuService);
  private dishService = inject(DishService);

  desserts?: any;
  mainDishes?: any;
  starters?: any;

  constructor(private fb: FormBuilder) {
    this.menuForm = this.fb.group({
      menuName: ['', Validators.required],
      date: ['', Validators.required],
      menuPrice: ['', [Validators.required, Validators.min(1)]],
      dishes : this.fb.array([]),
    });
  }

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
    try {
      // Extract dish IDs and create menu
      const dishIds = dishes.map((dish: any) => dish.id);
      await this.menuService.createMenu(menuName, date, dishIds, price);

      Swal.fire({
        title: 'Menu creado correctamente',
        icon: 'success',
      })

    } catch (error: any) {
      // Handle error response
      const errorResponse = error.error as IUserResponse;
      const { status, title, message } = errorResponse;
      
      console.error('Error creating menu:', {
        status,
        title, 
        message
      });

      Swal.fire({
        title: 'Error al crear el menu',
        icon: 'error',
      })
    }

    this.menuForm.reset();
  }

  checkValidation(controlName: string): boolean {
    const control = this.menuForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  async ngOnInit() {
    const result = await this.dishService.getAllDishes();
    const dishes = result.data;
    this.desserts = dishes.filter((dish: any) => dish.type === 'dessert');
    this.mainDishes = dishes.filter((dish: any) => dish.type === 'main');
    this.starters = dishes.filter((dish: any) => dish.type === 'starters');
  }

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