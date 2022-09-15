import { Component, OnInit,ViewChild, ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Medecin } from '../../model/medecin';
import { MedecinService } from '../../service/medecin.service';
import {MatDialog} from '@angular/material/dialog';
import { MedecinFormsComponent } from './medecin-forms.component';

@Component({
  selector: 'app-medecin-view',
  templateUrl: './medecin-view.component.html',
  styleUrls: ['./medecin-view.component.scss']
})
export class MedecinViewComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'prenom', 'genre','specialite','email','tel','tel2','edit'];
  medecin!:MatTableDataSource<Medecin>
  posts: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private medecinservice:MedecinService,private route:Router,private cdr:ChangeDetectorRef,
 public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.medecinservice.getMedecin().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.medecin = new MatTableDataSource(this.posts.data)
          this.cdr.detectChanges();
          this.medecin.paginator = this.paginator
          console.log(this.posts.data)
          console.log(value)
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.medecin.filter = filterValue.trim().toLowerCase();
  }
}
