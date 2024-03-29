import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VilleService } from 'src/app/services/ServicePartager/ville.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { EmployeService } from 'src/app/services/ServiceEmploye/employe.service';
import { AdresseService } from 'src/app/services/ServicePartager/adresse.service';
import { ServiceService } from 'src/app/services/ServicePartager/service.service';
import { TypeServiceService } from 'src/app/services/ServicePartager/type-service.service';
import { ModePaiementService } from 'src/app/services/ServicePartager/mode-paiement.service';
import { AppelVideoService } from 'src/app/services/ServicePartager/appel-video.service';
import { StatutService } from 'src/app/services/ServicePartager/statut.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    ButtonModule,
    ToastModule,
    DialogModule,
    TableModule,
    ConfirmDialogModule,
    CalendarModule
  ],
  providers:[VilleService,EmployeService,AdresseService,ServiceService, TypeServiceService,ModePaiementService,AppelVideoService,StatutService]
})
export class PartagerModule { }
