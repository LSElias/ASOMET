import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component'; 
import { LoginRoutingModule } from './login-routing.module';  
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    RouterModule,  
    LoginRoutingModule,
    FormsModule
  ],
  exports: [LoginComponent] 
})
export class LoginModule { }
