import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/models/modelPatient/patient';
import { PatientService } from 'src/app/services/ServicePatient/patient.service';


@Component({
  selector: 'app-patient-forms',
  templateUrl: './patient-forms.component.html'
})
export class PatientFormsComponent implements OnInit {
  PatientForms: FormGroup = new FormGroup({})
  patient:Patient=new Patient()

  constructor(private medecinForm: FormBuilder,
    private medService:PatientService,
    private Msg:ToastrService 
   ) { }

  ngOnInit(): void {
    
    this.PatientForms = this.medecinForm.group({
      active:[true, [Validators.required, Validators.maxLength(10)]],
      assurance: ['', [Validators.required, Validators.maxLength(10)]],
      createdAt:['', [Validators.required, Validators.maxLength(10)]],
      dateNaissance: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      genre: ['', [Validators.required, Validators.maxLength(10)]],
      id:null,
      lieuHabitation: ['', [Validators.required, Validators.maxLength(20)]],
      login: ['', [Validators.required, Validators.maxLength(20)]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      numeroAssure: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(8)]],
      prenoms: ['', [Validators.required, Validators.maxLength(20)]],
      profession: ['', [Validators.required, Validators.maxLength(20)]],
      role: ['', [Validators.required, Validators.maxLength(20)]],
      tauxCouverture:[null, [Validators.required, Validators.maxLength(10)]],
      tel: ['', [Validators.required, Validators.maxLength(15)]],
      tel2: ['', [Validators.required, Validators.maxLength(10)]],
      fcmtoken: ['', [Validators.required, Validators.maxLength(10)]],
      updatedAt:['', [Validators.required, Validators.maxLength(10)]],
      version:[null, [Validators.required, Validators.maxLength(10)]]
      //pieceIdRecto: ['', [Validators.required, Validators.maxLength(30)]],
      //pieceIdVerso: ['', [Validators.required, Validators.maxLength(30)]],
      //assuranceRecto: ['', [Validators.required, Validators.maxLength(30)]],
      //assuranceVerso: ['', [Validators.required, Validators.maxLength(12)]],
      //autreAntecedent:['', [Validators.required, Validators.maxLength(10)]],

    })
    
  }
   sendData(){

   }
}
