import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";

import { ReceptionRoutingModule } from './reception-routing.module';
import { DashboardReceptionComponent } from './dashboard-reception/dashboard-reception.component';
import { ReceptionService } from './service/reception.service';

@NgModule({
  declarations: [
    DashboardReceptionComponent
    
  ],
  imports: [
    CommonModule,
    HttpClientModule ,
    ReceptionRoutingModule,
    ComponentsModule,
    MatIconModule,
    NgApexchartsModule,
    MatTabsModule,

  ],providers:[ReceptionService]
})
export class ReceptionModule { }
