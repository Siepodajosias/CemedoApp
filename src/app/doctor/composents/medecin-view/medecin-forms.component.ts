import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Medecin1 } from '../../model/medecin1';
import { MedecinService } from '../../service/medecin.service';

@Component({
  selector: 'app-medecin-forms',
  templateUrl: './medecin-forms.component.html',
  styleUrls: ['./medecin-forms.component.scss']
})
export class MedecinFormsComponent implements OnInit {
  MedecinForms: FormGroup = new FormGroup({})
  medecin2:Medecin1=new Medecin1()

  constructor(private medecinForm: FormBuilder,
    private medService:MedecinService,
    private Msg:ToastrService 
   ) { }

  ngOnInit(): void {
    this.MedecinForms = this.medecinForm.group({
      id:null,

      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      password:['', [Validators.required, Validators.maxLength(8)]],
      nom:['', [Validators.required, Validators.minLength(3)]],
      prenoms:['', [Validators.required, Validators.maxLength(20)]],

      createdAt:['', [Validators.required, Validators.maxLength(10)]],
      updatedAt:['', [Validators.required, Validators.maxLength(10)]],
      version: [null, [Validators.required, Validators.maxLength(8)]],
      active: [true, [Validators.required, Validators.maxLength(8)]],

      residence: ['', [Validators.required, Validators.maxLength(20)]],
      sepecialiteMedecin:['', [Validators.required, Validators.maxLength(10)]],
      salaireMedecin:[null, [Validators.required, Validators.maxLength(10)]],
      primeMedecin:[null,[Validators.required, Validators.maxLength(10)]],
      heureDebut:['',[Validators.required, Validators.maxLength(10)]],
      heureFin:['',[Validators.required, Validators.maxLength(10)]],
      tel:['',[Validators.required, Validators.maxLength(10)]],
      genre:['',[Validators.required, Validators.maxLength(10)]],
      dateNaissance:['',[Validators.required, Validators.maxLength(10)]],
      photo:['',[Validators.required, Validators.maxLength(30)]],
      numeroCni:['',[Validators.required, Validators.maxLength(10)]]

    })
  }
   SeveData(){
    this.medecin2.email=this.MedecinForms.get('email')?.value
    this.medecin2.password=this.MedecinForms.get('password')?.value
    this.medecin2.nom=this.MedecinForms.get('nom')?.value
    this.medecin2.prenoms=this.MedecinForms.get('prenoms')?.value
    this.medecin2.dateNaissance=this.MedecinForms.get('dateNaissance')?.value
    this.medecin2.genre=this.MedecinForms.get('genre')?.value
    this.medecin2.salaireMedecin=this.MedecinForms.get('salaireMedecin')?.value
    this.medecin2.primeMedecin=this.MedecinForms.get('primeMedecin')?.value
    this.medecin2.sepecialiteMedecin=this.MedecinForms.get('sepecialiteMedecin')?.value
    this.medecin2.photo=this.MedecinForms.get('photo')?.value
    this.medecin2.numeroCni=this.MedecinForms.get('numeroCni')?.value
    this.medecin2.residence=this.MedecinForms.get('residence')?.value
    this.medecin2.tel=this.MedecinForms.get('tel')?.value
    this.medecin2.heureDebut=this.MedecinForms.get('heureDebut')?.value
    this.medecin2.heureFin=this.MedecinForms.get('heureFin')?.value
    
    console.log("medecin enregistrer2",this.medecin2)
   this.medService.sendMedecin(this.medecin2).subscribe({
      next:(v)=>{
        this.Msg.success("Medecin enregistrer","",{
          closeButton:true,
          progressAnimation:'increasing',
          progressBar:true,
          positionClass:'toast-top-right'
          
        })
        console.log("medecin enregistrer2",v)
    },
      error:(e)=>{
        this.Msg.error("erreur lors de l'enregistrement","échec",{
          closeButton:true
        })

      }
    })
   }
}
