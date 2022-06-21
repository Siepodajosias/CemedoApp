import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import {HttpClientModule} from "@angular/common/http"
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AdminRoutingModule } from "./admin-routing.module";
import { ComponentsModule } from "../shared/components/components.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    ComponentsModule,
  ],
})
export class AdminModule {}
