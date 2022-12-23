import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table';
import { MedicamentService } from 'src/app/services/ServicePharmacie/medicament.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Medicament } from 'src/app/models/modelPharmacie/medicament';

interface jsPDFWithPlugin extends jspdf.jsPDF {
	autoTable: (options: UserOptions) => jspdf.jsPDF;
}

@Component({
	selector: 'app-medicament-view',
	templateUrl: './medicament-view.component.html',
	styleUrls: ['./medicament-view.component.scss']
})
export class MedicamentViewComponent implements OnInit {
	posts: any;

	medicaments: any[] = [];
	dragdrop: boolean = true;

	@ViewChild('dt') dt: Table | undefined | any;

	unlockedCustomers: any[] = [];

	lockedCustomers: any[] = [];

	loading: boolean = true;

	exportColumns: any[] = [];

	medicamentForms: FormGroup;
	medicamentDialog: boolean=false;

	medicamentFormsUpdate: FormGroup;
	medicamentDialogUpdate: boolean=false;


	constructor(
			private medicamentService: MedicamentService,
			private route: Router,
			private primeNgConfig: PrimeNGConfig,
			private confirmationService: ConfirmationService,
			private messageService: MessageService,
			private medicamentForm: FormBuilder) {
	}

	ngOnInit(): void {
		this.recupererMedicament();
		this.recupererConfig();
		this.medicamentForms= this.medicamentForm.group({
			designation:[' ', [Validators.required, Validators.maxLength(30)]],
			posologie:['',[Validators.required,Validators.maxLength(50)]],
			quantite:['',[Validators.required]]
		})
		this.medicamentFormsUpdate= this.medicamentForm.group({
			id:null,
			designationUpdate:[' ', [Validators.required, Validators.maxLength(30)]],
			posologieUpdate:['',[Validators.required,Validators.maxLength(50)]],
			quantiteUpdate:['',[Validators.required]]
		})

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

	newMedicament():void {
		this.medicamentDialog = !this.medicamentDialog;
		this.medicamentForms.reset();
	}

	updateMedicament(medicament:any):void{
		this.medicamentDialogUpdate = !this.medicamentDialogUpdate;
		this.medicamentFormsUpdate.patchValue({
			id:medicament.id,
			designationUpdate:medicament.libelle,
			posologieUpdate:medicament.posologie,
			quantiteUpdate:medicament.quantite
		})
	}

	urlActif(): boolean {
		return !this.route.url.includes('/comptable/pharmacie/listeMed')
	}

	exportPdf() {

		const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
		doc.autoTable({
			head: this.exportColumns,
			body: this.medicaments
		});
		doc.save('Pomptables.pdf');
	}

	exportExcel() {/*
import("xlsx").then(xlsx => {
const worksheet = xlsx.utils.json_to_sheet(this.personne);
const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
const excelBuffer: any = xlsx.write(workbook, {
  bookType: "xlsx",
  type: "array"
});
this.saveAsExcelFile(excelBuffer, "personne");
});*/
	}
	enregistrerMedicament():void{
		const medicament:Medicament= new Medicament();
		medicament.libelle=this.medicamentForms.get('designation')?.value;
		medicament.posologie=this.medicamentForms.get('posologie')?.value;
		medicament.quantite=this.medicamentForms.get('quantite')?.value;
		this.medicamentService.enregistrerMedicament(medicament).subscribe({
			next:()=>{
				this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Le medicament a été enregistré' });
				this.medicamentForms.reset();
			},
			complete: () => {
				this.recupererMedicament();
				this.medicamentDialog = false;
			}
		})
	}
	supprimerMedicament(medicament: any) {
		this.confirmationService.confirm({
			message: 'Supprimer le medicament ?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.medicamentService.supprimerMedicament(medicament.id).subscribe({
					next: () => {
						this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'Le medicamanet a été supprimé', icon: 'pi-file' });
						this.medicaments = this.medicaments.filter(val => val.id !== medicament.id);
					},
					error: () => {
						this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le medicament ne peut pas être supprimé', icon: 'pi-file' });
					}
				});
			}
		});
	}

	recupererMedicament(): void {
		this.medicamentService.recupererListeMedicament().subscribe({
			next: (value: any) => {
				this.posts = value.data ? value : [];
				this.medicaments = this.posts.data;
				this.loading = false;
			},
			error: () => {
			},
			complete: () => {
			}
		});
	}

	modifierMedicament() {
		const medicamentModifier:Medicament= new Medicament();
		medicamentModifier.id=this.medicamentFormsUpdate.get('id')?.value;
		medicamentModifier.libelle=this.medicamentFormsUpdate.get('designationUpdate')?.value;
		medicamentModifier.posologie=this.medicamentFormsUpdate.get('posologieUpdate')?.value;
		medicamentModifier.quantite=this.medicamentFormsUpdate.get('quantiteUpdate')?.value;
		this.medicamentService.modificationMedicament(medicamentModifier).subscribe({
			next:()=>{
				this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'La mise à jour a été enregistré' });
				this.medicamentFormsUpdate.reset();
			},
			complete: () => {
				this.recupererMedicament();
				this.medicamentDialogUpdate = false;
			}
		})
	}

	recupererConfig(): void {
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

	fermerMedicament():void{
		this.medicamentDialogUpdate = false;
	}
}


