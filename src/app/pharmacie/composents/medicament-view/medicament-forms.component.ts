import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Medicament } from '../../model/medicament';
import { PharmacienService } from '../../service/pharmacien.service';

@Component({
  selector: 'app-medicament-forms',
  templateUrl: './medicament-forms.component.html',
  styleUrls: ['./medicament-forms.component.scss']
})
export class MedicamentFormsComponent implements OnInit {
medicamentForms:FormGroup=new FormGroup({})
medicament:Medicament=new Medicament()
  constructor(private pharService:PharmacienService,
    private medicamentForm:FormBuilder,
    private Msg:ToastrService
    ) { }

  ngOnInit(): void {
    this.medicamentForms=this.medicamentForm.group({
      id:null,
      quantite:[null,[Validators.required,Validators.maxLength(10)]],
      prix:[null,[Validators.required,Validators.maxLength(30)]],
      dateArrive: ['',[Validators.required,Validators.maxLength(20)]],
      dateSortir: ['',[Validators.required,Validators.maxLength(20)]],
      libelle: ['',[Validators.required,Validators.maxLength(20)]],
      createdAt:{value:'', disabled:true},
      updatedAt: {value:'', disabled:true},
      version: {value:'indisponible',disabled:true},
      active:{value:'indisponible',disabled:true},
    })
  }

  sendData():void{

    this.medicament.id=null
    this.medicament.posologie=this.medicamentForms.get('posologie')?.value
    this.medicament.libelle=this.medicamentForms.get('libelle')?.value
    this.medicament.quantite=this.medicamentForms.get('quantite')?.value

    this.pharService.sendMedicament(this.medicament).subscribe({
       next:(v)=>{
         this.Msg.success("Medicament enregistrer","",{
           closeButton:true,
           progressAnimation:'increasing',
           progressBar:true,
           positionClass:'toast-top-right'
           
         })
     },
       error:(e)=>{
         this.Msg.error("erreur lors de l'enregistrement","échec",{
           closeButton:true
         })
       },
       complete:()=>{
       }
     })
  }
}
