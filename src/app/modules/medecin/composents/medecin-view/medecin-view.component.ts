import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Medecin } from 'src/app/models/modelMedecin/medecin';
import { MedecinService } from 'src/app/services/ServiceMedecin/medecin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { MedecinSpecialiteService } from 'src/app/services/ServiceMedecin/medecin-specialite.service';
import { TypeMedecinService } from 'src/app/services/ServiceMedecin/type-medecin.service';
import { EmployeService } from 'src/app/services/ServiceEmploye/employe.service';

interface jsPDFWithPlugin extends jspdf.jsPDF {
	autoTable: (options: UserOptions) => jspdf.jsPDF;
}


@Component({
	selector: 'app-medecin-view',
	templateUrl: './medecin-view.component.html',
	styleUrls: ['./medecin-view.component.scss']
})
export class MedecinViewComponent implements OnInit {
	medecins: any[];
	posts: any;
	post: any;

	@ViewChild('dt') dt: Table | undefined | any;

	loading: boolean = true;

	exportColumns: any[] = [];

	medecinDialog: boolean = false;
	medecinDialogUpdate: boolean = false;

	medecinForms: FormGroup;
	medecinFormsUpdate: FormGroup;

	genres: any;

	typeMedecins: any[];
	typeMedecinsForm: any[];

	specialiteMedecins: any[];
	specialiteMedecinsForm: any[];

	employes: any[];
	employeForm: any[];

	constructor(private medecinservice: MedecinService,
				private route: Router,
				private medecinForm: FormBuilder,
				private messageService: MessageService,
				private primeNgConfig: PrimeNGConfig,
				private medecinSpecialiteService: MedecinSpecialiteService,
				private typeMedecinService: TypeMedecinService,
				private employeService: EmployeService,
				private confirmationService: ConfirmationService) {
	}

	ngOnInit(): void {
		this.recupererListeMedecin();
		this.recupererCinfig();
        this.initFormulaire();
		this.medecinFormsUpdate = this.medecinForm.group({
			matriculeUpdate: null,
			emailUpdate: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
			passwordUpdate: ['', [Validators.required, Validators.maxLength(8)]],
			nomUpdate: ['', [Validators.required, Validators.minLength(3)]],
			prenomsUpdate: ['', [Validators.required, Validators.maxLength(20)]],
			telUpdate: ['', [Validators.required, Validators.maxLength(10)]],
			tel2Update: ['', [Validators.required, Validators.maxLength(10)]],
			genreUpdate: ['', [Validators.required, Validators.maxLength(10)]],
			dateNaissanceUpdate: ['', [Validators.required, Validators.maxLength(10)]],
			loginUpdate: ['', [Validators.required, Validators.maxLength(20)]],
			fcmTokenUpdate: 'string',
			sepecialiteMedecinUpdate: null,
			typeEmployeUpdate: null,
			typeMedecinUpdate: null,
		});
	}

	medecinDetail(a: any) {
		if (this.route.url.includes('comptable/medecin/liste')) {
			this.route.navigate(['comptable/medecin/detail', a]);
		} else if (this.route.url.includes('admin/medecin/liste')) {
			this.route.navigate(['admin/medecin/detail', a]);
		} else {

		}
		this.medecinservice.recupererMedecin().subscribe({
			next: (val) => {
				console.log(val);
			}
		});
	}

	getEventValue($event: any): string {
		return $event.target.value;
	}

	newMedecin() {
		this.medecinForms.reset();
		this.medecinDialog = !this.medecinDialog;
	}

	exportPdf() {
		const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
		doc.autoTable({
			head: this.exportColumns,
			body: this.medecins
		});
		doc.save('Medecin-rapport.pdf');
	}

	exportExcel() {
		import('xlsx').then(xlsx => {
			const worksheet = xlsx.utils.json_to_sheet(this.medecins);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer: any = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array'
			});
			this.saveAsExcelFile(excelBuffer, 'medecin');
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
				fileName + '_export_' + new Date() + EXCEL_EXTENSION
		);

	}

	enregistrerMedecin() {
		const medecin: Medecin = new Medecin();

		medecin.matricule = null;
		medecin.email = this.medecinForms.get('email')?.value;
		medecin.password = this.medecinForms.get('password')?.value;
		medecin.nom = this.medecinForms.get('nom')?.value;
		medecin.prenoms = this.medecinForms.get('prenoms')?.value;
		medecin.dateNaissance = this.medecinForms.get('dateNaissance')?.value;
		const valeurGenre = this.medecinForms.get('genre')?.value;
		const valeurSpecialite = this.medecinForms.get('sepecialiteMedecin')?.value;
		const valeurEmplye = this.medecinForms.get('typeEmploye')?.value;
		const valeurType = this.medecinForms.get('typeMedecin')?.value;
		medecin.genre = valeurGenre.id;
		medecin.specialite = valeurSpecialite.id;
		medecin.typeEmploye = valeurEmplye.id;
		medecin.typeMedecin = valeurType.id;
		medecin.tel = this.medecinForms.get('tel')?.value;
		medecin.tel2 = this.medecinForms.get('tel2')?.value;
		medecin.login = this.medecinForms.get('login')?.value;

		this.enregistrement(medecin);
		/*
		this.medecin2.salaireMedecin=this.MedecinForms.get('salaireMedecin')?.value
		this.medecin2.primeMedecin=this.MedecinForms.get('primeMedecin')?.value
		this.medecin2.sepecialiteMedecin=this.MedecinForms.get('sepecialiteMedecin')?.value
		this.medecin2.photo=this.MedecinForms.get('photo')?.value
		this.medecin2.numeroCni=this.MedecinForms.get('numeroCni')?.value
		this.medecin2.residence=this.MedecinForms.get('residence')?.value
		this.medecin2.heureDebut=this.MedecinForms.get('heureDebut')?.value
		this.medecin2.heureFin=this.MedecinForms.get('heureFin')?.value*/

	}
	enregistrement(medecin: Medecin):void{
		this.medecinservice.enregistrerMedecin(medecin).subscribe({
			next: (v) => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le medecin a été enregistré' });
				this.medecinForms.reset();
			},
			error: (e) => {
			},
			complete: () => {
				this.recupererListeMedecin();
				this.medecinDialog = false;
			}
		});
	}

	urlActif(): boolean {
		return this.route.url.includes('/admin/medecin/liste');
	}

	recupererListeMedecin(): void {
		this.medecinservice.recupererMedecin().subscribe({
			next: (value: any) => {
				this.posts = value.data ? value : [];
				this.post = this.posts.data;
				this.medecins = this.post;
				this.loading = false;
			},
			error: (e) => {
			},
			complete: () => {
			}
		});
		this.medecinSpecialiteService.recupererSpecialite().subscribe({
			next: (value) => {
				const data = value.data;
				this.specialiteMedecins = data ? data : [];
			}
		});
		this.typeMedecinService.recupererTypeMedecin().subscribe({
			next: (value) => {
				const data = value.data;
				this.typeMedecins = data ? data : [];
			}
		});
		this.employeService.recupererTypeEmploye().subscribe({
			next: (value) => {
				const data = value.data;
				this.employes = data ? data : [];
			}
		});
		this.employeService.recupererGenre().subscribe({
			next: (value) => {
				const data = value.data;
				this.genres = data ? data : [];
			}
		});
	}

	supprimerMedecin(medecin: any) {
		this.confirmationService.confirm({
			message: 'Supprimer le medecin ' + medecin.user.nom + ' ' + medecin.user.prenoms + '?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.medecinservice.supprimerMedecin(medecin.id).subscribe({
					next: (v: string) => {
						this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'Le medecin a été supprimé', icon: 'pi-file' });
						this.medecins = this.medecins.filter(val => val.user.id !== medecin.user.id);
					},
					error: () => {
						this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le medecin ne peut pas être supprimer', icon: 'pi-file' });
					}
				});
			}
		});
	}

	modifierMedecin(): void {
		const medecin: Medecin = new Medecin();
		medecin.matricule = this.medecinFormsUpdate.get('matriculeUpdate')?.value;
		medecin.email = this.medecinFormsUpdate.get('emailUpdate')?.value;
		medecin.password = this.medecinFormsUpdate.get('passwordUpdate')?.value;
		medecin.nom = this.medecinFormsUpdate.get('nomUpdate')?.value;
		medecin.prenoms = this.medecinFormsUpdate.get('prenomsUpdate')?.value;
		medecin.dateNaissance = this.medecinFormsUpdate.get('dateNaissanceUpdate')?.value;
		const valeurGenre = this.medecinFormsUpdate.get('genreUpdate')?.value;
		const valeurSpecialite = this.medecinFormsUpdate.get('sepecialiteMedecinUpdate')?.value;
		const valeurEmplye = this.medecinFormsUpdate.get('typeEmployeUpdate')?.value;
		const valeurType = this.medecinFormsUpdate.get('typeMedecinUpdate')?.value;
		medecin.genre = valeurGenre.id;
		medecin.specialite = valeurSpecialite.id;
		medecin.typeEmploye = valeurEmplye.id;
		medecin.typeMedecin = valeurType.id;
		medecin.tel = this.medecinFormsUpdate.get('telUpdate')?.value;
		medecin.tel2 = this.medecinFormsUpdate.get('tel2Update')?.value;
		medecin.login = this.medecinFormsUpdate.get('loginUpdate')?.value;

		this.modification(medecin);
	}

	modification(medecin: Medecin):void{
		this.medecinservice.modifierMedecin(medecin).subscribe({
			next: (v) => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le medecin a été modifié' });
				this.medecinFormsUpdate.reset();
			},
			error: (e) => {
			},
			complete: () => {
				this.recupererListeMedecin();
				this.medecinDialogUpdate = false;
			}
		});
	}

	typeMedecinItems(event: any) {
		let filtered: any[] = [];
		let query = event.query;

		for (let i = 0; i < this.typeMedecins.length; i++) {
			let item = this.typeMedecins[i];
			if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(item);
			}
		}
		this.typeMedecinsForm = filtered;
	}

	specialiteMedecinItems(event: any) {
		let filtered: any[] = [];
		let query = event.query;
		for (let i = 0; i < this.specialiteMedecins.length; i++) {
			let item = this.specialiteMedecins[i];
			if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(item);
			}
		}
		this.specialiteMedecinsForm = filtered;
	}

	employeItems(event: any) {
		let filtered: any[] = [];
		let query = event.query;
		for (let i = 0; i < this.employes.length; i++) {
			let item = this.employes[i];
			if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(item);
			}
		}
		this.employeForm = filtered;
	}

	updateMedecin(medecin: any) {
		this.medecinDialogUpdate = !this.medecinDialogUpdate;
		this.medecinFormsUpdate.patchValue({
			matriculeUpdate: medecin.id,
			nomUpdate: medecin.user.nom,
			prenomsUpdate: medecin.user.prenoms,
			loginUpdate: medecin.user.login,
			passwordUpdate: medecin.user.password,
			emailUpdate: medecin.user.email,
			telUpdate: medecin.user.tel,
			tel2Update: medecin.user.tel2,
			genreUpdate: medecin.user.genre,
			dateNaissanceUpdate: medecin.user.dateNaissance,
			typeEmployeUpdate: medecin.typeEmploye,
			typeMedecinUpdate: medecin.typeMedecin,
			sepecialiteMedecinUpdate: medecin.specialite
		});
	}

	helpMedecin() {
		this.medecinDialogUpdate = false;
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

	initFormulaire(): void{
		this.medecinForms = this.medecinForm.group({
			matricule: null,
			email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
			password: ['', [Validators.required, Validators.maxLength(8)]],
			nom: ['', [Validators.required, Validators.minLength(3)]],
			prenoms: ['', [Validators.required, Validators.maxLength(20)]],
			tel: ['', [Validators.required, Validators.maxLength(10)]],
			tel2: ['', [Validators.required, Validators.maxLength(10)]],
			genre: ['', [Validators.required, Validators.maxLength(10)]],
			dateNaissance: ['', [Validators.required, Validators.maxLength(10)]],
			login: ['', [Validators.required, Validators.maxLength(20)]],
			fcmToken: 'string',
			sepecialiteMedecin: null,
			typeEmploye: null,
			typeMedecin: null,

			//residence: ['', [Validators.required, Validators.maxLength(20)]],
			//salaireMedecin:[null, [Validators.required, Validators.maxLength(10)]],
			//primeMedecin:[null,[Validators.required, Validators.maxLength(10)]],
			//heureDebut:['',[Validators.required, Validators.maxLength(10)]],
			//heureFin:['',[Validators.required, Validators.maxLength(10)]],
			//photo:['',[Validators.required, Validators.maxLength(30)]],
			//numeroCni:['',[Validators.required, Validators.maxLength(10)]]
		});
	}
}
