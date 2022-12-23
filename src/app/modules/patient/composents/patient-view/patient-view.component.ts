import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Patient1} from 'src/app/models/modelPatient/patient1';
import { PatientService } from 'src/app/services/ServicePatient/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { doctor } from 'src/app/modules/patient/composents/data/multi';
import { ApexAxisChartSeries, ApexChart} from 'ng-apexcharts';
import { Subscribable } from 'rxjs';

import * as saveAs from 'file-saver';

import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';

import { Table } from 'primeng/table'
import { PrimeNGConfig } from 'primeng/api';

interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'prenoms', 'genre', 'profession', 'lieuHabitation', 'tel', 'tel2','edit'];
  patient!:MatTableDataSource<Patient1>
  posts: any
  post1: any
  patients:any[]=[];
  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;

  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  loading: boolean = true;

  exportColumns: any[]=[];


  doctor:any=[{'age':25},{'age':40},{'age':28}]
   serie: ApexAxisChartSeries;
   chart:ApexChart;
   options: any;
   patientDialog: boolean=false;
  constructor(private patientService: PatientService,
              private route:Router,
              private primeNgConfig: PrimeNGConfig) {}
  ngOnInit(): void {
      this.recupererConfig();
      this.recupererPatient();
  }
  patientDetail(a:any){
    this.route.navigate(['admin/patient/detail',a]);
  }
  supprimer(a:any){
    const conf:boolean=confirm("Voullez-vous Vraiment Supprimer ce Patient?");
    if(conf==true){
      this.patientService.supprimerPatient(a).subscribe({
        next:()=>{

      },
        error:(e)=>{

        }
      })
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patient.filter = filterValue.trim().toLowerCase();
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
        fileName + "_" + EXCEL_EXTENSION
      );
  
  }
  
  applyFilterGlobal($event:any, stringVal:any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  
  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  
  toggleLock(data:any, frozen:any, index:any) {

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

  exportPdf() {
    const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
          doc.autoTable({
            head:this.exportColumns,
            body:this.patients
          })
      doc.save("rapport-patient.pdf")
  }
  
  exportExcel() {
  import("xlsx").then(xlsx => {
  const worksheet = xlsx.utils.json_to_sheet(this.patients);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer: any = xlsx.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });
  this.saveAsExcelFile(excelBuffer, "rapport-patient");
  });
  }
  urlActif():boolean{
    return this.route.url.includes('/reception/patient/liste')
  }

	newPatient():void{
		this.patientDialog=!this.patientDialog
	}

	recupererPatient():void{
        this.patientService.recupererPatient().subscribe({
            next: (value: any) => {
                this.posts = value.data ? value : []
                this.patients = this.posts.data
                this.loading=false
            },
            error: (e) => {},
            complete: () => {
            }
        })
    }

	recupererConfig():void{
        this.primeNgConfig.setTranslation({
            monthNames: ['Janvier',
                'Fevrier',
                'Mars',
                'Avril',
                'Mai',
                'Juin',
                'Juillet',
                'Août',
                'Septembre',
                'Octobre',
                'Novembre',
                'Decembre'],
            dayNamesShort: ['Dim.',
                'Lun.',
                'Mar.',
                'Mer.',
                'Jeu.',
                'Ven.',
                'Sam.'],
            startsWith: 'Commence par',
            contains : 'Contient',
            notContains : 'Ne contient pas',
            endsWith: 'Fini par',
            equals : 'Egale à',
            notEquals : 'différent de',
            noFilter : 'Pas de filtre',
        });
    }
}
