import { Component, OnInit,ViewChild} from '@angular/core';
import { PharmacienService } from '../../service/pharmacien.service';
import { Router } from '@angular/router';


import { MessageService } from 'primeng/api';

import * as saveAs from 'file-saver';

import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';

import { Table } from 'primeng/table'

interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}


@Component({
  selector: 'app-categorie-medicament-view',
  templateUrl: './categorie-medicament-view.component.html',
  styleUrls: ['./categorie-medicament-view.component.scss']
})
export class CategorieMedicamentViewComponent implements OnInit {
  posts: any

  categorieMedicaments:any[]=[];
  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;

  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  loading: boolean = true;

  exportColumns: any[]=[];

  personneDialog: any | boolean;


  constructor(private pharService:PharmacienService,private route:Router,
    private masseService:MessageService) { }

  ngOnInit(): void {

    this.pharService.getMedicament().subscribe({
      next: (value: any) => {
        this.posts = value ? value : []

      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }

  detail(a:any){
    this.route.navigate(['pharmacie/detailMed',a]);
  }
  supprimer(a:any){
    console.log(a)
    const conf:boolean=confirm("Voullez-vous Vraiment retirer ce Medicament de la base de donnée?");
    if(conf==true){
      this.pharService.deleteMedicament(a).subscribe({
        next:(v)=>{

      },
        error:(e)=>{
 
        }
      })
    }
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
          body:this.categorieMedicaments
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
