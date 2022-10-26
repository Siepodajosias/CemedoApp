import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Fichier } from 'src/app/_modeles/fichier/Fichier';
import { FichierService } from 'src/app/_services/fichier/fichier.service';

@Component({
  selector: 'app-fichier',
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.scss'],
  providers: [MessageService,ConfirmationService,DialogService]
})
export class FichierComponent implements OnInit {


  liste: Fichier[] ;
  specialite: Fichier;
  entityDialog: boolean;
  totalRecords: number;
  loading: boolean;
  selectedEntity: Fichier[];
  submitted: boolean;
  selectAll: boolean = false;
  cols: any[] = [];
  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public dialogService: DialogService,private service: FichierService,private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.cols = [
    { field: "id", header: "Identifiant" },
    { field: "libelle", header: "Libelle" },
    ];
   
    this.service.getListe().then(
      data => this.liste = data);
  console.log(this.liste);
  }
  
  
  
  openNew() {
    this.specialite = {...this.specialite};
    this.submitted = false;
    this.entityDialog = true;
  }
  
  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected specialites?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.liste = this.liste.filter(val => !this.selectedEntity.includes(val));
            this.selectedEntity = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
  }
  
  editProduct(specialite: Fichier) {
    this.specialite = {...specialite};
    this.entityDialog = true;
  }
  
  deleteProduct(specialite: Fichier) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + specialite.libelle + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.liste = this.liste.filter(val => val.id !== specialite.id);
            this.specialite = {...specialite};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
  }
  
  hideDialog() {
    this.entityDialog = false;
    this.submitted = false;
  }
  
  saveProduct() {
    this.submitted = true;
  
    if (this.specialite.libelle.trim()) {
        if (this.specialite.id) {
            this.liste[this.findIndexById(this.specialite.id)] = this.specialite;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            this.specialite.id = this.createId();
            this.liste.push(this.specialite);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }
  
        this.liste = [...this.liste];
        this.entityDialog = false;
        this.specialite = {...this.specialite};
    }
  }
  
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.liste.length; i++) {
        if (this.specialite[i].id === id) {
            index = i;
            break;
        }
    }
  
    return index;
  }
  
  createId(): number {
    let id =1;
  
    return id;
  }
  
  
  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedEntity = value;
  }
}
