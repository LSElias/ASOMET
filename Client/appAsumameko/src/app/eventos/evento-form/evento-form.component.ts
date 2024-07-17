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
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css'],
})
export class EventoFormComponent {
  isVisible = false;
  idEvento: number = 0;
  eventoData: any;
  respuesta: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  eventForm: FormGroup;
  titleForm: string = 'Crear evento';
  isCreate: boolean;
  @Output() eventoCreado: EventEmitter<void> = new EventEmitter<void>();
  makeSubmit: boolean = false;
  submitted = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    this.eventForm = this.fb.group({
      idEvento: [null, null],
      idCreador: [30, Validators.required],
      titulo: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      localizacion: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      descripcion: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  // Método para abrir el modal
  openModal(id?: any) {
    this.isVisible = true;
    if (id != undefined && !isNaN(Number(id))) {
      this.loadData(id);
    } else {
      this.titleForm = 'Creación';
      this.isCreate = true;
    }
  }

  loadData(id: any): void {
    this.isCreate = false;
    this.titleForm = 'Actualización';
    this.idEvento = id;

    this.gService
      .get('eventos', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.eventoData = data;
        console.log(this.eventoData);
        this.eventForm.setValue({
          idEvento: this.eventoData.idEvento,
          idCreador: this.eventoData.idCreador,
          titulo: this.eventoData.titulo,
          localizacion: this.eventoData.localizacion,
          fecha: this.eventoData.fecha,
          hora: this.eventoData.hora,
          descripcion: this.eventoData.descripcion,
        });
      });
  }

  // Método para cerrar el modal
  closeModal() {
    this.submitted = false;
    this.eventForm.reset();
    this.eventoCreado.emit();
    this.isVisible = false;
  }

  onSubmit() {
    this.submitted = true;

    console.log(this.eventForm.value);
    if (this.eventForm.invalid) {
      this.noti.mensajeRedirect(
        'Eventos • Creación de evento',
        `Datos incorrectos, revise haber introducido bien la información.`,
        TipoMessage.success,
        'evento'
      );
      return;
    }

    if (this.isCreate) {
      if (this.eventForm.value) {
        this.gService
          .create('eventos/crearEventoAsis', this.eventForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.respuesta = data;
            this.noti.mensajeRedirect(
              'Eventos • Creación de evento',
              `Evento: ${data.titulo} ha sido creado con exito.`,
              TipoMessage.success,
              'evento'
            );
            this.router.navigate(['/eventos/']);
            this.eventoCreado.emit();
          });
      }
    } else {
      this.gService
        .update('eventos/actualizar', this.eventForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respuesta = data;
          this.noti.mensajeRedirect(
            'Usuarios • Actualización de Evento',
            `Usuario: ${data.titulo} ha sido actualizado con éxito.`,
            TipoMessage.success,
            'usuarios'
          );
          this.router.navigate(['/eventos/']);
          this.eventoCreado.emit();
        });
    }
    this.eventoCreado.emit();
    this.closeModal();
  }

  onReset() {
    this.eventForm.reset();
  }

  // Control de Errores
  public errorHandling = (control: string, error: string) => {
    return (
      this.eventForm.controls[control].hasError(error) &&
      this.eventForm.controls[control].invalid &&
      (this.makeSubmit || this.eventForm.controls[control].touched)
    );
  };
}
