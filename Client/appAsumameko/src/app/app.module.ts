import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EventosModule } from './eventos/eventos.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { ReportesModule } from './reportes/reportes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    AuthModule,
    UsuariosModule,
    EventosModule,
    SharedModule,
    LoginModule,
    ReportesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
