import { Component, OnInit,ViewChild, ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Medecin } from '../../model/medecin';
import { MedecinService } from '../../service/medecin.service';
import {MatDialog} from '@angular/material/dialog';
import { MedecinFormsComponent } from './medecin-forms.component';

import * as saveAs from 'file-saver';

import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';


import { Table } from 'primeng/table'


interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}



@Component({
  selector: 'app-medecin-view',
  templateUrl: './medecin-view.component.html',
  styleUrls: ['./medecin-view.component.scss']
})
export class MedecinViewComponent implements OnInit {
  medecins:any[]=[]
  posts: any
  post: any
  personne:any[]=[];
	//list: Personne = new Personne();
  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;

  scrollableCols: any[]=[];

  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  balanceFrozen: boolean = false;

  rowGroupMetadata: any;

  loading: boolean = true;

  exportColumns: any[]=[];

  personneDialog: any | boolean;




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private medecinservice:MedecinService,private route:Router,private cdr:ChangeDetectorRef,
 public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.medecinservice.getMedecin().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.post = this.posts.data
        this.medecins = this.post
        this.loading=false
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
    
  }
  detail(a:any){
    this.route.navigate(['admin/medecin/detail',a]);
    this.medecinservice.getMedecin().subscribe({
      next:(val) => {console.log(val)}
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(MedecinFormsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getEventValue($event:any) :string {
    console.log($event.target.value);
    return $event.target.value;
  } 

  openNew() {
    this.personneDialog = true;
  }
  
  exportPdf() {
  
    const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
          doc.autoTable({
            head:this.exportColumns,
            body:this.medecins
          })
      doc.save("Personne.pdf")
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
}
