import { Component, OnInit,ViewChild} from '@angular/core';
import { InfirmierService } from 'src/app/services/serviceInfirmerie/infirmier.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Infirmier } from 'src/app/models/modelInfirmier/infirmier';
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
  selector: 'app-infirmier-view',
  templateUrl: './infirmier-view.component.html',
  styleUrls: ['./infirmier-view.component.scss']
})
export class InfirmierViewComponent implements OnInit {

  posts: any

  infirmiers:any[]=[];
  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;

  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  loading: boolean = true;

  exportColumns: any[]=[];

  personneDialog: any | boolean;

  genres:any
  infirmierForms: FormGroup = new FormGroup({})
  infirmier:Infirmier=new Infirmier()

  constructor(private infirmierS:InfirmierService,private route:Router,
    private messageService:MessageService,
    private infirmierForm: FormBuilder,
    private primeNgConfig: PrimeNGConfig
    ) { }

  ngOnInit(): void {

    this.infirmierS.recupererInfirmier().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.infirmiers=this.posts.data
        this.loading=false
        console.log(this.infirmiers)
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })

    this.infirmierForms = this.infirmierForm.group({
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
      salaireInfirmier: [null, [Validators.required, Validators.maxLength(30)]],
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
    //this.route.navigate(['administrateur/detailM',a]);
    this.infirmierS.recupererInfirmier().subscribe({
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
  console.log($event.target.value);
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
  this.genres = [
    {name: 'homme'},
    {name: 'femme'}
];
}
exportPdf() {

  const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
        doc.autoTable({
          head:this.exportColumns,
          body:this.infirmiers
        })
    doc.save("Pomptables.pdf")
}

exportExcel() {
import("xlsx").then(xlsx => {
const worksheet = xlsx.utils.json_to_sheet(this.infirmiers);
const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
const excelBuffer: any = xlsx.write(workbook, {
  bookType: "xlsx",
  type: "array"
});
this.saveAsExcelFile(excelBuffer, "Infirmier");
});
}
hideOpen(){
  this.personneDialog=false
}
SaveData(){
  /*
      this.infirmier.id=null
      this.infirmier.userIdentifier=""
      this.infirmier.username=""
      this.infirmier.numeroCni=this.infirmierForms.get('numeroCni')?.value
      this.infirmier.residence=this.infirmierForms.get('residence')?.value
         this.infirmier.salaireInfirmier=this.infirmierForms.get('salaireInfirmier')?.value
      if(this.img && this.img !==''){
        this.infirmier.photo=this.img
        this.infirmier.file=this.img
      }*/
  
      this.infirmier.id=null
      this.infirmier.email=this.infirmierForms.get('email')?.value
      this.infirmier.password=this.infirmierForms.get('password')?.value
      this.infirmier.nom=this.infirmierForms.get('nom')?.value
      this.infirmier.prenoms=this.infirmierForms.get('prenoms')?.value
      this.infirmier.dateNaissance=this.infirmierForms.get('dateNaissance')?.value
      this.infirmier.login=this.infirmierForms.get('login')?.value
      let val=this.infirmierForms.get('genre')?.value
      this.infirmier.genre=val.name
      this.infirmier.tel=this.infirmierForms.get('tel')?.value
      this.infirmier.tel2=this.infirmierForms.get('tel2')?.value
  
      this.infirmier.fcmToken=""
      this.infirmier.typeEmploye=null
   

         this.infirmierS.enregistrerInfirmier(this.infirmier).subscribe({
  
          next:(v)=>{
            this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Infirmier enregistré' });
        },
          error:(e)=>{
          },
          complete:()=>{
            this.infirmierForms.setValue({
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
