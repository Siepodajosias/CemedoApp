import {Component, OnInit,ViewChild, ChangeDetectorRef } from '@angular/core';
import { ReceptionService } from '../../service/reception.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import  {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Reception } from '../../model/reception';
import { ReceptionFormComponent } from './reception-form.component';

@Component({
  selector: 'app-reception-view',
  templateUrl: './reception-view.component.html',
  styleUrls: ['./reception-view.component.scss']
})
export class ReceptionViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private receptService:ReceptionService,private route:Router,private cdr:ChangeDetectorRef,
 public dialog: MatDialog) { }

  displayedColumns: string[] = ['nom', 'prenom', 'genre', 'residence','tel','edit','retirer'];
  reception!:MatTableDataSource<Reception>
  posts: any

  ngOnInit(): void {

    this.receptService.getReception1().subscribe({
      next: (value: any) => {
        this.posts = value ? value : []
        this.reception = new MatTableDataSource(this.posts)
          this.cdr.detectChanges();
          this.reception.paginator = this.paginator
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }
  detail(a:any){
    //this.route.navigate(['administrateur/detailM',a]);
    this.receptService.getReception().subscribe({
      next:(e)=>console.log(e)
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ReceptionFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.reception.filter = filterValue.trim().toLowerCase();
  }

}
