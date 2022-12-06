import { Page404Component } from 'src/app/modules/authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientViewComponent } from 'src/app/modules/patient/composents/patient-view/patient-view.component';
import { PatientDetailComponent } from 'src/app/modules/patient/composents/patient-detail/patient-detail.component';
import { PatientFormsComponent } from 'src/app/modules/patient/composents/patient-view2/patient-forms.component';
import { PatientDossierComponent } from 'src/app/modules/patient/composents/patient-dossier/patient-dossier.component';
import { DashboardPatientComponent } from 'src/app/modules/patient/dashboard-patient/dashboard-patient.component';
import { OrdonnanceComponent } from 'src/app/modules/patient/composents/ordonnance/ordonnance.component';

const routes: Routes = [
  {path: 'dashboard',component:DashboardPatientComponent},
  {path:'liste',component:PatientViewComponent},
  {path:'detail/:id',component:PatientDetailComponent},
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
