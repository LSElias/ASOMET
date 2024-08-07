import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  SimpleChanges,
  Input,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/shared/notification.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-usuario-asistencia',
  templateUrl: './usuario-asistencia.component.html',
  styleUrls: ['./usuario-asistencia.component.css'],
})
export class UsuarioAsistenciaComponent {
  @Input() formData: any;
  isVisibleModalAsistencia = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  action: string = '';

  constructor(
    public fb: FormBuilder,
    private gService: GenericService,
    private noti: NotificacionService,
    private userService: UserService
  ) {}

  openModal(data: any) {
    this.isVisibleModalAsistencia = true;
    this.formData = data.data;
  }

  closeModal() {
    this.isVisibleModalAsistencia = false;
  }

  onSubmit() {
    this.formData = {
      ...this.formData,
      enviarInv: 'true',
    };

    const info = {
      idUsuario: this.formData.idUsuario,
      enviarInv: 'true',
    };

    this.gService
      .update('usuario/idM', this.formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.noti.mensaje(
          'Usuarios • Creación de Usuario',
          `Usuario: ${this.formData.nombreCompleto} ha sido registrado con éxito.`,
          TipoMessage.success
        );
        this.userService.emitUserInvited();
      });
    this.closeModal();
  }
  setAction(action: string) {
    this.action = action;
  }
}
