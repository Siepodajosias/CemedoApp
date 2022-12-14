import { Component, OnInit } from '@angular/core';
import { MedecinSpecialiteService, Specialite } from 'src/app/services/serviceMedecin/medecin-specialite.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
	selector: 'app-departement',
	templateUrl: './departement.component.html',
	styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
	loading: boolean = false;
	departements: any;
	selectedCustomers: any;
	departementDialog: boolean = false;
	departementDialogUpdate: boolean = false;
	departementForms: FormGroup;
	departementFormsUpdate: FormGroup;

	constructor(private departementService: MedecinSpecialiteService,
				private route: Router,
				private departementForm: FormBuilder,
				private confirmationService: ConfirmationService,
				private messageService: MessageService,
				private primeNgConfig: PrimeNGConfig) {
	}

	ngOnInit(): void {
		this.recupererDepartement();
		this.departementForms = this.departementForm.group({
			id: null,
			libelle: ['', [Validators.required]]
		});
		this.departementFormsUpdate = this.departementForm.group({
			idUpdate: null,
			libelleUpdate: ['', [Validators.required]]
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

	recupererDepartement() {
		this.departementService.recupererSpecialite().subscribe({
			next: (value) => {
				const data = value.data;
				this.departements = data ? data : [];
			}
		});
	}

	urlActif() {
		return this.route.url.includes('/admin/departement');
	}

	departementDetail(assurance: any) {

	}

	newDepartement() {
		this.departementDialog = !this.departementDialog;
		this.departementForms.reset();
	}

	exportPdf() {

	}

	exportExcel() {

	}

	enregistrerDepartement() {
		const specialite: Specialite = new Specialite();
		specialite.libelle = this.departementForms.get('libelle')?.value;
		this.departementService.enregistrerSpecialite(specialite).subscribe({
			next: (value) => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le departement a été enregistré' });
				this.departementForms.reset();
			},
			complete: () => {
				this.recupererDepartement();
				this.departementDialog = false;
			}
		});
	}
	supprimerDepartement(departement: any) {
		this.confirmationService.confirm({
			message: 'Supprimer le departement ' + departement.libelle + '?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.departementService.supprimerSpecialite(departement.id).subscribe({
					next: (v: string) => {
						this.messageService.add({ key: 'myKey2', severity: 'info', summary: 'Suppression', detail: 'Le departement a été supprimé', icon: 'pi-file' });
						this.departements = this.departements.filter(val => val.id !== departement.id);
					},
					error: () => {
						this.messageService.add({ key: 'myKey3', severity: 'error', summary: 'Erreur', detail: 'Le departement ne peut pas être supprimer', icon: 'pi-file' });
					}
				});
			}
		});
	}
	modifierDepartement(){

		const specialite: Specialite = new Specialite();
		specialite.id=this.departementFormsUpdate.get('idUpdate')?.value;
		specialite.libelle = this.departementFormsUpdate.get('libelleUpdate')?.value;
		this.departementService.modifierSpecialite(specialite).subscribe({
			next: (value) => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le departement a été modifié' });
				this.departementFormsUpdate.reset();
			},
			complete: () => {
				this.recupererDepartement();
				this.departementDialogUpdate = false;
			}
		});
	}
	updateDepartement(departement: any) {
		this.departementDialogUpdate = !this.departementDialogUpdate;
		this.departementFormsUpdate.setValue({
			idUpdate: departement.id,
			libelleUpdate: departement.libelle
		});
	}

	helpDepartement() {
		this.departementDialogUpdate= !this.departementDialogUpdate;
	}
}
