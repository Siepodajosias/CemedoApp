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

import { ReceptionDetailComponent } from './composents/reception-detail/reception-detail.component';
import { ReceptionViewComponent } from './composents/reception-view/reception-view.component';
import { ReceptionFormComponent } from './composents/reception-view/reception-form.component';


import { ReceptionRoutingModule } from './reception-routing.module';
import { DashboardReceptionComponent } from './dashboard-reception/dashboard-reception.component';
import { ReceptionService } from './service/reception.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    DashboardReceptionComponent,
    ReceptionDetailComponent,
    ReceptionFormComponent,
    ReceptionViewComponent
    
  ],
  imports: [
    CommonModule,
    HttpClientModule ,
    ReceptionRoutingModule,
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

  ],providers:[ReceptionService,ToastrService]
})
export class ReceptionModule { }
