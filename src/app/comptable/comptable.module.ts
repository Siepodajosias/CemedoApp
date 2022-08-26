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
import { ToastrService,ToastrModule } from 'ngx-toastr';
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MaterialFileInputModule } from 'ngx-material-file-input';


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
    ToastrModule.forRoot({})
  ], providers: [ComptableService,ToastrService]
})
export class ComptableModule { }
