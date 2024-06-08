import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from '../shared/menu/menu.component';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { NgIconsModule } from '@ng-icons/core';



@NgModule({
  declarations: [
    UsuarioIndexComponent

  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    NgIconsModule.withIcons({ heroPlus
     })
  ]
})
export class UsuariosModule { }
