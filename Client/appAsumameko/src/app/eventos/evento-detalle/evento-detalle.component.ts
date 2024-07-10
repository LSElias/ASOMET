import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { EventoFormComponent } from '../evento-form/evento-form.component';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/shared/notification.service';

@Component({
  selector: 'app-evento-detalle',
  templateUrl: './evento-detalle.component.html',
  styleUrls: ['./evento-detalle.component.css'],
})
export class EventoDetalleComponent {
  eventId: number | null = null;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = [
    'cedula',
    'asociado',
    'confirmacion',
    'asistencia',
    'contador',
    'accion',
  ];
  filteredData: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('eventModal') eventModal!: EventoFormComponent;
  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private noti: NotificacionService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.eventId = +id;
      }
    });
    this.fetch();
  }

  fetch() {
    this.gService
      .list(`eventos/${this.eventId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.datos = response;
        console.log(response);
        this.dataSource = new MatTableDataSource(response.asistencia);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  nombreChange(event: any) {
    const nombre = event.target.value.toLowerCase();
    if (nombre !== '') {
      this.filteredData = this.datos.asistencia.filter((i: any) =>
        i.asociado.nombreCompleto.toLowerCase().includes(nombre)
      );
    } else {
      this.filteredData = this.datos.asistencia;
    }

    this.updateTable(this.filteredData);
  }

  updateTable(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
//En proceso 
  sendEmail_General() {
    let correos: string[] = [];

    this.datos.asistencia.forEach((i: any) => {
      if (i.contador < 3) {
        //Valida Estado Confirmación
        if (
          i.estadoConfirmacion.idEstadoConfir === 4 ||
          i.estadoConfirmacion.idEstadoConfir === 3
        ) {
          correos.push(i.asociado.correo);
        }

        if (
          i.contador === 3 ||
          i.estadoConfirmacion.idEstadoConfir === 1 ||
          i.estadoConfirmacion.idEstadoConfir === 2
        ) {
          i.desactivado = true;
        }
      } else {
        i.desactivado = true;
      }
    });

    const info = {
      eventId: this.datos.idEvento,
      selectedEmails: correos,
    };

    console.log(info);

    this.updateTable(this.datos.asistencia);
    this.fetch(); 
    this.gService
      .create('mail/sendEventNotification', info)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          this.datos = response;
          console.log(response);
        
        },
        (error) => {
          console.error('Error al enviar correos:', error);
          this.noti.mensajeRedirect(
            'Error al enviar correos',
            'Por favor, intente nuevamente',
            TipoMessage.error,
            'evento'
          );
        }
      );
  }
  /*
  sendEmail_General() {
    let info: { correo: string; idEstadoConfir: number; contador: number }[] =
      [];

    this.datos.asistencia.forEach((i: any) => {
      if (i.contador < 3) {
        //Valida Estado Confirmación
        if (i.estadoConfirmacion.idEstadoConfir === 4 || i.estadoConfirmacion.idEstadoConfir === 3) {
          i.estadoConfirmacion.idEstadoConfir = 3; 
          i.contador++;

          info.push({
            correo: i.asociado.correo,
            idEstadoConfir: i.estadoConfirmacion.idEstadoConfir,
            contador: i.contador,
          });
        }
        
        if (i.contador === 3 || i.estadoConfirmacion.idEstadoConfir === 1 || i.estadoConfirmacion.idEstadoConfir === 2) {
          i.desactivado = true;
        }
      } else
      {
        i.desactivado = true;
      }
    });

    console.log(info);

    this.updateTable(this.datos.asistencia);
  }
*/
}
