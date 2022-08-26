import { Component, OnInit,ViewChild, ChangeDetectorRef  } from '@angular/core';
import { PharmacienService } from '../../service/pharmacien.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import  {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pharmacien } from '../../model/pharmacien';
import { MedicamentFormsComponent } from './medicament-forms.component';
import { Medicament } from '../../model/medicament';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medicament-view',
  templateUrl: './medicament-view.component.html',
  styleUrls: ['./medicament-view.component.scss']
})
export class MedicamentViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'libelle', 'posologie', 'quantite','createdAt','edit','retirer'];
  medicament!:MatTableDataSource<Medicament>

  displayedColumns2: string[] = ['id', 'libelle', 'posologie', 'quantite','createdAt','edit','retirer'];
  medicament2!:MatTableDataSource<Medicament>

  posts: any
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pharService:PharmacienService,private route:Router,private cdr:ChangeDetectorRef,
    public dialog: MatDialog,private Msg:ToastrService) { }

  ngOnInit(): void {

    this.pharService.getMedicament().subscribe({
      next: (value: any) => {
        this.posts = value ? value : []
        this.medicament = new MatTableDataSource(this.posts)
        this.medicament2 = new MatTableDataSource(this.posts)
          this.cdr.detectChanges();
          this.medicament.paginator = this.paginator
      },
      error: (e) => { console.log("erreur :" + e) },
      complete: () => {
      }
    })
  }

  detail(a:any){
    this.route.navigate(['pharmacie/detailMed',a]);
  }
  supprimer(a:any){
    console.log(a)
    const conf:boolean=confirm("Voullez-vous Vraiment retirer ce Medicament de la base de donnée?");
    if(conf==true){
      this.pharService.deleteMedicament(a).subscribe({
        next:(v)=>{
          this.Msg.info("Medicament supprimer","",{
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



  openDialog() {
    const dialogRef = this.dialog.open(MedicamentFormsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.medicament.filter = filterValue.trim().toLowerCase();
  }

}


