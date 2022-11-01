"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PharmacienViewComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var pharmacien_1 = require("../../model/pharmacien");
var saveAs = require("file-saver");
var jspdf = require("jspdf");
require("jspdf-autotable");
var PharmacienViewComponent = /** @class */ (function () {
    function PharmacienViewComponent(pharService, route, messageService, pharmacienForm) {
        this.pharService = pharService;
        this.route = route;
        this.messageService = messageService;
        this.pharmacienForm = pharmacienForm;
        this.pharmaciens = [];
        this.dragdrop = true;
        this.unlockedCustomers = [];
        this.lockedCustomers = [];
        this.loading = true;
        this.exportColumns = [];
        this.pharmacienForms = new forms_1.FormGroup({});
        this.pharmacien = new pharmacien_1.Pharmacien();
    }
    PharmacienViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pharmacienForms = this.pharmacienForm.group({
            id: null,
            nom: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            prenoms: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(20)]],
            login: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(20)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(30), forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(8)]],
            tel: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(20)]],
            tel2: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(20)]],
            genre: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(20)]],
            dateNaissance: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(30)]],
            fcmToken: "",
            typeEmploye: null
            //salt: ['', [Validators.required, Validators.maxLength(30)]],
            /*
            salaireInfirmier: ['', [Validators.required, Validators.maxLength(30)]],
            username: ['', [Validators.required, Validators.maxLength(30)]],
            userIdentifier: ['', [Validators.required, Validators.maxLength(15)]],
            active: [null, [Validators.required, Validators.maxLength(10)]],
            password: ['', [Validators.required, Validators.maxLength(8)]],
            createdAt: [null, [Validators.required, Validators.maxLength(10)]],
            updatedAt: ['', [Validators.required, Validators.maxLength(10)]],
            version: [null, [Validators.required, Validators.maxLength(20)]],
      
            file:['', [Validators.required, Validators.maxLength(30)]],
            photo:['', [Validators.required, Validators.maxLength(20)]],
            residence:['', [Validators.required, Validators.maxLength(30)]],
            numeroCni:['', [Validators.required, Validators.maxLength(20)]]
            */
        });
        this.pharService.getPharmacien().subscribe({
            next: function (value) {
                _this.posts = value.data ? value : [];
                _this.pharmaciens = _this.posts.data;
                _this.loading = false;
                console.log(_this.pharmaciens);
            },
            error: function (e) { console.log("erreur :" + e); },
            complete: function () {
            }
        });
    };
    PharmacienViewComponent.prototype.detail = function (a) {
        //this.route.navigate(['administrateur/detailM',a]);
        this.pharService.getPharmacien().subscribe({
            next: function (e) { return console.log(e); }
        });
    };
    PharmacienViewComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        var EXCEL_EXTENSION = ".xlsx";
        var data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        saveAs(data, fileName + "_export_" + new Date() + EXCEL_EXTENSION);
    };
    PharmacienViewComponent.prototype.applyFilterGlobal = function ($event, stringVal) {
        this.dt.filterGlobal($event.target.value, stringVal);
    };
    PharmacienViewComponent.prototype.getEventValue = function ($event) {
        console.log($event.target.value);
        return $event.target.value;
    };
    PharmacienViewComponent.prototype.toggleLock = function (data, frozen, index) {
        console.log(data);
        if (frozen) {
            this.lockedCustomers = this.lockedCustomers.filter(function (c, i) { return i !== index; });
            this.unlockedCustomers.push(data);
        }
        else {
            this.unlockedCustomers = this.unlockedCustomers.filter(function (c, i) { return i !== index; });
            this.lockedCustomers.push(data);
        }
        this.unlockedCustomers.sort(function (val1, val2) {
            return val1.id < val2.id ? -1 : 1;
        });
    };
    PharmacienViewComponent.prototype.openNew = function () {
        this.personneDialog = true;
        this.genres = [
            { name: 'homme' },
            { name: 'femme' }
        ];
    };
    PharmacienViewComponent.prototype.exportPdf = function () {
        var doc = new jspdf.jsPDF('portrait', 'px', 'a4');
        doc.autoTable({
            head: this.exportColumns,
            body: this.pharmaciens
        });
        doc.save("Pomptables.pdf");
    };
    PharmacienViewComponent.prototype.exportExcel = function () {
        var _this = this;
        Promise.resolve().then(function () { return require("xlsx"); }).then(function (xlsx) {
            var worksheet = xlsx.utils.json_to_sheet(_this.pharmaciens);
            var workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            var excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array"
            });
            _this.saveAsExcelFile(excelBuffer, "pharmaciens");
        });
    };
    PharmacienViewComponent.prototype.SaveData = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.pharmacien.id = null;
        this.pharmacien.email = (_a = this.pharmacienForms.get('email')) === null || _a === void 0 ? void 0 : _a.value;
        this.pharmacien.password = (_b = this.pharmacienForms.get('password')) === null || _b === void 0 ? void 0 : _b.value;
        this.pharmacien.nom = (_c = this.pharmacienForms.get('nom')) === null || _c === void 0 ? void 0 : _c.value;
        this.pharmacien.prenoms = (_d = this.pharmacienForms.get('prenoms')) === null || _d === void 0 ? void 0 : _d.value;
        this.pharmacien.dateNaissance = (_e = this.pharmacienForms.get('dateNaissance')) === null || _e === void 0 ? void 0 : _e.value;
        this.pharmacien.login = (_f = this.pharmacienForms.get('login')) === null || _f === void 0 ? void 0 : _f.value;
        this.pharmacien.genre = (_g = this.pharmacienForms.get('genre')) === null || _g === void 0 ? void 0 : _g.value;
        this.pharmacien.tel = (_h = this.pharmacienForms.get('tel')) === null || _h === void 0 ? void 0 : _h.value;
        this.pharmacien.tel2 = (_j = this.pharmacienForms.get('tel2')) === null || _j === void 0 ? void 0 : _j.value;
        this.pharmacien.fcmToken = "";
        this.pharmacien.typeEmploye = null;
        console.log(this.pharmacien);
        this.pharService.sendPharmacien(this.pharmacien).subscribe({
            next: function (v) {
                _this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Pharmacien enregistré' });
            },
            error: function (e) {
            },
            complete: function () {
                _this.pharmacienForms.setValue({
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
                    typeEmploye: null
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('dt')
    ], PharmacienViewComponent.prototype, "dt");
    PharmacienViewComponent = __decorate([
        core_1.Component({
            selector: 'app-pharmacien-view',
            templateUrl: './pharmacien-view.component.html',
            styleUrls: ['./pharmacien-view.component.scss']
        })
    ], PharmacienViewComponent);
    return PharmacienViewComponent;
}());
exports.PharmacienViewComponent = PharmacienViewComponent;
