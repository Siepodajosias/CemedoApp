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
receptiopn:Reception=new Reception()
  constructor(private receptService:ReceptionService,
    private receptionForm:FormBuilder,
    private Msg:ToastrService) { }

  ngOnInit(): void {
    this.receptionForms=this.receptionForm.group({
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
sendData():void{

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
