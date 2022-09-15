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
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['nom', 'prenoms', 'genre', 'profession', 'lieuHabitation', 'tel', 'tel2','edit'];
  patient!:MatTableDataSource<Patient1>
  posts: any
  post1: any
  
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
        this.posts = value.data ? value : []
        this.patient = new MatTableDataSource(this.posts.data)
          this.cdr.detectChanges();
          this.patient.paginator = this.paginator
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
    
  }
  detail(a:any){
    this.route.navigate(['admin/patient/detail',a]);

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
    this.patient.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
         
    }
}
