import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assurance } from '../../model/assurance';
import { AssuranceService } from '../../service/assurance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Responsable } from '../../model/responsable';
import { PrimeNGConfig} from 'primeng/api';


import * as saveAs from 'file-saver';

import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';


import { Table } from 'primeng/table'
import { ConfirmationService, MessageService } from 'primeng/api';


interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}


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


  responsableForms:FormGroup=new FormGroup({})
  responsable:Responsable=new Responsable()
  assurance1:Assurance=new Assurance()

  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;


  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  balanceFrozen: boolean = false;

  rowGroupMetadata: any;

  loading: boolean = true;

  exportColumns: any[]=[];

  personneDialog: any | boolean;


  responsables:any[]=[]
  posts: any

  posts2: any


 assurance:Assurance
  constructor(private assurService:AssuranceService,
    private routeParams:ActivatedRoute,
    private responsableForm:FormBuilder,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private primeNgConfig: PrimeNGConfig,
    
    ) { }

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

        this.assurService.getResponsable().subscribe({
        })

        this.responsableForms = this.responsableForm.group({
          id:null,
          nom:['', [Validators.required, Validators.minLength(3)]],
          prenoms:['', [Validators.required, Validators.maxLength(20)]],
          login:['', [Validators.required, Validators.maxLength(20)]],
          genre:['',[Validators.required, Validators.maxLength(10)]],
          dateNaissance:['',[Validators.required, Validators.maxLength(10)]],
          email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
          tel:['',[Validators.required, Validators.maxLength(15)]],
          tel2:['',[Validators.required, Validators.maxLength(15)]],
          password:['', [Validators.required, Validators.maxLength(8)]],
          assurance:{value:'indisponible',disabled:true},
    
          fcmToken:'',
          role: null,
    
          /*
          residence: ['', [Validators.required, Validators.maxLength(20)]],
          numeroCni:['',[Validators.required, Validators.maxLength(15)]],
          userIdentifier:[''],
          username:['']*/
    
        })
        this.primeNgConfig.setTranslation({
          startsWith: 'Commence par',
          contains : 'Contient',
          notContains : 'Ne contient pas',
          endsWith: 'Fini par',
          equals : 'Egale à',
          notEquals : 'différent de',
          noFilter : 'Pas de filtre',
        });
        
  }

  
  saveAsExcelFile(buffer: any, fileName: string): void {

    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
      saveAs(
      data,
      fileName + "_export_" + new Date() + EXCEL_EXTENSION
    );

}

applyFilterGlobal($event:any, stringVal:any) {
  this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
}

getEventValue($event:any) :string {
  console.log($event.target.value);
  return $event.target.value;
} 

toggleLock(data:any, frozen:any, index:any) {

  console.log(data);
    if (frozen) {
        this.lockedCustomers = this.lockedCustomers.filter((c, i) => i !== index);
        this.unlockedCustomers.push(data);
    }
    else {
        this.unlockedCustomers = this.unlockedCustomers.filter((c, i) => i !== index);
        this.lockedCustomers.push(data);
    }

    this.unlockedCustomers.sort((val1, val2) => {
        return val1.id < val2.id ? -1 : 1;
    });
}
openNew() {
  this.personneDialog = true;
}

exportPdf() {

  const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
        doc.autoTable({
          head:this.exportColumns,
          body:this.responsables
        })
    doc.save("Personne.pdf")
}

exportExcel() {/*
import("xlsx").then(xlsx => {
const worksheet = xlsx.utils.json_to_sheet(this.personne);
const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
const excelBuffer: any = xlsx.write(workbook, {
  bookType: "xlsx",
  type: "array"
});
this.saveAsExcelFile(excelBuffer, "personne");
});*/
}

SaveData(){
  this.responsable.id=null

  this.responsable.email=this.responsableForms.get('email')?.value
  this.responsable.password=this.responsableForms.get('password')?.value
  this.responsable.nom=this.responsableForms.get('nom')?.value
  this.responsable.prenoms=this.responsableForms.get('prenoms')?.value
  this.responsable.login=this.responsableForms.get('login')?.value
  this.responsable.dateNaissance=this.responsableForms.get('dateNaissance')?.value
  this.responsable.genre=this.responsableForms.get('genre')?.value
  this.responsable.tel=this.responsableForms.get('tel')?.value
  this.responsable.tel2=this.responsableForms.get('tel2')?.value
  this.responsable.fcmToken=""
  this.responsable.role=null
  //this.responsable.assurance="/cemedo/assurances/7"
  //this.responsable.assurance="/cemedo/assurances/"+this.responsableForms.get('assurance')?.value

  console.log(this.responsable)

 this.assurService.sendResponsable(this.responsable).subscribe({
    next:(v)=>{

  },
    error:(e)=>{


    },
    complete:()=>{
      this.responsableForms.setValue({
        id:null,
        email:'',
        password:'',
        nom:'',
        prenoms:'',
        login:'',
        tel:'',
        tel2:'',
        genre:'',
        dateNaissance:'',
        assurance:null,
        fcmToken:'',
        role: null
      })
    }
  })
 }


}
