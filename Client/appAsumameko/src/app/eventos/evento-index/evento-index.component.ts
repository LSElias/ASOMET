import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';

@Component({
  selector: 'app-evento-index',
  templateUrl: './evento-index.component.html',
  styleUrls: ['./evento-index.component.css']
})
export class EventoIndexComponent {
  selectedStatus: any;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['id', 'titulo', 'localizacion', 'fecha', 'accion'];
  user = '';
  filteredData: any;
  rTitulo:any;
  rFecha: any;
  rLocalizacion : any;


  statuses: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
//  @ViewChild('userFormModal') userFormModal!: EventoCreateComponent;
//  @ViewChild('hideUserFormModal')
//  hideUserFormModal!: UsuarioDesactivarComponent;

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedStatus = 1;
  }

  ngAfterViewInit() {
    this.fetch();
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


  fillReciente(data: any){
    this.rTitulo = data.titulo
    this.rFecha = data.fecha
    this.rLocalizacion = data.localizacion
  }

  onUsuarioCreado() {
    this.fetch();
  }


  // Redefinir cuando tengamos en el backend la función para traer los tipos de usuario -- ERG
  setSelectedRole() {
    switch (this.user) {
      case 'Administrador': {
        this.selectedStatus = 'Operario';
        break;
      }
      case 'Operario': {
        this.selectedStatus = 'Asociados';
        break;
      }
      default: {
        this.selectedStatus = 'Administradores';
        break;
      }
    }
  }

  statusChange(value: any) {
    console.log(value.value);
    switch (value.value) {
      case '2': {
        this.filteredData = this.datos.filter(
          (data: any) => data.idEstUsuario === 2
        );
        this.updateTable(this.filteredData);
        break;
      }
      case '1': {
        this.filteredData = this.datos.filter(
          (data: any) => data.idEstUsuario === 1
        );
        this.updateTable(this.filteredData);
        break;
      }
      default: {
        this.updateTable(this.datos);
        break;
      }
    }
  }

  roleChange(value: any) {
    console.log(value.value);
    switch (value.value) {
      case '1': {
        this.filteredData = this.datos.filter((data: any) => data.idRol === 1);
        this.updateTable(this.filteredData);
        break;
      }
      case '2': {
        this.filteredData = this.datos.filter((data: any) => data.idRol === 2);
        this.updateTable(this.filteredData);
        break;
      }
      case '3': {
        this.filteredData = this.datos.filter((data: any) => data.idRol === 3);
        this.updateTable(this.filteredData);
        break;
      }
      default: {
        this.updateTable(this.datos);
        break;
      }
    }
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

  crear() {
    /*   this.router.navigate(['/usuario/form/', 0], {
      relativeTo: this.route,
    }); */
   // this.userFormModal.openModal();
  }

  redirectDetalle(id: any) {
    this.router.navigate(['/usuario/detalle', id], {
      relativeTo: this.route,
    });
  }

  update(id: any) {
    /*
    this.router.navigate(['/usuario/actualizar', id], {
      relativeTo: this.route,
    });*/
 //   this.userFormModal.openModal(id);
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
