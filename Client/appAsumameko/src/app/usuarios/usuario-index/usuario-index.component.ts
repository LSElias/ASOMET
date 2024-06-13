import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { UsuarioCreateComponent } from '../usuario-create/usuario-create.component';
import { UsuarioDesactivarComponent } from '../usuario-desactivar/usuario-desactivar.component';

@Component({
  selector: 'app-usuario-index',
  templateUrl: './usuario-index.component.html',
  styleUrls: ['./usuario-index.component.css'],
})
export class UsuarioIndexComponent implements AfterViewInit {
  selectedStatus: any;
  selectedRole: any;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['id', 'cedula', 'nombre', 'correo', 'accion'];
  user = '';
  filteredData: any;
  asociados = [];
  ops = [];
  admins = [];

  statuses = [
    {
      id: 2,
      name: 'Inactivo',
    },
    {
      id: 1,
      name: 'Activo',
    },
  ];

  roles = [
    {
      id: 1,
      name: 'Administrador',
    },
    {
      id: 2,
      name: 'Operario',
    },
    {
      id: 3,
      name: 'Asociado',
    },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('userFormModal') userFormModal!: UsuarioCreateComponent;
  @ViewChild('hideUserFormModal')
  hideUserFormModal!: UsuarioDesactivarComponent;

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedStatus = 1;
    this.selectedRole = 1;
  }

  ngAfterViewInit() {
    var id = 0;
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.setCantUsuarios();
      });
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

  setCantUsuarios() {
    this.asociados = this.datos.filter((data: any) => data.idRol === 3);
    this.ops = this.datos.filter((data: any) => data.idRol === 2);
    this.admins = this.datos.filter((data: any) => data.idRol === 1);
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

  cedulaChange(event: any) {
    console.log(this.datos[0].cedula);
    const cedulae = event.value;
    if (cedulae !== '') {
      this.filteredData = this.datos.filter((i: any) =>
        String(i.cedula).includes(String(cedulae))
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
    this.userFormModal.openModal();
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
    this.userFormModal.openModal(id);
  }

  deactivate(id: any) {
    /*  this.router.navigate(['/usuario/deactivar', id], {
      relativeTo: this.route,
    }); */

    this.hideUserFormModal.openModal(id);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
