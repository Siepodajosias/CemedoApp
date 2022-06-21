import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthLayoutComponent2 } from './app-layout/auth-layout/auth-layout.component2';
import { MainLayoutComponent2 } from './app-layout/main-layout/main-layout.component2';
@NgModule({
  imports: [CommonModule, NgbModule, MatTabsModule],
  declarations: [AuthLayoutComponent2, MainLayoutComponent2],
})
export class LayoutModule {}
