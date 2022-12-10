import { Component, OnInit,ViewChild} from '@angular/core';
import { ComptableService } from 'src/app/services/serviceComptable/comptable.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comptable } from 'src/app/models/modelComptable/comptable';
import { MessageService } from 'primeng/api';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table'
import {PrimeNGConfig} from 'primeng/api';
import { EmployeService } from 'src/app/shared-cemedo/employe/employe.service';

interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}

@Component({
  selector: 'app-comptable-view',
  templateUrl: './comptable-view.component.html',
  styleUrls: ['./comptable-view.component.scss']
})
export class ComptableViewComponent implements OnInit {
 
  posts: any

  comptables:any[]=[];

  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;

  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  loading: boolean = true;

  exportColumns: any[]=[];

  comptableDialog:boolean=false;
 
  comptableForms: FormGroup = new FormGroup({})
  genres:any
  employes: any[];
  employeForm: any[];

  constructor(private comptableService:ComptableService,
    private route:Router,private messageService:MessageService,
    private comptableForm: FormBuilder,
    private primeNgConfig: PrimeNGConfig,
    private employeService: EmployeService) { }

  ngOnInit(): void {

    this.recupererComptable();
    this.comptableForms = this.comptableForm.group({
      id:null,
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenoms: ['', [Validators.required, Validators.maxLength(20)]],
      login:['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(8)]],
      tel:['', [Validators.required, Validators.maxLength(20)]],
      tel2:['', [Validators.required, Validators.maxLength(20)]],
      genre:['', [Validators.required, Validators.maxLength(20)]],
      dateNaissance:['', [Validators.required, Validators.maxLength(30)]],
      role:null,
      fcmToken:"",
      typeEmploye:null

/*
      salt: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      userIdentifier: ['', [Validators.required, Validators.maxLength(15)]],
      active: [null, [Validators.required, Validators.maxLength(10)]],
      createdAt: [null, [Validators.required, Validators.maxLength(10)]],
      updatedAt: ['', [Validators.required, Validators.maxLength(10)]],
      version: [null, [Validators.required, Validators.maxLength(20)]],
      file:['', [Validators.required, Validators.maxLength(30)]],
      photo:['', [Validators.required, Validators.maxLength(20)]],
      residence:['', [Validators.required, Validators.maxLength(30)]],
      numeroCni:['', [Validators.required, Validators.maxLength(20)]]
      */
    })
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
  comptableDetail(a:any){
    this.route.navigate(['administrateur/detailM',a]);
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
  newComptable() {
    this.comptableForms.reset();
    this.comptableDialog = !this.comptableDialog;
}
  exportPdf() {
  const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
        doc.autoTable({
          head:this.exportColumns,
          body:this.comptables
        })
    doc.save("Pomptables.pdf")
}
  exportExcel() {
import("xlsx").then(xlsx => {
const worksheet = xlsx.utils.json_to_sheet(this.comptables);
const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
const excelBuffer: any = xlsx.write(workbook, {
  bookType: "xlsx",
  type: "array"
});
this.saveAsExcelFile(excelBuffer, "personne");
});
}
  enregistrerComptable(){
  const comptable:Comptable=new Comptable()
  comptable.id=null
  comptable.email=this.comptableForms.get('email')?.value
  comptable.password=this.comptableForms.get('password')?.value
  comptable.nom=this.comptableForms.get('nom')?.value
  comptable.prenoms=this.comptableForms.get('prenoms')?.value
  comptable.login=this.comptableForms.get('login')?.value
  comptable.dateNaissance=this.comptableForms.get('dateNaissance')?.value
  const valeurGenre=this.comptableForms.get('genre')?.value
  const valeurEmploye=this.comptableForms.get('typeEmploye')?.value
  comptable.genre=valeurGenre.id
  comptable.typeEmploye=valeurEmploye.id
  comptable.tel=this.comptableForms.get('tel')?.value
  comptable.tel2=this.comptableForms.get('tel')?.value
  comptable.fcmToken=""
  comptable.role=null

 this.comptableService.enregistrerComptable(comptable).subscribe({
    next:(v)=>{
      this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Le comptable a été enregistré' });
      this.comptableForms.reset();
  },
    error:(e)=>{},
    complete:()=>{
      this.recupererComptable();
      this.comptableDialog=false;
    }
  })
 }
  recupererComptable(){
    this.comptableService.recupererComptable().subscribe({
      next:(value)=>{
        const data=value.data;
        this.comptables=data ? data : [];
      },complete:()=>{
        this.loading=false
      }
    })
    this.employeService.recupererTypeEmploye().subscribe({
     next:(value)=>{
       const data=value.data;
       this.employes=data ? data : [];
     }
   })
    this.employeService.recupererGenre().subscribe({
     next:(value)=>{
       const data=value.data;
       this.genres=data ? data : [];
     }
   })
 }
  employeItems(event: any) {
    let filtered : any[] = [];
    let query = event.query;
    for(let i = 0; i < this.employes.length; i++) {
      let item = this.employes[i];
      if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.employeForm = filtered;
  }

  urlActif():boolean {
    return this.route.url.includes('admin/comptable/liste')
  }
}
