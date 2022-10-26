import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdonnanceComponent } from './ordonnance.component';

const routes: Routes = [
  {path:'liste',component:OrdonnanceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdonnanceRoutingModule { }
