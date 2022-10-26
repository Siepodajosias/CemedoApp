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
        path: 'specialite',
        canActivate: [AuthGuard],
        data: {
          role: Role.Specialite,
        },
        loadChildren: () =>
          import('./_controllers/specialite/specialite.module').then((m) => m.SpecialiteModule),
      },
      {
        path: 'service',
        canActivate: [AuthGuard],
        data: {
          role: Role.Service,
        },
        loadChildren: () =>
          import('./_controllers/service/service.module').then((m) => m.ServiceModule),
      },
      {
        path: 'type-employe',
        canActivate: [AuthGuard],
        data: {
          role: Role.TypeEmploye,
        },
        loadChildren: () =>
          import('./_controllers/type-employe/type-employe.module').then((m) => m.TypeEmployeModule),
      },
      {
        path: 'type-medecin',
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import('./_controllers/type-medecin/type-medecin.module').then((m) => m.TypeMedecinModule),
      },
      {
        path: 'type-service',
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import('./_controllers/type-service/type-service.module').then((m) => m.TypeServiceModule),
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
        path: 'assurance',
        canActivate: [AuthGuard],
        data: {
          role: Role.TypeEmploye,
        },
        loadChildren: () =>
          import('./_controllers/assurance/assurance.module').then((m) => m.AssuranceModule),
      },
      {
        path: 'comptable',
        canActivate: [AuthGuard],
        data:{
          role:Role.Comptable
        },
        loadChildren: () =>
          import('./_controllers/comptable/comptable.module').then(
            (m) => m.ComptableModule
          ),
      },
      {
        path: 'infirmier',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/infirmier/infirmier.module').then(
            (m) => m.InfirmierModule
          ),
      },
      {
        path: 'fichier',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/fichier/fichier.module').then(
            (m) => m.FichierModule
          ),
      },
      {
        path: 'gerant',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/gerant/gerant.module').then(
            (m) => m.GerantModule
          ),
      },
      {
        path: 'medecin',
        canActivate: [AuthGuard],
        data:{
          role:Role.Medecin
        },
        loadChildren: () =>
          import('./_controllers/medecin/medecin.module').then(
            (m) => m.MedecinModule
          ),
      },
      {
        path: 'medicament',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/medicament/medicament.module').then(
            (m) => m.MedicamentModule
          ),
      },
      {
        path: 'medicament',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/medicament/medicament.module').then(
            (m) => m.MedicamentModule
          ),
      },
      {
        path: 'mode-paiement',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/mode-paiement/mode-paiement.module').then(
            (m) => m.ModePaiementModule
          ),
      },
      {
        path: 'patient',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/patient/patient.module').then(
            (m) => m.PatientModule
          ),
      },
      {
        path: 'pharmacien',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/pharmacien/pharmacien.module').then(
            (m) => m.PharmacienModule
          ),
      },
      {
        path: 'relation',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/relation/relation.module').then(
            (m) => m.RelationModule
          ),
      },
      
      {
        path: 'responsable-assurance',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/responsable-assurance/responsable-assurance.module').then(
            (m) => m.ResponsableAssuranceModule
          ),
      },
      
      {
        path: 'type-fichier-medical',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/type-fichier-medical/type-fichier-medical.module').then(
            (m) => m.TypeFichierMedicalModule
          ),
      },
      
      {
        path: 'role',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/role/role.module').then(
            (m) => m.RoleModule
          ),
      },
      {
        path: 'administrateur',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/administrateur/administrateur.module').then(
            (m) => m.AdministrateurModule
          ),
      },
      {
        path: 'role',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/ordonnance/ordonnance.module').then(
            (m) => m.OrdonnanceModule
          ),
      },
      {
        path: 'rendez-vous',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/rendez-vous/rendez-vous.module').then(
            (m) => m.RendezVousModule
          ),
      },
      {
        path: 'affection',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/affection/affection.module').then(
            (m) => m.AffectionModule
          ),
      },
      {
        path: 'facture',
        canActivate: [AuthGuard],
        data:{
          role:Role.Infirmier
        },
        loadChildren: () =>
          import('./_controllers/facture/facture.module').then(
            (m) => m.FactureModule
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
