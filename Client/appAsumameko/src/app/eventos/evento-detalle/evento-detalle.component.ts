import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { EventoFormComponent } from '../evento-form/evento-form.component';

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
    private route: ActivatedRoute
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
    console.log(this.datos[0].asistencia);
    const datos = this.datos[0].asistencia; 
    if (datos !== '') {
      this.filteredData = this.datos.filter((i: any) =>
        String(i.datos.asociado.nombreCompleto.toLowerCase()).includes(String(datos.asociado.nombreCompleto.toLowerCase()))
      );
      this.updateTable(this.filteredData);
    } else {
      this.updateTable(this.datos.asistencia);
    }
  }

  updateTable(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  enviarInvitaciones() {}
}
