import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedecinViewComponent } from './composents/medecin-view/medecin-view.component';
import { MedecinDetailComponent } from './composents/medecin-detail/medecin-detail.component';
import { MedecinFormsComponent } from './composents/medecin-view/medecin-forms.component';
import { ProfileMedecinComponent } from './composents/profile-medecin/profile-medecin.component';
import { DashboardMedecinComponent } from './dashboard-medecin/dashboard-medecin.component';
import { RapportComponent } from './composents/rapport/rapport.component';
import { MedecinCalendrierComponent } from './composents/medecin-calendrier/medecin-calendrier.component';
import { FactureComponent } from './composents/facture/facture.component';
import { MedecinView2Component } from './composents/medecin-view2/medecin-view2.component';

const routes: Routes = [
  {path: 'dashboard',component:DashboardMedecinComponent},
  {path:'liste',component:MedecinViewComponent},
  {path:'liste2',component:MedecinView2Component},
  {path:'detail/:id',component:MedecinDetailComponent},
  {path:'forms',component:MedecinFormsComponent},
  {path:'rapport',component:RapportComponent},
  {path:'calendrier',component:MedecinCalendrierComponent},
  {path:'profile',component:ProfileMedecinComponent},
  {path:'facture',component:FactureComponent},
  
  {path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
