import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { UsuarioCreateComponent } from '../usuario-create/usuario-create.component';
import { UsuarioDesactivarComponent } from '../usuario-desactivar/usuario-desactivar.component';
import { UsuarioDetalleComponent } from '../usuario-detalle/usuario-detalle.component';

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
  @ViewChild('userDetalleModal') userDetalleModal!: UsuarioDetalleComponent;

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedStatus = 1;
    this.selectedRole = 1;
  }

  ngAfterViewInit() {
    /*     this.fetchUsuarios(); */
    this.userFormModal.usuarioCreado.subscribe(() => {
      this.fetchUsuarios();
    });
    this.hideUserFormModal.usuarioModificado.subscribe((newStatus: number) => {
      this.fetchUsuarios();
      this.selectedStatus = newStatus === 1 ? 2 : 1;
      this.statusChangeDeactivate(this.selectedStatus.toString());
    });
  }

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  fetchUsuarios() {
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.datos = response;
        this.dataSource = new MatTableDataSource(response);

        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        this.setCantUsuarios();
        this.dataSource.data = response;
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

  statusChange(value: any, valueDeactivate?: any) {
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
  statusChangeDeactivate(valueDeactivate?: any) {
    switch (valueDeactivate) {
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
    this.dataSource.data = data;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  crear() {
    this.userFormModal.openModal();
  }

  redirectDetalle(id: any) {
    this.userDetalleModal.openModal(id);
  }

  update(id: any) {
    this.userFormModal.openModal(id);
  }

  deactivate(id: any) {
    this.hideUserFormModal.openModal(id);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
