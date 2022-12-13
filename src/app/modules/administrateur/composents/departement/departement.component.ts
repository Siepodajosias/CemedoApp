import { Component, OnInit } from '@angular/core';
import { MedecinSpecialiteService, Specialite } from 'src/app/services/serviceMedecin/medecin-specialite.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  loading: boolean=false;
  departements: any;
  selectedCustomers: any;
  departementDialog:boolean=false;
  departementForms: FormGroup;

  constructor(private departementService:MedecinSpecialiteService,
              private route:Router,
              private departementForm:FormBuilder,
              private messageService:MessageService) { }

  ngOnInit(): void {
     this.recupererDepartement();
     this.departementForms=this.departementForm.group({
          id:null,
          libelle:['',[Validators.required]]
     })
  }

  recupererDepartement(){
    this.departementService.recupererSpecialite().subscribe({
      next:(value)=>{
        const data=value.data;
        this.departements=data ? data : [];
      }
    })
  }

  urlActif() {
    return this.route.url.includes('/admin/departement')
  }

  departementDetail(assurance: any) {

  }

  newDepartement() {
    this.departementDialog=!this.departementDialog;
    this.departementForms.reset();
  }

  exportPdf() {

  }

  exportExcel() {

  }

  enregistrerDepartement() {
      const specialite:Specialite=new Specialite();
      specialite.libelle=this.departementForms.get('libelle')?.value
      this.departementService.enregistrerSpecialite(specialite).subscribe({
        next:(value)=>{
           this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Le departement a été enregistré' });
           this.departementForms.reset();
       },
      complete:()=>{
        this.recupererDepartement();
        this.departementDialog=false
      }
    })
  }
}
