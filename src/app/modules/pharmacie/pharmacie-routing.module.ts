import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentDetailComponent } from 'src/app/modules/pharmacie/composents/medicament-detail/medicament-detail.component';
import { MedicamentViewComponent } from 'src/app/modules/pharmacie/composents/medicament-view/medicament-view.component';
import { PharmacienDetailComponent } from 'src/app/modules/pharmacie/composents/pharmacien-detail/pharmacien-detail.component';
import { PharmacienViewComponent } from 'src/app/modules/pharmacie/composents/pharmacien-view/pharmacien-view.component';
import { DashboardPharmacieComponent } from 'src/app/modules/pharmacie/dashboard-pharmacie/dashboard-pharmacie.component';
import { DepenseViewComponent } from 'src/app/modules/pharmacie/composents/depense-view/depense-view.component';
import { VenteViewComponent } from 'src/app/modules/pharmacie/composents/vente-view/vente-view.component';
import { CategorieMedicamentViewComponent } from 'src/app/modules/pharmacie/composents/categorie-medicament-view/categorie-medicament-view.component';
const routes: Routes = [
  {
    path: 'dashboard',component:DashboardPharmacieComponent
  },
  {path:'listeMed',component:MedicamentViewComponent},
  {path:'listePhar',component:PharmacienViewComponent},
  {path:'detailMed/:id',component:MedicamentDetailComponent},
  {path:'detailPhar',component:PharmacienDetailComponent},
  {path:'listeVente',component:VenteViewComponent},
  {path:'listeDepense',component:DepenseViewComponent},
  {path:'listeCDM',component:CategorieMedicamentViewComponent},
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacieRoutingModule { }
