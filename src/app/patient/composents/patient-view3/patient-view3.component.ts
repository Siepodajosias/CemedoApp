import { Component, ViewChild, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Patient1} from '../../model/patient1';
import { PatientService } from '../../service/patient.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { doctor } from '../data/multi';
import { ApexAxisChartSeries, ApexChart} from 'ng-apexcharts';
import { Subscribable } from 'rxjs';

import * as saveAs from 'file-saver';

import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';

import { Table } from 'primeng/table'

interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}

@Component({
  selector: 'app-patient-view3',
  templateUrl: './patient-view3.component.html',
  styleUrls: ['./patient-view3.component.scss']
})
export class PatientView3Component implements OnInit,OnDestroy{
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
  constructor(private patientH: PatientService,private route:Router,
) {
  }
  ngOnInit(): void {
     
   this.patientH.getPatientP().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
    
  }
  detail(a:any){
    this.route.navigate(['admin/patient/detail',a]);

  }
  supprimer(a:any){
    console.log(a)
    const conf:boolean=confirm("Voullez-vous Vraiment Supprimer ce Patient?");
    if(conf==true){
      this.patientH.deletePatient(a).subscribe({
        next:(v)=>{

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
  ngOnDestroy(): void {
         
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

  exportPdf() {
  
    const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
          doc.autoTable({
            head:this.exportColumns,
            body:this.patients
          })
      doc.save("Pomptables.pdf")
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
}
