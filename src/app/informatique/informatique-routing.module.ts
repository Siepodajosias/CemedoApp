import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardInformatiqueComponent } from './dashboard-informatique/dashboard-informatique.component';
import { InformaticienViewComponent } from './composents/informaticien-view/informaticien-view.component';
const routes: Routes = [
  {path: 'dashboard',component:DashboardInformatiqueComponent},
  {
    path:'patient',
    loadChildren: () =>
    import('../patient/patient.module').then((m) =>m.PatientModule),
  },
  {
    path:'medecin',
    loadChildren: () =>
    import('../doctor/doctor.module').then((m) =>m.DoctorModule),
  },
  {path:'informaticien',component:InformaticienViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformatiqueRoutingModule { }
