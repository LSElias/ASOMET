import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  currentSlide = 0;
  slides = [0, 1, 2, 3];
  /* slides = [0]; */
  private carouselInterval: any;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  setCurrentSlide(index: number) {
    this.currentSlide = index;
    this.restartCarousel();
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000);
  }

  restartCarousel() {
    this.stopCarousel();
    this.startCarousel();
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        this.errorMessage = error.message;
      }
    );
}





}
