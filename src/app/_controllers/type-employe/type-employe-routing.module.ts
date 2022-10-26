import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeEmployeComponent } from './type-employe.component';

const routes: Routes = [
  {path:'liste',component:TypeEmployeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeEmployeRoutingModule { }
