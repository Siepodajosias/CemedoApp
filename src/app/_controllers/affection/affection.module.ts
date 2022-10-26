import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffectionRoutingModule } from './affection-routing.module';
import { AffectionComponent } from './affection.component';


@NgModule({
  declarations: [
   // AffectionComponent
  ],
  imports: [
    CommonModule,
    AffectionRoutingModule
  ]
})
export class AffectionModule { }
