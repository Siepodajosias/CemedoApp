import { Component, OnInit,ViewChild, ChangeDetectorRef  } from '@angular/core';
import { InfirmierService } from '../../service/infirmier.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import  {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Infirmier } from '../../model/infirmier';
import { InfirmierFormsComponent } from './infirmier-forms.component';

@Component({
  selector: 'app-infirmier-view',
  templateUrl: './infirmier-view.component.html',
  styleUrls: ['./infirmier-view.component.scss']
})
export class InfirmierViewComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'prenom', 'genre', 'email','tel','tel2','edit'];
  infirmier!:MatTableDataSource<Infirmier>
  posts: any


  constructor(private infirmierS:InfirmierService,private route:Router,private cdr:ChangeDetectorRef,
    public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {

    this.infirmierS.getInfirmier().subscribe({
      next: (value: any) => {
        this.posts = value.data ? value : []
        this.infirmier = new MatTableDataSource(this.posts.data)
          this.cdr.detectChanges();
          this.infirmier.paginator = this.paginator
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }
  detail(a:any){
    //this.route.navigate(['administrateur/detailM',a]);
    this.infirmierS.getInfirmier().subscribe({
      next:(e)=>console.log(e)
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(InfirmierFormsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.infirmier.filter = filterValue.trim().toLowerCase();
  }
}
