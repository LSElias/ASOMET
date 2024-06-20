import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoDetalleComponent } from './evento-detalle/evento-detalle.component';

const routes: Routes = [
  { path: 'eventos/:id', component: EventoDetalleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
