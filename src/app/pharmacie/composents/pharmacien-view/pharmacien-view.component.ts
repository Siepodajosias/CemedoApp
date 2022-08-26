import { Component, OnInit,ViewChild, ChangeDetectorRef  } from '@angular/core';
import { PharmacienService } from '../../service/pharmacien.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import  {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pharmacien } from '../../model/pharmacien';
import { PharmacienFormsComponent } from './pharmacien-forms.component';

@Component({
  selector: 'app-pharmacien-view',
  templateUrl: './pharmacien-view.component.html',
  styleUrls: ['./pharmacien-view.component.scss']
})
export class PharmacienViewComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'prenom', 'genre', 'residence','tel','edit','retirer'];
  pharmacien!:MatTableDataSource<Pharmacien>
  posts: any
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pharService:PharmacienService,private route:Router,private cdr:ChangeDetectorRef,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.pharService.getPharmacien1().subscribe({
      next: (value: any) => {
        this.posts = value ? value : []
        this.pharmacien = new MatTableDataSource(this.posts)
          this.cdr.detectChanges();
          this.pharmacien.paginator = this.paginator
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }
  detail(a:any){
    //this.route.navigate(['administrateur/detailM',a]);
    this.pharService.getPharmacien().subscribe({
      next:(e)=>console.log(e)
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(PharmacienFormsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pharmacien.filter = filterValue.trim().toLowerCase();
  }


}
