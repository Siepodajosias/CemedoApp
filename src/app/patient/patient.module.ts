import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { HttpClientModule } from "@angular/common/http";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";

import { PatientRoutingModule } from "./patient-routing.module";
import { ComponentsModule } from "../shared/components/components.module";
import { PatientViewComponent } from './composents/patient-view/patient-view.component';
import { PatientDetailComponent } from './composents/patient-detail/patient-detail.component';
import { PatientRechercherComponent } from './composents/patient-rechercher/patient-rechercher.component';
import { PatientFormsComponent } from './composents/patient-forms/patient-forms.component';
import { PatientDossierComponent } from './composents/patient-dossier/patient-dossier.component';
import { PatientService } from "./service/patient.service";
import { OrdonnanceComponent } from './composents/ordonnance/ordonnance.component';

@NgModule({
  declarations: [ 
    PatientViewComponent, 
    PatientDetailComponent, 
    PatientRechercherComponent, 
    PatientFormsComponent, 
    PatientDossierComponent, OrdonnanceComponent
  ],
  imports: [
    CommonModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    HttpClientModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    PatientRoutingModule,
    NgApexchartsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    ComponentsModule,
  ],providers:[PatientService]
})
export class PatientModule {}
