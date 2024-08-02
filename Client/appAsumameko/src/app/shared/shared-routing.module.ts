import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent},
  { path: 'header', component: HeaderComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
