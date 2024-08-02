import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { GenericService } from 'src/app/shared/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/shared/notification.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css'],
})
export class UsuarioCreateComponent {
  isVisible = false;
  idUser: any;
  userName: any;
  userEmail: any;
  idRol: any;
  telefono: any;
  cedula: any;
  @Output() usuarioCreado: EventEmitter<void> = new EventEmitter<void>();

  makeSubmit: boolean = false;
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
  user:any;



  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthService,
    private noti: NotificacionService
  ) {
    this.authService.decodeToken.subscribe((user: any) => {
      this.user = user;
    });
    this.reactiveForm();
  }

  reactiveForm() {
    this.userForm = this.fb.group({
      idUsuario: [null, null],
      idRol: [null, Validators.required],
      idEstUsuario: [1],
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

  onChange(event: any) {
    const value = event.target.value;
    if (value !== null) {
      this.idRol = parseInt(value, 10);
    }
  }

  onUpdate(id: any) {
    if (id !== null) {
      this.idRol = parseInt(id, 10);
    }
  }

  // Método para abrir el modal
  openModal(id?: any) {
    this.isVisible = true;
    if (id != undefined && !isNaN(Number(id))) {
      this.loadData(id);
    }
  }

  // Metodo de carga (Actualización)
  loadData(id: any): void {
    this.isCreate = false;
    this.titleForm = 'Actualización';
    this.idUser = id;

    this.gService
      .get('usuario/IdU', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.userData = data;

        this.userForm.setValue({
          idUsuario: this.userData.id,
          idRol: this.userData.idRol,
          idEstUsuario: this.userData.idEstUsuario,
          cedula: this.userData.cedula,
          nombreCompleto: this.userData.nombreCompleto,
          correo: this.userData.correo,
          contrasena: this.userData.contrasena,
          telefono: this.userData.telefono,
        });

        this.onUpdate(this.userData.idRol);
      });
  }

  // Método para cerrar el modal
  closeModal() {
    this.submitted = false;
    this.userForm.reset();
    this.usuarioCreado.emit();
    this.isVisible = false;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    this.submitted = true;


    const formData = this.userForm.value;

    formData.id = parseInt(this.idUser, 10);
    formData.idRol = parseInt(formData.idRol, 10);
    formData.cedula = parseInt(formData.cedula, 10);
    formData.telefono = parseInt(formData.telefono, 10);

    if (formData.id != 2) {
      this.userForm.get('contrasena')?.clearValidators();
      this.userForm.get('contrasena')?.updateValueAndValidity();
    }

    if (this.userForm.invalid) {
      return;
    }

    if (this.isCreate) {
      if (this.userForm.value) {
        this.gService
          .create('usuario/registrar', formData)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.respuesta = data;
            this.noti.mensajeRedirect(
              'Usuarios • Creación de Usuario',
              `Usuario: ${data.nombreCompleto} ha sido creado con éxito.`,
              TipoMessage.success,
              'usuario'
            );
            this.usuarioCreado.emit();
            this.router.navigate(['usuario/']);
          });
      }
    } else {
      this.gService
        .update('usuario', formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respuesta = data;

          this.noti.mensajeRedirect(
            'Usuarios • Actualización de Usuario',
            `Usuario: ${data.nombreCompleto} ha sido actualizado con éxito.`,
            TipoMessage.success,
            'usuarios'
          );
          this.usuarioCreado.emit();
          this.router.navigate(['/usuario/']);
        });
    }
    this.usuarioCreado.emit();
    this.closeModal();
  }

  onReset() {
    this.userForm.reset();
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
