import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientViewComponent } from './composents/patient-view/patient-view.component';
import { PatientDetailComponent } from './composents/patient-detail/patient-detail.component';
import { PatientFormsComponent } from './composents/patient-view2/patient-forms.component';
import { PatientDossierComponent } from './composents/patient-dossier/patient-dossier.component';
import { DashboardPatientComponent } from './dashboard-patient/dashboard-patient.component';
import { OrdonnanceComponent } from './composents/ordonnance/ordonnance.component';
import { PatientView2Component } from './composents/patient-view2/patient-view2.component';
import { PatientView3Component } from './composents/patient-view3/patient-view3.component';
import { PatientRechercherComponent } from './composents/Patient-rechercher/patient-rechercher.component';
const routes: Routes = [
  {path: 'dashboard',component:DashboardPatientComponent},
  {path:'liste',component:PatientViewComponent},
  {path:'liste2',component:PatientView2Component},
  {path:'liste3',component:PatientView3Component},
  {path:'detail/:id',component:PatientDetailComponent},
  {path:'recherche',component:PatientRechercherComponent},
  {path:'forms',component:PatientFormsComponent},
  {path:'ordonnance',component:OrdonnanceComponent},
  {path:'dossier',component:PatientDossierComponent},
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
