import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfirmierCalendrierComponent } from 'src/app/modules/infirmerie/composents/infirmier-calendrier/infirmier-calendrier.component';
import { InfirmierDetailComponent } from 'src/app/modules/infirmerie/composents/infirmier-detail/infirmier-detail.component';
import { InfirmierViewComponent } from 'src/app/modules/infirmerie/composents/infirmier-view/infirmier-view.component';
import { DashboardInfirmerieComponent } from 'src/app/modules/infirmerie/dashboard-infirmerie/dashboard-infirmerie.component';

const routes: Routes = [
  {path: 'dashboard',component:DashboardInfirmerieComponent},
  {path:'liste',component:InfirmierViewComponent},
  {path:'detail',component:InfirmierDetailComponent},
  {path:'calendrier',component:InfirmierCalendrierComponent},
  {
    path:'patient',
    loadChildren: () =>
    import('src/app/modules/patient/patient.module').then((m) =>m.PatientModule),
  },{
    path:'medecin',
    loadChildren: () =>
    import('src/app/modules/medecin/doctor.module').then((m) =>m.DoctorModule),
  },
  {
    path: 'assurance',
    loadChildren: () => import('src/app/modules/assurance/assurance.module').then((r) => r.AssuranceModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfirmerieRoutingModule { }
