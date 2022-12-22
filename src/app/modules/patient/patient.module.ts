import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule} from '@angular/material/chips';
import { MatTableModule} from '@angular/material/table';

import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { ToastrModule} from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';

import { PatientRoutingModule } from "src/app/modules/patient/patient-routing.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { PatientViewComponent } from 'src/app/modules/patient/composents/patient-view/patient-view.component';
import { PatientDetailComponent } from 'src/app/modules/patient/composents/patient-detail/patient-detail.component';
import { PatientFormsComponent } from 'src/app/modules/patient/composents/patient-view2/patient-forms.component';
import { PatientDossierComponent } from 'src/app/modules/patient/composents/patient-dossier/patient-dossier.component';
import { PatientService } from "src/app/services/ServicePatient/patient.service";
import { OrdonnanceComponent } from 'src/app/modules/patient/composents/ordonnance/ordonnance.component';

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

import { SharedModule } from "src/app/shared/shared.module";
import { HttpClientModule } from '@angular/common/http';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { MedecinService } from 'src/app/services/ServiceMedecin/medecin.service';

@NgModule({
  declarations: [ 
    PatientViewComponent, 
    PatientDetailComponent,
    PatientFormsComponent, 
    PatientDossierComponent, 
    OrdonnanceComponent,

  ],
	imports: [
		CommonModule,
		chartjsModule,
		NgxEchartsModule.forRoot({
			echarts: () => import('echarts'),
		}),
		SharedModule,
		PerfectScrollbarModule,
		MatIconModule,
		MatTableModule,
		MatMenuModule,
		MatPaginatorModule,
		MatButtonModule,
		MatChipsModule,
		PatientRoutingModule,
		NgApexchartsModule,
		MatSnackBarModule,
		MatFormFieldModule,
		MatTabsModule,
		MatDatepickerModule,
		MatSelectModule,
		MatCheckboxModule,
		MatInputModule,
		MatTooltipModule,
		MatRadioModule,
		ComponentsModule,
		MatDialogModule,
		HttpClientModule,

		ToastrModule.forRoot({}),
		MatCardModule,
		ReactiveFormsModule,
		FormsModule,

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
		DividerModule,
		MenubarModule,
		ToolbarModule,
		TagModule,
		CalendarModule

	],providers:[PatientService,MedecinService,MessageService,ConfirmationService]
})
export class PatientModule {}
