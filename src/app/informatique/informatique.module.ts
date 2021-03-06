import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";


import { InformatiqueRoutingModule } from './informatique-routing.module';
import { DashboardInformatiqueComponent } from './dashboard-informatique/dashboard-informatique.component';
import { InformaticienService } from './service/informaticien.service';

@NgModule({
  declarations: [
    DashboardInformatiqueComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule ,
    InformatiqueRoutingModule,
    ComponentsModule ,
    MatIconModule,
    NgApexchartsModule,
    MatTabsModule,
  ],
  providers:[InformaticienService]
})
export class InformatiqueModule { }
