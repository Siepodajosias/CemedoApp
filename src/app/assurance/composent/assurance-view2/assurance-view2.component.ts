import { Component, OnInit,ViewChild, ChangeDetectorRef  } from '@angular/core';
import { AssuranceService } from '../../service/assurance.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Assurance } from '../../model/assurance';
import { Responsable } from '../../model/responsable';

@Component({
  selector: 'app-assurance-view2',
  templateUrl: './assurance-view2.component.html',
  styleUrls: ['./assurance-view2.component.scss']
})
export class AssuranceView2Component implements OnInit {

  displayedColumns: string[] = ['id', 'libelle', 'emailAssurance','contact','ville','edit'];
  assurance!:MatTableDataSource<Assurance>
  posts: any

  displayedColumns3: string[] = ['id', 'nom', 'prenoms','genre','residence','tel','email','edit'];
  responsable!:MatTableDataSource<Responsable>
  posts2: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private assurService:AssuranceService,private route:Router,private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
/*
    this.assurService.getAssurance().subscribe({
      next: (value: any) => {
        this.posts = value ? value : []
        this.assurance = new MatTableDataSource(this.posts)
          this.cdr.detectChanges();
          this.assurance.paginator = this.paginator

      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
    this.assurService.getResponsable().subscribe({
      next:(value:any)=>{
        this.posts2 = value ? value : []
        this.responsable = new MatTableDataSource(this.posts2)
          this.cdr.detectChanges();
          this.responsable.paginator = this.paginator

      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })

    */
  }
  detail(a:any){
    this.route.navigate(['comptable/assurance/detail',a]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.assurance.filter = filterValue.trim().toLowerCase();
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.responsable.filter = filterValue.trim().toLowerCase();
  }

  detail1(a:any){
   
    this.route.navigate(['comptable/assurance/detailresponsable',a]);
  }
}
