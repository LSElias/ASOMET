import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-evento-asistencia',
  templateUrl: './evento-asistencia.component.html',
  styleUrls: ['./evento-asistencia.component.css']
})
export class EventoAsistenciaComponent {
  isVisible = false; 
  idUsuario: number = 0; 
  nombreCompleto: string = ""; 
  respuesta: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userForm: FormGroup; 
  @Input() idEvento: number | null = null;  
  @Output() asistenciaModificada: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
  }

    // Método para abrir el modal
    openModal(id: number, nombre: string) {
      this.idUsuario = id;
      this.nombreCompleto = nombre; 
      this.isVisible = true;
      console.log(this.idUsuario);
    }
  
    // Método para cerrar el modal
    closeModal() {
      this.isVisible = false;
    }

    onConfirmarAsistencia(){
      const info = { eventId: this.idEvento, asociadoId: this.idUsuario, asistenciaId: 1 }
      
      console.log(info); 

      this.gService
      .update('eventos/asistencia', info)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.respuesta = data; 
          this.noti.mensajeRedirect(
            'Modificación de asistencia',
            `La asistencia fue modificado con éxito. `,
            TipoMessage.success,
            `/eventos/${this.idEvento}`
          );

          this.asistenciaModificada.emit(); 
        }
      );
      this.closeModal(); 
    }

    onAusenciaAsistencia(){
      const info = { eventId: this.idEvento, asociadoId: this.idUsuario, asistenciaId: 2 }
      
      console.log(info); 

      this.gService
      .update('eventos/asistencia', info)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.respuesta = data; 
          this.noti.mensajeRedirect(
            'Modificación de asistencia',
            `La asistencia fue modificado con éxito. `,
            TipoMessage.success,
            `/eventos/${this.idEvento}`
          );

          this.asistenciaModificada.emit(); 
        }
      );
      this.closeModal(); 
    }
}
