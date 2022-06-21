import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";
import { HttpClientModule } from "@angular/common/http"
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";

import { AssuranceRoutingModule } from './assurance-routing.module';
import { DashboardAssuranceComponent } from './dashboard-assurance/dashboard-assurance.component';

@NgModule({
  declarations: [
    DashboardAssuranceComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AssuranceRoutingModule,
    ComponentsModule,
    MatIconModule,
    NgApexchartsModule,
    MatTabsModule,
  ]
})
export class AssuranceModule { }
