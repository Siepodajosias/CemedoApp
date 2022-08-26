import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { HttpClientModule } from "@angular/common/http";

import { FullCalendarModule } from '@fullcalendar/angular'
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";

import { InfirmerieRoutingModule } from './infirmerie-routing.module';
import { InfirmierFormsComponent } from './composents/infirmier-view/infirmier-forms.component';
import { InfirmierViewComponent } from './composents/infirmier-view/infirmier-view.component';
import { InfirmierDetailComponent } from './composents/infirmier-detail/infirmier-detail.component';
import { DashboardInfirmerieComponent } from './dashboard-infirmerie/dashboard-infirmerie.component';
import { InfirmierCalendrierComponent } from './composents/infirmier-calendrier/infirmier-calendrier.component';
import { InfirmierService } from './service/infirmier.service';

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

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
    MatTableModule ,
    MatDialogModule,
    MatPaginatorModule,
    
    MaterialFileInputModule,

    ReactiveFormsModule,
    FullCalendarModule,
    FullCalendarModule,
    FormsModule,
    ToastrModule.forRoot({}),
    MatCardModule,
    MatFormFieldModule ,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule
  ],providers:[InfirmierService,ToastrService]
})
export class InfirmerieModule { }
