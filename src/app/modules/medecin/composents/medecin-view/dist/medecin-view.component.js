"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MedecinViewComponent = void 0;
var core_1 = require("@angular/core");
var medecin_1 = require("../../model/medecin");
var forms_1 = require("@angular/forms");
var saveAs = require("file-saver");
var jspdf = require("jspdf");
require("jspdf-autotable");
var MedecinViewComponent = /** @class */ (function () {
    function MedecinViewComponent(medecinservice, route, medecinForm, messageService, primeNgConfig) {
        this.medecinservice = medecinservice;
        this.route = route;
        this.medecinForm = medecinForm;
        this.messageService = messageService;
        this.primeNgConfig = primeNgConfig;
        this.medecins = [];
        this.dragdrop = true;
        this.scrollableCols = [];
        this.unlockedCustomers = [];
        this.lockedCustomers = [];
        this.balanceFrozen = false;
        this.loading = true;
        this.exportColumns = [];
        this.MedecinForms = new forms_1.FormGroup({});
        this.medecin2 = new medecin_1.Medecin();
    }
    MedecinViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.medecinservice.recupererMedecin().subscribe({
            next: function (value) {
                _this.posts = value.data ? value : [];
                _this.post = _this.posts.data;
                _this.medecins = _this.post;
                _this.loading = false;
            },
            error: function (e) { console.log("erreur :" + e); },
            complete: function () {
            }
        });
        this.MedecinForms = this.medecinForm.group({
            id: null,
            email: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(30), forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(8)]],
            nom: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            prenoms: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(20)]],
            tel: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            tel2: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            genre: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            dateNaissance: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            login: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(20)]],
            fcmToken: 'string',
            sepecialiteMedecin: null,
            typeEmploye: null,
            typeMedecin: null
        });
        this.primeNgConfig.setTranslation({
            startsWith: 'Commence par',
            contains: 'Contient',
            notContains: 'Ne contient pas',
            endsWith: 'Fini par',
            equals: 'Egale à',
            notEquals: 'différent de',
            noFilter: 'Pas de filtre'
        });
    };
    MedecinViewComponent.prototype.detail = function (a) {
        this.route.navigate(['admin/medecin/detail', a]);
        this.medecinservice.recupererMedecin().subscribe({
            next: function (val) { console.log(val); }
        });
    };
    MedecinViewComponent.prototype.getEventValue = function ($event) {
        console.log($event.target.value);
        return $event.target.value;
    };
    MedecinViewComponent.prototype.openNew = function () {
        this.personneDialog = true;
        this.genres = [
            { name: 'homme' },
            { name: 'femme' }
        ];
    };
    MedecinViewComponent.prototype.hideOpen = function () {
        this.personneDialog = false;
    };
    MedecinViewComponent.prototype.exportPdf = function () {
        var doc = new jspdf.jsPDF('portrait', 'px', 'a4');
        doc.autoTable({
            head: this.exportColumns,
            body: this.medecins
        });
        doc.save("Personne.pdf");
    };
    MedecinViewComponent.prototype.exportExcel = function () {
        var _this = this;
        Promise.resolve().then(function () { return require("xlsx"); }).then(function (xlsx) {
            var worksheet = xlsx.utils.json_to_sheet(_this.medecins);
            var workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            var excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array"
            });
            _this.saveAsExcelFile(excelBuffer, "personne");
        });
    };
    MedecinViewComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        var EXCEL_EXTENSION = ".xlsx";
        var data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        saveAs(data, fileName + "_export_" + new Date() + EXCEL_EXTENSION);
    };
    MedecinViewComponent.prototype.SaveData = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        this.medecin2.id = null;
        this.medecin2.email = (_a = this.MedecinForms.get('email')) === null || _a === void 0 ? void 0 : _a.value;
        this.medecin2.password = (_b = this.MedecinForms.get('password')) === null || _b === void 0 ? void 0 : _b.value;
        this.medecin2.nom = (_c = this.MedecinForms.get('nom')) === null || _c === void 0 ? void 0 : _c.value;
        this.medecin2.prenoms = (_d = this.MedecinForms.get('prenoms')) === null || _d === void 0 ? void 0 : _d.value;
        this.medecin2.dateNaissance = (_e = this.MedecinForms.get('dateNaissance')) === null || _e === void 0 ? void 0 : _e.value;
        var val = (_f = this.MedecinForms.get('genre')) === null || _f === void 0 ? void 0 : _f.value;
        this.medecin2.genre = val.name;
        this.medecin2.tel = (_g = this.MedecinForms.get('tel')) === null || _g === void 0 ? void 0 : _g.value;
        this.medecin2.tel2 = (_h = this.MedecinForms.get('tel2')) === null || _h === void 0 ? void 0 : _h.value;
        this.medecin2.login = (_j = this.MedecinForms.get('login')) === null || _j === void 0 ? void 0 : _j.value;
        this.medecin2.specialite = (_k = this.MedecinForms.get('sepecialiteMedecin')) === null || _k === void 0 ? void 0 : _k.value;
        this.medecin2.typeEmploye = (_l = this.MedecinForms.get('typeEmploye')) === null || _l === void 0 ? void 0 : _l.value;
        this.medecin2.typeMedecin = (_m = this.MedecinForms.get('typeMedecin')) === null || _m === void 0 ? void 0 : _m.value;
        /*
        this.medecin2.salaireMedecin=this.MedecinForms.get('salaireMedecin')?.value
        this.medecin2.primeMedecin=this.MedecinForms.get('primeMedecin')?.value
        this.medecin2.sepecialiteMedecin=this.MedecinForms.get('sepecialiteMedecin')?.value
        this.medecin2.photo=this.MedecinForms.get('photo')?.value
        this.medecin2.numeroCni=this.MedecinForms.get('numeroCni')?.value
        this.medecin2.residence=this.MedecinForms.get('residence')?.value
        this.medecin2.heureDebut=this.MedecinForms.get('heureDebut')?.value
        this.medecin2.heureFin=this.MedecinForms.get('heureFin')?.value*/
        this.medecinservice.enregistrerMedecin(this.medecin2).subscribe({
            next: function (v) {
                _this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Medecin enregistrée' });
            },
            error: function (e) {
            },
            complete: function () {
                _this.MedecinForms.setValue({
                    id: null,
                    email: "",
                    password: "",
                    nom: "",
                    prenoms: "",
                    tel: "",
                    tel2: "",
                    genre: "",
                    dateNaissance: "",
                    login: "",
                    fcmToken: 'string',
                    sepecialiteMedecin: null,
                    typeEmploye: null,
                    typeMedecin: null
                });
            }
        });
    };
    MedecinViewComponent.prototype.getActif = function () {
        return this.route.url.includes('/admin/medecin/liste');
    };
    __decorate([
        core_1.ViewChild('dt')
    ], MedecinViewComponent.prototype, "dt");
    MedecinViewComponent = __decorate([
        core_1.Component({
            selector: 'app-medecin-view',
            templateUrl: '../medecin-view.component.html',
            styleUrls: ['../medecin-view.component.scss']
        })
    ], MedecinViewComponent);
    return MedecinViewComponent;
}());
exports.MedecinViewComponent = MedecinViewComponent;
