
import { Component, OnInit,ViewChild } from '@angular/core';
import { Assurance } from '../../model/assurance';
import { AssuranceService } from '../../service/assurance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import * as saveAs from 'file-saver';

import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';


import { Table } from 'primeng/table'
import { ConfirmationService, MessageService } from 'primeng/api';


interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}


@Component({
  selector: 'app-assurance-view',
  templateUrl: './assurance-view.component.html',
  styleUrls: ['./assurance-view.component.scss']
})
export class AssuranceViewComponent implements OnInit {

  assuranceForm:FormGroup=new FormGroup({})
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


  assurances:any[]=[]
  posts: any

  posts2: any

  constructor(private assurService:AssuranceService,
    private route:Router,
    private assurForm:FormBuilder,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,

 ) { }

  ngOnInit(): void {
    /**
     * formulaire pour enregistrer une assurance
     */
    this.assuranceForm = this.assurForm.group({
      id:null,
      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      libelle: ['', [Validators.required, Validators.maxLength(30)]],
      ville: ['', [Validators.required, Validators.maxLength(30)]],
      tel: ['', [Validators.required, Validators.maxLength(15)]],
      createdAt:{value:'', disabled:true},
      updatedAt: {value:'', disabled:true},
      version: {value:'indisponible',disabled:true},
      active:{value:'indisponible',disabled:true},
    })

    this.assurService.getAssurance().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.assurances = this.posts.data
        this.loading=false

      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
    this.assurService.getResponsable().subscribe({
      next:(value:any)=>{
        this.posts2 = value.data ? value : []
          console.log(this.posts2.data)
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }
  detail(a:any){
    this.route.navigate(['admin/assurance/detail',a.id]);
  }

  detail1(a:any){
   
    this.route.navigate(['admin/assurance/detailresponsable',a.id]);
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
          body:this.assurances
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

sendData():void{
    
  this.assurance1.id=null
  this.assurance1.email=this.assuranceForm.get('email')?.value
  this.assurance1.libelle=this.assuranceForm.get('libelle')?.value
  this.assurance1.ville=this.assuranceForm.get('ville')?.value
  this.assurance1.tel=this.assuranceForm.get('tel')?.value

  this.assurService.sendAssurance(this.assurance1).subscribe({
     next:(v)=>{
      this.messageService.add({key:"myKey1", severity: 'success', summary: 'Service Message', detail: 'Assurance enregistrée' });
   },
     error:(e)=>{

     },
     complete:()=>{
      this.assuranceForm.setValue({
        id:null,
        email:"",
        libelle: "",
        ville: "",
        tel: "",
        createdAt:"",
        updatedAt: "",
        version:0,
        active:false,
      })
     }
   })
}
}
