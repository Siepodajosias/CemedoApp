import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterielViewComponent } from './composents/materiel-view/materiel-view.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../admin/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {path:'materiel',component:MaterielViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogistiqueRoutingModule { }
