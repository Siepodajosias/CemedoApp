import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Patient1 } from '../../model/patient1';
import { PatientService } from '../../service/patient.service';


@Component({
  selector: 'app-patient-forms',
  templateUrl: './patient-forms.component.html',
  styleUrls: ['./patient-forms.component.scss']
})
export class PatientFormsComponent implements OnInit {
  MedecinForms: FormGroup = new FormGroup({})
  patient:Patient1=new Patient1()

  constructor(private medecinForm: FormBuilder,
    private medService:PatientService,
    private Msg:ToastrService 
   ) { }

  ngOnInit(): void {
    this.MedecinForms = this.medecinForm.group({
      id:null,
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      assurance: ['', [Validators.required, Validators.maxLength(10)]],
      dateNaissance: ['', [Validators.required, Validators.maxLength(10)]],
      pieceIdRecto: ['', [Validators.required, Validators.maxLength(30)]],
      pieceIdVerso: ['', [Validators.required, Validators.maxLength(30)]],
      assuranceRecto: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      assuranceVerso: ['', [Validators.required, Validators.maxLength(12)]],
      telephone1: ['', [Validators.required, Validators.maxLength(15)]],
      telephone2: ['', [Validators.required, Validators.maxLength(10)]],
      numeroAssure: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(8)]],
      sexe: ['', [Validators.required, Validators.maxLength(10)]],
      fcmtoken: ['', [Validators.required, Validators.maxLength(10)]],
      lieuHabitation: ['', [Validators.required, Validators.maxLength(20)]],
      tauxCouverture:[null, [Validators.required, Validators.maxLength(10)]],
      autreAntecedent:['', [Validators.required, Validators.maxLength(10)]],
      createdAt:['', [Validators.required, Validators.maxLength(10)]],
      updatedAt:['', [Validators.required, Validators.maxLength(10)]],
      version:[null, [Validators.required, Validators.maxLength(10)]],
      active:[true, [Validators.required, Validators.maxLength(10)]],
      userIdentifier:['', [Validators.required, Validators.maxLength(10)]],
      username:['', [Validators.required, Validators.maxLength(10)]],
      salt:['', [Validators.required, Validators.maxLength(10)]]
    })
  }
   SeveData(){

   }
}
