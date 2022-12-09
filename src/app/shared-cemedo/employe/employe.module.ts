import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeService } from 'src/app/shared-cemedo/employe/employe.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],providers:[
          EmployeService
  ]
})
export class EmployeModule { }
