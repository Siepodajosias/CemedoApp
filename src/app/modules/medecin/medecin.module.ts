import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card'

//import { OwlDateTimeModule, OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MedecinRoutingModule } from "src/app/modules/medecin/medecin-routing.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MedecinViewComponent } from 'src/app/modules/medecin/composents/medecin-view/medecin-view.component';
import { MedecinDetailComponent } from 'src/app/modules/medecin/composents/medecin-detail/medecin-detail.component';
import { ProfileMedecinComponent } from 'src/app/modules/medecin/composents/profile-medecin/profile-medecin.component';
import { DashboardMedecinComponent } from "src/app/modules/medecin/dashboard-medecin/dashboard-medecin.component";
import { RapportComponent } from 'src/app/modules/medecin/composents/rapport/rapport.component';
import { MedecinCalendrierComponent } from 'src/app/modules/medecin/composents/medecin-calendrier/medecin-calendrier.component';
import { MedecinService } from "src/app/services/serviceMedecin/medecin.service";
import { FactureComponent } from "src/app/modules/medecin/composents/facture/facture.component";
import { RendezVousCalendrierComponent } from 'src/app/modules/medecin/composents/rendez-vous-calendrier/rendez-vous-calendrier.component';
import { RendezVousViewComponent } from 'src/app/modules/medecin/composents/rendez-vous-view/rendez-vous-view.component';
import { FullCalendarModule } from '@fullcalendar/angular';

//primeng
import { CardModule} from 'primeng/card'
import { ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule} from 'primeng/table';
import { ButtonModule} from 'primeng/button';
import { DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MultiSelectModule} from 'primeng/multiselect';
import { DropdownModule} from 'primeng/dropdown';
import { AutoCompleteModule} from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { RippleModule } from 'primeng/ripple';
import { OrderListModule } from 'primeng/orderlist';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuModule } from 'primeng/menu';
import { FieldsetModule} from 'primeng/fieldset';
import { HttpClientModule } from '@angular/common/http';
import { EmployeModule } from 'src/app/shared-cemedo/employe/employe.module';
import { TypeMedecinService } from 'src/app/services/serviceMedecin/type-medecin.service';
import { MedecinSpecialiteService } from 'src/app/services/serviceMedecin/medecin-specialite.service';


@NgModule({
  declarations: [
    MedecinViewComponent,
    MedecinDetailComponent,
    ProfileMedecinComponent,
    DashboardMedecinComponent,
    RapportComponent,
    MedecinCalendrierComponent,
    FactureComponent,
    RendezVousCalendrierComponent,
    RendezVousViewComponent

  ],
  imports: [
    CommonModule,
    MedecinRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    FullCalendarModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    NgApexchartsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSortModule,
    MatTabsModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    DragDropModule,
    ComponentsModule,
    /*OwlDateTimeModule,
    OwlNativeDateTimeModule*/

    HttpClientModule,
    CardModule,
    TableModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    MultiSelectModule,
    DropdownModule,
    AutoCompleteModule,
    ChipsModule,
    ContextMenuModule,
    ProgressBarModule,
    SliderModule,
    RippleModule,
    OrderListModule,
    DividerModule ,
    MenubarModule, 
    ToolbarModule,
    CalendarModule,
    SpeedDialModule,
    MenuModule,
    FieldsetModule,
    EmployeModule

  ], providers: [MedecinService,MessageService ,
                ConfirmationService,TypeMedecinService,MedecinSpecialiteService

    //{provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'},

  ]
})
export class MedecinModule { }
