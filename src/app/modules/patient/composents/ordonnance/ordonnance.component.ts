import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { OrdonnanceService } from 'src/app/services/ServicePatient/ordonnance.service';
import { Ordonnance } from 'src/app/models/modelPatient/ordonnance';
import { PatientService } from 'src/app/services/ServicePatient/patient.service';
import { MedecinService } from 'src/app/services/ServiceMedecin/medecin.service';

interface jsPDFWithPlugin extends jspdf.jsPDF {
  autoTable: (options: UserOptions) => jspdf.jsPDF;
}

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.scss']
})
export class OrdonnanceComponent implements OnInit {
  ordonnanceForms: FormGroup;
  ordonnanceFormsUpdate: FormGroup;

  @ViewChild('dt') dt: Table | undefined | any;

    loading: boolean = true;
    liste_medecin:any[];
    liste_patient:any[];
    ordonnanceDialog: boolean;
    ordonnanceDialogUpdate: boolean;
    statut: any[];
    ordonnances: any[] = [];
    posts: any;
    patientForm:any
    medecinForm:any
  constructor(private route: Router,private ordonnanceForm: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private primeNgConfig: PrimeNGConfig,
              private ordonnanceService: OrdonnanceService,
              private patientService: PatientService,
              private medecinService:MedecinService) { }

  ngOnInit(): void {
    this.recupererOrdonnance();
    this.recupereConfig();
    this.ordonnanceForms = this.ordonnanceForm.group({
      id: null,
      dateEmission: ['', [Validators.required, Validators.maxLength(30)]],
      medecin: ['', [Validators.required, Validators.maxLength(30)]],
      assure: ['', [Validators.required, Validators.maxLength(30)]],
      livre: ['', [Validators.required, Validators.maxLength(30)]],

    });
    this.ordonnanceFormsUpdate = this.ordonnanceForm.group({
      idUpdate: null,
      dateEmissionUpdate: ['', [Validators.required, Validators.maxLength(30)]],
      medecinUpdate: ['', [Validators.required, Validators.maxLength(30)]],
      assureUpdate: ['', [Validators.required, Validators.maxLength(30)]],
      livreUpdate: ['', [Validators.required, Validators.maxLength(30)]],
    });

    this.statut = [
      { label: 'Pas de filtre', value: '' },
      { label: 'Livrer', value: true },
      { label: 'Non livrer', value: false }
    ];
  }


  ordonnanceDetail(a: any) {
    if (this.route.url.includes('comptable/assurance/liste')) {
      this.route.navigate(['comptable/assurance/detail', a.id]);
    } else if (this.route.url.includes('admin/assurance/liste')) {
      this.route.navigate(['admin/assurance/detail', a.id]);
    } else {

    }
  }

  urlActif(): boolean {
    return this.route.url.includes('doctor/patient/ordonnance');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs(data,
            fileName + '_export_' + new Date() + EXCEL_EXTENSION
    );

  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  newOrdonnance() {
    this.ordonnanceForms.reset();
    this.ordonnanceDialog = !this.ordonnanceDialog;
  }

  updateOrdonnance(ordonnance: any) {
    this.ordonnanceDialogUpdate = !this.ordonnanceDialogUpdate;
    this.ordonnanceFormsUpdate.patchValue({
      idUpdate: ordonnance.id,
      dateEmissionUpdate: ordonnance.dateEmission,
      medecinUpdate: ordonnance.medecin.user.nom,
      assureUpdate: ordonnance.assure.user.nom,
      livreUpdate: ordonnance.livre
    });
  }

  exportPdf() {
    const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
    doc.autoTable({
      //head: this.exportColumns,
      body: this.ordonnances
    });
    doc.save('Ordonnances-rapport.pdf');
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.ordonnances);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      this.saveAsExcelFile(excelBuffer, 'ordonnances');
    });
  }

  recupererOrdonnance(): void {
    this.ordonnanceService.recupererListeOrdonnance().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : [];
        this.ordonnances = this.posts.data;
        this.loading = false;
      },
      error: () => {
      },
      complete: () => {
      }
    });
    this.patientService.recupererPatient().subscribe({
      next:(value)=>{
        const post = value.data
        this.liste_patient = post
      }
    })
    this.medecinService.recupererMedecin().subscribe({
      next:(value)=>{
        const post = value.data
        this.liste_medecin = post;
      }
    })

  }

  enregistrerOrdonnance(): void {
    const ordonnance: Ordonnance= new Ordonnance();
    ordonnance.id = null;
    ordonnance.dateEmission = this.ordonnanceForms.get('dateEmission')?.value;
    ordonnance.medecin = this.ordonnanceForms.get('medecin')?.value;
    ordonnance.assure = this.ordonnanceForms.get('assure')?.value;
    ordonnance.livre = this.ordonnanceForms.get('livre')?.value;

    this.ordonnanceService.enregistrerOrdonnance(ordonnance).subscribe({
      next: (v) => {
        this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Service Message', detail: 'L \'ordonnance a été enregistrée' });
        this.ordonnanceForms.reset();
      },
      error: (e) => {
      },
      complete: () => {
        this.recupererOrdonnance();
        this.ordonnanceDialog = false;
      }
    });
  }

  supprimerOrdonnance(ordonnance: any) {
    this.confirmationService.confirm({
      message: 'Supprimer l\'ordonnance du ' + ordonnance.dateEmission + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordonnanceService.supprimerOrdonnance(ordonnance.id).subscribe({
          next: (v: string) => {
            this.messageService.add({ key: 'myKey2', severity: 'info', summary: 'Suppression', detail: 'l\'ordonnance a été supprimée', icon: 'pi-file' });
            this.ordonnances = this.ordonnances.filter(val => val.id !== ordonnance.id);
          },
          error: () => {
            this.messageService.add({ key: 'myKey3', severity: 'error', summary: 'Erreur', detail: 'l\'ordonnance ne peut pas être supprimer', icon: 'pi-file' });
          }
        });
      }
    });
  }

  medecinItems(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.liste_medecin.length; i++) {
      let item = this.liste_medecin[i];
      if (item.user.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.medecinForm = filtered;
  }

  patientItems(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.liste_patient.length; i++) {
      let item = this.liste_patient[i];
      if (item.user.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.patientForm = filtered;
  }
  recupereConfig():void{
    this.primeNgConfig.setTranslation({
      startsWith: 'Commence par',
      contains: 'Contient',
      notContains: 'Ne contient pas',
      endsWith: 'Fini par',
      equals: 'Egale à',
      notEquals: 'différent de',
      noFilter: 'Pas de filtre',
      reject: 'Non',
      accept: 'Oui'
    });
  }
}
