import { Page404Component } from 'src/app/modules/authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedecinViewComponent } from 'src/app/modules/medecin/composents/medecin-view/medecin-view.component';
import { MedecinDetailComponent } from 'src/app/modules/medecin/composents/medecin-detail/medecin-detail.component';
import { ProfileMedecinComponent } from 'src/app/modules/medecin/composents/profile-medecin/profile-medecin.component';
import { DashboardMedecinComponent } from 'src/app/modules/medecin/dashboard-medecin/dashboard-medecin.component';
import { RapportComponent } from 'src/app/modules/medecin/composents/rapport/rapport.component';
import { MedecinCalendrierComponent } from 'src/app/modules/medecin/composents/medecin-calendrier/medecin-calendrier.component';
import { FactureComponent } from 'src/app/modules/medecin/composents/facture/facture.component';
import { RendezVousCalendrierComponent } from 'src/app/modules/medecin/composents/rendez-vous-calendrier/rendez-vous-calendrier.component';
import { RendezVousViewComponent } from 'src/app/modules/medecin/composents/rendez-vous-view/rendez-vous-view.component';
import { ProgrammeComponent } from 'src/app/modules/medecin/composents/programme/programme.component';
import { VacanceComponent } from 'src/app/modules/medecin/composents/vacance/vacance.component';

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
  {path:'programme',component:ProgrammeComponent},
  {path:'vacance',component:VacanceComponent},
  {path:'patient',loadChildren:()=>import('src/app/modules/patient/patient.module').then((e)=>e.PatientModule)},
  {
    path: 'assurance',
    loadChildren: () => import('src/app/modules/assurance/assurance.module').then((r) => r.AssuranceModule)
  },
  {path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedecinRoutingModule {}
