import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionDetailComponent } from './composents/reception-detail/reception-detail.component';
import { ReceptionViewComponent } from './composents/reception-view/reception-view.component';
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
  {path:'liste',component:ReceptionViewComponent},
  {path:'detail/:id',component:ReceptionDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
