import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssuranceDetailComponent } from 'src/app/modules/assurance/composent/assurance-detail/assurance-detail.component';
import { AssuranceViewComponent } from 'src/app/modules/assurance/composent/assurance-view/assurance-view.component';
import { DashboardAssuranceComponent } from 'src/app/modules/assurance/dashboard-assurance/dashboard-assurance.component';
import { StatistiqueComponent } from 'src/app/modules/assurance/composent/statistique/statistique.component';

const routes: Routes = [
  {path: 'dashboard',component:DashboardAssuranceComponent},
  {
    path:'patient',
    loadChildren: () =>
    import('src/app/modules/patient/patient.module').then((m) =>m.PatientModule),
  },
  {path:'liste',component:AssuranceViewComponent},
  {path:'statistique', component:StatistiqueComponent},
  {path:'detail/:id',component:AssuranceDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssuranceRoutingModule { }
