"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReceptionViewComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var reception_1 = require("../../model/reception");
var saveAs = require("file-saver");
var jspdf = require("jspdf");
require("jspdf-autotable");
var ReceptionViewComponent = /** @class */ (function () {
    function ReceptionViewComponent(receptService, route, messageService, receptionForm) {
        this.receptService = receptService;
        this.route = route;
        this.messageService = messageService;
        this.receptionForm = receptionForm;
        this.receptions = [];
        this.dragdrop = true;
        this.unlockedCustomers = [];
        this.lockedCustomers = [];
        this.loading = true;
        this.exportColumns = [];
        this.receptionForms = new forms_1.FormGroup({});
        this.reception = new reception_1.Reception();
    }
    ReceptionViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.receptService.getReception().subscribe({
            next: function (value) {
                _this.posts = value.data ? value : [];
                _this.receptions = _this.posts.data;
                _this.loading = false;
            },
            error: function (e) { console.log("erreur :" + e); },
            complete: function () {
            }
        });
        this.receptionForms = this.receptionForm.group({
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
            /*
               salt: ['', [Validators.required, Validators.maxLength(30)]],
         
               salaireInfirmier: ['', [Validators.required, Validators.maxLength(30)]],
               username: ['', [Validators.required, Validators.maxLength(30)]],
               userIdentifier: ['', [Validators.required, Validators.maxLength(15)]],
               active: [null, [Validators.required, Validators.maxLength(10)]],
               createdAt: [null, [Validators.required, Validators.maxLength(10)]],
               updatedAt: ['', [Validators.required, Validators.maxLength(10)]],
               version: [null, [Validators.required, Validators.maxLength(20)]],
         
               file:['', [Validators.required, Validators.maxLength(30)]],
               photo:['', [Validators.required, Validators.maxLength(20)]],
               residence:['', [Validators.required, Validators.maxLength(30)]],
               numeroCni:['', [Validators.required, Validators.maxLength(20)]]
               */
        });
    };
    ReceptionViewComponent.prototype.detail = function (a) {
        //this.route.navigate(['administrateur/detailM',a]);
        this.receptService.getReception().subscribe({
            next: function (e) { return console.log(e); }
        });
    };
    ReceptionViewComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        var EXCEL_EXTENSION = ".xlsx";
        var data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        saveAs(data, fileName + "_export_" + new Date() + EXCEL_EXTENSION);
    };
    ReceptionViewComponent.prototype.applyFilterGlobal = function ($event, stringVal) {
        this.dt.filterGlobal($event.target.value, stringVal);
    };
    ReceptionViewComponent.prototype.getEventValue = function ($event) {
        console.log($event.target.value);
        return $event.target.value;
    };
    ReceptionViewComponent.prototype.toggleLock = function (data, frozen, index) {
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
    ReceptionViewComponent.prototype.openNew = function () {
        this.personneDialog = true;
        this.genres = [
            { name: 'homme' },
            { name: 'femme' }
        ];
    };
    ReceptionViewComponent.prototype.exportPdf = function () {
        var doc = new jspdf.jsPDF('portrait', 'px', 'a4');
        doc.autoTable({
            head: this.exportColumns,
            body: this.receptions
        });
        doc.save("Pomptables.pdf");
    };
    ReceptionViewComponent.prototype.exportExcel = function () {
        var _this = this;
        Promise.resolve().then(function () { return require("xlsx"); }).then(function (xlsx) {
            var worksheet = xlsx.utils.json_to_sheet(_this.receptions);
            var workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            var excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array"
            });
            _this.saveAsExcelFile(excelBuffer, "personne");
        });
    };
    ReceptionViewComponent.prototype.SaveData = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.reception.id = null;
        this.reception.email = (_a = this.receptionForms.get('email')) === null || _a === void 0 ? void 0 : _a.value;
        this.reception.password = (_b = this.receptionForms.get('password')) === null || _b === void 0 ? void 0 : _b.value;
        this.reception.nom = (_c = this.receptionForms.get('nom')) === null || _c === void 0 ? void 0 : _c.value;
        this.reception.prenoms = (_d = this.receptionForms.get('prenoms')) === null || _d === void 0 ? void 0 : _d.value;
        this.reception.dateNaissance = (_e = this.receptionForms.get('dateNaissance')) === null || _e === void 0 ? void 0 : _e.value;
        this.reception.login = (_f = this.receptionForms.get('login')) === null || _f === void 0 ? void 0 : _f.value;
        this.reception.genre = (_g = this.receptionForms.get('genre')) === null || _g === void 0 ? void 0 : _g.value;
        this.reception.tel = (_h = this.receptionForms.get('tel')) === null || _h === void 0 ? void 0 : _h.value;
        this.reception.tel2 = (_j = this.receptionForms.get('tel2')) === null || _j === void 0 ? void 0 : _j.value;
        this.reception.fcmToken = "";
        this.reception.typeEmploye = null;
        console.log(this.reception);
        this.receptService.sendReception(this.reception).subscribe({
            next: function (v) {
                _this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'receptionniste enregistré' });
            },
            error: function (e) {
            },
            complete: function () {
                _this.receptionForms.setValue({
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
    ], ReceptionViewComponent.prototype, "dt");
    ReceptionViewComponent = __decorate([
        core_1.Component({
            selector: 'app-reception-view',
            templateUrl: './reception-view.component.html',
            styleUrls: ['./reception-view.component.scss']
        })
    ], ReceptionViewComponent);
    return ReceptionViewComponent;
}());
exports.ReceptionViewComponent = ReceptionViewComponent;
