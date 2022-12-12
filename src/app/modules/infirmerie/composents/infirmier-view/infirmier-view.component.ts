import { Component, OnInit, ViewChild } from '@angular/core';
import { InfirmierService } from 'src/app/services/serviceInfirmerie/infirmier.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Infirmier } from 'src/app/models/modelInfirmier/infirmier';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { EmployeService } from 'src/app/shared-cemedo/employe/employe.service';

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

	genres: any;
	employes: any[];
	employeForm: any[];

	infirmierForms: FormGroup = new FormGroup({});

	constructor(private infirmierService: InfirmierService, private route: Router,
				private messageService: MessageService,
				private infirmierForm: FormBuilder,
				private primeNgConfig: PrimeNGConfig,
				private employeService: EmployeService
	) {
	}

	ngOnInit(): void {
        this.recupererInfirmier();
		this.infirmierForms = this.infirmierForm.group({
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
		});
	}
	infirmierDetail(a: any) {
		//this.route.navigate(['administrateur/detailM',a]);
		this.infirmierService.recupererInfirmier().subscribe({
			next: (e) => console.log(e)
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
		     infirmier.id = null;
		     infirmier.email = this.infirmierForms.get('email')?.value;
		     infirmier.password = this.infirmierForms.get('password')?.value;
		     infirmier.nom = this.infirmierForms.get('nom')?.value;
		     infirmier.prenoms = this.infirmierForms.get('prenoms')?.value;
		     infirmier.dateNaissance = this.infirmierForms.get('dateNaissance')?.value;
		     infirmier.login = this.infirmierForms.get('login')?.value;
		     let valeurGenre = this.infirmierForms.get('genre')?.value;
		     let valeurEmploye=this.infirmierForms.get('typeEmploye')?.value;
		     infirmier.genre = valeurGenre.id;
		     infirmier.typeEmploye = valeurEmploye.id;
		     infirmier.tel = this.infirmierForms.get('tel')?.value;
		     infirmier.tel2 = this.infirmierForms.get('tel2')?.value;
		     infirmier.fcmToken = '';
		this.infirmierService.enregistrerInfirmier(infirmier).subscribe({
			next: (v) => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'L\'infirmier a été enregistré' });
				this.infirmierForms.reset();
			},
			error: (e) => {
			},
			complete: () => {
              this.recupererInfirmier();
              this.infirmierDialog=false;
			}
		});
	}
	recupererInfirmier(){
		 this.infirmierService.recupererInfirmier().subscribe({
			 next: (value: any) => {
				 this.posts = value.data ? value : [];
				 this.infirmiers = this.posts.data;
				 console.log(this.infirmiers)
			 },
			 error: (e) => {},
			 complete: () => {
				 this.loading = false;
			 }
		 });
		 this.employeService.recupererTypeEmploye().subscribe({
			 next:(value)=>{
				 const data=value.data;
				 this.employes=data ? data : [];
			 }
		 })
		 this.employeService.recupererGenre().subscribe({
			 next:(value)=>{
				 const data=value.data;
				 this.genres=data ? data : [];
			 }
		 })
	 }
    employeItems(event: any) {
		let filtered : any[] = [];
		let query = event.query;
		for(let i = 0; i < this.employes.length; i++) {
			let item = this.employes[i];
			if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(item);
			}
		}
		this.employeForm = filtered;
	}

	urlActif():boolean {
		return this.route.url.includes('admin/infirmerie/liste')
	}
}
