import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './modules/authentication/page404/page404.component';
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
          import('src/app/modules/administrateur/administrateur.module').then((m) => m.AdministrateurModule),
      },
      {
        path: 'doctor',
        canActivate: [AuthGuard],
        data: {
          role: Role.Doctor,
        },
        loadChildren: () =>
          import('src/app/modules/medecin/medecin.module').then((m) => m.MedecinModule),
      },
      {
        path: 'reception',
        canActivate: [AuthGuard],
        data: {
          role: Role.Reception,
        },
        loadChildren: () =>
          import('./modules/reception/reception.module').then((m) => m.ReceptionModule),
      },
      {
        path: 'comptable',
        canActivate: [AuthGuard],
        data:{
          role:Role.Comptable
        },
        loadChildren: () =>
          import('./modules/comptable/comptable.module').then(
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
          import('./modules/infirmerie/infirmerie.module').then(
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
          import('./modules/pharmacie/pharmacie.module').then(
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
          import('./modules/assurance/assurance.module').then(
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
          import('./modules/informatique/informatique.module').then(
            (m) => m.InformatiqueModule
          ),
      },
      {path:'logistique',        
      canActivate: [AuthGuard],
      data:{
        role:Role.Informaticien
      },loadChildren:()=>import('./modules/logistique/logistique.module').then(
        (m)=>m.LogistiqueModule
      )}
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
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
