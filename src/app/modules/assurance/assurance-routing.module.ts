import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssuranceDetailComponent } from 'src/app/modules/assurance/composent/assurance-detail/assurance-detail.component';
import { AssuranceViewComponent } from 'src/app/modules/assurance/composent/assurance-view/assurance-view.component';
import { AssuranceView2Component } from 'src/app/modules/assurance/composent/assurance-view2/assurance-view2.component';
import { ResponsableDetailComponent } from 'src/app/modules/assurance/composent/responsable-detail/responsable-detail.component';
import { DashboardAssuranceComponent } from 'src/app/modules/assurance/dashboard-assurance/dashboard-assurance.component';

const routes: Routes = [
  {path: 'dashboard',component:DashboardAssuranceComponent},
  {
    path:'patient',
    loadChildren: () =>
    import('src/app/modules/patient/patient.module').then((m) =>m.PatientModule),
  },
  {path:'liste',component:AssuranceViewComponent},
  {path:'liste2',component:AssuranceView2Component},
  {path:'detail/:id',component:AssuranceDetailComponent},
  {path:'detailresponsable/:id',component:ResponsableDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssuranceRoutingModule { }
