import {Component} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
  ApexLegend,
  ApexTooltip,
  ApexMarkers,
  ApexPlotOptions,
  ApexResponsive,
  ApexGrid,
  ApexAnnotations,
  ApexStates,
  ApexTheme,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  title?: ApexTitleSubtitle;
  subtitle?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  fill?: ApexFill;
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  markers?: ApexMarkers;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  grid?: ApexGrid;
  annotations?: ApexAnnotations;
  states?: ApexStates;
  theme?: ApexTheme;
  colors?: string[];
  labels?: any;
};

@Component({
  selector: 'app-edit-form-response-summary-multiple-choice-grid',
  imports: [NgApexchartsModule],
  templateUrl: './edit-form-response-summary-multiple-choice-grid.html',
  styleUrl: './edit-form-response-summary-multiple-choice-grid.scss',
})
export class EditFormResponseSummaryMultipleChoiceGrid {
  private colors: any = [
    '#008FFB',
    '#00E396',
    '#FEB019',
    '#FF4560',
    '#775DD0',
    '#546E7A',
    '#26a69a',
    '#D10CE8',
  ];

  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        data: [21, 22, 10, 28, 16, 21, 13, 30, 21, 22, 10, 28, 16, 21, 13, 30, 21, 22, 10, 28],
      },
    ],
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: (chart, w, e) => {
          // console.log(chart, w, e)
        },
      },
    },
    colors: this.colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        ['John', 'Doe'],
        ['Joe', 'Smith'],
        ['Jake', 'Williams'],
        'Amber',
        ['Peter', 'Brown'],
        ['Mary', 'Evans'],
        ['David', 'Wilson'],
        ['Lily', 'Roberts'],
        ['John', 'Doe'],
        ['Joe', 'Smith'],
        ['Jake', 'Williams'],
        'Amber',
        ['Peter', 'Brown'],
        ['Mary', 'Evans'],
        ['David', 'Wilson'],
        ['Lily', 'Roberts'],
        ['John', 'Doe'],
        ['Joe', 'Smith'],
        ['Jake', 'Williams'],
        'Amber'
      ],
      labels: {
        style: {
          colors: this.colors,
          fontSize: '12px',
        },
      },
    },
  };
}
