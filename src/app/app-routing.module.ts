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
      },{
        path: 'reception',
        canActivate: [AuthGuard],
        data: {
          role: Role.Reception,
        },
        loadChildren: () =>
          import('./reception/reception.module').then((e) => e.ReceptionModule)
      }, {
        path: 'comptable',
        canActivate: [AuthGuard],
        data: {
          role: Role.Comptable,
        },
        loadChildren: () =>
          import('./comptable/comptable.module').then((e) => e.ComptableModule)
      }, {
        path: 'assurance',
        canActivate: [AuthGuard],
        data: {
          role: Role.Assurance,
        },
        loadChildren: () =>
          import('./assurance/assurance.module').then((e) => e.AssuranceModule)
      }, {
        path: 'infirmerie',
        canActivate: [AuthGuard],
        data: {
          role: Role.Infirmier,
        },
        loadChildren: () =>
          import('./infirmerie/infirmerie.module').then((e) => e.InfirmerieModule)
      }, {
        path: 'pharmacie',
        canActivate: [AuthGuard],
        data: {
          role: Role.Pharmacien,
        },
        loadChildren: () =>
          import('./pharmacie/pharmacie.module').then((e) => e.PharmacieModule)
      }, {
        path: 'informatique',
        canActivate: [AuthGuard],
        data: {
          role: Role.Informaticien,
        },
        loadChildren: () =>
          import('./informatique/informatique.module').then((e) => e.InformatiqueModule)
      }, {
        path: 'logistique',
        canActivate: [AuthGuard],
        data: {
          role: Role.Logistique,
        },
        loadChildren: () =>
          import('./logistique/logistique.module').then((e) => e.LogistiqueModule)
      },
      {
        path: 'extra-pages',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./extra-pages/extra-pages.module').then(
            (m) => m.ExtraPagesModule
          ),
      },
      {
        path: 'multilevel',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./multilevel/multilevel.module').then(
            (m) => m.MultilevelModule
          ),
      },
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
