import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginComponent } from '././login/login/login.component';
import { UsuarioIndexComponent } from './usuarios/usuario-index/usuario-index.component';
import { DashboardIndexComponent } from './dashboard/dashboard-index/dashboard-index.component';
import { EventoIndexComponent } from './eventos/evento-index/evento-index.component';
import { EventoDetalleComponent } from './eventos/evento-detalle/evento-detalle.component';
import { IndexComponent } from './reportes/index/index.component';
import { ReporteMayorAsistenciaComponent } from './reportes/reporte-mayor-asistencia/reporte-mayor-asistencia.component';
import { ReporteMenorAsistenciaComponent } from './reportes/reporte-menor-asistencia/reporte-menor-asistencia.component';
import { ReporteConfirmacionesAsistenciaComponent } from './reportes/reporte-confirmaciones-asistencia/reporte-confirmaciones-asistencia.component';
import { UsuarioCreateComponent } from './usuarios/usuario-create/usuario-create.component';
import { AuthGuard } from './auth/auth.guard';

/* const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'ee',
    component: MenuComponent,
  },
]; */

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta predeterminada
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuarioIndexComponent },
  { path: 'usuario/create', component: UsuarioCreateComponent },
  { path: 'dashboard', component: DashboardIndexComponent,canActivate: [AuthGuard] },
  { path: 'eventos', component: EventoIndexComponent },
  { path: 'reportes', component: IndexComponent },
  {
    path: 'reportes/mayor-asistencia',
    component: ReporteMayorAsistenciaComponent,
  },
  {
    path: 'reportes/menor-asistencia',
    component: ReporteMenorAsistenciaComponent,
  },
  {
    path: 'reportes/confirmaciones-asistencia',
    component: ReporteConfirmacionesAsistenciaComponent,
  },

  { path: 'eventos/:id', component: EventoDetalleComponent },
  /*  { path: 'ajustes', component: AjustesComponent },*/
 { path: 'logout', component: LoginComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
