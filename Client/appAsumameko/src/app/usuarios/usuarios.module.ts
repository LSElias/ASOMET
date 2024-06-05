import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';


@NgModule({
  declarations: [
    UsuarioIndexComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
