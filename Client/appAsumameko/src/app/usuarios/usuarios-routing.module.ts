import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioUpdateComponent } from './usuario-update/usuario-update.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
