import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssuranceDetailComponent } from './composent/assurance-detail/assurance-detail.component';
import { AssuranceFormsComponent } from './composent/assurance-view/assurance-forms.component';
import { AssuranceViewComponent } from './composent/assurance-view/assurance-view.component';
import { AssuranceView2Component } from './composent/assurance-view2/assurance-view2.component';
import { ResponsableDetailComponent } from './composent/responsable-detail/responsable-detail.component';
import { DashboardAssuranceComponent } from './dashboard-assurance/dashboard-assurance.component';

const routes: Routes = [
  {path: 'dashboard',component:DashboardAssuranceComponent},
  {
    path:'patient',
    loadChildren: () =>
    import('../patient/patient.module').then((m) =>m.PatientModule),
  },
  {path:'liste',component:AssuranceViewComponent},
  {path:'liste2',component:AssuranceView2Component},
  {path:'form',component:AssuranceFormsComponent},
  {path:'detail/:id',component:AssuranceDetailComponent},
  {path:'detailresponsable/:id',component:ResponsableDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssuranceRoutingModule { }
