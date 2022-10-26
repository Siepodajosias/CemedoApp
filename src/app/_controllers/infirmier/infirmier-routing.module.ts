import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfirmierComponent } from './infirmier.component';

const routes: Routes = [
  {path:'liste',component:InfirmierComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfirmierRoutingModule { }
