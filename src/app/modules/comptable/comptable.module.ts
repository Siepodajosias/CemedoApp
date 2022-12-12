import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { ComptableRoutingModule } from 'src/app/modules/comptable/comptable-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ComptableViewComponent } from 'src/app/modules/comptable/composents/comptable-view/comptable-view.component';
import { ComptableDetailComponent } from 'src/app/modules/comptable/composents/comptable-detail/comptable-detail.component';
import { ComptableService } from 'src/app/services/serviceComptable/comptable.service';
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MaterialFileInputModule } from 'ngx-material-file-input';

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
import { EmployeModule } from 'src/app/shared-cemedo/employe/employe.module';


@NgModule({
  declarations: [
    ComptableViewComponent,
    ComptableDetailComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule ,
    MatDialogModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    MatPaginatorModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ComptableRoutingModule,
    ComponentsModule,

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
    HttpClientModule,
    EmployeModule
  ], providers: [ComptableService,MessageService,ConfirmationService]
})
export class ComptableModule { }
