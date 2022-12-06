import { Page404Component } from "src/app/modules/authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "src/app/modules/administrateur/dashboard/main/main.component";
import { Dashboard2Component } from "src/app/modules/administrateur/dashboard/dashboard2/dashboard2.component";

import { DashboardPatientComponent } from "src/app/modules/patient/dashboard-patient/dashboard-patient.component";

const routes: Routes = [
  {path: "main",component: MainComponent},
  {path: "dashboard2",component: Dashboard2Component},
  {path: "doctor-dashboard",component: DashboardPatientComponent},
  {path: "patient-dashboard",component: DashboardPatientComponent},
  {path: "",redirectTo: "main",pathMatch: "full"},
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
