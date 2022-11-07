import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComptableDetailComponent } from './composents/comptable-detail/comptable-detail.component';
import { ComptableViewComponent } from './composents/comptable-view/comptable-view.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../admin/dashboard/dashboard.module').then((m) => m.DashboardModule),
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
  {
    path: 'assurance',
    loadChildren: () => import('../assurance/assurance.module').then((r) => r.AssuranceModule)
  },
  {
    path:'pharmacie',
    loadChildren:()=> import('../pharmacie/pharmacie.module').then((e)=> e.PharmacieModule)
  },
  {path:'liste',component:ComptableViewComponent},
  {path:'detail',component:ComptableDetailComponent},
  {path:'**',component:ComptableViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComptableRoutingModule { }
