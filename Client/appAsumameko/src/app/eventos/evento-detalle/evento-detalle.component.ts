import { AfterViewInit, Component } from '@angular/core';
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
import {EventoAsociadoComponent} from '../evento-asociado/evento-asociado.component'; 

@Component({
  selector: 'app-evento-detalle',
  templateUrl: './evento-detalle.component.html',
  styleUrls: ['./evento-detalle.component.css'],
})
export class EventoDetalleComponent implements AfterViewInit{
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
  @ViewChild('asociadoModal') asociadoFormModal!: EventoAsociadoComponent;

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private noti: NotificacionService,
  ) {}

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.eventId = +id;
        if(this.asociadoFormModal){
          this.asociadoFormModal.idEvento = this.eventId; 
        }
      }
    });
   
    this.asociadoFormModal.asociadoCreado.subscribe(() => {
      this.fetch(); 
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.eventId = +id;
        if(this.asociadoFormModal){
          this.asociadoFormModal.idEvento = this.eventId; 
        }
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
        this.disableButton();
        console.log(response);
        this.dataSource = new MatTableDataSource(response.asistencia);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  disableButton() {
    if (this.datos && this.datos.asistencia) {
      this.datos.asistencia.forEach((i: any) => {
        if (
          i.contador >= 3 ||
          i.estadoConfirmacion.idEstadoConfir === 1 ||
          i.estadoConfirmacion.idEstadoConfir === 2
        ) {
          i.desactivado = true;
        }
      });
    }
  }

  disableButton_General(): boolean {
    if (this.datos && this.datos.asistencia) {
      for (let i of this.datos.asistencia) {
        if (
          i.contador >= 3 ||
          i.estadoConfirmacion.idEstadoConfir === 1 ||
          i.estadoConfirmacion.idEstadoConfir === 2
        ) {
          return true;
        }
      }
    }
    return false;

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

  sendEmail_General() {
    let correos: string[] = [];

    this.datos.asistencia.forEach((i: any) => {
      if (i.estadoConfirmacion.idEstadoConfir === 4 ||
        i.estadoConfirmacion.idEstadoConfir === 3 && i.contador < 3) {
            correos.push(i.asociado.correo);
       
      }
    });

    const info = {
      eventId: this.datos.idEvento,
      selectedEmails: correos,
    };

    console.log(info);

    this.gService
      .create('mail/sendEventNotification', info)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.datos = response;
        console.log(response);
        this.updateTable(this.datos);
        this.fetch();
        this.disableButton();
        this.noti.mensajeRedirect(
          'Correos Enviados Exitosamente',
          `Invitaciones enviadas`,
          TipoMessage.success,
          'Correos Enviados'
        );

      });
  }

  sendEmail_Individual(idEvento: number, correo: string){
    const info = { eventId: idEvento, selectedEmails: [correo]};

    console.log(info);
     
    this.gService
    .create('mail/sendEventNotification', info)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      this.datos = response;
      console.log(response);
      this.updateTable(this.datos);
      this.fetch();
      this.noti.mensajeRedirect(
        'Correo Enviado Exitosamente',
        `Invitación enviada`,
        TipoMessage.success,
        'Correo Enviado'
      );
    });

  }
  
  crear(){
    this.asociadoFormModal.openModal();
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe(); 
  }

}
