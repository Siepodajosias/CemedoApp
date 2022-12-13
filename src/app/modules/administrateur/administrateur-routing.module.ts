import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FactureComponent } from "src/app/modules/administrateur/composents/facture/facture.component";
import { RendezVousCalendrierComponent } from 'src/app/modules/administrateur/composents/rendez-vous-calendrier/rendez-vous-calendrier.component';
import { DepartementComponent } from 'src/app/modules/administrateur/composents/departement/departement.component';
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('src/app/modules/administrateur/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path:'departement',component:DepartementComponent
  },
  {
    path:'facture',component:FactureComponent
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('src/app/modules/patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'comptable',
    loadChildren: () =>
      import('src/app/modules/comptable/comptable.module').then((i) => i.ComptableModule)
  },
  {
    path: 'reception',
    loadChildren: () =>
      import('src/app/modules/reception/reception.module').then((m) => m.ReceptionModule)
  },
  {
    path: 'medecin',
    loadChildren: () =>
      import('src/app/modules/medecin/medecin.module').then((m) => m.MedecinModule),
  }, {
    path: 'infirmerie',
    loadChildren: () =>
      import('src/app/modules/infirmerie/infirmerie.module').then((m) => m.InfirmerieModule),
  },
  {
    path: 'pharmacie',
    loadChildren: () =>
      import('src/app/modules/pharmacie/pharmacie.module').then((m) => m.PharmacieModule),
  },
  {
    path: 'assurance',
    loadChildren: () => import('src/app/modules/assurance/assurance.module').then((r) => r.AssuranceModule)
  },
  {path:'calendrier',component:RendezVousCalendrierComponent},
  {path:'informatique',loadChildren:()=>import('src/app/modules/informatique/informatique.module').then((m)=>m.InformatiqueModule)},
  {path:'logistique',loadChildren:()=>import('src/app/modules/logistique/logistique.module').then((m)=>m.LogistiqueModule)},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrateurRoutingModule { }
