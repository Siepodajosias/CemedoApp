import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ResponsableAssurance } from 'src/app/_modeles/responsable-assurance/ResponsableAssurance';
import { ResponsableAssuranceService } from 'src/app/_services/responsable-assurance/responsable-assurance.service';

@Component({
  selector: 'app-responsable-assurance',
  templateUrl: './responsable-assurance.component.html',
  styleUrls: ['./responsable-assurance.component.scss'],
  providers: [MessageService,ConfirmationService,DialogService]
})
export class ResponsableAssuranceComponent implements OnInit {

  liste: ResponsableAssurance[] ;
  specialite: ResponsableAssurance;
  entityDialog: boolean;
  totalRecords: number;
  loading: boolean;
  selectedEntity: ResponsableAssurance[];
  submitted: boolean;
  selectAll: boolean = false;
  cols: any[] = [];
  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public dialogService: DialogService,private service: ResponsableAssuranceService,private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.cols = [
      { field: "id", header: "Identifiant" },
      { field: "nom", header: "Nom" },
      { field: "prenoms", header: "Prenoms" },
      { field: "tel", header: "Telephone" },
      { field: "email", header: "Email" },
      { field: "user", header: "Users" },
      ];
   
    this.service.getListe().then(data => this.liste = data);
   this.loading = true;
  }
  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
        this.service.getCustomers({lazyEvent: JSON.stringify(event)}).then(res => {
         
            this.liste = res.data;
            this.totalRecords = res.data.length;
            this.loading = false;
        })
    }, 1000);
}



onSelectAllChange(event) {
    const checked = event.checked;

    if (checked) {
        this.service.getCustomers().then(res => {
            this.selectedEntity = res.data;
            this.selectAll = true;
        });
    }
    else {
        this.selectedEntity = [];
        this.selectAll = false;
    }
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
  
  editProduct(specialite: ResponsableAssurance) {
    this.specialite = {...specialite};
    this.entityDialog = true;
  }
  
  deleteProduct(specialite: ResponsableAssurance) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + specialite.login + '?',
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
  
    if (this.specialite.login.trim()) {
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
