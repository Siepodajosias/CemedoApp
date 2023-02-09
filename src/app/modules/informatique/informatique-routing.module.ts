import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardInformatiqueComponent } from 'src/app/modules/informatique/dashboard-informatique/dashboard-informatique.component';
import { InformaticienViewComponent } from 'src/app/modules/informatique/composents/informaticien-view/informaticien-view.component';
const routes: Routes = [
  {path: 'dashboard',component:DashboardInformatiqueComponent},
  {
    path:'patient',
    loadChildren: () =>
    import('src/app/modules/patient/patient.module').then((m) =>m.PatientModule),
  },
  {
    path:'medecin',
    loadChildren: () =>
    import('src/app/modules/medecin/medecin.module').then((m) =>m.MedecinModule),
  },
  {path:'informaticien',component:InformaticienViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformatiqueRoutingModule { }
