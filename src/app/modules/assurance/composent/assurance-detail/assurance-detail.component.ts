import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assurance } from 'src/app/models/modelAssurance/assurance';
import { AssuranceService } from 'src/app/services/ServiceAssurance/assurance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Responsable } from 'src/app/models/modelAssurance/responsable';
import { PrimeNGConfig } from 'primeng/api';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

interface jsPDFWithPlugin extends jspdf.jsPDF {
	autoTable: (options: UserOptions) => jspdf.jsPDF;
}

import {
	ApexAxisChartSeries,
	ApexChart,
	ApexXAxis,
	ApexDataLabels,
	ApexStroke,
	ApexMarkers,
	ApexYAxis,
	ApexGrid,
	ApexTitleSubtitle,
	ApexTooltip,
	ApexLegend,
	ApexFill,
} from 'ng-apexcharts';
import { EmployeService } from 'src/app/services/ServiceEmploye/employe.service';

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	stroke: ApexStroke;
	dataLabels: ApexDataLabels;
	markers: ApexMarkers;
	colors: string[];
	yaxis: ApexYAxis;
	grid: ApexGrid;
	legend: ApexLegend;
	tooltip: ApexTooltip;
	fill: ApexFill;
	title: ApexTitleSubtitle;
};


@Component({
	selector: 'app-assurance-detail',
	templateUrl: './assurance-detail.component.html',
	styleUrls: ['./assurance-detail.component.scss']
})
export class AssuranceDetailComponent implements OnInit {
	responsableForms: FormGroup;
	responsables: any[];

	@ViewChild('dt') dt: Table | undefined | any;

	loading: boolean = true;

	exportColumns: any[] = [];

	responsableDialog: boolean = false;
	boutonActif: string;
	posts: any;

	posts2: any;

	assurance: Assurance;
	assurances: any[];
	assuranceForm: any[];
	genres: any;

	constructor(private assurService: AssuranceService,
				private routeParams: ActivatedRoute,
				private responsableForm: FormBuilder,
				private confirmationService: ConfirmationService,
				private messageService: MessageService,
				private primeNgConfig: PrimeNGConfig,
				private route: Router,
				private employeService: EmployeService) {
	}

	public lineChartOptions: Partial<ChartOptions>;
	//  color: ["#3FA7DC", "#F6A025", "#9BC311"],
	// Doughnut chart start
	public doughnutChartLabels: string[] = ['Chat', 'Appel Téléphonique', 'Appel Vidéo'];
	public doughnutChartData: number[] = [45, 50, 5];
	public doughnutChartLegend = false;
	public doughnutChartColors: any[] = [
		{
			backgroundColor: ['#735A84', '#E76412', '#9BC311'],
		},
	];
	public doughnutChartType = 'doughnut';
	public doughnutChartOptions: any = {
		animation: false,
		responsive: true,
	};


	ngOnInit(): void {
		const idAssurance = this.routeParams.snapshot.params['id'];
		this.assurService.recupererAssuranceById(idAssurance).subscribe({
			next: (value: any) => {
				this.assurance = value.data;
				this.assurances = [value.data];
			}
		});

		this.recupererConfigPrimeNG();
		this.recupererResponsable();
		this.initFormulaire();
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

	newRespnsable() {
		this.responsableForms.reset();
		this.responsableDialog = !this.responsableDialog;
		this.responsableForms.patchValue({
			assurance: this.assurance.libelle
		});
	}

	exportPdf() {
		const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
		doc.autoTable({
			head: this.exportColumns,
			body: this.responsables
		});
		doc.save('Responsable-rapport.pdf');
	}

	exportExcel() {
		import('xlsx').then(xlsx => {
			const worksheet = xlsx.utils.json_to_sheet(this.responsables);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer: any = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array'
			});
			this.saveAsExcelFile(excelBuffer, 'responsable');
		});
	}

	enregistrerResponsable() {

		const responsable: Responsable = new Responsable();
		responsable.email = this.responsableForms.get('email')?.value;
		responsable.password = this.responsableForms.get('password')?.value;
		responsable.nom = this.responsableForms.get('nom')?.value;
		responsable.prenoms = this.responsableForms.get('prenoms')?.value;
		responsable.login = this.responsableForms.get('login')?.value;
		responsable.dateNaissance = this.responsableForms.get('dateNaissance')?.value;
		const valeurGenre = this.responsableForms.get('genre')?.value;
		const valeurAssurance = this.responsableForms.get('assurance')?.value;
		responsable.assurance = valeurAssurance.id;
		responsable.genre = valeurGenre.id;
		responsable.tel = this.responsableForms.get('tel')?.value;
		responsable.tel2 = this.responsableForms.get('tel2')?.value;
		responsable.fcmToken = '';
		responsable.role = null;
		if (this.boutonActif != 'modification') {

			responsable.matricule = null;
			this.assurService.enregistrerResponsable(responsable).subscribe({
				next: () => {
					this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le responsable a été enregistré' });
					this.responsableForms.reset();
				},
				error: (e) => {

				},
				complete: () => {
					this.recupererResponsable();
					this.responsableDialog = false;
				}
			});
		}
		//modification
		else {
			responsable.matricule = this.responsableForms.get('matricule')?.value;
			this.assurService.modifierResponsable(responsable).subscribe({
				next: () => {
					this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Le responsable a été modifié' });
					this.responsableForms.reset();
				},
				error: (e) => {

				},
				complete: () => {
					this.recupererResponsable();
					this.responsableDialog = false;
				}
			});
		}
	}

	urlActif(): boolean {
		return this.route.url.includes('/admin/assurance/detail');
	}

	recupererResponsable(): void {
		this.assurService.recupererResponsable().subscribe({
			next: (value) => {
				this.posts = value.data ? value : [];
				this.responsables = this.posts.data;
				this.loading = false;
			}
		});
		this.employeService.recupererGenre().subscribe({
			next: (value) => {
				const data = value.data;
				this.genres = data ? data : [];
			}
		});
	}

	supprimerResponsable(responsable: any) {
		this.confirmationService.confirm({
			message: 'Supprimer le responsable ' + responsable.user.nom + ' ' + responsable.user.prenoms + '?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.assurService.supprimerteResponsable(responsable.id).subscribe({
					next: (v: string) => {
						this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'Le responsable a été supprimé', icon: 'pi-file' });
						this.responsables = this.responsables.filter(val => val.user.id !== responsable.user.id);
					},
					error: () => {
						this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le responsable ne peut pas être supprimer', icon: 'pi-file' });
					}
				});
			}
		});
	}

	modifierResponsable(responsable: any) {
		this.boutonActif = 'modification';
		this.responsableDialog = true;
		this.responsableForms.patchValue({
			matricule: responsable.id,
			nom: responsable.user.nom,
			prenoms: responsable.user.prenoms,
			login: responsable.user.login,
			password: responsable.user.password,
			email: responsable.user.email,
			tel: responsable.user.tel,
			tel2: responsable.user.tel2,
			genre: responsable.user.genre,
			dateNaissance: responsable.user.dateNaissance,
			typeEmploye: responsable.typeEmploye
		});
	}

	recupererConfigPrimeNG(): void {
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

	initFormulaire(): void {
		this.responsableForms = this.responsableForm.group({
			matricule: null,
			nom: ['', [Validators.required, Validators.minLength(3)]],
			prenoms: ['', [Validators.required, Validators.maxLength(20)]],
			login: ['', [Validators.required, Validators.maxLength(20)]],
			genre: ['', [Validators.required, Validators.maxLength(10)]],
			dateNaissance: ['', [Validators.required, Validators.maxLength(10)]],
			email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
			tel: ['', [Validators.required, Validators.maxLength(15)]],
			tel2: ['', [Validators.required, Validators.maxLength(15)]],
			password: ['', [Validators.required, Validators.maxLength(8)]],
			assurance: ['', [Validators.required]],
			fcmToken: '',
			role: null,
			//numeroCni:['',[Validators.required, Validators.maxLength(15)]],
		});
	}
}
