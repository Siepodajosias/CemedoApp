import { Component, OnInit, ViewChild } from '@angular/core';
import { InfirmierService } from 'src/app/services/ServiceInfirmerie/infirmier.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Infirmier } from 'src/app/models/modelInfirmier/infirmier';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { EmployeService } from 'src/app/services/ServiceEmploye/employe.service';

interface jsPDFWithPlugin extends jspdf.jsPDF {
	autoTable: (options: UserOptions) => jspdf.jsPDF;
}

@Component({
	selector: 'app-infirmier-view',
	templateUrl: './infirmier-view.component.html',
	styleUrls: ['./infirmier-view.component.scss']
})
export class InfirmierViewComponent implements OnInit {

	posts: any;
	infirmiers: any[] = [];
	dragdrop: boolean = true;

	@ViewChild('dt') dt: Table | undefined | any;

	unlockedCustomers: any[] = [];

	lockedCustomers: any[] = [];

	loading: boolean = true;

	exportColumns: any[] = [];

	infirmierDialog: boolean = false;
	infirmierDialogUpdate: boolean = false;

	genres: any;
	employes: any[];
	employeForm: any[];

	infirmierForms: FormGroup;
	infirmierFormsUpdate: FormGroup;

	constructor(private infirmierService: InfirmierService, private route: Router,
				private messageService: MessageService,
				private infirmierForm: FormBuilder,
				private primeNgConfig: PrimeNGConfig,
				private employeService: EmployeService,
				private confirmationService: ConfirmationService
	) {
	}

	ngOnInit(): void {
		this.recupererInfirmier();
		this.recupererConfig();
		this.infirmierForms = this.infirmierForm.group({
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


			/*
			salt: ['', [Validators.required, Validators.maxLength(30)]],
			salaireInfirmier: [null, [Validators.required, Validators.maxLength(30)]],
			username: ['', [Validators.required, Validators.maxLength(30)]],
			userIdentifier: ['', [Validators.required, Validators.maxLength(15)]],
			active: [null, [Validators.required, Validators.maxLength(10)]],
			createdAt: [null, [Validators.required, Validators.maxLength(10)]],
			updatedAt: ['', [Validators.required, Validators.maxLength(10)]],
			version: [null, [Validators.required, Validators.maxLength(20)]],
			file:['', [Validators.required, Validators.maxLength(30)]],
			photo:['', [Validators.required, Validators.maxLength(20)]],
			residence:['', [Validators.required, Validators.maxLength(30)]],
			numeroCni:['', [Validators.required, Validators.maxLength(20)]]
			*/

		});
		this.infirmierFormsUpdate = this.infirmierForm.group({
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

	infirmierDetail(a: any) {}

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

	newInfirmier() {
		this.infirmierForms.reset();
		this.infirmierDialog = !this.infirmierDialog;
	}

	exportPdf() {

		const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
		doc.autoTable({
			head: this.exportColumns,
			body: this.infirmiers
		});
		doc.save('Infirmier-rapport.pdf');
	}

	exportExcel() {
		import('xlsx').then(xlsx => {
			const worksheet = xlsx.utils.json_to_sheet(this.infirmiers);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer: any = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array'
			});
			this.saveAsExcelFile(excelBuffer, 'Infirmier');
		});
	}

	enregistrerInfirmier() {
		const infirmier: Infirmier = new Infirmier();
		infirmier.matricule = null;
		infirmier.email = this.infirmierForms.get('email')?.value;
		infirmier.password = this.infirmierForms.get('password')?.value;
		infirmier.nom = this.infirmierForms.get('nom')?.value;
		infirmier.prenoms = this.infirmierForms.get('prenoms')?.value;
		infirmier.dateNaissance = this.infirmierForms.get('dateNaissance')?.value;
		infirmier.login = this.infirmierForms.get('login')?.value;
		let valeurGenre = this.infirmierForms.get('genre')?.value;
		let valeurEmploye = this.infirmierForms.get('typeEmploye')?.value;
		infirmier.genre = valeurGenre.id;
		infirmier.typeEmploye = valeurEmploye.id;
		infirmier.tel = this.infirmierForms.get('tel')?.value;
		infirmier.tel2 = this.infirmierForms.get('tel2')?.value;
		infirmier.fcmToken = '';

		this.enregistrement(infirmier);
	}

	enregistrement(infirmier: Infirmier):void{
		this.infirmierService.enregistrerInfirmier(infirmier).subscribe({
			next: (v) => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'L\'infirmier a été enregistré' });
				this.infirmierForms.reset();
			},
			error: (e) => {
			},
			complete: () => {
				this.recupererInfirmier();
				this.infirmierDialog = false;
			}
		});
	}

	recupererInfirmier() {
		this.infirmierService.recupererInfirmier().subscribe({
			next: (value: any) => {
				this.posts = value.data ? value : [];
				this.infirmiers = this.posts.data;
			},
			error: (e) => {
			},
			complete: () => {
				this.loading = false;
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

	modifierInfirmier(): void {
		const infirmier: Infirmier = new Infirmier();
		infirmier.matricule = this.infirmierFormsUpdate.get('matriculeUpdate')?.value;
		infirmier.email = this.infirmierFormsUpdate.get('emailUpdate')?.value;
		infirmier.password = this.infirmierFormsUpdate.get('passwordUpdate')?.value;
		infirmier.nom = this.infirmierFormsUpdate.get('nomUpdate')?.value;
		infirmier.prenoms = this.infirmierFormsUpdate.get('prenomsUpdate')?.value;
		infirmier.dateNaissance = this.infirmierFormsUpdate.get('dateNaissanceUpdate')?.value;
		infirmier.login = this.infirmierFormsUpdate.get('loginUpdate')?.value;
		let valeurGenre = this.infirmierFormsUpdate.get('genreUpdate')?.value;
		let valeurEmploye = this.infirmierFormsUpdate.get('typeEmployeUpdate')?.value;
		infirmier.genre = valeurGenre.id;
		infirmier.typeEmploye = valeurEmploye.id;
		infirmier.tel = this.infirmierFormsUpdate.get('telUpdate')?.value;
		infirmier.tel2 = this.infirmierFormsUpdate.get('tel2Update')?.value;
		infirmier.fcmToken = '';

		this.modification(infirmier);
	}

	modification(infirmier: Infirmier):void{
		this.infirmierService.modificationInfirmier(infirmier).subscribe({
			next: (v) => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'L\'infirmier a été modifié' });
				this.infirmierFormsUpdate.reset();
			},
			error: (e) => {
			},
			complete: () => {
				this.recupererInfirmier();
				this.infirmierDialogUpdate = false;
			}
		});
	}
	supprimerInfirmier(infirmier: any) {
		this.confirmationService.confirm({
			message: 'Supprimer l\'infirmier ' + infirmier.user.nom + ' ' + infirmier.user.prenoms + '?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.infirmierService.supprimerInfirmier(infirmier.id).subscribe({
					next: (v: string) => {
						this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'L\'infirmier a été supprimé', icon: 'pi-file' });
						this.infirmiers = this.infirmiers.filter(val => val.user.id !== infirmier.user.id);
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
		return this.route.url.includes('admin/infirmerie/liste');
	}

	updateInfirmier(infirmier: any) {
		this.infirmierDialogUpdate = !this.infirmierDialogUpdate;
		this.infirmierFormsUpdate.patchValue({
			matriculeUpdate: infirmier.id,
			nomUpdate: infirmier.user.nom,
			prenomsUpdate: infirmier.user.prenoms,
			loginUpdate: infirmier.user.login,
			passwordUpdate: infirmier.user.password,
			emailUpdate: infirmier.user.email,
			telUpdate: infirmier.user.tel,
			tel2Update: infirmier.user.tel2,
			genreUpdate: infirmier.user.genre,
			dateNaissanceUpdate: infirmier.user.dateNaissance,
			typeEmployeUpdate: infirmier.typeEmploye
		});
	}

	helpInfirmier() {
		this.infirmierDialogUpdate=false;
	}
	recupererConfig():void{
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
