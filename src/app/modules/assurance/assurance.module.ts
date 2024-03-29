import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssuranceRoutingModule } from 'src/app/modules/assurance/assurance-routing.module';
import { DashboardAssuranceComponent } from 'src/app/modules/assurance/dashboard-assurance/dashboard-assurance.component';
import { AssuranceViewComponent } from 'src/app/modules/assurance/composent/assurance-view/assurance-view.component';
import { AssuranceDetailComponent } from 'src/app/modules/assurance/composent/assurance-detail/assurance-detail.component';
import { AssuranceService } from 'src/app/services/ServiceAssurance/assurance.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ChartsModule as chartjsModule } from "ng2-charts";

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
import { CalendarModule} from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { PartagerModule } from 'src/app/shared-cemedo/partager/partager.module';
import { StatistiqueComponent } from 'src/app/modules/assurance/composent/statistique/statistique.component';

@NgModule({
  declarations: [
    DashboardAssuranceComponent,
    AssuranceViewComponent,
    AssuranceDetailComponent,
    StatistiqueComponent
  ],
  imports: [
    CommonModule,
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
    HttpClientModule,

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
    DividerModule ,
    MenubarModule, 
    ToolbarModule,
    PartagerModule

  ],providers:[MessageService,ConfirmationService,AssuranceService]
})
export class AssuranceModule { }
