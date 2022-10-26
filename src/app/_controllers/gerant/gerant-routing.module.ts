import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerantComponent } from './gerant.component';

const routes: Routes = [
  {path:'liste',component:GerantComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerantRoutingModule { }
