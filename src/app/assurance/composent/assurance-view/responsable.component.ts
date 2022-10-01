import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AssuranceService } from '../../service/assurance.service';
import { Responsable } from '../../model/responsable';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.scss']
})
export class ResponsableComponent implements OnInit {
  responsableForms: FormGroup = new FormGroup({})
  responsable:Responsable=new Responsable()

  constructor(private responsableForm: FormBuilder,
    private respService:AssuranceService,
    private Msg:ToastrService 
   ) { }

  ngOnInit(): void {
    this.responsableForms = this.responsableForm.group({
      id:null,

      nom:['', [Validators.required, Validators.minLength(3)]],
      prenoms:['', [Validators.required, Validators.maxLength(20)]],
      login:['', [Validators.required, Validators.maxLength(20)]],
      genre:['',[Validators.required, Validators.maxLength(10)]],
      dateNaissance:['',[Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      tel:['',[Validators.required, Validators.maxLength(15)]],
      tel2:['',[Validators.required, Validators.maxLength(15)]],
      password:['', [Validators.required, Validators.maxLength(8)]],
      assurance:{value:'indisponible',disabled:true},

      fcmToken:'',
      role: null,

      /*
      residence: ['', [Validators.required, Validators.maxLength(20)]],
      numeroCni:['',[Validators.required, Validators.maxLength(15)]],
      userIdentifier:[''],
      username:['']*/

    })
  }
   SaveData(){
    this.responsable.id=null

    this.responsable.email=this.responsableForms.get('email')?.value
    this.responsable.password=this.responsableForms.get('password')?.value
    this.responsable.nom=this.responsableForms.get('nom')?.value
    this.responsable.prenoms=this.responsableForms.get('prenoms')?.value
    this.responsable.login=this.responsableForms.get('login')?.value
    this.responsable.dateNaissance=this.responsableForms.get('dateNaissance')?.value
    this.responsable.genre=this.responsableForms.get('genre')?.value
    this.responsable.tel=this.responsableForms.get('tel')?.value
    this.responsable.tel2=this.responsableForms.get('tel2')?.value
    this.responsable.fcmToken=""
    this.responsable.role=null
    //this.responsable.assurance="/cemedo/assurances/7"
    //this.responsable.assurance="/cemedo/assurances/"+this.responsableForms.get('assurance')?.value

    console.log(this.responsable)

   this.respService.sendResponsable(this.responsable).subscribe({
      next:(v)=>{
        this.Msg.success("Responsable enregistrer","",{
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
        this.responsableForms.setValue({
          id:null,
          email:'',
          password:'',
          nom:'',
          prenoms:'',
          login:'',
          tel:'',
          tel2:'',
          genre:'',
          dateNaissance:'',
          assurance:null,
          fcmToken:'',
          role: null
        })
      }
    })
   }
}
