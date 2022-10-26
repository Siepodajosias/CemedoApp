import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsableAssuranceComponent } from './responsable-assurance.component';

const routes: Routes = [
  {path:'liste',component:ResponsableAssuranceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsableAssuranceRoutingModule { }
