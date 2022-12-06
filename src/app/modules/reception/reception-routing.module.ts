import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionDetailComponent } from 'src/app/modules/reception/composents/reception-detail/reception-detail.component';
import { ReceptionViewComponent } from 'src/app/modules/reception/composents/reception-view/reception-view.component';
import { DashboardReceptionComponent } from 'src/app/modules/reception/dashboard-reception/dashboard-reception.component';

const routes: Routes = [
  {
    path: 'dashboard',component:DashboardReceptionComponent
  },
  {
    path:'patient',
    loadChildren: () =>
    import('src/app/modules/patient/patient.module').then((m) =>m.PatientModule),
  },
  {
    path:'medecin',
    loadChildren: () =>
    import('src/app/modules/medecin/doctor.module').then((m) =>m.DoctorModule),
  },
  {path:'liste',component:ReceptionViewComponent},
  {path:'detail/:id',component:ReceptionDetailComponent},
  {path:'medecin',loadChildren:() =>import('src/app/modules/medecin/doctor.module').then((m)=>m.DoctorModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
