import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { GenericService } from 'src/app/shared/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/shared/notification.service';

@Component({
  selector: 'app-usuario-contrasena',
  templateUrl: './usuario-contrasena.component.html',
  styleUrls: ['./usuario-contrasena.component.css'],
})
export class UsuarioContrasenaComponent {
  isVisible = false;
  //idUser: any;
  genericService: any;

  passwordForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  respuesta: any;
  @Input() correo: string | null = null;
  @Output() passModificada: EventEmitter<void> = new EventEmitter<void>();
  showWarning: boolean = false;

  // Flags de creación/actualización
  isCreate: boolean = true;
  titleForm: string = 'Creación';

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthService,
    private noti: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.passwordForm = this.fb.group({
      correo: this.correo,
      contrasenaNueva: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
      contrasena: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
    });
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.passwordForm.get('contrasena')?.reset();
    this.passwordForm.get('contrasenaNueva')?.reset();
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      Object.keys(this.passwordForm.controls).forEach((f) => {
        const control = this.passwordForm.get(f);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const newPass = this.passwordForm.get('contrasenaNueva')?.value;
    const confirmPass = this.passwordForm.get('contrasena')?.value;

    if (newPass !== confirmPass) {
      this.passwordForm.setErrors({ passwordMismatch: true });
      this.showWarning = true;

      setTimeout(() => {
        this.passwordForm.get('contrasena')?.reset();
        this.passwordForm.get('contrasenaNueva')?.reset();
        this.showWarning = false;
      }, 2000);

      return;
    } else {
      if (this.passwordForm.value) {


        let info = {
          correo: this.correo,
          contrasena: this.passwordForm.value.contrasena,
        };

        this.gService
          .update('usuario/correo', info)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.noti.mensajeRedirect(
              'Usuario • Actualización de Contraseña',
              `Su contraseña ha sido actualizada con éxito.`,
              TipoMessage.success,
              'ajustes'
            );

            this.passwordForm.get('contrasena')?.reset();
            this.passwordForm.get('contrasenaNueva')?.reset();
            this.passModificada.emit();
            this.closeModal();
            this.router.navigate(['/ajustes/']);
          });
      }
    }
  }
}
