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

import { ActivatedRoute} from '@angular/router';
import { MedecinService } from 'src/app/services/ServiceMedecin/medecin.service';
import { Medecin } from 'src/app/models/modelMedecin/medecin';

@Component({
  selector: 'app-medecin-detail',
  templateUrl: './medecin-detail.component.html',
  styleUrls: ['./medecin-detail.component.scss']
})
export class MedecinDetailComponent implements OnInit {
  InfoMed:any
  medecin2:Medecin =new Medecin()
  md:any
  constructor(private routeParams:ActivatedRoute,
    private  medService:MedecinService,
    ) { }

  ngOnInit(): void {
    this.chart1();
    const r=this.routeParams.snapshot.params['id'];
    this.medService.recupererMedecinById(r).subscribe({
      next:(v)=>{this.md=v.data
        this.medecin2=this.md.user
        this.InfoMed="Mr" +"."+ this.medecin2.nom +" "+ this.medecin2.prenoms
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
          name: "Consultation à domicile",
          data: [70, 200, 80, 180, 170, 105, 210, 80, 180, 170, 105, 210],
        },
        {
          name: "Appel Téléphonique",
          data: [80, 250, 30, 120, 260, 100, 180, 30, 120, 260, 100, 180],
        },
        {
          name: "Appel Vidéo",
          data: [85, 130, 85, 225, 80, 190, 120, 30, 120, 260, 100, 180],
        },
        {
          name: "Chat",
          data: [85, 130, 87, 235, 80, 190, 120, 30, 120, 260, 140, 100],
        },
        {
          name: "Hospitalisation",
          data: [86, 130, 75, 215, 84, 188, 124, 35, 124, 270, 110, 187],
        }
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
      colors: ["#A5A5A5", "#875692", "#4CB5AC", "#6C63FF", "#475C7A"],
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
        categories: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Juil","Aoû","Sep","Oct","Nov","Déc"],
        title: {
          text: "2022",
        },
      },
      yaxis: {
        // opposite: true,
        title: {
          text: "Medecin",
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
