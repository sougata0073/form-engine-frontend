import { Component } from '@angular/core';
import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers,
  ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStates, ApexStroke, ApexTheme,
  ApexTitleSubtitle, ApexTooltip,
  ApexXAxis,
  ApexYAxis, ChartComponent
} from 'ng-apexcharts';

type ChartOptions = {
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
  selector: 'app-edit-form-response-summary-dropdown',
  imports: [
    ChartComponent
  ],
  templateUrl: './edit-form-response-summary-dropdown.html',
  styleUrl: './edit-form-response-summary-dropdown.scss',
})
export class EditFormResponseSummaryDropdown {

  public chartOptions: Partial<ChartOptions> = {
    series: [44, 55, 13, 43, 22],
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

}
