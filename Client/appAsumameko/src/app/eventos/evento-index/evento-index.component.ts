import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { EventoFormComponent } from '../evento-form/evento-form.component';

@Component({
  selector: 'app-evento-index',
  templateUrl: './evento-index.component.html',
  styleUrls: ['./evento-index.component.css'],
})
export class EventoIndexComponent {
  selectedStatus: any;
  datos: any;
  fecha: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['id', 'titulo', 'localizacion', 'fecha', 'accion'];
  user = '';
  filteredData: any;
  rTitulo: any;
  rFecha: any;
  rLocalizacion: any;

  statuses: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('eventModal') eventModal!: EventoFormComponent;
  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedStatus = 1;
  }

  ngOnInit(): void {
    this.fetch();
    this.fetchReciente(); 
  }

  ngAfterViewInit() {
    /*     this.fetchUsuarios(); */
    this.eventModal.eventoCreado.subscribe(() => {
      this.fetch();
    });
    this.fetchReciente(); 

  }

  fetch() {
    this.gService
      .list('eventos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.datos = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.fillReciente(this.datos[0]);
      });
  }


  fetchReciente(){

    this.gService
      .list('eventos/fecha')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
      this.fecha = response;
      console.log(this.fecha); 
        this.fillReciente(this.fecha);
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

  crear() {
    this.eventModal.openModal();
  }

  redirectDetalle(id: any) {
    this.router.navigate(['/eventos/', id], {
      relativeTo: this.route,
    });
  }

  update(id: any) {
    /*
    this.router.navigate(['/usuario/actualizar', id], {
      relativeTo: this.route,
    });*/
    this.eventModal.openModal(id);
  }

  deactivate(id: any) {
    /*  this.router.navigate(['/usuario/deactivar', id], {
      relativeTo: this.route,
    }); */
    //   this.hideUserFormModal.openModal(id);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
