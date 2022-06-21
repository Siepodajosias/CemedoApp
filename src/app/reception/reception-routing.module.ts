import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardReceptionComponent } from './dashboard-reception/dashboard-reception.component';

const routes: Routes = [
  {
    path: 'dashboard',component:DashboardReceptionComponent
  },
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
  /*{path:'liste',component:ComptableViewComponent},
  {path:'detail',component:ComptableDetailComponent},
  {path:'forms',component:ComptableFormsComponent},
  {path:'**',component:ComptableViewComponent},*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
