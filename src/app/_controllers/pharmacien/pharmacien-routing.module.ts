import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacienComponent } from './pharmacien.component';

const routes: Routes = [
  {path:'liste',component:PharmacienComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacienRoutingModule { }
