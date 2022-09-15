import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assurance } from '../../model/assurance';
import { AssuranceService } from '../../service/assurance.service';


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



@Component({
  selector: 'app-assurance-detail',
  templateUrl: './assurance-detail.component.html',
  styleUrls: ['./assurance-detail.component.scss']
})
export class AssuranceDetailComponent implements OnInit {
 assurance:Assurance
  constructor(private assurService:AssuranceService,
    private routeParams:ActivatedRoute) { }

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


  ngOnInit(): void {
   
    const z=this.routeParams.snapshot.params['id'];
        this.assurService.getAssuranceById(z).subscribe({
          next:(value:any)=>{
            this.assurance=value.data
          }
        })
        
  }

}
