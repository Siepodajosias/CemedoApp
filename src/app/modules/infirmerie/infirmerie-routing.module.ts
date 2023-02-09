import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfirmierCalendrierComponent } from 'src/app/modules/infirmerie/composents/infirmier-calendrier/infirmier-calendrier.component';
import { InfirmierDetailComponent } from 'src/app/modules/infirmerie/composents/infirmier-detail/infirmier-detail.component';
import { InfirmierViewComponent } from 'src/app/modules/infirmerie/composents/infirmier-view/infirmier-view.component';
import { DashboardInfirmerieComponent } from 'src/app/modules/infirmerie/dashboard-infirmerie/dashboard-infirmerie.component';
import { ExamenViewComponent } from 'src/app/modules/infirmerie/composents/examen-view/examen-view.component';

const routes: Routes = [
  {path: 'dashboard',component:DashboardInfirmerieComponent},
  {path:'liste',component:InfirmierViewComponent},
  {path:'detail',component:InfirmierDetailComponent},
  {path:'calendrier',component:InfirmierCalendrierComponent},
  {path:'examen',component: ExamenViewComponent},
  {
    path:'patient',
    loadChildren: () =>
    import('src/app/modules/patient/patient.module').then((m) =>m.PatientModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfirmerieRoutingModule { }
