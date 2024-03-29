import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { LogistiqueRoutingModule } from 'src/app/modules/logistique/logistique-routing.module';


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
import { MaterielViewComponent } from 'src/app/modules/logistique/composents/materiel-view/materiel-view.component';
import { HttpClientModule } from '@angular/common/http';
import { PartagerModule } from 'src/app/shared-cemedo/partager/partager.module';


@NgModule({
  declarations: [
    MaterielViewComponent
  ],
  imports: [
    CommonModule,
    LogistiqueRoutingModule,
    ComponentsModule,
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
    FieldsetModule,
    HttpClientModule,
    PartagerModule
  ],providers:[ConfirmationService,MessageService]
})
export class LogistiqueModule { }
