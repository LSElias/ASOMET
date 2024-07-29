import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
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
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements AfterViewInit {
  chart: any;
  chart2: any;
  ctx: any;
  menor: any;
  linear: any;
  datos: any;
  asociados = [];
  event = [];

  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('mayorAsistencia') mayorAsistencia!: { nativeElement: any };
  @ViewChild('menorAsistencia') menorAsistencia!: { nativeElement: any };
  @ViewChild('lineChart') lineChart!: { nativeElement: any };

  constructor(private gService: GenericService, public router: Router) {}

  ngAfterViewInit(): void {
    this.inicioGrafico();
  }

  inicioGrafico() {
    this.gService
      .list('reporte/mayor')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.graficoBrowser(
          this.mayorAsistencia.nativeElement,
          TypeGraph.DOUGHNUT
        );
      });

    this.gService
      .list('reporte/menor')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.menor = data;
        this.graficoBrowserMenor(
          this.menorAsistencia.nativeElement,
          TypeGraph.DOUGHNUT
        );
      });

    this.gService
      .list('reporte/vs')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.linear = data;
        this.graficoBrowserBar(this.lineChart.nativeElement, TypeGraph.BAR);
      });
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.datos = response;
        this.setCantUsuarios();
      });

    this.gService
      .list('eventos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.event = data;
      });
  }

  setCantUsuarios() {
    this.asociados = this.datos.filter((data: any) => data.idRol === 3);
  }

  graficoBrowser(canvas: any, typeG: TypeGraph): void {
    this.ctx = canvas.getContext('2d');
    let grafico = Chart.getChart(canvas);

    let topData = this.datos
      .sort(
        (a: { Asistencia: number }, b: { Asistencia: number }) =>
          b.Asistencia - a.Asistencia
      )
      .slice(0, 4);
    const colors = ['#221914', '#453831', '#706d63', '#706d63'];

    if (grafico && grafico != undefined && grafico != null) {
      this.updateDataGrafico(grafico);
      this.updateConfigGrafico(grafico);
    } else {
      grafico = new Chart(this.ctx, {
        type: typeG,
        data: {
          // Use the top 4 data points
          labels: topData.map((x: { titulo: any }) => x.titulo),
          datasets: [
            {
              label: 'Eventos con mayor asistencia',
              backgroundColor: colors,
              borderWidth: 1,
              data: topData.map((x: { Asistencia: any }) => x.Asistencia),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,

          layout: {
            padding: {
              right: 80,
            },
          },
          plugins: {
            legend: {
              position: 'right',
              labels: {
                padding: 10,
                boxPadding: 0,
                boxWidth: 13,
                borderRadius: 0,
                pointStyle: 'rectRounded',
                usePointStyle: true,
              },
              fullSize: true,
              maxWidth: 1300,
            },
            title: {
              display: true,
              text: 'Eventos con mayor asistencia',
              position: 'left',
              align: 'center',
              fullSize: true,
              font: {
                family: 'Arial', // Cambia 'Arial' por la fuente que desees
                size: 21, // Tamaño de la fuente
                weight: 'bolder', // Peso de la fuente
                style: 'italic', // Estilo de la fuente (opcional)
              },
            },
          },
        },
      });
    }
  }

  updateDataGrafico(chart: Chart) {
    chart.data.datasets = [
      {
        label: 'Eventos con la menor asistencia: ',
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
    chart.update();
  }

  updateConfigGrafico(chart: Chart) {
    chart.options = {
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

    chart.update();
  }

  graficoBrowserMenor(canvas: any, typeG: TypeGraph): void {
    this.ctx = canvas.getContext('2d');
    let grafico = Chart.getChart(canvas);

    let topData = this.menor
      .sort(
        (a: { Ausentes: number }, b: { Ausentes: number }) =>
          b.Ausentes - a.Ausentes
      )
      .slice(0, 4);
    const colors = ['#3b4270', '#6e749b', '#8c92b8', '#9ea8de'];

    if (grafico && grafico != undefined && grafico != null) {
      this.updateDataMenor(grafico);
      this.updateConfigMenor(grafico);
    } else {
      grafico = new Chart(this.ctx, {
        type: typeG,
        data: {
          // Use the top 4 data points
          labels: topData.map((x: { titulo: any }) => x.titulo),
          datasets: [
            {
              label: 'Eventos con la menor asistencia',
              backgroundColor: colors,
              borderWidth: 1,
              data: topData.map((x: { Ausentes: any }) => x.Ausentes),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,

          layout: {
            padding: {
              right: 80,
            },
          },
          plugins: {
            legend: {
              position: 'right',
              labels: {
                padding: 10,
                boxPadding: 0,
                boxWidth: 13,
                borderRadius: 0,
                pointStyle: 'rectRounded',
                usePointStyle: true,
              },
              fullSize: true,
              maxWidth: 1300,
            },
            title: {
              display: true,
              text: 'Eventos con menor asistencia',
              position: 'left',
              align: 'center',
              fullSize: true,
              font: {
                family: 'Arial', // Cambia 'Arial' por la fuente que desees
                size: 21, // Tamaño de la fuente
                weight: 'bolder', // Peso de la fuente
                style: 'italic', // Estilo de la fuente (opcional)
              },
            },
          },
        },
      });
    }
  }

  updateDataMenor(chart2: Chart) {
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

  updateConfigMenor(chart2: Chart) {
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
            title: {
              display: true,
              text: 'Comparación de Confirmaciones y Asistencias en Eventos',
            },
          },
          scales: {
            x: {
              stacked: false, // Stack the bars on the x-axis
              title: {
                display: true,
                text: 'Evento',
              },
            },
            y: {
              stacked: false, // Stack the bars on the y-axis
              title: {
                display: true,
                text: 'Asistencia y confirmación',
                font: {
                  family: 'Arial', // Cambia 'Arial' por la fuente que desees
                  size: 16, // Tamaño de la fuente
                  weight: 'bold', // Peso de la fuente
                  style: 'italic', // Estilo de la fuente (opcional)
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

  mayorAsistenciaReporte() {
    this.router.navigate(['/reportes/mayor-asistencia'], {});
  }
  menorAsistenciaReporte() {
    this.router.navigate(['/reportes/menor-asistencia'], {});
  }
  confirmacionesAsistenciaReporte() {
    this.router.navigate(['/reportes/confirmaciones-asistencia'], {});
  }
}
