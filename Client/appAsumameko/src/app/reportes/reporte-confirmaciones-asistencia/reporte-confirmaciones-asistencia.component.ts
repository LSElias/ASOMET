import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';

enum TypeGraph {
  BAR = 'bar',
  BUBBLE = 'bubble',
  DOUGHNUT = 'doughnut',
  PIE = 'pie',
  LINE = 'line',
  POLARAREA = 'polarArea',
  RADAR = 'radar',
  SCATTER = 'scatter',
}

@Component({
  selector: 'app-reporte-confirmaciones-asistencia',
  templateUrl: './reporte-confirmaciones-asistencia.component.html',
  styleUrls: ['./reporte-confirmaciones-asistencia.component.css'],
})
export class ReporteConfirmacionesAsistenciaComponent {
  selectedStatus: any;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = [
    'evento',
    'fecha',
    'confirmaciones',
    'asistencias',
    'ausentes',
    'tasa',
  ];
  ctx: any;
  user = '';
  filteredData: any;
  rTitulo: any;
  rFecha: any;
  rLocalizacion: any;
  linear: any;

  statuses: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('lineChart') lineChart!: { nativeElement: any };

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedStatus = 1;
  }

  ngOnInit(): void {
    this.fetch();
  }

  ngAfterViewInit(): void {
    this.inicioGrafico();
  }

  inicioGrafico() {
    this.gService
      .list('reporte/vs')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.linear = data;
        this.graficoBrowserBar(this.lineChart.nativeElement, TypeGraph.BAR);
      });
  }

  fetch() {
    this.gService
      .list('reporte/vs')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.datos = response;

        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.fillReciente(this.datos[0]);
      });
  }
  onEventoCreado() {
    this.fetch();
  }

  fillReciente(data: any) {
    this.rTitulo = data.titulo;
    this.rFecha = data.fecha;
    this.rLocalizacion = data.localizacion;
  }

  nombreChange(event: any) {
    console.log(this.datos[0].titulo);
    const titulae = event.value;
    if (titulae !== '') {
      this.filteredData = this.datos.filter((i: any) =>
        String(i.titulo.toLowerCase()).includes(String(titulae.toLowerCase()))
      );
      this.updateTable(this.filteredData);
    } else {
      this.updateTable(this.datos);
    }
  }

  updateTable(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }

  redirectDetalle(id: any) {
    this.router.navigate(['/eventos/', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  graficoBrowserBar(canvas: any, typeG: TypeGraph): void {
    this.ctx = canvas.getContext('2d');
    let grafico = Chart.getChart(canvas);

    const months = this.linear.map((x: { titulo: any }) => x.titulo);

    const data1 = this.linear.map((x: { Asistencia: any }) => x.Asistencia);
    const data2 = this.linear.map((x: { Confirmacion: any }) => x.Confirmacion);
    const data3 = this.linear.map((x: { Ausentes: any }) => x.Ausentes);

    const colors = ['#335C85', '#e6e8ec', '#e2cd89'];

    if (grafico && grafico != undefined && grafico != null) {
      this.updateDataBar(grafico);
      this.updateConfigBar(grafico);
    } else {
      grafico = new Chart(this.ctx, {
        type: 'bar', // Set type to 'bar'
        data: {
          labels: months, // X-axis labels (months)
          datasets: [
            {
              label: 'Asistieron',
              data: data1,
              backgroundColor: colors[0], // Color for Dataset 1
              borderColor: colors[0],
              borderWidth: 1,
            },
            {
              label: 'Confirmaron',
              data: data2,
              backgroundColor: colors[1], // Color for Dataset 2
              borderColor: colors[1],
              borderWidth: 1,
            },
            {
              label: 'Ausentes',
              data: data3,
              backgroundColor: colors[2], // Color for Dataset 3
              borderColor: colors[2],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',

              labels: {
                padding: 10,
                boxWidth: 13,
                pointStyle: 'rectRounded',
                usePointStyle: true,
              },
            },
          },
          scales: {
            x: {
              stacked: false,
              title: {
                display: false,
                text: 'Evento',
              },
            },
            y: {
              stacked: false,
              title: {
                display: true,
                text: 'Asistencia y confirmación',
                font: {
                  family: 'Arial',
                  size: 16,
                  weight: 'bold',
                  style: 'italic',
                },
              },
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  updateDataBar(chart2: Chart) {
    chart2.data.datasets = [
      {
        label: 'Ecomonedas producidas de los centro en el presente año: ',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 255, 255, 0.2)',
        ],
        borderWidth: 1,
        //Datos del grafico, debe ser un array
        data: this.datos.map((x: { total: any }) => {
          return x.total;
        }),
      },
    ];
    chart2.update();
  }

  updateConfigBar(chart2: Chart) {
    chart2.options = {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '',
        },
      },
    };

    chart2.update();
  }

  printDiv(): void {
    window.print();
  }
}
