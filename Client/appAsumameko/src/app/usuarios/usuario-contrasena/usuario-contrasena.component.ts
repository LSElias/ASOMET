import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
  idUser: any;
  genericService: any;

  passwordForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  respuesta: any;

  // Flags de creación/actualización
  isCreate: boolean = true;
  titleForm: string = 'Creación';

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    //   private authService: AuthenticationService,
    private noti: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.passwordForm = this.fb.group({
      idUsuario: [null, null],

      contrasenaActual: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
      contrasenaNueva: [
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
  }

  onSubmit() {
    console.log(this.passwordForm.value);
  }
}
