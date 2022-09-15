import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pharmacien } from '../../model/pharmacien';
import { PharmacienService } from '../../service/pharmacien.service';

@Component({
  selector: 'app-pharmacien-forms',
  templateUrl: './pharmacien-forms.component.html',
  styleUrls: ['./pharmacien-forms.component.scss']
})
export class PharmacienFormsComponent implements OnInit {

  pharmacienForms: FormGroup = new FormGroup({})
  pharmacien:Pharmacien=new Pharmacien()

  constructor(private pharmacienForm: FormBuilder,
    private pharService:PharmacienService,
    private Msg:ToastrService 
   ) { }

  ngOnInit(): void {
    this.pharmacienForms = this.pharmacienForm.group({

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


      //salt: ['', [Validators.required, Validators.maxLength(30)]],

      /*
      salaireInfirmier: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      userIdentifier: ['', [Validators.required, Validators.maxLength(15)]],
      active: [null, [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(8)]],
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

    
    this.pharmacien.id=null
    this.pharmacien.email=this.pharmacienForms.get('email')?.value
    this.pharmacien.password=this.pharmacienForms.get('password')?.value
    this.pharmacien.nom=this.pharmacienForms.get('nom')?.value
    this.pharmacien.prenoms=this.pharmacienForms.get('prenoms')?.value
    this.pharmacien.dateNaissance=this.pharmacienForms.get('dateNaissance')?.value
    this.pharmacien.login=this.pharmacienForms.get('login')?.value
    this.pharmacien.genre=this.pharmacienForms.get('genre')?.value
    this.pharmacien.tel=this.pharmacienForms.get('tel')?.value
    this.pharmacien.tel2=this.pharmacienForms.get('tel2')?.value

    this.pharmacien.fcmToken=""
    this.pharmacien.typeEmploye=null
 

    console.log(this.pharmacien)
       this.pharService.sendPharmacien(this.pharmacien).subscribe({

        next:(v)=>{
          this.Msg.success("Pharmacien enregistrer","",{
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
          this.pharmacienForms.setValue({
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

   onUploadfile(file:File){
    console.log('image',file.name)

  }
  detectfile(event:any) {
    this.onUploadfile(event.target.files[0])
  }

}
