import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeServiceComponent } from './type-service.component';

const routes: Routes = [
  {path:'liste',component:TypeServiceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeServiceRoutingModule { }
