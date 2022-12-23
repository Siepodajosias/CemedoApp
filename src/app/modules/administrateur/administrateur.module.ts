import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AdministrateurRoutingModule } from "src/app/modules/administrateur/administrateur-routing.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FactureComponent } from "src/app/modules/administrateur/composents/facture/facture.component";
import { AdminService } from "src/app/services/ServiceAdministrateur/admin.service";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { RendezVousCalendrierComponent } from 'src/app/modules/administrateur/composents/rendez-vous-calendrier/rendez-vous-calendrier.component';
import { DepartementComponent} from 'src/app/modules/administrateur/composents/departement/departement.component';
import { FullCalendarModule } from '@fullcalendar/angular';

//primeng
import { CardModule} from 'primeng/card'
import { MessageService } from 'primeng/api';
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
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuModule } from 'primeng/menu';
import { FieldsetModule} from 'primeng/fieldset';
import { HttpClientModule } from '@angular/common/http';
import { MedecinSpecialiteService } from 'src/app/services/ServiceMedecin/medecin-specialite.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ParametrageComponent } from 'src/app/modules/administrateur/composents/parametrage/parametrage.component';
import { PartagerModule } from 'src/app/shared-cemedo/partager/partager.module';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    FactureComponent,
    RendezVousCalendrierComponent,
    DepartementComponent,
    ParametrageComponent
  ],
  imports: [
    CommonModule,
    AdministrateurRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    NgApexchartsModule,
    MatTabsModule,
    MatButtonModule,
    ComponentsModule,
    HttpClientModule,


    FieldsetModule,
    CardModule,
    MultiSelectModule,
    DropdownModule,
    AutoCompleteModule,

    ChipsModule,
    ContextMenuModule,
    ProgressBarModule,
    SliderModule,
    RippleModule,
    OrderListModule,
    DividerModule,
    MenubarModule,
    ToolbarModule,
    SpeedDialModule,
    ReactiveFormsModule,
    MenuModule,
    FullCalendarModule,
    PartagerModule,
    TabViewModule
  ], providers: [AdminService,MessageService,ConfirmationService,MedecinSpecialiteService]
})
export class AdministrateurModule { }
