import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { RendezVousService } from 'src/app/services/ServiceMedecin/rendez-vous.service';
import { MedecinService } from 'src/app/services/ServiceMedecin/medecin.service';
import { PatientService } from 'src/app/services/ServicePatient/patient.service';
import { Rendezvous } from 'src/app/models/modelMedecin/rendezvous';


interface jsPDFWithPlugin extends jspdf.jsPDF {
	autoTable: (options: UserOptions) => jspdf.jsPDF;
}

@Component({
	selector: 'app-rendez-vous-view',
	templateUrl: './rendez-vous-view.component.html',
	styleUrls: ['./rendez-vous-view.component.scss']
})
export class RendezVousViewComponent implements OnInit {

	dragdrop: boolean = true;

	@ViewChild('dt') dt: Table | undefined | any;

	unlockedCustomers: any[] = [];

	lockedCustomers: any[] = [];

	rowGroupMetadata: any;

	loading: boolean = true;
	exportColumns: any[] = [];
	rendezVousForms: FormGroup;
	rendezVous: any[];
	posts: any;
	rendezVousDialog: boolean = false;

	statut: any;
	medecinsForm: any[];
	medecins: any[];
	patientsForm: any[];
	patients: any[];

	constructor(private rendezVousService: RendezVousService,
				private rendezVousForm: FormBuilder,
				private route: Router,
				private primeNgConfig: PrimeNGConfig,
				private medecinservice: MedecinService,
				private patientService: PatientService,
				private confirmationService: ConfirmationService,
				private messageService: MessageService,) {
	}

	ngOnInit(): void {
		this.recupererRendezVous();
		this.recupererCinfig();
		this.rendezVousForms = this.rendezVousForm.group({
			datePriseRendezVous: ['', [Validators.required]],
			dateRendezVous: ['', [Validators.required]],
			patient: ['', [Validators.required]],
			medecin: [''],
			reception: [''],
			statut: ['', [Validators.required]],
			adresse: ['', [Validators.required]],
			commentaire: ['']
		});

		this.statut = [
			{ label: 'Pas de filtre', value: '' },
			{ label: 'Effectué', value: true },
			{ label: 'Non éffectué', value: false }
		];
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
				fileName + '_export_' + new Date() + EXCEL_EXTENSION
		);
	}

	applyFilterGlobal($event: any, stringVal: any) {
		this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
	}

	getEventValue($event: any): string {
		return $event.target.value;
	}

	toggleLock(data: any, frozen: any, index: any) {
		if (frozen) {
			this.lockedCustomers = this.lockedCustomers.filter((c, i) => i !== index);
			this.unlockedCustomers.push(data);
		} else {
			this.unlockedCustomers = this.unlockedCustomers.filter((c, i) => i !== index);
			this.lockedCustomers.push(data);
		}

		this.unlockedCustomers.sort((val1, val2) => {
			return val1.id < val2.id ? -1 : 1;
		});
	}

	exportPdf() {
		const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
		doc.autoTable({
			head: this.exportColumns,
			body: this.rendezVous
		});
		doc.save('Rendez-vous.pdf');
	}

	exportExcel() {
		import('xlsx').then(xlsx => {
			const worksheet = xlsx.utils.json_to_sheet(this.rendezVous);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer: any = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array'
			});
			this.saveAsExcelFile(excelBuffer, 'Rendez-Vous');
		});
	}

	enregistrerRendezVous() {
		const Rdv: Rendezvous = new Rendezvous();

	}

	newRendezVous() {
		this.rendezVousForms.reset();
		this.rendezVousDialog = !this.rendezVousDialog;
	}

	urlActif(): boolean {
		return this.route.url.includes('/reception/medecin/Rdv') || this.route.url.includes('/doctor/Rdv');
	}

	medecinActif() {
		return this.route.url.includes('/doctor/Rdv');
	}

	receptionActif() {
		return this.route.url.includes('/reception/medecin/Rdv');
	}

	recupererRendezVous() {
		this.rendezVousService.recupererRendezVous().subscribe({
			next: (value) => {
				this.posts = value.data;
				this.rendezVous = this.posts;
				console.log(this.rendezVous);
			}
		});
		this.medecinservice.recupererMedecin().subscribe({
			next: (value: any) => {
				const post = value.data ? value : [];
				this.medecins = post.data;
			},
			error: (e) => {
			},
			complete: () => {
			}
		});

		this.patientService.recupererPatient().subscribe({
			next: (value: any) => {
				const post = value.data;
				this.patients = post;
			},
			error: (e) => {
			},
			complete: () => {
			}
		});
	}

	supprimerRendezVous(Rdv: any) {
		this.confirmationService.confirm({
			message: 'Annulé le rendez-vous?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.rendezVousService.supprimerRendezVous(Rdv.id).subscribe({
					next: () => {
						this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'Le rendez-vous a été annulé', icon: 'pi-file' });
						this.rendezVous = this.rendezVous.filter(val => val.Rdv.id !== Rdv.id);
					},
					error: () => {
						this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible d\'annulé le rendez-vous', icon: 'pi-file' });
					}
				});
			}
		});
	}

	medecinItems(event: any) {
		let filtered: any[] = [];
		let query = event.query;
		for (let i = 0; i < this.medecins.length; i++) {
			let item = this.medecins[i];
			if (item.user.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(item);
			}
		}
		this.medecinsForm = filtered;
	}

	patientsItems(event: any) {
		let filtered: any[] = [];
		let query = event.query;
		for (let i = 0; i < this.patients.length; i++) {
			let item = this.patients[i];
			if (item.user.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(item);
			}
		}
		this.patientsForm = filtered;
	}

	recupererCinfig(): void {
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
		});
	}
}
