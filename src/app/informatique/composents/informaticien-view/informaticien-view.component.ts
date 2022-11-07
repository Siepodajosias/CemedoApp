import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table'

import { InformaticienService } from '../../service/informaticien.service';
import { Informaticien} from '../../model/informaticien';


interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}
@Component({
  selector: 'app-informaticien-view',
  templateUrl: './informaticien-view.component.html',
  styleUrls: ['./informaticien-view.component.scss']
})
export class InformaticienViewComponent implements OnInit {
  informaticiens:any[]=[]
  posts: any

  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;

  scrollableCols: any[]=[];

  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  balanceFrozen: boolean = false;

  rowGroupMetadata: any;

  loading: boolean = true;

  exportColumns: any[]=[];

  personneDialog: any | boolean;

  InformaticienForms: FormGroup = new FormGroup({})
  informaticien:Informaticien=new Informaticien()
  genres:any

  constructor(private informaticienService:InformaticienService,private route:Router,
    private imformaticienForm: FormBuilder,
    private messageService:MessageService) { }

  ngOnInit(): void {
    
    this.InformaticienForms = this.imformaticienForm.group({
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
  }

  detail(a:any){}

  getEventValue($event:any) :string {
    console.log($event.target.value);
    return $event.target.value;
  } 

  openNew() {
    this.personneDialog = true;
    this.genres=[
      {name:'homme'},
      {name:'femme'}
    ]
  }
  
  exportPdf() {
  
    const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
          doc.autoTable({
            head:this.exportColumns,
            body:this.informaticiens
          })
      doc.save("Informaticien.pdf")
  }
  
  exportExcel() {
  import("xlsx").then(xlsx => {
  const worksheet = xlsx.utils.json_to_sheet(this.informaticiens);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer: any = xlsx.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });
  this.saveAsExcelFile(excelBuffer, "informaticien");
  });
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

  SaveData(){
    this.informaticien.id=null
    this.informaticien.email=this.InformaticienForms.get('email')?.value
    this.informaticien.password=this.InformaticienForms.get('password')?.value
    this.informaticien.nom=this.InformaticienForms.get('nom')?.value
    this.informaticien.prenoms=this.InformaticienForms.get('prenoms')?.value
    this.informaticien.dateNaissance=this.InformaticienForms.get('dateNaissance')?.value
    let val=this.InformaticienForms.get('genre')?.value
    this.informaticien.genre=val.name
    this.informaticien.tel=this.InformaticienForms.get('tel')?.value
    this.informaticien.tel2=this.InformaticienForms.get('tel2')?.value
    this.informaticien.login=this.InformaticienForms.get('login')?.value
    this.informaticien.typeEmploye=this.InformaticienForms.get('typeEmploye')?.value

    /*
    this.medecin2.salaireMedecin=this.InformaticienForms.get('salaireMedecin')?.value
    this.medecin2.primeMedecin=this.MedecinForms.get('primeMedecin')?.value
    this.medecin2.sepecialiteMedecin=this.MedecinForms.get('sepecialiteMedecin')?.value
    this.medecin2.photo=this.MedecinForms.get('photo')?.value
    this.medecin2.numeroCni=this.MedecinForms.get('numeroCni')?.value
    this.medecin2.residence=this.MedecinForms.get('residence')?.value
    this.medecin2.heureDebut=this.MedecinForms.get('heureDebut')?.value
    this.medecin2.heureFin=this.MedecinForms.get('heureFin')?.value*/
   }


}
