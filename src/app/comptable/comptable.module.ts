import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";
import { HttpClientModule } from "@angular/common/http";
import { ComptableRoutingModule } from './comptable-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ComptableViewComponent } from './composents/comptable-view/comptable-view.component';
import { ComptableFormsComponent } from './composents/comptable-view/comptable-forms.component';
import { ComptableDetailComponent } from './composents/comptable-detail/comptable-detail.component';
import { ComptableService } from './service/comptable.service';
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


@NgModule({
  declarations: [
    ComptableViewComponent,
    ComptableFormsComponent,
    ComptableDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
    MenuModule
    

  ], providers: [ComptableService,MessageService,ConfirmationService]
})
export class ComptableModule { }
