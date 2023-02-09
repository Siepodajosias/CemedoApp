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
import { VilleService } from 'src/app/services/ServicePartager/ville.service';
import { AdresseService } from 'src/app/services/ServicePartager/adresse.service';
import { StatutService } from 'src/app/services/ServicePartager/statut.service';

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
	postsVille: any;
	postsAdresse: any;
	rendezVousDialog: boolean = false;

	statut: any;
	medecinsForm: any[];
	medecins: any[];
	patientsForm: any[];
	patients: any[];
	villeForm: any[];
	villes: any[];

	statutForm: any[];
	statuts: any[];

	adresseForm: any[];
	adresses: any[];

	constructor(private rendezVousService: RendezVousService,
				private rendezVousForm: FormBuilder,
				private route: Router,
				private primeNgConfig: PrimeNGConfig,
				private medecinservice: MedecinService,
				private patientService: PatientService,
				private confirmationService: ConfirmationService,
				private messageService: MessageService,
				private villeService: VilleService,
				private adresseService: AdresseService,
				private statutRDVService: StatutService) {}

	ngOnInit(): void {
		this.recupererRendezVous();
		this.recupererCinfig();
		this.rendezVousForms = this.rendezVousForm.group({
			dateRendezVous: ['', [Validators.required]],
			patient: ['', [Validators.required]],
			medecin: [''],
			infirmier: [''],
			reception: [''],
			statut: ['', [Validators.required]],
			adresse: ['', [Validators.required]],
			service: ['', [Validators.required]],
			ville: ['', [Validators.required]],
			lieu:[''],
			commentaire: [''],
			description: ['']
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
		const rdv: Rendezvous = new Rendezvous();
        rdv.dateHeure=this.rendezVousForms.get('dateRendezVous')?.value;
		rdv.commentaire= this.rendezVousForms.get('commentaire')?.value;
		rdv.descriptionLieu= this.rendezVousForms.get('description')?.value;
		rdv.ville= this.rendezVousForms.get('ville')?.value;
		rdv.lieu= this.rendezVousForms.get('lieu')?.value;
		rdv.statutRdv= this.rendezVousForms.get('statut')?.value;
		const valeurPatient = this.rendezVousForms.get('patient')?.value;
		const valeurMedecin = this.rendezVousForms.get('medecin')?.value;
		const valeurInfirmier = this.rendezVousForms.get('infirmier')?.value;
		const valeurReception = this.rendezVousForms.get('reception')?.value;
		const valeurAdresse = this.rendezVousForms.get('adresse')?.value;
		const valeurService = this.rendezVousForms.get('service')?.value;
		rdv.assure=valeurPatient.id;
		rdv.medecin=valeurMedecin.id;
		rdv.adresse=valeurAdresse.id;
		rdv.service=valeurService.id;
		rdv.gerant=valeurReception.id;
		rdv.infirmier=valeurInfirmier.id;

		this.enregitrement(rdv);
	}

	newRendezVous() {
		this.rendezVousForms.reset();
		this.rendezVousDialog = !this.rendezVousDialog;
	}

	urlActif(): boolean {
		return this.route.url.includes('/reception/medecin/Rdv') || this.route.url.includes('/doctor/Rdv');
	}

	receptionActif() {
		return this.route.url.includes('/reception/medecin/Rdv');
	}

	enregitrement(rdv: Rendezvous):void{
		this.rendezVousService.enregistrerRendezVous(rdv).subscribe({
			next:()=>{
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le rendez-vous a été enregistré' });
				this.rendezVousForms.reset();
			},
			complete: () => {
				this.recupererRendezVous();
				this.rendezVousDialog = false;
			}
		})
	}

	recupererRendezVous() {
		this.rendezVousService.recupererRendezVous().subscribe({
			next: (value) => {
				this.posts = value.data;
				this.rendezVous = this.posts;
			}
		});
		this.medecinservice.recupererMedecin().subscribe({
			next: (value: any) => {
				const post = value.data ? value : [];
				this.medecins = post.data;
			},
			error: () => {
			},
			complete: () => {
			}
		});

		this.patientService.recupererPatient().subscribe({
			next: (value: any) => {
				const post = value.data;
				this.patients = post;
			},
			error: () => {
			},
			complete: () => {
			}
		});
		this.villeService.recupererVille().subscribe({
			next:(value)=>{
				this.postsVille = value.data;
				this.villes = this.postsVille;
			}
		})
		this.adresseService.recupererAdresse().subscribe({
			next:(value)=>{
				this.postsAdresse = value.data;
				this.adresses = this.postsAdresse;
			}
		})
		this.statutRDVService.recupererStatutRendezVous().subscribe({
			next:(value)=>{
				const post = value.data;
				this.statuts = post;
			}
		})
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
						this.rendezVous = this.rendezVous.filter(val => val.id !== Rdv.id);
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

	villesItems(event: any) {
		let filtered: any[] = [];
		let query = event.query;
		for (let i = 0; i < this.villes.length; i++) {
			let item = this.villes[i];
			if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(item);
			}
		}
		this.villeForm = filtered;
	}

	adressesItems(event: any) {
		let filtered: any[] = [];
		let query = event.query;
		for (let i = 0; i < this.adresses.length; i++) {
			let item = this.adresses[i];
			if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(item);
			}
		}
		this.adresseForm = filtered;
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
			reject: 'Non',
			accept: 'Oui'
		});
	}
}
