import { Component } from '@angular/core';
import { HeaderNameService } from '../headername.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  pagina: any;
  user: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user; 
    });

    if (!this.user) {
      const token = this.authService.getToken();
    }
  }

}
