import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  slides = [0, 1, 2, 3];
  /* slides = [0]; */
  private carouselInterval: any;

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
}
