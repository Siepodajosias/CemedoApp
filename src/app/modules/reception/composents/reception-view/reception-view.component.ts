import {Component, OnInit,ViewChild } from '@angular/core';
import { ReceptionService } from 'src/app/services/serviceReception/reception.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reception } from 'src/app/models/modelReception/reception';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table'

interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}

@Component({
  selector: 'app-reception-view',
  templateUrl: './reception-view.component.html',
  styleUrls: ['./reception-view.component.scss']
})
export class ReceptionViewComponent implements OnInit {

  constructor(private receptionService:ReceptionService,private route:Router,
    private messageService:MessageService,
    private receptionForm:FormBuilder,
    private primeNgConfig: PrimeNGConfig
 ) { }

  posts: any

  receptions:any[]=[];
  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;

  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  loading: boolean = true;

  exportColumns: any[]=[];

  receptionDialog: any | boolean;
  receptionForms:FormGroup=new FormGroup({})
  reception:Reception=new Reception()
  genres:any

  ngOnInit(): void {

    this.receptionService.recupererReception().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.receptions=this.posts.data
        this.loading=false

      },
      error: (e) => {},
      complete: () => {
      }
    })

    this.receptionForms=this.receptionForm.group({

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
      fcmToken:"",
      typeEmploye:null

   
   /*
      salt: ['', [Validators.required, Validators.maxLength(30)]],

      salaireInfirmier: ['', [Validators.required, Validators.maxLength(30)]],
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
  detail(a:any){
    //this.route.navigate(['administrateur/detailM',a]);
    this.receptionService.recupererReception().subscribe({
      next:(e)=>console.log(e)
    })
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
  this.receptionDialog = true;
  this.genres=[
    {name:'homme'},
    {name:'femme'}
  ]
}

exportPdf() {

  const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
        doc.autoTable({
          head:this.exportColumns,
          body:this.receptions
        })
    doc.save("Reception-rapport.pdf")
}

exportExcel() {
import("xlsx").then(xlsx => {
const worksheet = xlsx.utils.json_to_sheet(this.receptions);
const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
const excelBuffer: any = xlsx.write(workbook, {
  bookType: "xlsx",
  type: "array"
});
this.saveAsExcelFile(excelBuffer, "reception");
});
}

enregistrerReception(){
  this.reception.id=null
  this.reception.email=this.receptionForms.get('email')?.value
  this.reception.password=this.receptionForms.get('password')?.value
  this.reception.nom=this.receptionForms.get('nom')?.value
  this.reception.prenoms=this.receptionForms.get('prenoms')?.value
  this.reception.dateNaissance=this.receptionForms.get('dateNaissance')?.value
  this.reception.login=this.receptionForms.get('login')?.value
  let val=this.receptionForms.get('genre')?.value
  this.reception.genre=val.name
  this.reception.tel=this.receptionForms.get('tel')?.value
  this.reception.tel2=this.receptionForms.get('tel2')?.value

  this.reception.fcmToken=""
  this.reception.typeEmploye=null

     this.receptionService.enregistrerReception(this.reception).subscribe({

      next:(v)=>{
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'receptionniste enregistré' });
      },
      error:(e)=>{
      },
      complete:()=>{
        this.receptionForms.setValue({
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
          fcmToken:'string',
          typeEmploye:null,
        })
       }
     })
}

}
