import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Infirmier } from '../../model/infirmier';
import { InfirmierService } from '../../service/infirmier.service';

@Component({
  selector: 'app-infirmier-forms',
  templateUrl: './infirmier-forms.component.html',
  styleUrls: ['./infirmier-forms.component.scss']
})
export class InfirmierFormsComponent implements OnInit {
 img:any=""
  infirmierForms: FormGroup = new FormGroup({})
  infirmier:Infirmier=new Infirmier()

  constructor(private infirmierForm: FormBuilder,
    private infirmeirService:InfirmierService,
    private Msg:ToastrService 
   ) { }

  ngOnInit(): void {
    this.infirmierForms = this.infirmierForm.group({
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
      fcmToken:"",
      typeEmploye:null


      /*
      salt: ['', [Validators.required, Validators.maxLength(30)]],
      salaireInfirmier: [null, [Validators.required, Validators.maxLength(30)]],
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
/*
    this.infirmier.id=null
    this.infirmier.userIdentifier=""
    this.infirmier.username=""
    this.infirmier.numeroCni=this.infirmierForms.get('numeroCni')?.value
    this.infirmier.residence=this.infirmierForms.get('residence')?.value
       this.infirmier.salaireInfirmier=this.infirmierForms.get('salaireInfirmier')?.value
    if(this.img && this.img !==''){
      this.infirmier.photo=this.img
      this.infirmier.file=this.img
    }*/

    this.infirmier.id=null
    this.infirmier.email=this.infirmierForms.get('email')?.value
    this.infirmier.password=this.infirmierForms.get('password')?.value
    this.infirmier.nom=this.infirmierForms.get('nom')?.value
    this.infirmier.prenoms=this.infirmierForms.get('prenoms')?.value
    this.infirmier.dateNaissance=this.infirmierForms.get('dateNaissance')?.value
    this.infirmier.login=this.infirmierForms.get('login')?.value
    this.infirmier.genre=this.infirmierForms.get('genre')?.value
    this.infirmier.tel=this.infirmierForms.get('tel')?.value
    this.infirmier.tel2=this.infirmierForms.get('tel2')?.value

    this.infirmier.fcmToken=""
    this.infirmier.typeEmploye=null
 

    console.log(this.infirmier)
       this.infirmeirService.sendInfirmier(this.infirmier).subscribe({

        next:(v)=>{
          this.Msg.success("Infirmier enregistrer","",{
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
          this.infirmierForms.setValue({
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
            fcmToken:'string',
            typeEmploye:null,
          })
         }
       })
   }

  detectfile(event:any) {
    this.img=event.target.files[0]
  }
}
