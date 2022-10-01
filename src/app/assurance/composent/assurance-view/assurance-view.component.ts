
import { Component, OnInit,ViewChild, ChangeDetectorRef  } from '@angular/core';
import { Assurance } from '../../model/assurance';
import { AssuranceService } from '../../service/assurance.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import  {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssuranceFormsComponent } from './assurance-forms.component';
import { ToastrService } from 'ngx-toastr';
import { ResponsableComponent } from './responsable.component';
import { Responsable } from '../../model/responsable';

@Component({
  selector: 'app-assurance-view',
  templateUrl: './assurance-view.component.html',
  styleUrls: ['./assurance-view.component.scss']
})
export class AssuranceViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'libelle', 'email','tel','ville','edit'];
  assurance!:MatTableDataSource<Assurance>
  posts: any

  displayedColumns3: string[] = ['nom', 'prenom', 'genre', 'email','tel','tel2','edit'];
  responsable1!:MatTableDataSource<Responsable>
  posts2: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private assurService:AssuranceService,private route:Router,private cdr:ChangeDetectorRef,
 public dialog: MatDialog,private Msg:ToastrService) { }

  ngOnInit(): void {

    this.assurService.getAssurance().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.assurance = new MatTableDataSource(this.posts.data)
          this.cdr.detectChanges();
          this.assurance.paginator = this.paginator
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
    this.assurService.getResponsable().subscribe({
      next:(value:any)=>{
        this.posts2 = value.data ? value : []
        this.responsable1 = new MatTableDataSource(this.posts2.data)
          this.cdr.detectChanges();
          this.responsable1.paginator = this.paginator
          console.log(this.posts2.data)
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }
  detail(a:any){
    this.route.navigate(['admin/assurance/detail',a]);
  }

  openDialog1() {
    const dialogRef = this.dialog.open(AssuranceFormsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog2() {
    const dialogRef = this.dialog.open(ResponsableComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.assurance.filter = filterValue.trim().toLowerCase();
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.responsable1.filter = filterValue.trim().toLowerCase();
  }

  detail1(a:any){
   
    this.route.navigate(['admin/assurance/detailresponsable',a]);
  }


}
