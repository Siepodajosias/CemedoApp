import { Page404Component } from './../../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialiteComponent } from './../specialite/specialite.component';

const routes: Routes = [

  {path:'liste',component:SpecialiteComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  SpecialiteRoutingModule {}
