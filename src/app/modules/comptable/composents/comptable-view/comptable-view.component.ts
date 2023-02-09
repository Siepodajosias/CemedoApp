import { Component, OnInit, ViewChild } from '@angular/core';
import { ComptableService } from 'src/app/services/ServiceComptable/comptable.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comptable } from 'src/app/models/modelComptable/comptable';
import { ConfirmationService, MessageService } from 'primeng/api';
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
	selector: 'app-comptable-view',
	templateUrl: './comptable-view.component.html',
	styleUrls: ['./comptable-view.component.scss']
})
export class ComptableViewComponent implements OnInit {

	posts: any;
	comptables: any[] = [];

	@ViewChild('dt') dt: Table | undefined | any;

	loading: boolean = true;

	exportColumns: any[] = [];

	comptableDialog: boolean = false;
	comptableDialogUpdate: boolean = false;

	comptableForms: FormGroup;
	comptableFormsUpdate: FormGroup;
	genres: any;
	employes: any[];
	employeForm: any[];

	constructor(private comptableService: ComptableService,
				private route: Router, private messageService: MessageService,
				private comptableForm: FormBuilder,
				private primeNgConfig: PrimeNGConfig,
				private employeService: EmployeService,
				private confirmationService: ConfirmationService) {}

	ngOnInit(): void {

		this.recupererComptable();
		this.recupererConfig();
		this.iniFormulaire();
		this.comptableFormsUpdate = this.comptableForm.group({
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

	comptableDetail(a: any) {}

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

	newComptable() {
		this.comptableForms.reset();
		this.comptableDialog = !this.comptableDialog;
	}

	exportPdf() {
		const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
		doc.autoTable({
			head: this.exportColumns,
			body: this.comptables
		});
		doc.save('Pomptables.pdf');
	}

	exportExcel() {
		import('xlsx').then(xlsx => {
			const worksheet = xlsx.utils.json_to_sheet(this.comptables);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer: any = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array'
			});
			this.saveAsExcelFile(excelBuffer, 'personne');
		});
	}

	enregistrerComptable() {
		const comptable: Comptable = new Comptable();
		comptable.matricule = null;
		comptable.email = this.comptableForms.get('email')?.value;
		comptable.password = this.comptableForms.get('password')?.value;
		comptable.nom = this.comptableForms.get('nom')?.value;
		comptable.prenoms = this.comptableForms.get('prenoms')?.value;
		comptable.login = this.comptableForms.get('login')?.value;
		comptable.dateNaissance = this.comptableForms.get('dateNaissance')?.value;
		const valeurGenre = this.comptableForms.get('genre')?.value;
		const valeurEmploye = this.comptableForms.get('typeEmploye')?.value;
		comptable.genre = valeurGenre.id;
		comptable.typeEmploye = valeurEmploye.id;
		comptable.tel = this.comptableForms.get('tel')?.value;
		comptable.tel2 = this.comptableForms.get('tel2')?.value;
		comptable.fcmToken = '';
		comptable.role = null;

	   this.enregistrement(comptable);
	}

	enregistrement(comptable: Comptable):void{
		this.comptableService.enregistrerComptable(comptable).subscribe({
			next: (v) => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le comptable a été enregistré' });
				this.comptableForms.reset();
			},
			error: (e) => {
			},
			complete: () => {
				this.recupererComptable();
				this.comptableDialog = false;
			}
		});
	}

	recupererComptable() {
		this.comptableService.recupererComptable().subscribe({
			next: (value) => {
				const data = value.data;
				this.comptables = data;
			}, complete: () => {
				this.loading = false;
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

	modifierComptable(): void {
		const comptable: Comptable = new Comptable();
		comptable.matricule = this.comptableFormsUpdate.get('matriculeUpdate')?.value;
		comptable.email = this.comptableFormsUpdate.get('emailUpdate')?.value;
		comptable.password = this.comptableFormsUpdate.get('passwordUpdate')?.value;
		comptable.nom = this.comptableFormsUpdate.get('nomUpdate')?.value;
		comptable.prenoms = this.comptableFormsUpdate.get('prenomsUpdate')?.value;
		comptable.login = this.comptableFormsUpdate.get('loginUpdate')?.value;
		comptable.dateNaissance = this.comptableFormsUpdate.get('dateNaissanceUpdate')?.value;
		const valeurGenre = this.comptableFormsUpdate.get('genreUpdate')?.value;
		const valeurEmploye = this.comptableFormsUpdate.get('typeEmployeUpdate')?.value;
		comptable.genre = valeurGenre.id;
		comptable.typeEmploye = valeurEmploye.id;
		comptable.tel = this.comptableFormsUpdate.get('telUpdate')?.value;
		comptable.tel2 = this.comptableFormsUpdate.get('tel2Update')?.value;
		comptable.fcmToken = '';
		comptable.role =0;

		this.modification(comptable);
	}

	modification(comptable:Comptable):void{
		this.comptableService.modificationComptable(comptable).subscribe({
			next: () => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le comptable a été modifié' });
				this.comptableFormsUpdate.reset();
			},
			error: (e) => {
			},
			complete: () => {
				this.recupererComptable();
				this.comptableDialogUpdate = false;
			}
		});
	}

	supprimerComptable(comptable: any) {
		this.confirmationService.confirm({
			message: 'Supprimer le comptable ' + comptable.user.nom+ ' ' + comptable.user.prenoms + '?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.comptableService.supprimerComptable(comptable.id).subscribe({
					next: (v: string) => {
						this.messageService.add({severity: 'info', summary: 'Suppression', detail: 'Le comptable a été supprimé', icon: 'pi-file' });
						this.comptables = this.comptables.filter(val => val.user.id !== comptable.user.id);
					},
					error: () => {
						this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Le comptable ne peut pas être supprimer', icon: 'pi-file' });
					}
				});
			}
		});
	}

	helpComptable() {
		this.comptableDialogUpdate = false;
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
		return this.route.url.includes('admin/comptable/liste');
	}

	modifierComptables(comptable:any) {
		this.comptableDialogUpdate = !this.comptableDialogUpdate;
		this.comptableFormsUpdate.patchValue({
			matriculeUpdate:comptable.id,
			nomUpdate: comptable.user.nom,
			prenomsUpdate: comptable.user.prenoms,
			loginUpdate: comptable.user.login,
			passwordUpdate:comptable.user.password,
			emailUpdate: comptable.user.email,
			telUpdate: comptable.user.tel,
			tel2Update: comptable.user.tel2,
			genreUpdate: comptable.user.genre,
			dateNaissanceUpdate:comptable.user.dateNaissance,
			typeEmployeUpdate: comptable.typeEmploye
		});
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

	iniFormulaire(): void{
		this.comptableForms = this.comptableForm.group({
			id: null,
			nom: ['', [Validators.required, Validators.minLength(3)]],
			prenoms: ['', [Validators.required, Validators.maxLength(20)]],
			login: ['', [Validators.required, Validators.maxLength(20)]],
			email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
			password: ['', [Validators.required, Validators.maxLength(8)]],
			tel: ['', [Validators.required, Validators.maxLength(20)]],
			tel2: ['', [Validators.required, Validators.maxLength(20)]],
			genre: ['', [Validators.required, Validators.maxLength(20)]],
			dateNaissance: ['', [Validators.required, Validators.maxLength(30)]],
			role: null,
			fcmToken: '',
			typeEmploye: null

			/*
				  salt: ['', [Validators.required, Validators.maxLength(30)]],
				  file:['', [Validators.required, Validators.maxLength(30)]],
				  photo:['', [Validators.required, Validators.maxLength(20)]],
				  residence:['', [Validators.required, Validators.maxLength(30)]],
				  numeroCni:['', [Validators.required, Validators.maxLength(20)]]
				  */
		});
	}
}
