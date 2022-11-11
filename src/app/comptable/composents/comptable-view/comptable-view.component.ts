import { Component, OnInit,ViewChild, ChangeDetectorRef  } from '@angular/core';
import { ComptableService } from '../../service/comptable.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comptable } from '../../model/comptable';
import { MessageService } from 'primeng/api';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table'
import {PrimeNGConfig} from 'primeng/api';

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

  personneDialog: any | boolean;
 
  comptableForms: FormGroup = new FormGroup({})
  comptable:Comptable=new Comptable()
  genres:any
  constructor(private cptservice:ComptableService,
    private route:Router,private messageService:MessageService,
    private comptableForm: FormBuilder,
    private primeNgConfig: PrimeNGConfig
) { }

  ngOnInit(): void {

    this.cptservice.getComptable().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []

      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
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
  this.genres=[
    {name:'homme'},
    {name:'femme'}
  ]
}
hideOpen(){
  this.personneDialog=false
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

SaveData(){
  this.comptable.id=null
  this.comptable.email=this.comptableForms.get('email')?.value
  this.comptable.password=this.comptableForms.get('password')?.value
  this.comptable.nom=this.comptableForms.get('nom')?.value
  this.comptable.prenoms=this.comptableForms.get('prenoms')?.value
  this.comptable.login=this.comptableForms.get('login')?.value
  this.comptable.dateNaissance=this.comptableForms.get('dateNaissance')?.value
  let val=this.comptableForms.get('genre')?.value
  this.comptable.genre=val.name
  this.comptable.tel=this.comptableForms.get('tel')?.value
  this.comptable.tel2=this.comptableForms.get('tel')?.value

  this.comptable.fcmToken=""
  this.comptable.typeEmploye=null
  this.comptable.role=null

  console.log(this.comptable)

 this.cptservice.sendComptable(this.comptable).subscribe({
    next:(v)=>{
      this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Assurance enregistrée' });
  },
    error:(e)=>{

    },
    complete:()=>{
      this.comptableForms.setValue({
        id:null,
        email:"",
        password:"",
        nom:"",
        prenoms:"",
        tel:"",
        tel2:"",
        genre:"",
        dateNaissance:"",
        login:"",
        role:"",
        fcmToken:"",
        typeEmploye:null,
      })
    }
  })
 }
}
