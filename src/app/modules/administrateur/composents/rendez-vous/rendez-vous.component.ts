import { Component, OnInit,ViewChild } from '@angular/core';
import { Table } from 'primeng/table'
import * as saveAs from 'file-saver';
import * as jspdf from 'jspdf'
import 'jspdf-autotable'
import { UserOptions } from 'jspdf-autotable';


interface jsPDFWithPlugin extends jspdf.jsPDF{
    autoTable: (options: UserOptions)=> jspdf.jsPDF;
}

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent implements OnInit {

  dragdrop:boolean=true

  @ViewChild('dt') dt: Table | undefined | any;


  unlockedCustomers: any[]=[];

  lockedCustomers: any[]=[];

  balanceFrozen: boolean = false;

  rowGroupMetadata: any;

  loading: boolean = true;

  exportColumns: any[]=[];
rdvs:any=[
  {dateDPrdv:"10/10/2022",daterdv:"15/10/2022",medecin:"IBO",patient:"DIABY Kader"},
  {dateDPrdv:"10/10/2022",daterdv:"15/10/2022",medecin:"DOBE",patient:"NIKIEMA Idris"},
  {dateDPrdv:"10/10/2022",daterdv:"15/10/2022",medecin:"IBO",patient:"YOA Yvan"},
  {dateDPrdv:"10/10/2022",daterdv:"15/10/2022",medecin:"IBO",patient:"OUATTARA"},
  {dateDPrdv:"10/10/2022",daterdv:"17/10/2022",medecin:"TIEMELE",patient:"KOUASSI Aristide"},
  {dateDPrdv:"11/10/2022",daterdv:"15/10/2022",medecin:"IBO",patient:"GBOTTO Ange"},
  {dateDPrdv:"10/10/2022",daterdv:"15/10/2022",medecin:"IBO",patient:"YOA Elfride"},
  {dateDPrdv:"10/10/2022",daterdv:"15/10/2022",medecin:"IBRIAM",patient:"YOA Atta"},
  {dateDPrdv:"05/10/2022",daterdv:"20/10/2022",medecin:"DOBE",patient:"NANCY "}
]
  constructor() { }

  ngOnInit(): void {
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

applyFilterGlobal($event:any, stringVal:any) {
  this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
}

getEventValue($event:any) :string {
  console.log($event.target.value);
  return $event.target.value;
} 

toggleLock(data:any, frozen:any, index:any) {

  console.log(data);
    if (frozen) {
        this.lockedCustomers = this.lockedCustomers.filter((c, i) => i !== index);
        this.unlockedCustomers.push(data);
    }
    else {
        this.unlockedCustomers = this.unlockedCustomers.filter((c, i) => i !== index);
        this.lockedCustomers.push(data);
    }

    this.unlockedCustomers.sort((val1, val2) => {
        return val1.id < val2.id ? -1 : 1;
    });
}


exportPdf() {

  const doc = new jspdf.jsPDF('portrait','px','a4') as jsPDFWithPlugin;
        doc.autoTable({
          head:this.exportColumns,
          body:this.rdvs
        })
    doc.save("Rendez-vous.pdf")
}

exportExcel() {
import("xlsx").then(xlsx => {
const worksheet = xlsx.utils.json_to_sheet(this.rdvs);
const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
const excelBuffer: any = xlsx.write(workbook, {
  bookType: "xlsx",
  type: "array"
});
this.saveAsExcelFile(excelBuffer, "Rendez-Vous");
});
}

}
