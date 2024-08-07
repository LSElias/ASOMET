import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/shared/generic.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css'],
})
export class DashboardIndexComponent implements OnInit {
  user: any = null;
  dia: string;
  mes: string;
  anio: string;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  rTitulo: any;
  rFecha: any;
  rLocalizacion: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private gService: GenericService,
    private route: ActivatedRoute
  ) {
    const fecha = new Date();
    const opciones: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    const partes = fecha.toLocaleDateString('es-ES', opciones).split(' ');

    // Asigna las partes de la fecha a las variables
    this.dia = partes[0];
    this.mes = partes[1];
    this.anio = partes[2];
  }

  ngOnInit(): void {
    this.authService.decodeToken.subscribe((usuario: any) => {
      this.user = usuario;
    });

    if (!this.user) {
      const token = this.authService.getToken;
    }

    this.fetchEventos();
    console.log(this.rTitulo);
  }

  fetchEventos() {
    this.gService
      .list('eventos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.datos = response[0];
        this.rTitulo = this.datos.titulo;
        this.rFecha = this.datos.fecha;
        this.rLocalizacion = this.datos.localizacion;
      });
  }
  /* fetchEventoActual() {
    this.gService
      .list('eventos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((datos: any) => {
        const { titulo, fecha, localizacion } = datos[0];

        this.rTitulo = titulo;
        this.rFecha = fecha;
        this.rLocalizacion = localizacion;
        console.log(titulo);
      });
  } */

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/dashboard']);
  }
}
