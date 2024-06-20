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
  selector: 'app-usuario-desactivar',
  templateUrl: './usuario-desactivar.component.html',
  styleUrls: ['./usuario-desactivar.component.css'],
})
export class UsuarioDesactivarComponent {
  isVisible = false;
  idUser: number = 0;
  userData: any;
  respuesta: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    // Inicializar el formulario aquí en el constructor
    this.userForm = this.fb.group({
      idRol: ['', Validators.required],
      idEstUsuario: ['', Validators.required],
      cedula: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  // Método para abrir el modal
  openModal(id: any) {
    this.idUser = id;
    this.isVisible = true;
    console.log(this.idUser);
    this.loadUser(this.idUser);
  }

  // Método para cerrar el modal
  closeModal() {
    this.isVisible = false;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.userForm.value) {
      this.gService
        .create(`usuario/idUser/${this.idUser}`, this.userForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respuesta = data;
          this.noti.mensajeRedirect(
            'Usuarios • Mofificación de estado',
            `Usuario: ${data.nombreCompleto} ha exitosa.`,
            TipoMessage.success,
            'usuario'
          );
          console.log(this.respuesta);
        });
    }
    this.closeModal();
  }

  loadUser(id: any): void {
    this.gService
      .get('usuario/IdU', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.userData = data;
        console.log(this.userData);
        this.userForm.setValue({
          idRol: this.userData.idRol,
          idEstUsuario: 2,
          cedula: this.userData.cedula,
          nombreCompleto: this.userData.nombreCompleto,
          correo: this.userData.correo,
          contrasena: this.userData.contrasena,
          telefono: this.userData.telefono,
        });
      });
  }
}
