import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';
import { Table } from 'primeng/table'

interface jsPDFWithPlugin extends jspdf.jsPDF{
  autoTable: (options: UserOptions)=> jspdf.jsPDF;
}

@Component({
  selector: 'app-materiel-view',
  templateUrl: './materiel-view.component.html',
  styleUrls: ['./materiel-view.component.scss']
})
export class MaterielViewComponent implements OnInit {
  materiels:any[]=[]
  posts: any

  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;

  scrollableCols: any[]=[];

  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  balanceFrozen: boolean = false;

  rowGroupMetadata: any;

  loading: boolean = true;

  exportColumns: any[]=[];

  genres:any

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.genres=[
      {name:'homme'},
      {name:'femme'}
    ]
  }

  getEventValue($event:any) :string {
    console.log($event.target.value);
    return $event.target.value;
  } 

  exportPdf() {
  
    const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
          doc.autoTable({
            head:this.exportColumns,
            body:this.materiels
          })
      doc.save("Materiel.pdf")
  }
  
  exportExcel() {
  import("xlsx").then(xlsx => {
  const worksheet = xlsx.utils.json_to_sheet(this.materiels);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer: any = xlsx.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });
  this.saveAsExcelFile(excelBuffer, "materiel");
  });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {

    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
      saveAs(
      data,
      fileName + "_export_" + new Date() + EXCEL_EXTENSION
    );

  }


}
