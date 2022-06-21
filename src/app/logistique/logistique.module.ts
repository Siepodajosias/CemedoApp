import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";

import { LogistiqueRoutingModule } from './logistique-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LogistiqueRoutingModule,
    ComponentsModule
  ]
})
export class LogistiqueModule { }
