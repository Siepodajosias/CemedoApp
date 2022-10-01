import { Component, OnInit,ViewChild, ChangeDetectorRef  } from '@angular/core';
import { ComptableService } from '../../service/comptable.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import  {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Comptable } from '../../model/comptable';
import { ComptableFormsComponent } from './comptable-forms.component';


@Component({
  selector: 'app-comptable-view',
  templateUrl: './comptable-view.component.html',
  styleUrls: ['./comptable-view.component.scss']
})
export class ComptableViewComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'prenom', 'genre', 'email','tel','tel2','edit'];
  comptable!:MatTableDataSource<Comptable>

  posts: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cptservice:ComptableService,private route:Router,private cdr:ChangeDetectorRef,
 public dialog: MatDialog) { }

  ngOnInit(): void {

    this.cptservice.getComptable().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.comptable = new MatTableDataSource(this.posts.data)
          this.cdr.detectChanges();
          this.comptable.paginator = this.paginator
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }
  detail(a:any){
    this.route.navigate(['administrateur/detailM',a]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ComptableFormsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.comptable.filter = filterValue.trim().toLowerCase();
  }
}
