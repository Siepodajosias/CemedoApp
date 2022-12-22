import { Component, OnInit, ViewChild } from '@angular/core';
import { Assurance } from 'src/app/models/modelAssurance/assurance';
import { AssuranceService } from 'src/app/services/ServiceAssurance/assurance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { PrimeNGConfig } from 'primeng/api';

interface jsPDFWithPlugin extends jspdf.jsPDF {
	autoTable: (options: UserOptions) => jspdf.jsPDF;
}


@Component({
	selector: 'app-assurance-view',
	templateUrl: './assurance-view.component.html',
	styleUrls: ['./assurance-view.component.scss']
})
export class AssuranceViewComponent implements OnInit {

	assuranceForms: FormGroup;
	assuranceFormsUpdate: FormGroup;

	dragdrop: boolean = true;

	@ViewChild('dt') dt: Table | undefined | any;


	unlockedCustomers: any[] = [];

	lockedCustomers: any[] = [];


	rowGroupMetadata: any;

	loading: boolean = true;
	submitted: boolean = false;
	exportColumns: any[] = [];

	assuranceDialog: boolean;
	assuranceDialogUpdate: boolean;

	assurances: any[] = [];
	posts: any;

	posts2: any;

	constructor(private assuranceService: AssuranceService,
				private route: Router,
				private assuranceForm: FormBuilder,
				private confirmationService: ConfirmationService,
				private messageService: MessageService,
				private primeNgConfig: PrimeNGConfig,
	) {
	}

	ngOnInit(): void {
		this.recupererAssurance();
		this.assuranceForms = this.assuranceForm.group({
			id: null,
			email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
			libelle: ['', [Validators.required, Validators.maxLength(30)]],
			ville: ['', [Validators.required, Validators.maxLength(30)]],
			tel: ['', [Validators.required, Validators.maxLength(15)]],
			createdAt: { value: '', disabled: true },
			updatedAt: { value: '', disabled: true },
			version: { value: 'indisponible', disabled: true },
			active: { value: 'indisponible', disabled: true },
		});
		this.assuranceFormsUpdate = this.assuranceForm.group({
			idUpdate: null,
			emailUpdate: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
			libelleUpdate: ['', [Validators.required, Validators.maxLength(30)]],
			villeUpdate: ['', [Validators.required, Validators.maxLength(30)]],
			telUpdate: ['', [Validators.required, Validators.maxLength(15)]],
			createdAtUpdate: { value: '', disabled: true },
			updatedAtUpdate: { value: '', disabled: true },
			versionUpdate: { value: 'indisponible', disabled: true },
			activeUpdate: { value: 'indisponible', disabled: true },
		});
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

	assuranceDetail(a: any) {
		if (this.route.url.includes('comptable/assurance/liste')) {
			this.route.navigate(['comptable/assurance/detail', a.id]);
		} else if (this.route.url.includes('admin/assurance/liste')) {
			this.route.navigate(['admin/assurance/detail', a.id]);
		} else {

		}
	}

	urlActif(): boolean {
		return this.route.url.includes('admin/assurance/liste');
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

	newAssurance() {
		this.assuranceForms.reset();
		this.submitted = false;
		this.assuranceDialog = !this.assuranceDialog;
	}

	updateAssurance(assurance: any) {
		this.assuranceDialogUpdate = !this.assuranceDialogUpdate;
		this.assuranceFormsUpdate.patchValue({
			idUpdate: assurance.id,
			emailUpdate: assurance.email,
			libelleUpdate: assurance.libelle,
			villeUpdate: assurance.ville,
			telUpdate: assurance.tel
		});
	}

	exportPdf() {
		const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
		doc.autoTable({
			head: this.exportColumns,
			body: this.assurances
		});
		doc.save('Assurance-rapport.pdf');
	}

	exportExcel() {
		import('xlsx').then(xlsx => {
			const worksheet = xlsx.utils.json_to_sheet(this.assurances);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer: any = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array'
			});
			this.saveAsExcelFile(excelBuffer, 'assurance');
		});
	}

	enregistrerAssurance(): void {
		this.submitted = true;
		if (this.assuranceForms.invalid) {
			return;
		} else {
			const assurance: Assurance = new Assurance();

			assurance.id = null;
			assurance.email = this.assuranceForms.get('email')?.value;
			assurance.libelle = this.assuranceForms.get('libelle')?.value;
			assurance.ville = this.assuranceForms.get('ville')?.value;
			assurance.tel = this.assuranceForms.get('tel')?.value;

			this.assuranceService.enregistrerAssurance(assurance).subscribe({
				next: (v) => {
					this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Service Message', detail: 'L \'assurance a été enregistrée' });
					this.assuranceForms.reset();
					this.submitted = false;
				},
				error: (e) => {
				},
				complete: () => {
					this.recupererAssurance();
					this.assuranceDialog = false;
				}
			});
		}
	}

	recupererAssurance(): void {
		this.assuranceService.recupererAssurance().subscribe({
			next: (value: any) => {
				this.posts = value.data ? value : [];
				this.assurances = this.posts.data;
				this.loading = false;
			},
			error: (e) => {
			},
			complete: () => {
			}
		});
	}

	modifierAssurance(): void {
		const assurance: Assurance = new Assurance();

		assurance.id = this.assuranceFormsUpdate.get('idUpdate')?.value;
		assurance.email = this.assuranceFormsUpdate.get('emailUpdate')?.value;
		assurance.libelle = this.assuranceFormsUpdate.get('libelleUpdate')?.value;
		assurance.ville = this.assuranceFormsUpdate.get('villeUpdate')?.value;
		assurance.tel = this.assuranceFormsUpdate.get('telUpdate')?.value;

		this.assuranceService.modificationAssurance(assurance).subscribe({
			next: (v) => {
				this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Service Message', detail: 'L \'assurance a été modifiée' });
				this.assuranceFormsUpdate.reset();
			},
			error: (e) => {
			},
			complete: () => {
				this.recupererAssurance();
				this.assuranceDialogUpdate = false;
			}
		});
	}

	supprimerAssurance(assurance: any) {
		this.confirmationService.confirm({
			message: 'Supprimer l\'assurance ' + assurance.libelle + '?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.assuranceService.supprimerAssurance(assurance.id).subscribe({
					next: (v: string) => {
						this.messageService.add({ key: 'myKey2', severity: 'info', summary: 'Suppression', detail: 'l\'assurance a été supprimé', icon: 'pi-file' });
						this.assurances = this.assurances.filter(val => val.id !== assurance.id);
					},
					error: () => {
						this.messageService.add({ key: 'myKey3', severity: 'error', summary: 'Erreur', detail: 'l\'assurance ne peut pas être supprimer', icon: 'pi-file' });
					}
				});
			}
		});
	}

	helpAssurance() {
		this.assuranceDialogUpdate = false;
	}
}
