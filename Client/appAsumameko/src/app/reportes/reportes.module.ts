import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ReporteMayorAsistenciaComponent } from './reporte-mayor-asistencia/reporte-mayor-asistencia.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgIconsModule } from '@ng-icons/core';
import { heroPlus, heroPrinter } from '@ng-icons/heroicons/outline';
import { ReporteMenorAsistenciaComponent } from './reporte-menor-asistencia/reporte-menor-asistencia.component';
import { ReporteConfirmacionesAsistenciaComponent } from './reporte-confirmaciones-asistencia/reporte-confirmaciones-asistencia.component';

@NgModule({
  declarations: [IndexComponent, ReporteMayorAsistenciaComponent, ReporteMenorAsistenciaComponent, ReporteConfirmacionesAsistenciaComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgIconsModule.withIcons({ heroPlus, heroPrinter }),
  ],
})
export class ReportesModule {}
