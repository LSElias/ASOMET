import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginComponent } from './login/login/login.component';
import { UsuarioIndexComponent } from './usuarios/usuario-index/usuario-index.component';
import { DashboardIndexComponent } from './dashboard/dashboard-index/dashboard-index.component';
import { EventoIndexComponent } from './eventos/evento-index/evento-index.component';
import { EventoDetalleComponent } from './eventos/evento-detalle/evento-detalle.component';

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
  { path: 'login', component: LoginComponent },
  
  { path: 'usuario', component: UsuarioIndexComponent },
  { path: 'dashboard', component: DashboardIndexComponent },
  { path: 'eventos', component: EventoIndexComponent },
  { path: 'eventos/:id', component: EventoDetalleComponent },

/*{ path: 'reportes', component: ReportesComponent },
  { path: 'ajustes', component: AjustesComponent },
  { path: 'logout', component: LogoutComponent }, */
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta predeterminada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
