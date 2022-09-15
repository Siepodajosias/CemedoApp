import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Assurance } from '../../model/assurance';
import { AssuranceService } from '../../service/assurance.service';

@Component({
  selector: 'app-assurance-forms',
  templateUrl: './assurance-forms.component.html',
  styleUrls: ['./assurance-forms.component.scss']
})
export class AssuranceFormsComponent implements OnInit {
assuranceForm:FormGroup=new FormGroup({})
assurance1:Assurance=new Assurance()
  constructor(private assurService:AssuranceService,private Msg:ToastrService,
   private assurForm:FormBuilder
    ) { }

  ngOnInit(): void {
      this.assuranceForm = this.assurForm.group({
      id:null,
      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      libelle: ['', [Validators.required, Validators.maxLength(30)]],
      ville: ['', [Validators.required, Validators.maxLength(30)]],
      tel: ['', [Validators.required, Validators.maxLength(15)]],
      createdAt:{value:'', disabled:true},
      updatedAt: {value:'', disabled:true},
      version: {value:'indisponible',disabled:true},
      active:{value:'indisponible',disabled:true},
    })

  }

  sendData():void{

    this.assurance1.id=null
    this.assurance1.email=this.assuranceForm.get('email')?.value
    this.assurance1.libelle=this.assuranceForm.get('libelle')?.value
    this.assurance1.ville=this.assuranceForm.get('ville')?.value
    this.assurance1.tel=this.assuranceForm.get('tel')?.value

    this.assurService.sendAssurance(this.assurance1).subscribe({
       next:(v)=>{
         this.Msg.success("Assurance enregistrer","",{
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
        this.assuranceForm.setValue({
          id:null,
          email:"",
          libelle: "",
          ville: "",
          tel: "",
          createdAt:"",
          updatedAt: "",
          version:0,
          active:false,
        })
       }
     })
  }

}
