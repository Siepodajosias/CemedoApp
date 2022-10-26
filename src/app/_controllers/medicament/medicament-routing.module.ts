import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentComponent } from './medicament.component';

const routes: Routes = [
  {path:'liste',component:MedicamentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicamentRoutingModule { }
