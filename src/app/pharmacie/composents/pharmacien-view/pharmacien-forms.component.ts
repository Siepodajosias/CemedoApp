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

      salt: ['', [Validators.required, Validators.maxLength(30)]],

      salaireInfirmier: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      userIdentifier: ['', [Validators.required, Validators.maxLength(15)]],
      active: [null, [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(8)]],
      createdAt: [null, [Validators.required, Validators.maxLength(10)]],
      updatedAt: ['', [Validators.required, Validators.maxLength(10)]],
      version: [null, [Validators.required, Validators.maxLength(20)]],

      file:['', [Validators.required, Validators.maxLength(30)]],
      photo:['', [Validators.required, Validators.maxLength(20)]],

      tel:['', [Validators.required, Validators.maxLength(20)]],
      genre:['', [Validators.required, Validators.maxLength(20)]],
      dateNaissance:['', [Validators.required, Validators.maxLength(30)]],
      residence:['', [Validators.required, Validators.maxLength(30)]],
      numeroCni:['', [Validators.required, Validators.maxLength(20)]]
    })
  }
   SeveData(){

   }

   onUploadfile(file:File){
    console.log('image',file.name)

  }
  detectfile(event:any) {
    this.onUploadfile(event.target.files[0])
  }

}
