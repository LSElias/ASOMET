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
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css'],
})
export class EventoFormComponent {
  isVisible = false;
  idUser: number = 0;
  userData: any;
  respuesta: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  eventForm: FormGroup;
  titleForm: string = 'Crear evento';

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    this.eventForm = this.fb.group({
      idCreador: [30, Validators.required],
      titulo: ['', Validators.required],
      localizacion: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.email]],
    });
  }

  // Método para abrir el modal
  openModal() {
    this.isVisible = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.isVisible = false;
  }

  onSubmit() {
    console.log(this.eventForm.value);

    if (this.eventForm.value) {
      this.gService
        .create('eventos/crear', this.eventForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respuesta = data;
          this.noti.mensajeRedirect(
            'Eventos • Creación de evento',
            `Evento: ${data.titulo} ha sido creado con exito.`,
            TipoMessage.success,
            'evento'
          );
          console.log(this.respuesta);
        });
    }
    this.closeModal();
  }
}
