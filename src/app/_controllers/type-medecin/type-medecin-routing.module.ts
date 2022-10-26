import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeMedecinComponent } from './type-medecin.component';

const routes: Routes = [
  {path:'liste',component:TypeMedecinComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeMedecinRoutingModule { }
