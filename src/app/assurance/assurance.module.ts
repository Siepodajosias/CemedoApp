import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";
import { HttpClientModule } from "@angular/common/http"
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssuranceRoutingModule } from './assurance-routing.module';
import { DashboardAssuranceComponent } from './dashboard-assurance/dashboard-assurance.component';
import { ToastrService,ToastrModule } from 'ngx-toastr';
import { AssuranceViewComponent } from './composent/assurance-view/assurance-view.component';
import { AssuranceFormsComponent } from './composent/assurance-view/assurance-forms.component';
import { AssuranceDetailComponent } from './composent/assurance-detail/assurance-detail.component';
import { AssuranceService } from './service/assurance.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AssuranceView2Component } from './composent/assurance-view2/assurance-view2.component';
import { ResponsableComponent } from './composent/assurance-view/responsable.component';
import { ResponsableDetailComponent } from './composent/responsable-detail/responsable-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import { ChartsModule as chartjsModule } from "ng2-charts";

@NgModule({
  declarations: [
    DashboardAssuranceComponent,
    AssuranceViewComponent,
    AssuranceFormsComponent,
    AssuranceDetailComponent,
    AssuranceView2Component,
    ResponsableComponent,
    ResponsableDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AssuranceRoutingModule,
    ComponentsModule,
    MatIconModule,
    MatMenuModule,

    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),

    MatFormFieldModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule ,
    MatDialogModule,
    MatPaginatorModule,
    ToastrModule.forRoot({})
  ],providers:[ToastrService,AssuranceService]
})
export class AssuranceModule { }
