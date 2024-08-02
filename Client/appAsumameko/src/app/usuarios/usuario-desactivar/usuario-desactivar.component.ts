import { Component, EventEmitter, Output } from '@angular/core';
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
  /* @Output() usuarioModificado: EventEmitter<void> = new EventEmitter<void>(); */
  @Output() usuarioModificado: EventEmitter<number> =
    new EventEmitter<number>();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    // Inicializar el formulario aquí en el constructor
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      idEstUsuario: ['', Validators.required],
    });
  }

  // Método para abrir el modal
  openModal(id: any) {
    this.idUser = id;
    this.isVisible = true;
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
        .update(`usuario/idUser`, this.userForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.respuesta = data;
            this.noti.mensajeRedirect(
              'Usuarios • Modificación de estado',
              `Usuario: ${data.nombreCompleto} ha sido actualizado exitosamente.`,
              TipoMessage.success,
              'usuario'
            );
            /* this.usuarioModificado.emit(); */
            this.usuarioModificado.emit(this.userForm.value.idEstUsuario);
          },
          (error) => {
            console.error('Error en la petición:', error);
          }
        );
    }
    this.closeModal();
  }

  loadUser(id: any): void {
    this.gService
      .get('usuario/idU', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.userData = data;
        let idEstUsuario = this.userData.idEstUsuario === 1 ? 2 : 1;
        this.userForm.setValue({
          id: this.userData.id,
          idEstUsuario: idEstUsuario,
        });
      });
  }
}
