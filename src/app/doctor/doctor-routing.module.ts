import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedecinViewComponent } from './composents/medecin-view/medecin-view.component';
import { MedecinDetailComponent } from './composents/medecin-detail/medecin-detail.component';
import { MedecinFormsComponent } from './composents/medecin-forms/medecin-forms.component';
import { MedecinRechercheComponent } from './composents/medecin-recherche/medecin-recherche.component';
import { ProfileMedecinComponent } from './composents/profile-medecin/profile-medecin.component';
import { DashboardMedecinComponent } from './dashboard-medecin/dashboard-medecin.component';
import { RapportComponent } from './composents/rapport/rapport.component';
import { MedecinCalendrierComponent } from './composents/medecin-calendrier/medecin-calendrier.component';
const routes: Routes = [
  {path: 'dashboard',component:DashboardMedecinComponent},
  {path:'liste',component:MedecinViewComponent},
  {path:'detail',component:MedecinDetailComponent},
  {path:'forms',component:MedecinFormsComponent},
  {path:'recherche',component:MedecinRechercheComponent},
  {path:'rapport',component:RapportComponent},
  {path:'calendrier',component:MedecinCalendrierComponent},
  {path:'profile',component:ProfileMedecinComponent},
  {path:'patient',loadChildren:()=>import('../patient/patient.module').then((e)=>e.PatientModule)},
  {
    path: 'assurance',
    loadChildren: () => import('../assurance/assurance.module').then((r) => r.AssuranceModule)
  },
  {path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
