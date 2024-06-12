// menu.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from './menu-data'; // Importa los elementos del menú

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  navItems = navItems; // Asigna los elementos del menú a una propiedad

  constructor(public router: Router) {}

  // Método para manejar la navegación cuando se selecciona un elemento
  onItemSelected(item: any) {
    this.router.navigate([item.route]);
  }
}
