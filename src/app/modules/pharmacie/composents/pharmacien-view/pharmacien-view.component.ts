import { Component, OnInit,ViewChild} from '@angular/core';
import { PharmacienService } from 'src/app/services/servicePharmacie/pharmacien.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Pharmacien } from 'src/app/models/modelPharmacie/pharmacien';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table'

interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}

@Component({
  selector: 'app-pharmacien-view',
  templateUrl: './pharmacien-view.component.html',
  styleUrls: ['./pharmacien-view.component.scss']
})
export class PharmacienViewComponent implements OnInit {
  posts: any

  pharmaciens:any[]=[];
  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;

  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  loading: boolean = true;

  exportColumns: any[]=[];

  personneDialog: any | boolean;
  genres:any
  pharmacienForms: FormGroup = new FormGroup({})
  pharmacien:Pharmacien=new Pharmacien()

  constructor(private pharService:PharmacienService,private route:Router,
    private messageService:MessageService,
    private pharmacienForm: FormBuilder
) { }

  ngOnInit(): void {
    this.pharmacienForms = this.pharmacienForm.group({

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


      //salt: ['', [Validators.required, Validators.maxLength(30)]],

      /*
      salaireInfirmier: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      userIdentifier: ['', [Validators.required, Validators.maxLength(15)]],
      active: [null, [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(8)]],
      createdAt: [null, [Validators.required, Validators.maxLength(10)]],
      updatedAt: ['', [Validators.required, Validators.maxLength(10)]],
      version: [null, [Validators.required, Validators.maxLength(20)]],

      file:['', [Validators.required, Validators.maxLength(30)]],
      photo:['', [Validators.required, Validators.maxLength(20)]],
      residence:['', [Validators.required, Validators.maxLength(30)]],
      numeroCni:['', [Validators.required, Validators.maxLength(20)]]
      */
    })
    this.pharService.recupererPharmacien().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.pharmaciens=this.posts.data
        this.loading=false
      },
      error: (e) => {},
      complete: () => {
      }
    })
  }
  detail(a:any){
    //this.route.navigate(['administrateur/detailM',a]);
    this.pharService.recupererPharmacien().subscribe({
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
  this.genres = [
    {name: 'homme'},
    {name: 'femme'}
];
}

exportPdf() {

  const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
        doc.autoTable({
          head:this.exportColumns,
          body:this.pharmaciens
        })
    doc.save("Pomptables.pdf")
}

exportExcel() {
import("xlsx").then(xlsx => {
const worksheet = xlsx.utils.json_to_sheet(this.pharmaciens);
const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
const excelBuffer: any = xlsx.write(workbook, {
  bookType: "xlsx",
  type: "array"
});
this.saveAsExcelFile(excelBuffer, "pharmaciens");
});
}

SaveData(){

  this.pharmacien.id=null
  this.pharmacien.email=this.pharmacienForms.get('email')?.value
  this.pharmacien.password=this.pharmacienForms.get('password')?.value
  this.pharmacien.nom=this.pharmacienForms.get('nom')?.value
  this.pharmacien.prenoms=this.pharmacienForms.get('prenoms')?.value
  this.pharmacien.dateNaissance=this.pharmacienForms.get('dateNaissance')?.value
  this.pharmacien.login=this.pharmacienForms.get('login')?.value
  let val=this.pharmacienForms.get('genre')?.value
  this.pharmacien.genre=val.name
  this.pharmacien.tel=this.pharmacienForms.get('tel')?.value
  this.pharmacien.tel2=this.pharmacienForms.get('tel2')?.value

  this.pharmacien.fcmToken=""
  this.pharmacien.typeEmploye=null

     this.pharService.enregistrerPharmacien(this.pharmacien).subscribe({

      next:(v)=>{
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Pharmacien enregistré' });
      },
      error:(e)=>{

      },
      complete:()=>{
        this.pharmacienForms.setValue({
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
