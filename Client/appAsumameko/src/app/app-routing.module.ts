import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginComponent } from '././login/login/login.component';
import { UsuarioIndexComponent } from './usuarios/usuario-index/usuario-index.component';
import { DashboardIndexComponent } from './dashboard/dashboard-index/dashboard-index.component';
import { EventoIndexComponent } from './eventos/evento-index/evento-index.component';
import { EventoDetalleComponent } from './eventos/evento-detalle/evento-detalle.component';
import { EventoAsambleaComponent } from './eventos/evento-asamblea/evento-asamblea.component';
import { IndexComponent } from './reportes/index/index.component';
import { ReporteMayorAsistenciaComponent } from './reportes/reporte-mayor-asistencia/reporte-mayor-asistencia.component';
import { ReporteMenorAsistenciaComponent } from './reportes/reporte-menor-asistencia/reporte-menor-asistencia.component';
import { ReporteConfirmacionesAsistenciaComponent } from './reportes/reporte-confirmaciones-asistencia/reporte-confirmaciones-asistencia.component';
import { UsuarioCreateComponent } from './usuarios/usuario-create/usuario-create.component';
import { AuthGuard } from './auth/auth.guard';
import { RespuestaComponent } from './eventos/respuesta/respuesta.component';
import { UsuarioAjustesComponent } from './usuarios/usuario-ajustes/usuario-ajustes.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta predeterminada
  { path: 'login', component: LoginComponent },

  
  { path: 'usuario', component: UsuarioIndexComponent, 
    canActivate: [AuthGuard], data:{rol:[1,2]}
  },
  { path: 'usuario/create', component: UsuarioCreateComponent, 
    canActivate: [AuthGuard], data:{rol:[1,2]}
  },
  { path: 'dashboard', component: DashboardIndexComponent,
    canActivate: [AuthGuard], data:{rol:[1,2]} },
  { path: 'eventos', component: EventoIndexComponent,
    canActivate: [AuthGuard], data:{rol:[1,2]} },
  { path: 'reportes', component: IndexComponent,
    canActivate: [AuthGuard], data:{rol:[1]}
   },
  {
    path: 'reportes/mayor-asistencia',
    component: ReporteMayorAsistenciaComponent,
    canActivate: [AuthGuard], data:{rol:[1]}
  },
  {
    path: 'reportes/menor-asistencia',
    component: ReporteMenorAsistenciaComponent,
    canActivate: [AuthGuard], data:{rol:[1]}
  },
  {
    path: 'reportes/confirmaciones-asistencia',
    component: ReporteConfirmacionesAsistenciaComponent,
    canActivate: [AuthGuard], data:{rol:[1]}
  },

  { path: 'eventos/:id', component: EventoDetalleComponent,
    canActivate: [AuthGuard], data:{rol:[1,2]}
   },
  /*  { path: 'ajustes', component: AjustesComponent },*/
  
 { path: 'asamblea', component: EventoAsambleaComponent,
  canActivate: [AuthGuard], data:{rol:[1,2]}
  },
  
  { path: 'ajustes', component: UsuarioAjustesComponent },
  
  { path: 'respuesta', component: RespuestaComponent },
  { path: 'logout', component: LogoutComponent},
  
  
  { path: '**', redirectTo: '/notfound', pathMatch: 'full' }, // Ruta predeterminada
  { path:'notfound', component: NotFoundComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],
})
export class AppRoutingModule {}
