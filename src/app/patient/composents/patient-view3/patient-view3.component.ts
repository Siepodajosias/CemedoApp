import { Component, ViewChild, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Patient1} from '../../model/patient1';
import { PatientService } from '../../service/patient.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { doctor } from '../data/multi';
import { ApexAxisChartSeries, ApexChart} from 'ng-apexcharts';
import { Subscribable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-view3',
  templateUrl: './patient-view3.component.html',
  styleUrls: ['./patient-view3.component.scss']
})
export class PatientView3Component implements OnInit,OnDestroy{
  displayedColumns: string[] = ['nom', 'prenoms', 'sexe', 'profession', 'lieuHabitation', 'tel', 'tel2','assurance','edit'];
  patient!:MatTableDataSource<Patient1>
  displayedColumns2: string[] = ['nom', 'prenoms', 'sexe', 'profession', 'lieuHabitation', 'tel', 'tel2','assurance','edit'];
  patient2!:MatTableDataSource<Patient1>
  posts: any
  doctor:any=[{'age':25},{'age':40},{'age':28}]
   serie: ApexAxisChartSeries;
   chart:ApexChart;
   options: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private patientH: PatientService, private cdr: ChangeDetectorRef,private route:Router,
    private Msg:ToastrService) {
  }
  ngOnInit(): void {

   this.patientH.getPatientP().subscribe({
      next: (value: any) => {
        this.posts = value ? value : []
        this.patient = new MatTableDataSource(this.posts)
        this.patient2 = new MatTableDataSource(this.posts)
          this.cdr.detectChanges();
          this.patient.paginator = this.paginator
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }
  detail(a:any){
    this.route.navigate(['doctor/patient/detail',a]);

  }
  supprimer(a:any){
    console.log(a)
    const conf:boolean=confirm("Voullez-vous Vraiment Supprimer ce Patient?");
    if(conf==true){
      this.patientH.deletePatient(a).subscribe({
        next:(v)=>{
          this.Msg.info("Assurance supprimer","",{
            closeButton:true,
            progressAnimation:'decreasing',
            progressBar:true,
            positionClass:'toast-top-right'
            
          })
      },
        error:(e)=>{
          this.Msg.error("erreur lors de la suppession","échec",{
            closeButton:true
          })
        }
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patient2.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
         
    }
}
