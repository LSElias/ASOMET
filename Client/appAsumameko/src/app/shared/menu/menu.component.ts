// menu.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from './menu-data'; // Importa los elementos del menú
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  navItems = navItems; // Asigna los elementos del menú a una propiedad
  user: any;


  constructor(public router: Router, public authService: AuthService) {
    this.authService.decodeToken.subscribe((user: any) => {
      this.user = user;
      console.log(user);
    });
  }

  // Método para manejar la navegación cuando se selecciona un elemento
  onItemSelected(item: any) {
    this.router.navigate([item.route]);
  }
}
