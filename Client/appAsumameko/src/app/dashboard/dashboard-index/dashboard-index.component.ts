import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css']
})
export class DashboardIndexComponent implements OnInit {
  user: any = null; 
  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.authService.decodeToken.subscribe((usuario: any) => {
      this.user = usuario; 
    });

    if (!this.user) {
      const token = this.authService.getToken;
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/dashboard']);
  }
}
