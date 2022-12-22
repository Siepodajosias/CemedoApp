import { Component, OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';


import { MessageService, PrimeNGConfig } from 'primeng/api';

import * as saveAs from 'file-saver';

import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';

import { Table } from 'primeng/table'
import { MedicamentService } from 'src/app/services/ServicePharmacie/medicament.service';

interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}

@Component({
  selector: 'app-medicament-view',
  templateUrl: './medicament-view.component.html',
  styleUrls: ['./medicament-view.component.scss']
})
export class MedicamentViewComponent implements OnInit {
  posts: any

  medicaments:any[]=[];
  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;

  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  loading: boolean = true;

  exportColumns: any[]=[];

  personneDialog: any | boolean;


  constructor(private medicamentService: MedicamentService,private route:Router,
    private masseService:MessageService,private primeNgConfig: PrimeNGConfig,) { }

  ngOnInit(): void {

    this.medicamentService.recupererListeMedicament().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.medicaments= this.posts.data
        this.loading=false
      },
      error: (e) => {},
      complete: () => {
      }
    })
      this.primeNgConfig.setTranslation({
          startsWith: 'Commence par',
          contains: 'Contient',
          notContains: 'Ne contient pas',
          endsWith: 'Fini par',
          equals: 'Egale à',
          notEquals: 'différent de',
          noFilter: 'Pas de filtre',
          reject: 'Non',
          accept: 'Oui'
      });
  }

  detail(a:any){
    this.route.navigate(['pharmacie/detailMed',a]);
  }
  supprimer(a:any){
    const conf:boolean=confirm("Voullez-vous Vraiment retirer ce Medicament de la base de donnée?");
    if(conf==true){
      this.medicamentService.supprimerMedicament(a).subscribe({
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
    openNew() {
    this.personneDialog = true;
    }

exportPdf() {

  const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
        doc.autoTable({
          head:this.exportColumns,
          body:this.medicaments
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


