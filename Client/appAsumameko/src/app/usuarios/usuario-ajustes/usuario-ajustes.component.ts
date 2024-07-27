import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/shared/notification.service';
import { UsuarioContrasenaComponent } from '../usuario-contrasena/usuario-contrasena.component';

@Component({
  selector: 'app-usuario-ajustes',
  templateUrl: './usuario-ajustes.component.html',
  styleUrls: ['./usuario-ajustes.component.css'],
})
export class UsuarioAjustesComponent {
  editar = false;
  isVisible = false;
  idUser: any;
  userName: any;
  userEmail: any;
  idRol: any;
  telefono: any;
  cedula: any;
  numRegex = '^[0-9]*$';
  activeRouter: any;
  submitted = false;
  respCreate: any;
  genericService: any;

  userForm: FormGroup;
  userData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  respuesta: any;

  // Flags de creación/actualización
  isCreate: boolean = true;
  titleForm: string = 'Creación';

  @ViewChild('modalPasswordChild')
  modalPasswordChild!: UsuarioContrasenaComponent;

  roles = [
    {
      id: 2,
      name: 'Operario',
    },
    {
      id: 3,
      name: 'Asociado',
    },
  ];

  data = {
    idUsuario: 1,
    idRol: 2,
    idEstUsuario: 3,
    cedula: '123456789',
    correo: 'ejemplo@gmail.com',
    contrasena: 'contrasena123',
    telefono: '62503829',
    nombreCompleto: 'Juan Pérez',
  };

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
    this.userForm = this.fb.group({
      idUsuario: [null, null],
      idRol: [null, Validators.required],
      idEstUsuario: [null, null],
      cedula: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12),
          Validators.pattern(this.numRegex),
        ]),
      ],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
      telefono: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.numRegex),
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
      ],
      nombreCompleto: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);

    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.get(key)?.disable();
    });
  }

  onEdit() {
    this.editar = true;
    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.get(key)?.enable();
    });
  }
  onCancel() {
    this.editar = false;

    this.userForm.patchValue(this.data);

    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.get(key)?.disable();
    });
  }
  onSubmit() {
    console.log(this.userForm.value);
  }

  openPasswordModal() {
    this.modalPasswordChild.openModal();
  }
}
