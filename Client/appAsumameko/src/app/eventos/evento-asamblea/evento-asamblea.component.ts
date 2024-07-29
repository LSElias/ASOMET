// evento-asamblea.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventosService } from './evento-asamblea-service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../shared/dialog/message-dialog.component';

@Component({
  selector: 'app-evento-asamblea',
  templateUrl: './evento-asamblea.component.html',
  styleUrls: ['./evento-asamblea.component.css']
})
export class EventoAsambleaComponent {
  eventos: any[];
  idUsuario = 1; // Supongamos que el ID del usuario es 1 para este ejemplo

  constructor(private eventosService: EventosService, private dialog: MatDialog) {}

  ngOnInit() {
    this.eventosService.getEventos().subscribe(data => {
      this.eventos = data;
    });
  }

  confirmarAsistencia(eventoId: number) {
    this.eventosService.confirmarAsistencia(eventoId, this.idUsuario).subscribe(response => {
      this.openDialog(response.message);
    });
  }

  rechazarAsistencia(eventoId: number) {
    this.eventosService.rechazarAsistencia(eventoId, this.idUsuario).subscribe(response => {
      this.openDialog(response.message);
    });
  }


  openDialog(message: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '300px',
      data: { message }
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.href = '/respuesta';
    });
  }
  chunk(array: any[], size: number) {
    if (!array || !Array.isArray(array)) {
      return [];
    }
  
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  }
}
