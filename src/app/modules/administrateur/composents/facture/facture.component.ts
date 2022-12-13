import { Component, OnInit} from '@angular/core';


import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexLegend,
  ApexFill,
  ApexResponsive,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  responsive: ApexResponsive[],
  plotOptions: ApexPlotOptions,
  tooltip: ApexTooltip;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  constructor() {}

  public lineChartOptions: Partial<ChartOptions>;

  public doughnutChartLabels: string[] = ["consultation", "appel téléphonique", "chat"];
  public doughnutChartData: number[] = [650, 945, 8875];
  public doughnutChartLegend = false;
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ["#735A84", "#E76412", "#9BC311"],
    },
  ];
  public doughnutChartType = "doughnut";
  public doughnutChartOptions: any = {
    animation: false,
    responsive: true,
  };


  public chartOptions: Partial<ChartOptions>;
 
  ngOnInit(): void {

    this.chartOptions = {
      series: [
        {
          name: "revenu",
          data: [
            44000000, 
            5500000,
            4100000,
            67000000, 
            22000000, 
            43000004,
            5500000, 
            4100000, 
            67000000, 
            22000000, 
            43000000,
            43000000],
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        foreColor: "#9aa0ac",
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "category",
        categories: [
        "Jan", 
        "Fév", 
        "Mar", 
        "Avr", 
        "Mai", 
        "Juin",
        "Juil",
        "Août",
        "Sept",
        "Oct",
        "Nov",
        "Dec"],
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 0.8,
        colors: ["#01B8AA", "#374649", "#FD625E", "#F2C80F"],
      },
      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
}
