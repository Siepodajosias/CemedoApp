import { Component, OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Medecin } from 'src/app/models/modelMedecin/medecin';
import { MedecinService } from 'src/app/services/serviceMedecin/medecin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-medecin-view',
  templateUrl: './medecin-view.component.html',
  styleUrls: ['./medecin-view.component.scss']
})
export class MedecinViewComponent implements OnInit {
  medecins:any[]=[]
  posts: any
  post: any

  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;

  scrollableCols: any[]=[];

  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  rowGroupMetadata: any;

  loading: boolean = true;

  exportColumns: any[]=[];

  medecinDialog:boolean=false;

  medecinForms: FormGroup = new FormGroup({})
  medecin:Medecin=new Medecin()
  genres:any

  constructor(private medecinservice:MedecinService,private route:Router,
    private medecinForm: FormBuilder,
    private messageService:MessageService,
    private primeNgConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.recupererListeMedecin();
    this.medecinForms = this.medecinForm.group({
      id:null,
      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      password:['', [Validators.required, Validators.maxLength(8)]],
      nom:['', [Validators.required, Validators.minLength(3)]],
      prenoms:['', [Validators.required, Validators.maxLength(20)]],
      tel:['',[Validators.required, Validators.maxLength(10)]],
      tel2:['',[Validators.required, Validators.maxLength(10)]],
      genre:['',[Validators.required, Validators.maxLength(10)]],
      dateNaissance:['',[Validators.required, Validators.maxLength(10)]],
      login:['', [Validators.required, Validators.maxLength(20)]],
      fcmToken:'string',
      sepecialiteMedecin:null,
      typeEmploye:null,
      typeMedecin:null,



      //createdAt:['', [Validators.required, Validators.maxLength(10)]],
      //updatedAt:['', [Validators.required, Validators.maxLength(10)]],
      //version: [null, [Validators.required, Validators.maxLength(8)]],
      //active: [true, [Validators.required, Validators.maxLength(8)]],

      //residence: ['', [Validators.required, Validators.maxLength(20)]],
      //salaireMedecin:[null, [Validators.required, Validators.maxLength(10)]],
      //primeMedecin:[null,[Validators.required, Validators.maxLength(10)]],
      //heureDebut:['',[Validators.required, Validators.maxLength(10)]],
      //heureFin:['',[Validators.required, Validators.maxLength(10)]],
      //photo:['',[Validators.required, Validators.maxLength(30)]],
      //numeroCni:['',[Validators.required, Validators.maxLength(10)]]

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
    this.route.navigate(['admin/medecin/detail',a]);
    this.medecinservice.recupererMedecin().subscribe({
      next:(val) => {console.log(val)}
    })
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  } 

  newMedecin() {
    this.medecinDialog = !this.medecinDialog
    this.genres=[
      {name:'homme'},
      {name:'femme'}
    ]
  }

  exportPdf() {
    const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
          doc.autoTable({
            head:this.exportColumns,
            body:this.medecins
          })
      doc.save("Medecin-rapport.pdf")
  }
  
  exportExcel() {
    import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.medecins);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array"
  });
  this.saveAsExcelFile(excelBuffer, "medecin");
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

  enregistrerMedecin(){
    this.medecin.id=null
    this.medecin.email=this.medecinForms.get('email')?.value
    this.medecin.password=this.medecinForms.get('password')?.value
    this.medecin.nom=this.medecinForms.get('nom')?.value
    this.medecin.prenoms=this.medecinForms.get('prenoms')?.value
    this.medecin.dateNaissance=this.medecinForms.get('dateNaissance')?.value
    let val=this.medecinForms.get('genre')?.value
    this.medecin.genre=val.name
    this.medecin.tel=this.medecinForms.get('tel')?.value
    this.medecin.tel2=this.medecinForms.get('tel2')?.value
    this.medecin.login=this.medecinForms.get('login')?.value
    this.medecin.specialite=this.medecinForms.get('sepecialiteMedecin')?.value
    this.medecin.typeEmploye=this.medecinForms.get('typeEmploye')?.value
    this.medecin.typeMedecin=this.medecinForms.get('typeMedecin')?.value
    /*
    this.medecin2.salaireMedecin=this.MedecinForms.get('salaireMedecin')?.value
    this.medecin2.primeMedecin=this.MedecinForms.get('primeMedecin')?.value
    this.medecin2.sepecialiteMedecin=this.MedecinForms.get('sepecialiteMedecin')?.value
    this.medecin2.photo=this.MedecinForms.get('photo')?.value
    this.medecin2.numeroCni=this.MedecinForms.get('numeroCni')?.value
    this.medecin2.residence=this.MedecinForms.get('residence')?.value
    this.medecin2.heureDebut=this.MedecinForms.get('heureDebut')?.value
    this.medecin2.heureFin=this.MedecinForms.get('heureFin')?.value*/
    
   this.medecinservice.enregistrerMedecin(this.medecin).subscribe({
      next:(v)=>{
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Le medecin a été enregistré' });
        this.medecinForms.reset();
    },
      error:(e)=>{},
      complete:()=>{this.recupererListeMedecin();}
    })
    
   }
   urlActif():boolean{
    return this.route.url.includes('/admin/medecin/liste')
   }

   recupererListeMedecin():void{
     this.medecinservice.recupererMedecin().subscribe({
       next: (value: any) => {
         this.posts = value.data ? value : []
         this.post = this.posts.data
         this.medecins = this.post
         this.loading=false
       },
       error: (e) => {},
       complete: () => {
       }
     })
   }
}
