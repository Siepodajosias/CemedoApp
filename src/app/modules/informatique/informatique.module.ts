import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
//components
import { InformatiqueRoutingModule } from 'src/app/modules/informatique/informatique-routing.module';
import { DashboardInformatiqueComponent } from 'src/app/modules/informatique/dashboard-informatique/dashboard-informatique.component';
import { InformaticienService } from 'src/app/services/ServiceInformatique/informaticien.service';
import { InformaticienViewComponent } from 'src/app/modules/informatique/composents/informaticien-view/informaticien-view.component';

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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardInformatiqueComponent,
    InformaticienViewComponent
  ],
  imports: [
    CommonModule,
    InformatiqueRoutingModule,
    ComponentsModule ,
    MatIconModule,
    NgApexchartsModule,
    MatTabsModule,
    ReactiveFormsModule,

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
    HttpClientModule,

  ],
  providers:[InformaticienService,MessageService,ConfirmationService]
})
export class InformatiqueModule { }
