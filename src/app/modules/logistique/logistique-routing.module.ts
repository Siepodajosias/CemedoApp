import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterielViewComponent } from 'src/app/modules/logistique/composents/materiel-view/materiel-view.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('src/app/modules/administrateur/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {path:'materiel',component:MaterielViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogistiqueRoutingModule { }
