import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffectionComponent } from './affection.component';

const routes: Routes = [
  {path:'liste',component:AffectionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffectionRoutingModule { }
