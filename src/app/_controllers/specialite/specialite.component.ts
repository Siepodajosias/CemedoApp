import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Assurance } from '../../assurance/model/assurance';
import { AssuranceService } from '../../assurance/service/assurance.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssuranceViewComponent } from '../../assurance/composent/assurance-view/assurance-view.component';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.scss'],

providers: [MessageService,ConfirmationService,DialogService]
})
export class SpecialiteComponent implements OnInit {
tableData: Assurance[] ;

productDialog: boolean;
totalRecords: number;
loading: boolean;
    product: Assurance;

    selectedProducts: Assurance[];

    submitted: boolean;
    selectAll: boolean = false;
   
    
cols: any[] = [];
@ViewChild(MatPaginator) paginator!: MatPaginator;
constructor(public dialogService: DialogService,private customerService: AssuranceService,private messageService: MessageService, private confirmationService: ConfirmationService) { }
ngOnInit() {
	this.cols = [
	{ field: "firstname", header: "First Name" },
	{ field: "lastname", header: "Last Name" },
	{ field: "age", header: "Age" },
	];
  this.customerService.getProducts().then(
    data => this.tableData = data);
}

show() {
  const ref = this.dialogService.open(AssuranceViewComponent, {
      header: 'Choose a Car',
      width: '70%'
  });
}


openNew() {
  this.product = {...this.product};
  this.submitted = false;
  this.productDialog = true;
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.tableData = this.tableData.filter(val => !this.selectedProducts.includes(val));
          this.selectedProducts = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
  });
}

editProduct(product: Assurance) {
  this.product = {...product};
  this.productDialog = true;
}

deleteProduct(product: Assurance) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.tableData = this.tableData.filter(val => val.id !== product.id);
          this.product = {...this.product};
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
  });
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}

saveProduct() {
  this.submitted = true;

  if (this.product.libelle.trim()) {
      if (this.product.id) {
          this.tableData[this.findIndexById(this.product.id)] = this.product;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
          this.product.id = this.createId();
          this.tableData.push(this.product);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.tableData = [...this.tableData];
      this.productDialog = false;
      this.product = {...this.product};
  }
}

findIndexById(id: number): number {
  let index = -1;
  for (let i = 0; i < this.tableData.length; i++) {
      if (this.product[i].id === id) {
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
loadCustomers(event: LazyLoadEvent) {
  this.loading = true;

  setTimeout(() => {
      this.customerService.getCustomers({lazyEvent: JSON.stringify(event)}).then(res => {
        console.log(res.data);
          this.product = res.data;
          this.totalRecords = 11;
          this.loading = false;
      })
  }, 1000);
}

onSelectionChange(value = []) {
  this.selectAll = value.length === this.totalRecords;
  this.selectedProducts = value;
}

onSelectAllChange(event) {
  const checked = event.checked;

  if (checked) {
      this.customerService.getCustomers().then(res => {
          this.selectedProducts = res.data;
          this.selectAll = true;
      });
  }
  else {
      this.selectedProducts = [];
      this.selectAll = false;
  }
}

}




