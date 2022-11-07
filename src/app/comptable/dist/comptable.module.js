"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComptableModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var components_module_1 = require("../shared/components/components.module");
var http_1 = require("@angular/common/http");
var comptable_routing_module_1 = require("./comptable-routing.module");
var forms_1 = require("@angular/forms");
var card_1 = require("@angular/material/card");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var comptable_view_component_1 = require("./composents/comptable-view/comptable-view.component");
var comptable_detail_component_1 = require("./composents/comptable-detail/comptable-detail.component");
var comptable_service_1 = require("./service/comptable.service");
var table_1 = require("@angular/material/table");
var tabs_1 = require("@angular/material/tabs");
var paginator_1 = require("@angular/material/paginator");
var dialog_1 = require("@angular/material/dialog");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var ngx_material_file_input_1 = require("ngx-material-file-input");
//primeng
var card_2 = require("primeng/card");
var toast_1 = require("primeng/toast");
var api_1 = require("primeng/api");
var table_2 = require("primeng/table");
var button_2 = require("primeng/button");
var dialog_2 = require("primeng/dialog");
var confirmdialog_1 = require("primeng/confirmdialog");
var api_2 = require("primeng/api");
var multiselect_1 = require("primeng/multiselect");
var dropdown_1 = require("primeng/dropdown");
var autocomplete_1 = require("primeng/autocomplete");
var chips_1 = require("primeng/chips");
var contextmenu_1 = require("primeng/contextmenu");
var progressbar_1 = require("primeng/progressbar");
var slider_1 = require("primeng/slider");
var ripple_1 = require("primeng/ripple");
var orderlist_1 = require("primeng/orderlist");
var divider_1 = require("primeng/divider");
var menubar_1 = require("primeng/menubar");
var toolbar_1 = require("primeng/toolbar");
var calendar_1 = require("primeng/calendar");
var speeddial_1 = require("primeng/speeddial");
var menu_1 = require("primeng/menu");
var ComptableModule = /** @class */ (function () {
    function ComptableModule() {
    }
    ComptableModule = __decorate([
        core_1.NgModule({
            declarations: [
                comptable_view_component_1.ComptableViewComponent,
                comptable_detail_component_1.ComptableDetailComponent
            ],
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                card_1.MatCardModule,
                table_1.MatTableModule,
                dialog_1.MatDialogModule,
                form_field_1.MatFormFieldModule,
                ngx_material_file_input_1.MaterialFileInputModule,
                paginator_1.MatPaginatorModule,
                tabs_1.MatTabsModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                icon_1.MatIconModule,
                comptable_routing_module_1.ComptableRoutingModule,
                components_module_1.ComponentsModule,
                card_2.CardModule,
                table_2.TableModule,
                button_2.ButtonModule,
                toast_1.ToastModule,
                dialog_2.DialogModule,
                confirmdialog_1.ConfirmDialogModule,
                multiselect_1.MultiSelectModule,
                dropdown_1.DropdownModule,
                autocomplete_1.AutoCompleteModule,
                chips_1.ChipsModule,
                contextmenu_1.ContextMenuModule,
                progressbar_1.ProgressBarModule,
                slider_1.SliderModule,
                ripple_1.RippleModule,
                orderlist_1.OrderListModule,
                divider_1.DividerModule,
                menubar_1.MenubarModule,
                toolbar_1.ToolbarModule,
                calendar_1.CalendarModule,
                speeddial_1.SpeedDialModule,
                menu_1.MenuModule
            ], providers: [comptable_service_1.ComptableService, api_1.MessageService, api_2.ConfirmationService]
        })
    ], ComptableModule);
    return ComptableModule;
}());
exports.ComptableModule = ComptableModule;
