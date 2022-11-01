import { Component, OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Medecin } from '../../model/medecin';
import { MedecinService } from '../../service/medecin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  balanceFrozen: boolean = false;

  rowGroupMetadata: any;

  loading: boolean = true;

  exportColumns: any[]=[];

  personneDialog: any | boolean;

  MedecinForms: FormGroup = new FormGroup({})
  medecin2:Medecin=new Medecin()
  genres:any

  constructor(private medecinservice:MedecinService,private route:Router,
    private medecinForm: FormBuilder,
    private messageService:MessageService) { }

  ngOnInit(): void {
    
    this.medecinservice.getMedecin().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.post = this.posts.data
        this.medecins = this.post
        this.loading=false
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
    this.MedecinForms = this.medecinForm.group({
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
  }
  detail(a:any){
    this.route.navigate(['admin/medecin/detail',a]);
    this.medecinservice.getMedecin().subscribe({
      next:(val) => {console.log(val)}
    })
  }
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
            body:this.medecins
          })
      doc.save("Personne.pdf")
  }
  
  exportExcel() {
  import("xlsx").then(xlsx => {
  const worksheet = xlsx.utils.json_to_sheet(this.medecins);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer: any = xlsx.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });
  this.saveAsExcelFile(excelBuffer, "personne");
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
    this.medecin2.id=null
    this.medecin2.email=this.MedecinForms.get('email')?.value
    this.medecin2.password=this.MedecinForms.get('password')?.value
    this.medecin2.nom=this.MedecinForms.get('nom')?.value
    this.medecin2.prenoms=this.MedecinForms.get('prenoms')?.value
    this.medecin2.dateNaissance=this.MedecinForms.get('dateNaissance')?.value
    this.medecin2.genre=this.MedecinForms.get('genre')?.value
    this.medecin2.tel=this.MedecinForms.get('tel')?.value
    this.medecin2.tel2=this.MedecinForms.get('tel2')?.value
    this.medecin2.login=this.MedecinForms.get('login')?.value
    this.medecin2.specialite=this.MedecinForms.get('sepecialiteMedecin')?.value
    this.medecin2.typeEmploye=this.MedecinForms.get('typeEmploye')?.value
    this.medecin2.typeMedecin=this.MedecinForms.get('typeMedecin')?.value
    /*
    this.medecin2.salaireMedecin=this.MedecinForms.get('salaireMedecin')?.value
    this.medecin2.primeMedecin=this.MedecinForms.get('primeMedecin')?.value
    this.medecin2.sepecialiteMedecin=this.MedecinForms.get('sepecialiteMedecin')?.value
    this.medecin2.photo=this.MedecinForms.get('photo')?.value
    this.medecin2.numeroCni=this.MedecinForms.get('numeroCni')?.value
    this.medecin2.residence=this.MedecinForms.get('residence')?.value
    this.medecin2.heureDebut=this.MedecinForms.get('heureDebut')?.value
    this.medecin2.heureFin=this.MedecinForms.get('heureFin')?.value*/
    
    console.log("medecin enregistrer2",this.medecin2)
   this.medecinservice.sendMedecin(this.medecin2).subscribe({
      next:(v)=>{
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Medecin enregistrée' });
    },
      error:(e)=>{

      },
      complete:()=>{
        this.MedecinForms.setValue({
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
          sepecialiteMedecin:null,
          typeEmploye:null,
          typeMedecin:null,
        })
      }
    })
    
   }
}
