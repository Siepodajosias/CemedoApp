import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComptableDetailComponent } from 'src/app/modules/comptable/composents/comptable-detail/comptable-detail.component';
import { ComptableViewComponent } from 'src/app/modules/comptable/composents/comptable-view/comptable-view.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('src/app/modules/administrateur/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path:'patient',
    loadChildren: () =>
    import('src/app/modules/patient/patient.module').then((m) =>m.PatientModule),
  },
  {
    path:'medecin',
    loadChildren: () =>
    import('src/app/modules/medecin/medecin.module').then((m) =>m.MedecinModule),
  },
  {
    path: 'assurance',
    loadChildren: () => import('src/app/modules/assurance/assurance.module').then((r) => r.AssuranceModule)
  },
  {
    path:'pharmacie',
    loadChildren:()=> import('src/app/modules/pharmacie/pharmacie.module').then((e)=> e.PharmacieModule)
  },
  {
    path:'reception',
    loadChildren:()=> import('src/app/modules/reception/reception.module').then((r)=>r.ReceptionModule)
  },
  {
    path:'logistique',
    loadChildren:()=>import('src/app/modules/logistique/logistique.module').then((l)=>l.LogistiqueModule)
  },
  {
    path:'informatique',
    loadChildren:()=>import('src/app/modules/informatique/informatique.module').then((i)=>i.InformatiqueModule)
  },
  {
    path:'infirmerie',
    loadChildren:()=>import('src/app/modules/infirmerie/infirmerie.module').then((i)=>i.InfirmerieModule)
  },
  {
    path:'admin',
    loadChildren:()=>import('src/app/modules/administrateur/administrateur.module').then((a)=>a.AdministrateurModule)
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
