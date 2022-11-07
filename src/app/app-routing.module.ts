import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';
import { AuthGuard } from './core/guard/auth.guard';
import { Role } from './core/models/role';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'doctor',
        canActivate: [AuthGuard],
        data: {
          role: Role.Doctor,
        },
        loadChildren: () =>
          import('./doctor/doctor.module').then((m) => m.DoctorModule),
      },
      {
        path: 'reception',
        canActivate: [AuthGuard],
        data: {
          role: Role.Reception,
        },
        loadChildren: () =>
          import('./reception/reception.module').then((m) => m.ReceptionModule),
      },
      {
        path: 'comptable',
        canActivate: [AuthGuard],
        data:{
          role:Role.Comptable
        },
        loadChildren: () =>
          import('./comptable/comptable.module').then(
            (m) => m.ComptableModule
          ),
      },
      {
        path: 'infirmerie',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./infirmerie/infirmerie.module').then(
            (m) => m.InfirmerieModule
          ),
      },
      {
        path: 'pharmacie',
        canActivate: [AuthGuard],
        data:{
          role:Role.Pharmacien
        },
        loadChildren: () =>
          import('./pharmacie/pharmacie.module').then(
            (m) => m.PharmacieModule
          ),
      },
      {
        path: 'assurance',
        canActivate: [AuthGuard],
        data:{
          role:Role.Assurance
        },
        loadChildren: () =>
          import('./assurance/assurance.module').then(
            (m) => m.AssuranceModule
          ),
      },
      {
        path: 'informatique',
        canActivate: [AuthGuard],
        data:{
          role:Role.Informaticien
        },
        loadChildren: () =>
          import('./informatique/informatique.module').then(
            (m) => m.InformatiqueModule
          ),
      },
      {path:'logistique',        
      canActivate: [AuthGuard],
      data:{
        role:Role.Informaticien
      },loadChildren:()=>import('./logistique/logistique.module').then(
        (m)=>m.LogistiqueModule
      )}
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
