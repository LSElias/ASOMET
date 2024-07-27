import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { SharedModule } from '../shared/shared.module';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { NgIconsModule } from '@ng-icons/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './usuario-update/usuario-update.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UsuarioDesactivarComponent } from './usuario-desactivar/usuario-desactivar.component';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { UsuarioAjustesComponent } from './usuario-ajustes/usuario-ajustes.component';
import { UsuarioContrasenaComponent } from './usuario-contrasena/usuario-contrasena.component';

@NgModule({
  declarations: [
    UsuarioIndexComponent,
    UsuarioCreateComponent,
    UsuarioUpdateComponent,
    UsuarioDesactivarComponent,
    UsuarioDetalleComponent,
    UsuarioAjustesComponent,
    UsuarioContrasenaComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    NgIconsModule.withIcons({ heroPlus }),
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
export class UsuariosModule {}
