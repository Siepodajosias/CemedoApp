
import { Component, OnInit,ViewChild, ChangeDetectorRef  } from '@angular/core';
import { Assurance1 } from '../../model/assurance1';
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

  displayedColumns: string[] = ['id', 'libelle', 'emailAssurance','contact','ville','edit','retirer'];
  assurance!:MatTableDataSource<Assurance1>
  posts: any

  displayedColumns3: string[] = ['id', 'nom', 'prenoms','genre','residence','tel','email','edit','retirer'];
  responsable1!:MatTableDataSource<Responsable>
  posts2: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private assurService:AssuranceService,private route:Router,private cdr:ChangeDetectorRef,
 public dialog: MatDialog,private Msg:ToastrService) { }

  ngOnInit(): void {

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
        this.responsable1 = new MatTableDataSource(this.posts2)
          this.cdr.detectChanges();
          this.responsable1.paginator = this.paginator

      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }
  detail(a:any){
    this.route.navigate(['admin/assurance/detail',a]);
  }
  supprimer(a:any){
    console.log(a)
    const conf:boolean=confirm("Voullez-vous Vraiment Supprimer cet assurance?");
    if(conf==true){
      this.assurService.deleteAssurance(a).subscribe({
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
  supprimer1(a:any){
    console.log(a)
    const conf:boolean=confirm("Voullez-vous Vraiment Supprimer ce responsable?");
    if(conf==true){
      this.assurService.deleteResponsable(a).subscribe({
        next:(v)=>{
          this.Msg.info("Responsable supprimer","",{
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

}
