import { Component, OnInit,ViewChild} from '@angular/core';
import { PharmacienService } from 'src/app/services/servicePharmacie/pharmacien.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Pharmacien } from 'src/app/models/modelPharmacie/pharmacien';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table'
import { EmployeService } from 'src/app/shared-cemedo/employe/employe.service';

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

  pharmacienDialog:boolean=false;
  genres:any
  employes: any[];
  employeForm: any[];
  pharmacienForms: FormGroup = new FormGroup({})

  constructor(private pharmacienService:PharmacienService,private route:Router,
    private messageService:MessageService,
    private pharmacienForm: FormBuilder,
    private primeNgConfig: PrimeNGConfig,
    private employeService: EmployeService
) { }

  ngOnInit(): void {
      this.recupererPharmacien();
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
    });
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
  pharmacienDetail(a:any){
    this.pharmacienService.recupererPharmacien().subscribe({})
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
    newPharmacien() {
      this.pharmacienForms.reset();
      this.pharmacienDialog = !this.pharmacienDialog;
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
    enregistrerPharmacien(){
    const pharmacien:Pharmacien=new Pharmacien()
    pharmacien.id=null
    pharmacien.email=this.pharmacienForms.get('email')?.value
    pharmacien.password=this.pharmacienForms.get('password')?.value
    pharmacien.nom=this.pharmacienForms.get('nom')?.value
    pharmacien.prenoms=this.pharmacienForms.get('prenoms')?.value
    pharmacien.dateNaissance=this.pharmacienForms.get('dateNaissance')?.value
    pharmacien.tel=this.pharmacienForms.get('tel')?.value
    pharmacien.tel2=this.pharmacienForms.get('tel2')?.value
    pharmacien.login=this.pharmacienForms.get('login')?.value
    let valuerGenre=this.pharmacienForms.get('genre')?.value
    let valuerEmploye=this.pharmacienForms.get('typeEmploye')?.value
    pharmacien.genre=valuerGenre.id
    pharmacien.typeEmploye=valuerEmploye.id
    pharmacien.fcmToken=""
     this.pharmacienService.enregistrerPharmacien(pharmacien).subscribe({
      next:(v)=>{
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Le pharmacien à été enregistré' });
        this.pharmacienForms.reset();
      },
      error:(e)=>{},
      complete:()=>{
          this.recupererPharmacien();
          this.pharmacienDialog=false
       }
     })
 }
    recupererPharmacien(){
     this.pharmacienService.recupererPharmacien().subscribe({
         next: (value: any) => {
             this.posts = value.data ? value : []
             this.pharmaciens=this.posts.data
             this.loading=false
         },
         error: (e) => {},
         complete: () => {
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
    urlActif():boolean{
        return this.route.url.includes('/admin/pharmacie/liste')
    }
}
