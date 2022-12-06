import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToastrService,ToastrModule } from "ngx-toastr";

import { AuthenticationRoutingModule } from "src/app/modules/authentication/authentication-routing.module";
import { Page500Component } from "src/app/modules/authentication/page500/page500.component";
import { Page404Component } from "src/app/modules/authentication/page404/page404.component";
import { SigninComponent } from "src/app/modules/authentication/signin/signin.component";
import { SignupComponent } from "src/app/modules/authentication/signup/signup.component";
import { LockedComponent } from "src/app/modules/authentication/locked/locked.component";
import { ForgotPasswordComponent } from "src/app/modules/authentication/forgot-password/forgot-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
@NgModule({
  declarations: [
    Page500Component,
    Page404Component,
    SigninComponent,
    SignupComponent,
    LockedComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    AuthenticationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers:[ToastrService]
})
export class AuthenticationModule {}
