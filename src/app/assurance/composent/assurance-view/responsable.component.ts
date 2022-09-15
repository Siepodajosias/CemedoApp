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
  responsable:any //Responsable=new Responsable()

  constructor(private responsableForm: FormBuilder,
    private respService:AssuranceService,
    private Msg:ToastrService 
   ) { }

  ngOnInit(): void {
    this.responsableForms = this.responsableForm.group({
      id:null,

      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      password:['', [Validators.required, Validators.maxLength(8)]],
      nom:['', [Validators.required, Validators.minLength(3)]],
      prenoms:['', [Validators.required, Validators.maxLength(20)]],

      createdAt:[''],
      updatedAt:[''],
      version: [null],
      active: [true],

      residence: ['', [Validators.required, Validators.maxLength(20)]],
      tel:['',[Validators.required, Validators.maxLength(15)]],
      genre:['',[Validators.required, Validators.maxLength(10)]],
      dateNaissance:['',[Validators.required, Validators.maxLength(10)]],
      numeroCni:['',[Validators.required, Validators.maxLength(15)]],

      assurance:{value:'indisponible',disabled:true},
      userIdentifier:[''],
      username:['']

    })
  }
   SeveData(){
    this.responsable.id=null
    this.responsable.userIdentifier=""
    this.responsable.username=""
    this.responsable.email=this.responsableForms.get('email')?.value
    this.responsable.password=this.responsableForms.get('password')?.value
    this.responsable.nom=this.responsableForms.get('nom')?.value
    this.responsable.prenoms=this.responsableForms.get('prenoms')?.value
    this.responsable.dateNaissance=this.responsableForms.get('dateNaissance')?.value
    this.responsable.genre=this.responsableForms.get('genre')?.value
    this.responsable.numeroCni=this.responsableForms.get('numeroCni')?.value
    this.responsable.residence=this.responsableForms.get('residence')?.value
    this.responsable.tel=this.responsableForms.get('tel')?.value
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
    
          createdAt:[''],
          updatedAt:[''],
          version: [null],
          active: [true],
    
          residence: '',
          tel:'',
          genre:'',
          dateNaissance:'',
          numeroCni:'',
    
          assurance:'',
          userIdentifier:'',
          username:''
        })
      }
    })
   }
}
