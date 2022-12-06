
import { Component, OnInit,ViewChild } from '@angular/core';
import { Assurance } from 'src/app/models/modelAssurance/assurance';
import { AssuranceService } from 'src/app/services/serviceAssurance/assurance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'primeng/table'
import { ConfirmationService, MessageService } from 'primeng/api';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';
import {PrimeNGConfig} from 'primeng/api';

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
  submitted: boolean = false;
  exportColumns: any[]=[];

  assuranceDialog: boolean;


  assurances:any[]=[]
  posts: any

  posts2: any

  constructor(private assurService:AssuranceService,
    private route:Router,
    private assurForm:FormBuilder,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private primeNgConfig: PrimeNGConfig,

 ) { }

  ngOnInit(): void {
    this.recupererAssurance();
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
  detail(a:any){
    this.route.navigate(['admin/assurance/detail',a.id]);
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
  this.submitted=false;
  this.assuranceDialog = !this.assuranceDialog;
}

exportPdf() {

  const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
        doc.autoTable({
          head:this.exportColumns,
          body:this.assurances
        })
    doc.save("Personne.pdf")
}

exportExcel() {
import("xlsx").then(xlsx => {
const worksheet = xlsx.utils.json_to_sheet(this.assurances);
const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
const excelBuffer: any = xlsx.write(workbook, {
  bookType: "xlsx",
  type: "array"
});
this.saveAsExcelFile(excelBuffer, "assurance");
});
}

enregistrerAssurance():void{
    this.submitted=true;
  if(this.assuranceForm.invalid){
    return;
  }else{
    this.assurance1.id=null
    this.assurance1.email=this.assuranceForm.get('email')?.value
    this.assurance1.libelle=this.assuranceForm.get('libelle')?.value
    this.assurance1.ville=this.assuranceForm.get('ville')?.value
    this.assurance1.tel=this.assuranceForm.get('tel')?.value
  
    this.assurService.enregistrerAssurance(this.assurance1).subscribe({
       next:(v)=>{
        this.messageService.add({key:"myKey1", severity: 'success', summary: 'Service Message', detail: 'Assurance enregistrée' });
        this.assuranceForm.reset();
        this.submitted=false;
     },
       error:(e)=>{},
       complete:()=>{
         this.recupererAssurance();
         this.assuranceDialog=false;
       }
     })
  }
  }
  recupererAssurance():void{
    this.assurService.recupererAssurance().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.assurances = this.posts.data
        this.loading=false
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }
}
