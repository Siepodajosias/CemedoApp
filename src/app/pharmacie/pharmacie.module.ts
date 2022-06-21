import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";


import { PharmacieRoutingModule } from './pharmacie-routing.module';
import { MedicamentViewComponent } from './composents/medicament-view/medicament-view.component';
import { PharmacienViewComponent } from './composents/pharmacien-view/pharmacien-view.component';
import { PharmacienFormsComponent } from './composents/pharmacien-forms/pharmacien-forms.component';
import { PharmacienDetailComponent } from './composents/pharmacien-detail/pharmacien-detail.component';
import { MedicamentDetailComponent } from './composents/medicament-detail/medicament-detail.component';
import { MedicamentFormsComponent } from './composents/medicament-forms/medicament-forms.component';
import { MedicamentRechercheComponent } from './composents/medicament-recherche/medicament-recherche.component';
import { DashboardPharmacieComponent } from './dashboard-pharmacie/dashboard-pharmacie.component';
import { PharmacienService } from './service/pharmacien.service';

@NgModule({
  declarations: [
    MedicamentViewComponent,
    PharmacienViewComponent,
    PharmacienFormsComponent,
    PharmacienDetailComponent,
    MedicamentDetailComponent,
    MedicamentFormsComponent,
    MedicamentRechercheComponent,
    DashboardPharmacieComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PharmacieRoutingModule,
    ComponentsModule,
    MatIconModule,
    NgApexchartsModule,
    MatTabsModule,
  ],providers:[PharmacienService]
})
export class PharmacieModule { }
