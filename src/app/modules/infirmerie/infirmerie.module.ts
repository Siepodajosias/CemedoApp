import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { MatIconModule } from "@angular/material/icon";
import { NgApexchartsModule } from "ng-apexcharts";
import { FullCalendarModule } from '@fullcalendar/angular'
import { MatButtonModule } from '@angular/material/button';
import { InfirmerieRoutingModule } from 'src/app/modules/infirmerie/infirmerie-routing.module';
import { InfirmierViewComponent } from 'src/app/modules/infirmerie/composents/infirmier-view/infirmier-view.component';
import { InfirmierDetailComponent } from 'src/app/modules/infirmerie/composents/infirmier-detail/infirmier-detail.component';
import { DashboardInfirmerieComponent } from 'src/app/modules/infirmerie/dashboard-infirmerie/dashboard-infirmerie.component';
import { InfirmierCalendrierComponent } from 'src/app/modules/infirmerie/composents/infirmier-calendrier/infirmier-calendrier.component';
import { InfirmierService } from 'src/app/services/ServiceInfirmerie/infirmier.service';

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
import { HttpClientModule } from '@angular/common/http';
import { ExamenViewComponent } from 'src/app/modules/infirmerie/composents/examen-view/examen-view.component';
import { PartagerModule } from 'src/app/shared-cemedo/partager/partager.module';

@NgModule({
  declarations: [
    InfirmierViewComponent,
    InfirmierDetailComponent,
    DashboardInfirmerieComponent,
    InfirmierCalendrierComponent,
          ExamenViewComponent
  ],
  imports: [
    CommonModule,
    InfirmerieRoutingModule,
    ComponentsModule,
    MatIconModule,
    MatButtonModule,
    NgApexchartsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,

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
    SpeedDialModule,
    MenuModule,
    HttpClientModule,
    PartagerModule
  ],providers:[InfirmierService,MessageService,ConfirmationService]
})
export class InfirmerieModule { }
