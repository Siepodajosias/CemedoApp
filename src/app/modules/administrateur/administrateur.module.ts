import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { HttpClientModule } from "@angular/common/http"
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AdministrateurRoutingModule } from "src/app/modules/administrateur/administrateur-routing.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FactureComponent } from "src/app/modules/administrateur/composents/facture/facture.component";
import { AdminService } from "src/app/services/serviceAdministrateur/admin.service";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { RendezVousCalendrierComponent } from 'src/app/modules/administrateur/composents/rendez-vous-calendrier/rendez-vous-calendrier.component';
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


@NgModule({
  declarations: [
    FactureComponent,
    RendezVousCalendrierComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdministrateurRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    NgApexchartsModule,
    MatTabsModule,
    MatButtonModule,
    ComponentsModule,


    FieldsetModule,
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
    FullCalendarModule
  ], providers: [AdminService,MessageService,ConfirmationService]
})
export class AdministrateurModule { }
