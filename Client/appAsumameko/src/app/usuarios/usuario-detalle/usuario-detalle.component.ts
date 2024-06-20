import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/shared/notification.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css'],
})
export class UsuarioDetalleComponent {
  isVisible = false;
  idUser: any;
  userName: any;
  userEmail: any;
  idRol: any;
  telefono: any;
  cedula: any;

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
      idRol: [null, null],
      idEstUsuario: [null, null],
      cedula: [null, null],
      correo: [null, null],
      contrasena: [null, null],
      telefono: [null, null],
      nombreCompleto: [null, null],
      rol: [null, null],
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
          rol: this.userData.rol,
        });

        this.onUpdate(this.userData.idRol);
      });
  }

  // Método para cerrar el modal
  closeModal() {
    this.submitted = false;
    this.userForm.reset();
    this.isVisible = false;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    this.submitted = true;

    console.log(this.userForm.value);

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
            console.log(data);
            this.router.navigate(['usuario/']);
          });
      }
    } else {
      this.gService
        .update('usuario', formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respuesta = data;

          this.noti.mensajeRedirect(
            'Usuarios • Actualización de Usuario',
            `Usuario: ${data.nombreCompleto} ha sido actualizado con éxito.`,
            TipoMessage.success,
            'usuarios'
          );
          this.router.navigate(['/usuario/']);
        });
    }
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
