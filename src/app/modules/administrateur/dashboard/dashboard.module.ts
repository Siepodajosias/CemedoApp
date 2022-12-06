import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { DashboardRoutingModule } from "src/app/modules/administrateur/dashboard/dashboard-routing.module";
import { MainComponent } from "src/app/modules/administrateur/dashboard/main/main.component";
import { Dashboard2Component } from "src/app/modules/administrateur/dashboard/dashboard2/dashboard2.component";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgApexchartsModule } from "ng-apexcharts";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { DashboardPatientComponent } from 'src/app/modules/patient/dashboard-patient/dashboard-patient.component';
import { DashboardLogistiqueComponent } from 'src/app/modules/logistique/dashboard-logistique/dashboard-logistique.component';
@NgModule({
  declarations: [
    MainComponent,
    Dashboard2Component,
    DashboardPatientComponent,
    DashboardLogistiqueComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    chartjsModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    ComponentsModule,
    SharedModule,
    MatTabsModule,
    MatCheckboxModule 
  ],
})
export class DashboardModule { }
