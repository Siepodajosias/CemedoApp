import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";

import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { HttpClientModule } from "@angular/common/http";

import { InfirmerieRoutingModule } from './infirmerie-routing.module';
import { InfirmierFormsComponent } from './composents/infirmier-forms/infirmier-forms.component';
import { InfirmierViewComponent } from './composents/infirmier-view/infirmier-view.component';
import { InfirmierDetailComponent } from './composents/infirmier-detail/infirmier-detail.component';
import { DashboardInfirmerieComponent } from './dashboard-infirmerie/dashboard-infirmerie.component';
import { InfirmierCalendrierComponent } from './composents/infirmier-calendrier/infirmier-calendrier.component';
import { InfirmierService } from './service/infirmier.service';

@NgModule({
  declarations: [
    InfirmierFormsComponent,
    InfirmierViewComponent,
    InfirmierDetailComponent,
    DashboardInfirmerieComponent,
    InfirmierCalendrierComponent
  ],
  imports: [
    CommonModule,
    InfirmerieRoutingModule,
    HttpClientModule,
    ComponentsModule,
    MatIconModule,
    NgApexchartsModule,
    MatTabsModule,
  ],providers:[InfirmierService]
})
export class InfirmerieModule { }
