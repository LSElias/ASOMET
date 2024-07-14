import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';

@Component({
  selector: 'app-reporte-menor-asistencia',
  templateUrl: './reporte-menor-asistencia.component.html',
  styleUrls: ['./reporte-menor-asistencia.component.css'],
})
export class ReporteMenorAsistenciaComponent {
  selectedStatus: any;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = [
    'evento',
    'fecha',
    'confirmaciones',
    'asistencias',
    'ausentes',
    'tasa',
  ];
  user = '';
  filteredData: any;
  rTitulo: any;
  rFecha: any;
  rLocalizacion: any;

  statuses: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedStatus = 1;
  }

  ngOnInit(): void {
    this.fetch();
  }

  ngAfterViewInit() {}

  fetch() {
    this.gService
      .list('reporte/menor')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.datos = response;

        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.fillReciente(this.datos[0]);
      });
  }

  onEventoCreado() {
    this.fetch();
  }

  fillReciente(data: any) {
    this.rTitulo = data.titulo;
    this.rFecha = data.fecha;
    this.rLocalizacion = data.localizacion;
  }

  nombreChange(event: any) {
    console.log(this.datos[0].titulo);
    const titulae = event.value;
    if (titulae !== '') {
      this.filteredData = this.datos.filter((i: any) =>
        String(i.titulo.toLowerCase()).includes(String(titulae.toLowerCase()))
      );
      this.updateTable(this.filteredData);
    } else {
      this.updateTable(this.datos);
    }
  }

  updateTable(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }

  redirectDetalle(id: any) {
    this.router.navigate(['/eventos/', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
