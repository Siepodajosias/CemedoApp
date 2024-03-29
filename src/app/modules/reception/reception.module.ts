import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";

import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { ToastrModule} from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";

import { ReceptionDetailComponent } from 'src/app/modules/reception/composents/reception-detail/reception-detail.component';
import { ReceptionViewComponent } from 'src/app/modules/reception/composents/reception-view/reception-view.component';


import { ReceptionRoutingModule } from 'src/app/modules/reception/reception-routing.module';
import { DashboardReceptionComponent } from 'src/app/modules/reception/dashboard-reception/dashboard-reception.component';
import { ReceptionService } from 'src/app/services/ServiceReception/reception.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

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
import { PartagerModule } from 'src/app/shared-cemedo/partager/partager.module';


@NgModule({
  declarations: [
    DashboardReceptionComponent,
    ReceptionDetailComponent,
    ReceptionViewComponent
    
  ],
  imports: [
    CommonModule,
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
    FormsModule,
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
    SpeedDialModule,
    MenuModule,
    PartagerModule

  ],providers:[ReceptionService,ConfirmationService,MessageService]
})
export class ReceptionModule { }
