import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedecinViewComponent } from './composents/medecin-view/medecin-view.component';
import { MedecinDetailComponent } from './composents/medecin-detail/medecin-detail.component';
import { ProfileMedecinComponent } from './composents/profile-medecin/profile-medecin.component';
import { DashboardMedecinComponent } from './dashboard-medecin/dashboard-medecin.component';
import { RapportComponent } from './composents/rapport/rapport.component';
import { MedecinCalendrierComponent } from './composents/medecin-calendrier/medecin-calendrier.component';
import { FactureComponent } from './composents/facture/facture.component';
import { RendezVousCalendrierComponent } from './composents/rendez-vous-calendrier/rendez-vous-calendrier.component';
import { RendezVousViewComponent } from './composents/rendez-vous-view/rendez-vous-view.component';

const routes: Routes = [
  {path: 'dashboard',component:DashboardMedecinComponent},
  {path:'liste',component:MedecinViewComponent},
  {path:'detail/:id',component:MedecinDetailComponent},
  {path:'rapport',component:RapportComponent},
  {path:'calendrier',component:MedecinCalendrierComponent},
  {path:'profile',component:ProfileMedecinComponent},
  {path:'facture',component:FactureComponent},
  {path:'Rdv',component:RendezVousViewComponent},
  {path:'RdvCalendrier',component:RendezVousCalendrierComponent},
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
