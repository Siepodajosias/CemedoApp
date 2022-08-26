import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FactureComponent } from "./composents/facture/facture.component";

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path:'facture',component:FactureComponent
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('../patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'comptable',
    loadChildren: () =>
      import('../comptable/comptable.module').then((i) => i.ComptableModule)
  },
  {
    path: 'reception',
    loadChildren: () =>
      import('../reception/reception.module').then((m) => m.ReceptionModule)
  },
  {
    path: 'medecin',
    loadChildren: () =>
      import('../doctor/doctor.module').then((m) => m.DoctorModule),
  }, {
    path: 'infirmerie',
    loadChildren: () =>
      import('../infirmerie/infirmerie.module').then((m) => m.InfirmerieModule),
  },
  {
    path: 'pharmacie',
    loadChildren: () =>
      import('../pharmacie/pharmacie.module').then((m) => m.PharmacieModule),
  },
  {
    path: 'assurance',
    loadChildren: () => import('../assurance/assurance.module').then((r) => r.AssuranceModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
