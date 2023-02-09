import { Component, ViewChild, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/ServicePatient/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { doctor } from 'src/app/modules/patient/composents/data/multi';
import { ApexAxisChartSeries, ApexChart } from 'ng-apexcharts';
import { Subscribable } from 'rxjs';

import * as saveAs from 'file-saver';

import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

import { Table } from 'primeng/table';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/modelPatient/patient';
import { AssuranceService } from 'src/app/services/ServiceAssurance/assurance.service';

interface jsPDFWithPlugin extends jspdf.jsPDF {
	autoTable: (options: UserOptions) => jspdf.jsPDF;
}

@Component({
	selector: 'app-patient-view',
	templateUrl: './patient-view.component.html',
	styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {
	boutonActif:string
	posts: any;
	postsAssurance: any;
	patients: any[];
	assurances:any[];

	patientForms: FormGroup;
	@ViewChild('dt') dt: Table | undefined | any;

	loading: boolean = true;
	exportColumns: any[] = [];

	doctor: any = [{ 'age': 25 }, { 'age': 40 }, { 'age': 28 }];
	serie: ApexAxisChartSeries;
	chart: ApexChart;
	options: any;
	patientDialog: boolean = false;

	constructor(private patientService: PatientService,
				private route: Router,
				private primeNgConfig: PrimeNGConfig,
				private patientForm: FormBuilder,
				private confirmationService: ConfirmationService,
				private messageService: MessageService,
				private assuranceService: AssuranceService) {}

	ngOnInit(): void {
		this.recupererConfig();
		this.recupererPatient();
		this.initFormulaire();
	}

	patientDetail(a: any) {
		this.route.navigate(['admin/patient/detail', a]);
	}

	supprimerPatient(patient: any) {
		this.confirmationService.confirm({
			message: 'Supprimer le/la patient(e) ' + patient.user.nom + ' ' + patient.user.prenoms + '?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.patientService.supprimerPatient(patient.id).subscribe({
					next: () => {
						this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'Le patient a été supprimé', icon: 'pi-file' });
						this.patients = this.patients.filter(val => val.user.id !== patient.user.id);
					},
					error: () => {
						this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le patient ne peut pas être supprimer', icon: 'pi-file' });
					}
				});
			}
		});
	}

	saveAsExcelFile(buffer: any, fileName: string): void {

		let EXCEL_TYPE =
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
		let EXCEL_EXTENSION = '.xlsx';
		const data: Blob = new Blob([buffer], {
			type: EXCEL_TYPE
		});
		saveAs(
				data,
				fileName + '_' + EXCEL_EXTENSION
		);

	}

	applyFilterGlobal($event: any, stringVal: any) {
		this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
	}

	getEventValue($event: any): string {
		return $event.target.value;
	}

	exportPdf() {
		const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
		doc.autoTable({
			head: this.exportColumns,
			body: this.patients
		});
		doc.save('rapport-patient.pdf');
	}

	exportExcel() {
		import('xlsx').then(xlsx => {
			const worksheet = xlsx.utils.json_to_sheet(this.patients);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer: any = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array'
			});
			this.saveAsExcelFile(excelBuffer, 'rapport-patient');
		});
	}

	urlActif(): boolean {
		return this.route.url.includes('/reception/patient/liste');
	}

	urlActifAdmin(): boolean {
		return this.route.url.includes('admin/patient/liste');
	}

	newPatient(): void {
		this.patientForms.reset();
		this.patientDialog = !this.patientDialog;
	}

	recupererPatient(): void {
		this.patientService.recupererPatient().subscribe({
			next: (value: any) => {
				this.posts = value.data ? value : [];
				this.patients = this.posts.data;
				this.loading = false;
			},
			error: () => {},
			complete: () => {}
		});
		this.assuranceService.recupererAssurance().subscribe({
			next: (value: any) => {
				this.postsAssurance = value.data ? value : [];
				this.assurances = this.postsAssurance.data;
			},
			error: () => {},
			complete: () => {}
		});
	}
    enregistrerPatient(): void{
		const patient = new Patient();
		patient.nom=this.patientForms.get('nom')?.value;
		patient.prenoms=this.patientForms.get('prenoms')?.value;
		patient.login=this.patientForms.get('login')?.value;
		patient.tel=this.patientForms.get('tel')?.value;
		patient.tel2=this.patientForms.get('tel2')?.value;
		patient.email=this.patientForms.get('email')?.value;
		patient.dateNaissance=this.patientForms.get('dateNaissance')?.value;
		patient.profession=this.patientForms.get('profession')?.value;
		patient.password=this.patientForms.get('password')?.value;
		const valeurAssurance = this.patientForms.get('assurance')?.value;
		patient.assurance=valeurAssurance.id

        if(this.boutonActif != "modification"){
        	patient.id=null;
        	this.patientService.enregistrerPatient(patient).subscribe({
				next: (v) => {
					this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le patient a été enregistré'});
					this.patientForms.reset();
				},
			})
		}
        //modification
        else {
        	patient.id=this.patientForms.get('id')?.value;
			this.patientService.modifierPatient(patient).subscribe({
				next: (v) => {
					this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le patient a été modifié'});
					this.patientForms.reset();
				},
			})
		}
	}
	modifierPatient(patient:any):void{
		this.boutonActif="modification"
		this.patientDialog=true;
		this.patientForms.patchValue({
			nom:patient.user.nom,
			prenoms:patient.user.prenoms,
			login:patient.user.login,
			profession:patient.profession,
			email: patient.user.email,
			lieuHabitation:patient.lieuHabitation,
			tel:patient.user.tel,
			tel2:patient.user.tel2,
			password: patient.user.password
		})
	}
	recupererConfig(): void {
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

	initFormulaire(): void {
		this.patientForms = this.patientForm.group({
			active: [true, [Validators.required, Validators.maxLength(10)]],
			assurance: ['', [Validators.required, Validators.maxLength(10)]],
			createdAt: ['', [Validators.required, Validators.maxLength(10)]],
			dateNaissance: ['', [Validators.required, Validators.maxLength(10)]],
			email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
			genre: ['', [Validators.required, Validators.maxLength(10)]],
			id: null,
			lieuHabitation: ['', [Validators.required, Validators.maxLength(20)]],
			login: ['', [Validators.required, Validators.maxLength(20)]],
			nom: ['', [Validators.required, Validators.minLength(3)]],
			numeroAssure: ['', [Validators.required, Validators.maxLength(10)]],
			password: ['', [Validators.required, Validators.maxLength(8)]],
			prenoms: ['', [Validators.required, Validators.maxLength(20)]],
			profession: ['', [Validators.required, Validators.maxLength(20)]],
			role: ['', [Validators.required, Validators.maxLength(20)]],
			tauxCouverture: [null, [Validators.required, Validators.maxLength(10)]],
			tel: ['', [Validators.required, Validators.maxLength(15)]],
			tel2: ['', [Validators.required, Validators.maxLength(10)]],
			fcmtoken: ['', [Validators.required, Validators.maxLength(10)]],
			updatedAt: ['', [Validators.required, Validators.maxLength(10)]],
			version: [null, [Validators.required, Validators.maxLength(10)]]

			//pieceIdRecto: ['', [Validators.required, Validators.maxLength(30)]],
			//pieceIdVerso: ['', [Validators.required, Validators.maxLength(30)]],
			//assuranceRecto: ['', [Validators.required, Validators.maxLength(30)]],
			//assuranceVerso: ['', [Validators.required, Validators.maxLength(12)]],
			//autreAntecedent:['', [Validators.required, Validators.maxLength(10)]],
		});
	}
}
