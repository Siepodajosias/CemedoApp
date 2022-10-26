import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeFichierMedicalComponent } from './type-fichier-medical.component';

const routes: Routes = [
  {path:'liste',component:TypeFichierMedicalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeFichierMedicalRoutingModule { }
