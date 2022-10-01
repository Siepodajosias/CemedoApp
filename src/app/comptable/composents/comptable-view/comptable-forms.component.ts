import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Comptable } from '../../model/comptable';
import { ComptableService } from '../../service/comptable.service';

@Component({
  selector: 'app-comptable-forms',
  templateUrl: './comptable-forms.component.html',
  styleUrls: ['./comptable-forms.component.scss']
})
export class ComptableFormsComponent implements OnInit {
  img:any=""
  comptableForms: FormGroup = new FormGroup({})
  comptable:Comptable=new Comptable()
  constructor(private comptableForm: FormBuilder,
    private cptService:ComptableService,
    private Msg:ToastrService
    ) { }

  ngOnInit(): void {
    this.comptableForms = this.comptableForm.group({

      id:null,
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenoms: ['', [Validators.required, Validators.maxLength(20)]],
      login:['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(8)]],
      tel:['', [Validators.required, Validators.maxLength(20)]],
      tel2:['', [Validators.required, Validators.maxLength(20)]],
      genre:['', [Validators.required, Validators.maxLength(20)]],
      dateNaissance:['', [Validators.required, Validators.maxLength(30)]],
      role:null,
      fcmToken:"",
      typeEmploye:null

/*
      salt: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      userIdentifier: ['', [Validators.required, Validators.maxLength(15)]],
      active: [null, [Validators.required, Validators.maxLength(10)]],
      createdAt: [null, [Validators.required, Validators.maxLength(10)]],
      updatedAt: ['', [Validators.required, Validators.maxLength(10)]],
      version: [null, [Validators.required, Validators.maxLength(20)]],
      file:['', [Validators.required, Validators.maxLength(30)]],
      photo:['', [Validators.required, Validators.maxLength(20)]],
      residence:['', [Validators.required, Validators.maxLength(30)]],
      numeroCni:['', [Validators.required, Validators.maxLength(20)]]
      */
    })
  }

  SaveData(){
    this.comptable.id=null
    this.comptable.email=this.comptableForms.get('email')?.value
    this.comptable.password=this.comptableForms.get('password')?.value
    this.comptable.nom=this.comptableForms.get('nom')?.value
    this.comptable.prenoms=this.comptableForms.get('prenoms')?.value
    this.comptable.login=this.comptableForms.get('login')?.value
    this.comptable.dateNaissance=this.comptableForms.get('dateNaissance')?.value
    this.comptable.genre=this.comptableForms.get('genre')?.value
    this.comptable.tel=this.comptableForms.get('tel')?.value
    this.comptable.tel2=this.comptableForms.get('tel')?.value

    this.comptable.fcmToken=""
    this.comptable.typeEmploye=null
    this.comptable.role=null

    console.log(this.comptable)

   this.cptService.sendComptable(this.comptable).subscribe({
      next:(v)=>{
        this.Msg.success("Comptable enregistrer","",{
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
        this.comptableForms.setValue({
          id:null,
          email:"",
          password:"",
          nom:"",
          prenoms:"",
          tel:"",
          tel2:"",
          genre:"",
          dateNaissance:"",
          login:"",
          role:"",
          fcmToken:"",
          typeEmploye:null,
        })
      }
    })
   }


}
