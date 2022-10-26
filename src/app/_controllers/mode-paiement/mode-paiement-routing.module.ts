import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModePaiementComponent } from './mode-paiement.component';

const routes: Routes = [
  {path:'liste',component:ModePaiementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModePaiementRoutingModule { }
