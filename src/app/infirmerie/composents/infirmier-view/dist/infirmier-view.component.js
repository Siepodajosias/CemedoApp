"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InfirmierViewComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var infirmier_1 = require("../../model/infirmier");
var saveAs = require("file-saver");
var jspdf = require("jspdf");
require("jspdf-autotable");
var InfirmierViewComponent = /** @class */ (function () {
    function InfirmierViewComponent(infirmierS, route, messageService, infirmierForm) {
        this.infirmierS = infirmierS;
        this.route = route;
        this.messageService = messageService;
        this.infirmierForm = infirmierForm;
        this.infirmiers = [];
        this.dragdrop = true;
        this.unlockedCustomers = [];
        this.lockedCustomers = [];
        this.loading = true;
        this.exportColumns = [];
        this.infirmierForms = new forms_1.FormGroup({});
        this.infirmier = new infirmier_1.Infirmier();
    }
    InfirmierViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.infirmierS.getInfirmier().subscribe({
            next: function (value) {
                _this.posts = value.data ? value : [];
                _this.infirmiers = _this.posts.data;
                _this.loading = false;
                console.log(_this.infirmiers);
            },
            error: function (e) { console.log("erreur :" + e); },
            complete: function () {
            }
        });
        this.infirmierForms = this.infirmierForm.group({
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
            salaireInfirmier: [null, [Validators.required, Validators.maxLength(30)]],
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
    InfirmierViewComponent.prototype.detail = function (a) {
        //this.route.navigate(['administrateur/detailM',a]);
        this.infirmierS.getInfirmier().subscribe({
            next: function (e) { return console.log(e); }
        });
    };
    InfirmierViewComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        var EXCEL_EXTENSION = ".xlsx";
        var data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        saveAs(data, fileName + "_export_" + new Date() + EXCEL_EXTENSION);
    };
    InfirmierViewComponent.prototype.applyFilterGlobal = function ($event, stringVal) {
        this.dt.filterGlobal($event.target.value, stringVal);
    };
    InfirmierViewComponent.prototype.getEventValue = function ($event) {
        console.log($event.target.value);
        return $event.target.value;
    };
    InfirmierViewComponent.prototype.toggleLock = function (data, frozen, index) {
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
    InfirmierViewComponent.prototype.openNew = function () {
        this.personneDialog = true;
        this.genres = [
            { name: 'homme' },
            { name: 'femme' }
        ];
    };
    InfirmierViewComponent.prototype.exportPdf = function () {
        var doc = new jspdf.jsPDF('portrait', 'px', 'a4');
        doc.autoTable({
            head: this.exportColumns,
            body: this.infirmiers
        });
        doc.save("Pomptables.pdf");
    };
    InfirmierViewComponent.prototype.exportExcel = function () {
        var _this = this;
        Promise.resolve().then(function () { return require("xlsx"); }).then(function (xlsx) {
            var worksheet = xlsx.utils.json_to_sheet(_this.infirmiers);
            var workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            var excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array"
            });
            _this.saveAsExcelFile(excelBuffer, "Infirmier");
        });
    };
    InfirmierViewComponent.prototype.SaveData = function () {
        /*
            this.infirmier.id=null
            this.infirmier.userIdentifier=""
            this.infirmier.username=""
            this.infirmier.numeroCni=this.infirmierForms.get('numeroCni')?.value
            this.infirmier.residence=this.infirmierForms.get('residence')?.value
               this.infirmier.salaireInfirmier=this.infirmierForms.get('salaireInfirmier')?.value
            if(this.img && this.img !==''){
              this.infirmier.photo=this.img
              this.infirmier.file=this.img
            }*/
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.infirmier.id = null;
        this.infirmier.email = (_a = this.infirmierForms.get('email')) === null || _a === void 0 ? void 0 : _a.value;
        this.infirmier.password = (_b = this.infirmierForms.get('password')) === null || _b === void 0 ? void 0 : _b.value;
        this.infirmier.nom = (_c = this.infirmierForms.get('nom')) === null || _c === void 0 ? void 0 : _c.value;
        this.infirmier.prenoms = (_d = this.infirmierForms.get('prenoms')) === null || _d === void 0 ? void 0 : _d.value;
        this.infirmier.dateNaissance = (_e = this.infirmierForms.get('dateNaissance')) === null || _e === void 0 ? void 0 : _e.value;
        this.infirmier.login = (_f = this.infirmierForms.get('login')) === null || _f === void 0 ? void 0 : _f.value;
        this.infirmier.genre = (_g = this.infirmierForms.get('genre')) === null || _g === void 0 ? void 0 : _g.value;
        this.infirmier.tel = (_h = this.infirmierForms.get('tel')) === null || _h === void 0 ? void 0 : _h.value;
        this.infirmier.tel2 = (_j = this.infirmierForms.get('tel2')) === null || _j === void 0 ? void 0 : _j.value;
        this.infirmier.fcmToken = "";
        this.infirmier.typeEmploye = null;
        console.log(this.infirmier);
        this.infirmierS.sendInfirmier(this.infirmier).subscribe({
            next: function (v) {
                _this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Infirmier enregistré' });
            },
            error: function (e) {
            },
            complete: function () {
                _this.infirmierForms.setValue({
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
    ], InfirmierViewComponent.prototype, "dt");
    InfirmierViewComponent = __decorate([
        core_1.Component({
            selector: 'app-infirmier-view',
            templateUrl: './infirmier-view.component.html',
            styleUrls: ['./infirmier-view.component.scss']
        })
    ], InfirmierViewComponent);
    return InfirmierViewComponent;
}());
exports.InfirmierViewComponent = InfirmierViewComponent;
