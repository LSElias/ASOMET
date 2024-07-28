import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventoIndexComponent } from './evento-index/evento-index.component';
import { UsuariosRoutingModule } from '../usuarios/usuarios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgIconsModule } from '@ng-icons/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { heroPaperAirplaneSolid} from '@ng-icons/heroicons/solid';
import { EventoDetalleComponent } from './evento-detalle/evento-detalle.component';
import { EventoFormComponent } from './evento-form/evento-form.component';
import { EventoAsociadoComponent } from './evento-asociado/evento-asociado.component';
import { EventoAsistenciaComponent } from './evento-asistencia/evento-asistencia.component';
<<<<<<< HEAD
import { EventoAsambleaComponent } from './evento-asamblea/evento-asamblea.component';
=======
>>>>>>> d8214b70ae6cb2b2698a9c46ff22875fddba24d0

@NgModule({
  declarations: [
    EventoIndexComponent,
    EventoDetalleComponent,
    EventoFormComponent,
    EventoAsociadoComponent,
    EventoAsistenciaComponent,
<<<<<<< HEAD
    EventoAsambleaComponent
=======
>>>>>>> d8214b70ae6cb2b2698a9c46ff22875fddba24d0
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    NgIconsModule.withIcons({ heroPlus, heroPaperAirplaneSolid }),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class EventosModule {}
