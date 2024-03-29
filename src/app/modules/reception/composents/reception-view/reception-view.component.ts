import { Component, OnInit, ViewChild } from '@angular/core';
import { ReceptionService } from 'src/app/services/ServiceReception/reception.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reception } from 'src/app/models/modelReception/reception';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
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
	selector: 'app-reception-view',
	templateUrl: './reception-view.component.html',
	styleUrls: ['./reception-view.component.scss']
})
export class ReceptionViewComponent implements OnInit {

	constructor(private receptionService: ReceptionService, private route: Router,
				private messageService: MessageService,
				private receptionForm: FormBuilder,
				private primeNgConfig: PrimeNGConfig,
				private employeService: EmployeService,
				private confirmationService: ConfirmationService
	) {
	}

	posts: any;
	receptions: any[] = [];
	@ViewChild('dt') dt: Table | undefined | any;

	loading: boolean = true;

	exportColumns: any[] = [];

	receptionDialog: boolean = false;
	receptionDialogUpdate: boolean = false;
	receptionForms: FormGroup;
	receptionFormsUpdate: FormGroup;
	genres: any;
	employes: any[];
	employeForm: any[];

	ngOnInit(): void {
		this.recupererReception();
		this.recupererConfig();
        this.initFormulaire();
		this.receptionFormsUpdate = this.receptionForm.group({
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
			fcmTokenUpdate: '',
			typeEmployeUpdate: null
		});
	}

	recupererDetail(reception: any) {}

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

	newReception() {
		this.receptionForms.reset();
		this.receptionDialog = !this.receptionDialog;
	}

	exportPdf() {
		const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
		doc.autoTable({
			head: this.exportColumns,
			body: this.receptions
		});
		doc.save('Reception-rapport.pdf');
	}

	exportExcel() {
		import('xlsx').then(xlsx => {
			const worksheet = xlsx.utils.json_to_sheet(this.receptions);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer: any = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array'
			});
			this.saveAsExcelFile(excelBuffer, 'reception');
		});
	}

	enregistrerReception() {
		const reception: Reception = new Reception();
		reception.matricule = null;
		reception.email = this.receptionForms.get('email')?.value;
		reception.password = this.receptionForms.get('password')?.value;
		reception.nom = this.receptionForms.get('nom')?.value;
		reception.prenoms = this.receptionForms.get('prenoms')?.value;
		reception.dateNaissance = this.receptionForms.get('dateNaissance')?.value;
		reception.login = this.receptionForms.get('login')?.value;
		let valeurGenre = this.receptionForms.get('genre')?.value;
		let valeurEmploye = this.receptionForms.get('typeEmploye')?.value;
		reception.genre = valeurGenre.id;
		reception.typeEmploye = valeurEmploye.id;
		reception.tel = this.receptionForms.get('tel')?.value;
		reception.tel2 = this.receptionForms.get('tel2')?.value;
		reception.fcmToken = '';

		this.enregistrement(reception);

	}

	enregistrement(reception: Reception){
		this.receptionService.enregistrerReception(reception).subscribe({
			next: (v) => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'receptionniste enregistré' });
				this.receptionForms.reset();
			},
			error: () => {
			},
			complete: () => {
				this.recupererReception();
				this.receptionDialog = false;
			}
		});
	}

	recupererReception() {
		this.receptionService.recupererReception().subscribe({
			next: (value: any) => {
				this.posts = value.data;
				this.receptions = this.posts;
			},
			error: () => {
			},
			complete: () => {
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

	modifierReception(): void {
		const reception: Reception = new Reception();
		reception.matricule = this.receptionFormsUpdate.get('matriculeUpdate')?.value;
		reception.email = this.receptionFormsUpdate.get('emailUpdate')?.value;
		reception.password = this.receptionFormsUpdate.get('passwordUpdate')?.value;
		reception.nom = this.receptionFormsUpdate.get('nomUpdate')?.value;
		reception.prenoms = this.receptionFormsUpdate.get('prenomsUpdate')?.value;
		reception.dateNaissance = this.receptionFormsUpdate.get('dateNaissanceUpdate')?.value;
		reception.login = this.receptionFormsUpdate.get('loginUpdate')?.value;
		let valeurGenre = this.receptionFormsUpdate.get('genreUpdate')?.value;
		let valeurEmploye = this.receptionFormsUpdate.get('typeEmployeUpdate')?.value;
		reception.genre = valeurGenre.id;
		reception.typeEmploye = valeurEmploye.id;
		reception.tel = this.receptionFormsUpdate.get('telUpdate')?.value;
		reception.tel2 = this.receptionFormsUpdate.get('tel2Update')?.value;
		reception.fcmToken = '';

		this.modification(reception);
	}

	modification(reception: Reception):void{
		this.receptionService.modificationReception(reception).subscribe({
			next: () => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'La receptionniste a été modifié' });
				this.receptionFormsUpdate.reset();
			},
			error: () => {
			},
			complete: () => {
				this.recupererReception();
				this.receptionDialogUpdate = false;
			}
		});
	}

	supprimerReception(reception: any) {
		this.confirmationService.confirm({
			message: 'Supprimer' + reception.user.nom + ' ' + reception.user.prenoms + '?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.receptionService.supprimerReception(reception.id).subscribe({
					next: () => {
						this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'La receptionniste a été supprimée', icon: 'pi-file' });
						this.receptions = this.receptions.filter(val => val.user.id !== reception.user.id);
					},
					error: () => {
						this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'La receptionniste ne peut pas être supprimer', icon: 'pi-file' });
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

	updateReception(reception: any) {
		this.receptionDialogUpdate=true
		this.receptionFormsUpdate.patchValue({
			matriculeUpdate: reception.id,
			nomUpdate: reception.user.nom,
			prenomsUpdate: reception.user.prenoms,
			loginUpdate: reception.user.login,
			passwordUpdate: reception.user.password,
			emailUpdate: reception.user.email,
			telUpdate: reception.user.tel,
			tel2Update: reception.user.tel2,
			genreUpdate: reception.user.genre,
			dateNaissanceUpdate: reception.user.dateNaissance,
			typeEmployeUpdate: reception.typeEmploye
		});

	}

	helpReception() {
		this.receptionDialogUpdate = false;
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

	initFormulaire(): void{
		this.receptionForms = this.receptionForm.group({
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
		});
	}
}
