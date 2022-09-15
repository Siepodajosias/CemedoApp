import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Reception } from '../../model/reception';
import { ReceptionService } from '../../service/reception.service';

@Component({
  selector: 'app-reception-form',
  templateUrl: './reception-form.component.html',
  styleUrls: ['./reception-form.component.scss']
})
export class ReceptionFormComponent implements OnInit {
receptionForms:FormGroup=new FormGroup({})
reception:Reception=new Reception()
  constructor(private receptService:ReceptionService,
    private receptionForm:FormBuilder,
    private Msg:ToastrService) { }

  ngOnInit(): void {
    
    this.receptionForms=this.receptionForm.group({

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

      salaireInfirmier: ['', [Validators.required, Validators.maxLength(30)]],
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
sendData():void{

}

SaveData(){
  this.reception.id=null
  this.reception.email=this.receptionForms.get('email')?.value
  this.reception.password=this.receptionForms.get('password')?.value
  this.reception.nom=this.receptionForms.get('nom')?.value
  this.reception.prenoms=this.receptionForms.get('prenoms')?.value
  this.reception.dateNaissance=this.receptionForms.get('dateNaissance')?.value
  this.reception.login=this.receptionForms.get('login')?.value
  this.reception.genre=this.receptionForms.get('genre')?.value
  this.reception.tel=this.receptionForms.get('tel')?.value
  this.reception.tel2=this.receptionForms.get('tel2')?.value

  this.reception.fcmToken=""
  this.reception.typeEmploye=null


  console.log(this.reception)
     this.receptService.sendReception(this.reception).subscribe({

      next:(v)=>{
        this.Msg.success("receptionniste enregistrer","",{
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
        this.receptionForms.setValue({
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
