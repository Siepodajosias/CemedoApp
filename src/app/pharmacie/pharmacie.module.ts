import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";

import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";


import { PharmacieRoutingModule } from './pharmacie-routing.module';
import { MedicamentViewComponent } from './composents/medicament-view/medicament-view.component';
import { PharmacienViewComponent } from './composents/pharmacien-view/pharmacien-view.component';
import { PharmacienFormsComponent } from './composents/pharmacien-view/pharmacien-forms.component';
import { PharmacienDetailComponent } from './composents/pharmacien-detail/pharmacien-detail.component';
import { MedicamentDetailComponent } from './composents/medicament-detail/medicament-detail.component';
import { MedicamentFormsComponent } from './composents/medicament-view/medicament-forms.component';
import { DashboardPharmacieComponent } from './dashboard-pharmacie/dashboard-pharmacie.component';
import { PharmacienService } from './service/pharmacien.service';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PharmacienView2Component } from './composents/pharmacien-view2/pharmacien-view2.component';

@NgModule({
  declarations: [
    MedicamentViewComponent,
    PharmacienViewComponent,
    PharmacienFormsComponent,
    PharmacienDetailComponent,
    MedicamentDetailComponent,
    MedicamentFormsComponent,
    DashboardPharmacieComponent,
    PharmacienView2Component
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PharmacieRoutingModule,
    ComponentsModule,
    MatIconModule,
    NgApexchartsModule,
    MatTabsModule,
    MatTableModule ,
    MatDialogModule,
    MatPaginatorModule,
    ToastrModule.forRoot({}),
    MatCardModule,
    MatFormFieldModule ,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule, 
    FormsModule
  ],providers:[PharmacienService,ToastrService]
})
export class PharmacieModule { }
