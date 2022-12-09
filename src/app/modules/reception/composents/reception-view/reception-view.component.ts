import { Component, OnInit, ViewChild } from '@angular/core';
import { ReceptionService } from 'src/app/services/serviceReception/reception.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reception } from 'src/app/models/modelReception/reception';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table';
import { EmployeService } from 'src/app/shared-cemedo/employe/employe.service';

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
				private employeService: EmployeService
	) {
	}

	posts: any;
	receptions: any[] = [];
	dragdrop: boolean = true;

	@ViewChild('dt') dt: Table | undefined | any;

	unlockedCustomers: any[] = [];

	lockedCustomers: any[] = [];

	loading: boolean = true;

	exportColumns: any[] = [];

	receptionDialog: boolean = false;
	receptionForms: FormGroup = new FormGroup({});
	genres: any;
	employes: any[];
	employeForm: any[];

	ngOnInit(): void {
       this.recupererReception();
		this.receptionForms = this.receptionForm.group({
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

			   salaireInfirmier: ['', [Validators.required, Validators.maxLength(30)]],
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

	recupererDetail(a: any) {
		//this.route.navigate(['administrateur/detailM',a]);
		this.receptionService.recupererReception().subscribe({
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
		      reception.id = null;
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

	   this.receptionService.enregistrerReception(reception).subscribe({
			next: (v) => {
				this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'receptionniste enregistré' });
				this.receptionForms.reset();
			},
			error: (e) => {
			},
			complete: () => {
              this.recupererReception();
              this.receptionDialog=false
			}
		});
	}
	recupererReception(){
		this.receptionService.recupererReception().subscribe({
			next: (value: any) => {
				this.posts = value.data ? value : [];
				this.receptions = this.posts.data;
			},
			error: (e) => {
			},
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
}
