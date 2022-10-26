import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichierComponent } from './fichier.component';

const routes: Routes = [
  {path:'liste',component:FichierComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichierRoutingModule { }
