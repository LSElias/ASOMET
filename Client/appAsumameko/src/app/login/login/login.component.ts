import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  correo: string = '';
  contrasena: string = '';
  currentSlide = 0;
  slides = [0, 1, 2, 3];
  /* slides = [0]; */
  private carouselInterval: any;
  errorMessage: string | null = null;
  passwordFieldType: string = 'password';


// FORM -->
  submitted = false;
  makeSubmit: boolean = false;
  userForm: FormGroup;
  userData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  respuesta: any;
// <-- FORM 


  constructor(private authService: AuthService, private router: Router, public fb: FormBuilder,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    this.reactiveForm();
  }

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  reactiveForm() {
    this.userForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
    });
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

  onSubmit(): void {
    this.submitted = true;
    const formData = this.userForm.value;

    if (this.userForm.invalid) {
      this.noti.mensajeRedirect(
        'Inicio de sesión',
        `Sus credenciales no son correctos. Verifiquelos y intente iniciar sesión otra vez.`,
        TipoMessage.error,
        '/'
      );
      return;
    }

      if (this.userForm.value) {
        this.authService
          .login(formData)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data: any) => {

            this.respuesta = data;
            this.noti.mensaje(
              'Inicio de Sesión',
              `Se ha logrado iniciar sesión con éxito.`,
              TipoMessage.success
            );
            this.router.navigate(['/dashboard/']);
          },
        (error)=>{
          this.noti.mensajeRedirect(
            'Inicio de sesión',
            `Sus credenciales no son correctos. Verifiquelos y intente iniciar sesión otra vez.`,
            TipoMessage.error,
            '/'
          );
          return;
        });
      }



/*    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        this.errorMessage = error.message;
      }
    );*/
}

togglePasswordVisibility(): void {
  this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
}


  // Control de Errores
  public errorHandling = (control: string, error: string) => {
    return (
      this.userForm.controls[control].hasError(error) &&
      this.userForm.controls[control].invalid &&
      (this.makeSubmit || this.userForm.controls[control].touched)
    );
  };

  
}
