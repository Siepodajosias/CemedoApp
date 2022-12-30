import { Component, OnInit, ViewChild } from '@angular/core';
import { PharmacienService } from 'src/app/services/ServicePharmacie/pharmacien.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Pharmacien } from 'src/app/models/modelPharmacie/pharmacien';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table';
import { EmployeService } from 'src/app/services/ServiceEmploye/employe.service';

interface jsPDFWithPlugin extends jspdf.jsPDF {
	autoTable: (options: UserOptions) => jspdf.jsPDF;
}

@Component({
	selector: 'app-pharmacien-view',
	templateUrl: './pharmacien-view.component.html',
	styleUrls: ['./pharmacien-view.component.scss']
})
export class PharmacienViewComponent implements OnInit {
	posts: any;
	pharmaciens: any[] = [];

	@ViewChild('dt') dt: Table | undefined | any;
	loading: boolean = true;

	exportColumns: any[] = [];

	pharmacienDialog: boolean = false;
	pharmacienDialogUpdate: boolean = false;
	genres: any;
	employes: any[];
	employeForm: any[];
	pharmacienForms: FormGroup;
	pharmacienFormsUpdate: FormGroup;

	constructor(private pharmacienService: PharmacienService, private route: Router,
				private messageService: MessageService,
				private pharmacienForm: FormBuilder,
				private primeNgConfig: PrimeNGConfig,
				private employeService: EmployeService,
				private confirmationService: ConfirmationService
	) {
	}

	ngOnInit(): void {
		this.recupererPharmacien();
		this.recupererConfig();
		this.pharmacienForms = this.pharmacienForm.group({

			matricule: null,
			nom: ['', [Validators.required, Validators.minLength(3)]],
			prenoms: ['', [Validators.required, Validators.maxLength(20)]],
			login: ['', [Validators.required, Validators.maxLength(20)]],
			email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
			password: ['', [Validators.required, Validators.maxLength(8)]],
			tel: ['', [Validators.required, Validators.maxLength(20)]],
			tel2: ['', [Validators.required, Validators.maxLength(20)]],
			genre: ['', [Validators.required, Validators.maxLength(20)]],
			dateNaissance: ['', [Validators.required, Validators.maxLength(30)]],
			fcmToken: '',
			typeEmploye: null


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
		this.pharmacienFormsUpdate = this.pharmacienForm.group({
			matriculeUpdate: null,
			nomUpdate: ['', [Validators.required, Validators.minLength(3)]],
			prenomsUpdate: ['', [Validators.required, Validators.maxLength(20)]],
			loginUpdate: ['', [Validators.required, Validators.maxLength(20)]],
			emailUpdate: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
			passwordUpdate: ['', [Validators.required, Validators.maxLength(8)]],
			telUpdate: ['', [Validators.required, Validators.maxLength(20)]],
			tel2Update: ['', [Validators.required, Validators.maxLength(20)]],
			genreUpdate: ['', [Validators.required, Validators.maxLength(20)]],
			dateNaissanceUpdate: ['', [Validators.required, Validators.maxLength(30)]],
			roleUpdate: null,
			fcmTokenUpdate: '',
			typeEmployeUpdate: null
		});

	}

	pharmacienDetail(a: any) {
		this.pharmacienService.recupererPharmacien().subscribe({});
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

	newPharmacien() {
		this.pharmacienForms.reset();
		this.pharmacienDialog = !this.pharmacienDialog;
	}

	exportPdf() {
		const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
		doc.autoTable({
			head: this.exportColumns,
			body: this.pharmaciens
		});
		doc.save('Pharmacien.pdf');
	}

	exportExcel() {
		import('xlsx').then(xlsx => {
			const worksheet = xlsx.utils.json_to_sheet(this.pharmaciens);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer: any = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array'
			});
			this.saveAsExcelFile(excelBuffer, 'pharmaciens');
		});
	}

	enregistrerPharmacien() {
		const pharmacien: Pharmacien = new Pharmacien();
		pharmacien.matricule = null;
		pharmacien.email = this.pharmacienForms.get('email')?.value;
		pharmacien.password = this.pharmacienForms.get('password')?.value;
		pharmacien.nom = this.pharmacienForms.get('nom')?.value;
		pharmacien.prenoms = this.pharmacienForms.get('prenoms')?.value;
		pharmacien.dateNaissance = this.pharmacienForms.get('dateNaissance')?.value;
		pharmacien.tel = this.pharmacienForms.get('tel')?.value;
		pharmacien.tel2 = this.pharmacienForms.get('tel2')?.value;
		pharmacien.login = this.pharmacienForms.get('login')?.value;
		let valuerGenre = this.pharmacienForms.get('genre')?.value;
		let valuerEmploye = this.pharmacienForms.get('typeEmploye')?.value;
		pharmacien.genre = valuerGenre.id;
		pharmacien.typeEmploye = valuerEmploye.id;
		pharmacien.fcmToken = '';

		this.enregistrement(pharmacien);
	}

	enregistrement(pharmacien: Pharmacien): void {
		this.pharmacienService.enregistrerPharmacien(pharmacien).subscribe({
			next: (v) => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le pharmacien à été enregistré' });
				this.pharmacienForms.reset();
			},
			error: (e) => {
			},
			complete: () => {
				this.recupererPharmacien();
				this.pharmacienDialog = false;
			}
		});
	}

	recupererPharmacien() {
		this.pharmacienService.recupererPharmacien().subscribe({
			next: (value: any) => {
				this.posts = value.data;
				this.pharmaciens = this.posts;
				this.loading = false;
			},
			error: (e) => {
			},
			complete: () => {
			}
		});
		this.employeService.recupererTypeEmploye().subscribe({
			next: (value) => {
				const data = value.data;
				this.employes = data;
			}
		});
		this.employeService.recupererGenre().subscribe({
			next: (value) => {
				const data = value.data;
				this.genres = data;
			}
		});
	}

	modifierPharmacien(): void {

		const pharmacien: Pharmacien = new Pharmacien();
		pharmacien.matricule = this.pharmacienFormsUpdate.get('matriculeUpdate')?.value;
		pharmacien.email = this.pharmacienFormsUpdate.get('emailUpdate')?.value;
		pharmacien.password = this.pharmacienFormsUpdate.get('passwordUpdate')?.value;
		pharmacien.nom = this.pharmacienFormsUpdate.get('nomUpdate')?.value;
		pharmacien.prenoms = this.pharmacienFormsUpdate.get('prenomsUpdate')?.value;
		pharmacien.dateNaissance = this.pharmacienFormsUpdate.get('dateNaissanceUpdate')?.value;
		pharmacien.tel = this.pharmacienFormsUpdate.get('telUpdate')?.value;
		pharmacien.tel2 = this.pharmacienFormsUpdate.get('tel2Update')?.value;
		pharmacien.login = this.pharmacienFormsUpdate.get('loginUpdate')?.value;
		let valuerGenre = this.pharmacienFormsUpdate.get('genreUpdate')?.value;
		let valuerEmploye = this.pharmacienFormsUpdate.get('typeEmployeUpdate')?.value;
		pharmacien.genre = valuerGenre.id;
		pharmacien.typeEmploye = valuerEmploye.id;
		pharmacien.fcmToken = '';
        console.log(pharmacien)
		this.modification(pharmacien);
	}

	modification(pharmacien: Pharmacien): void {
		this.pharmacienService.modificationPharmacien(pharmacien).subscribe({
			next: () => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le pharmacien à été modifié' });
				this.pharmacienFormsUpdate.reset();
			},
			error: (e) => {
			},
			complete: () => {
				this.recupererPharmacien();
				this.pharmacienDialogUpdate = false;
			}
		});
	}

	supprimerPharmacien(pharmacien: any) {
		this.confirmationService.confirm({
			message: 'Supprimer l\'infirmier ' + pharmacien.user.nom + ' ' + pharmacien.user.prenoms + '?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.pharmacienService.supprimerPharmacien(pharmacien.id).subscribe({
					next: (v: string) => {
						this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'L\'infirmier a été supprimé', icon: 'pi-file' });
						this.pharmaciens = this.pharmaciens.filter(val => val.user.id !== pharmacien.user.id);
					},
					error: () => {
						this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'L\'infirmier ne peut pas être supprimer', icon: 'pi-file' });
					}
				});
			}
		});
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

	urlActif(): boolean {
		return this.route.url.includes('/admin/pharmacie/liste');
	}

	updatePharmacien(pharmacien: any) {
		this.pharmacienDialogUpdate = !this.pharmacienDialogUpdate;
		this.pharmacienFormsUpdate.patchValue({
			matriculeUpdate: pharmacien.id,
			nomUpdate: pharmacien.user.nom,
			prenomsUpdate: pharmacien.user.prenoms,
			loginUpdate: pharmacien.user.login,
			passwordUpdate: pharmacien.user.password,
			emailUpdate: pharmacien.user.email,
			telUpdate: pharmacien.user.tel,
			tel2Update: pharmacien.user.tel2,
			genreUpdate: pharmacien.user.genre,
			dateNaissanceUpdate: pharmacien.user.dateNaissance,
			typeEmployeUpdate: pharmacien.typeEmploye
		});
	}

	helpPharmacien() {
		this.pharmacienDialogUpdate = false;
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
}
