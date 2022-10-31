import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { HttpClientModule } from "@angular/common/http";

//import { FullCalendarModule } from '@fullcalendar/angular'
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
    FormsModule,
    ToastrModule.forRoot({}),
    MatCardModule,
    MatFormFieldModule ,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    

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
    ToolbarModule
  ],providers:[InfirmierService,MessageService,ConfirmationService]
})
export class InfirmerieModule { }
