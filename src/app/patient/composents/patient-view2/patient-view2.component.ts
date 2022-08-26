import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Patient} from '../../model/patient';
import { PatientService } from '../../service/patient.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { doctor } from '../data/multi';
import { ApexAxisChartSeries, ApexChart} from 'ng-apexcharts';
import {MatDialog} from '@angular/material/dialog';
import { PatientFormsComponent } from './patient-forms.component';

@Component({
  selector: 'app-patient-view2',
  templateUrl: './patient-view2.component.html',
  styleUrls: ['./patient-view2.component.scss']
})
export class PatientView2Component implements OnInit {
  displayedColumns: string[] = ['nom', 'prenoms', 'sexe', 'profession', 'lieuHabitation', 'tel', 'tel2','assurance','edit'];
  patient!:MatTableDataSource<Patient>
  posts: any
  doctor:any=[{'age':25},{'age':40},{'age':28}]
   serie: ApexAxisChartSeries;
   chart:ApexChart;
   options: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private patientH: PatientService, private cdr: ChangeDetectorRef,private route:Router,
    public dialog: MatDialog) {
  }
  ngOnInit(): void {

    this.patientH.getPatientP().subscribe({
      next: (value: any) => {
        this.posts = value ? value : []
        this.patient = new MatTableDataSource(this.posts)
          this.cdr.detectChanges();
          this.patient.paginator = this.paginator
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }
  detail(a:any){
    //this.route.navigate(['admin/patient/detail',a]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(PatientFormsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patient.filter = filterValue.trim().toLowerCase();
  }
}
