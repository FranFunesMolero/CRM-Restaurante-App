import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-new-users-card',
  standalone: true,
  imports: [],
  templateUrl: './new-users-card.component.html',
  styleUrl: './new-users-card.component.css'
})
export class NewUsersCardComponent {
  // Recibir array de usuarios
  @Input() user: any = {};

}
