import { Component, OnInit } from "@angular/core";
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
  tooltip: ApexTooltip;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

import { ActivatedRoute } from '@angular/router';
import { Patient1 } from '../../model/patient1';
import { PatientService } from '../../service/patient.service';


@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
patient:Patient1

  constructor(private patService:PatientService,
    private routeParams:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.chart1();
    const r=this.routeParams.snapshot.params['id'];
    this.patService.getPatientById(r).subscribe({
      next:(v)=>{
        this.patient=v ? v :[]
        console.log(this.patient)
        },
        error:()=>{},
        complete:()=>{}
    })
  }


  public lineChartOptions: Partial<ChartOptions>;
  //  color: ["#3FA7DC", "#F6A025", "#9BC311"],
  // Doughnut chart start
  public doughnutChartLabels: string[] = ["Chat", "Appel Téléphonique", "Appel Vidéo"];
  public doughnutChartData: number[] = [45, 50, 5];
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

  private chart1() {
    this.lineChartOptions = {
      series: [
        {
          name: "Consultation",
          data: [70, 200, 80, 180, 170, 105, 210],
        },
        {
          name: "Appel Téléphonique",
          data: [80, 250, 30, 120, 260, 100, 180, 30, 120, 260, 100, 180],
        },
        {
          name: "Appel Vidéo",
          data: [85, 130, 85, 225, 80, 190, 120, 30, 120, 260, 100, 180],
        },
      ],
      chart: {
        height: 350,
        type: "line",
        foreColor: "#9aa0ac",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#A5A5A5", "#875692", "#4CB5AC"],
      stroke: {
        curve: "smooth",
      },
      grid: {
        row: {
          colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 3,
      },
      xaxis: {
        categories: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet","Août","septembre","Octobre","Novembre","Decembre"],
        title: {
          text: "Service",
        },
      },
      yaxis: {
        // opposite: true,
        title: {
          text: "Patients",
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
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