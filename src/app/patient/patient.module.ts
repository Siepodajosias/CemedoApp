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
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule} from '@angular/material/chips';
import { MatTableModule} from '@angular/material/table';

import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';

import { PatientRoutingModule } from "./patient-routing.module";
import { ComponentsModule } from "../shared/components/components.module";
import { PatientViewComponent } from './composents/patient-view/patient-view.component';
import { PatientDetailComponent } from './composents/patient-detail/patient-detail.component';
import { PatientFormsComponent } from './composents/patient-view2/patient-forms.component';
import { PatientDossierComponent } from './composents/patient-dossier/patient-dossier.component';
import { PatientService } from "./service/patient.service";
import { OrdonnanceComponent } from './composents/ordonnance/ordonnance.component';
import { PatientView2Component } from './composents/patient-view2/patient-view2.component';
import { PatientView3Component } from './composents/patient-view3/patient-view3.component';

import { PatientRechercherComponent } from "./composents/Patient-rechercher/patient-rechercher.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ 
    PatientViewComponent, 
    PatientDetailComponent,
    PatientFormsComponent, 
    PatientDossierComponent, 
    OrdonnanceComponent, PatientView2Component, 
    PatientView3Component,
    PatientRechercherComponent
  ],
  imports: [
    CommonModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    HttpClientModule,
    SharedModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatButtonModule,
    MatChipsModule,
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
    MatDialogModule,

    ToastrModule.forRoot({}),
    MatCardModule,
    ReactiveFormsModule, 
    FormsModule
  ],providers:[PatientService,ToastrService]
})
export class PatientModule {}