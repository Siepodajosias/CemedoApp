import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Assurance } from '../assurance/model/assurance';
import { AssuranceService } from '../assurance/service/assurance.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
interface People {
firstname?: string;
lastname?: string;
age?: string;
}

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styles: [
    `button .p-button-icon {
      font-size: 30px;
      color: red;
  }
    `
],
providers: [MessageService,ConfirmationService]
})


export class SpecialiteComponent implements OnInit {
tableData: Assurance[] ;
assurance : Assurance;
cols: any[] = [];
@ViewChild(MatPaginator) paginator!: MatPaginator;
constructor(private customerService: AssuranceService,private messageService: MessageService, private confirmationService: ConfirmationService) { }
ngOnInit() {
	this.cols = [
	{ field: "firstname", header: "First Name" },
	{ field: "lastname", header: "Last Name" },
	{ field: "age", header: "Age" },
	];
  this.customerService.getProducts().then(
    data => this.tableData = data);
//console.log(this.tableData);
}


}




