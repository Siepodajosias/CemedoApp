import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../shared/components/components.module";
import {HttpClientModule} from "@angular/common/http";
import { ComptableRoutingModule } from './comptable-routing.module';
import { ComptableViewComponent } from './composents/comptable-view/comptable-view.component';
import { ComptableFormsComponent } from './composents/comptable-forms/comptable-forms.component';
import { ComptableDetailComponent } from './composents/comptable-detail/comptable-detail.component';
import { ComptableService } from './service/comptable.service';


@NgModule({
  declarations: [
    ComptableViewComponent,
    ComptableFormsComponent,
    ComptableDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ComptableRoutingModule,
    ComponentsModule
  ],providers:[ComptableService]
})
export class ComptableModule { }
