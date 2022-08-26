import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacienView2Component } from './composents/pharmacien-view2/pharmacien-view2.component';
import { MedicamentDetailComponent } from './composents/medicament-detail/medicament-detail.component';
import { MedicamentViewComponent } from './composents/medicament-view/medicament-view.component';
import { PharmacienDetailComponent } from './composents/pharmacien-detail/pharmacien-detail.component';
import { PharmacienFormsComponent } from './composents/pharmacien-view/pharmacien-forms.component';
import { PharmacienViewComponent } from './composents/pharmacien-view/pharmacien-view.component';
import { DashboardPharmacieComponent } from './dashboard-pharmacie/dashboard-pharmacie.component';

const routes: Routes = [
  {
    path: 'dashboard',component:DashboardPharmacieComponent
  },
  {path:'listeMed',component:MedicamentViewComponent},
  {path:'listePhar',component:PharmacienViewComponent},
  {path:'liste',component:PharmacienView2Component},
  {path:'detailMed/:id',component:MedicamentDetailComponent},
  {path:'detailPhar',component:PharmacienDetailComponent},
  {path:'formsPhar',component:PharmacienFormsComponent},
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacieRoutingModule { }
