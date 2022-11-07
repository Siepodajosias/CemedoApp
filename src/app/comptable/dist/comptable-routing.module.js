"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComptableRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var comptable_detail_component_1 = require("./composents/comptable-detail/comptable-detail.component");
var comptable_view_component_1 = require("./composents/comptable-view/comptable-view.component");
var routes = [
    {
        path: 'dashboard',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('../admin/dashboard/dashboard.module'); }).then(function (m) { return m.DashboardModule; });
        }
    },
    {
        path: 'patient',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('../patient/patient.module'); }).then(function (m) { return m.PatientModule; });
        }
    },
    {
        path: 'medecin',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('../doctor/doctor.module'); }).then(function (m) { return m.DoctorModule; });
        }
    },
    {
        path: 'assurance',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../assurance/assurance.module'); }).then(function (r) { return r.AssuranceModule; }); }
    },
    {
        path: 'pharmacie',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../pharmacie/pharmacie.module'); }).then(function (e) { return e.PharmacieModule; }); }
    },
    { path: 'liste', component: comptable_view_component_1.ComptableViewComponent },
    { path: 'detail', component: comptable_detail_component_1.ComptableDetailComponent },
    { path: '**', component: comptable_view_component_1.ComptableViewComponent },
];
var ComptableRoutingModule = /** @class */ (function () {
    function ComptableRoutingModule() {
    }
    ComptableRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ComptableRoutingModule);
    return ComptableRoutingModule;
}());
exports.ComptableRoutingModule = ComptableRoutingModule;
