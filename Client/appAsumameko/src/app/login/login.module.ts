import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component'; 
import { LoginRoutingModule } from './login-routing.module';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OlvidarPassComponent } from './olvidar-pass/olvidar-pass.component';
import { CambiarPassComponent } from './cambiar-pass/cambiar-pass.component';


@NgModule({
  declarations: [LoginComponent, OlvidarPassComponent, CambiarPassComponent],
  imports: [
    CommonModule, 
    RouterModule,  
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [LoginComponent] 
})
export class LoginModule { }
