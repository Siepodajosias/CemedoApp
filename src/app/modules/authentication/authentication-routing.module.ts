import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from 'src/app/modules/authentication/signin/signin.component';
import { SignupComponent } from 'src/app/modules/authentication/signup/signup.component';
import { ForgotPasswordComponent } from 'src/app/modules/authentication/forgot-password/forgot-password.component';
import { LockedComponent } from 'src/app/modules/authentication/locked/locked.component';
import { Page404Component } from 'src/app/modules/authentication/page404/page404.component';
import { Page500Component } from 'src/app/modules/authentication/page500/page500.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'locked',
    component: LockedComponent,
  },
  {
    path: 'page404',
    component: Page404Component,
  },
  {
    path: 'page500',
    component: Page500Component,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
