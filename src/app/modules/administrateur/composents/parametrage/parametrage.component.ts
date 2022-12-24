import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VilleService } from 'src/app/services/ServicePartager/ville.service';
import { AdresseService } from 'src/app/services/ServicePartager/adresse.service';
import { Ville } from 'src/app/models/modelPartager/ville';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { PatientService } from 'src/app/services/ServicePatient/patient.service';
import { Adresse } from 'src/app/models/modelPartager/adresse';
import { TypeServiceService } from 'src/app/services/ServicePartager/type-service.service';
import { Service } from 'src/app/models/modelPartager/service';
import { ServiceService } from 'src/app/services/ServicePartager/service.service';
import { ModePaiement } from 'src/app/models/modelPartager/mode-paiement';
import { ModePaiementService } from 'src/app/services/ServicePartager/mode-paiement.service';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss']
})
export class ParametrageComponent implements OnInit {

  formulaireDialog: boolean=false;
  parametreForms: FormGroup;
  titre: string;
  adresses: any[];
  villes: any[];
  patients: any[];
  services: any[];
  modePaiements:any[];
  postsVille: any;
  postsService: any;
  postsAdresse: any;
  champsActif:string
  patientsForm: any[];
  villeForm: any[];
  serviceForm: any[];

  constructor(private villeService: VilleService,
              private parametreForm: FormBuilder,
              private adresseService: AdresseService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private patientService : PatientService,
              private typeService: TypeServiceService,
              private serviceService:ServiceService,
              private primeNgConfig: PrimeNGConfig,
              private modePaiementService: ModePaiementService){ }

  ngOnInit(): void {
    this.recupererParametrage();
    this.recupereConfig();
    this.recupererVille();
    this.recupererAdresse();
    this.recupererService();
    this.recupererModePaiement();
    this.parametreForms=this.parametreForm.group({
      libelle:['',[Validators.required]],
      assure:['',[Validators.required]],
      ville:['',[Validators.required]],
      longitude:['',[Validators.required]],
      lattitude:['',[Validators.required]],
      designation:['',[Validators.required]],
      typeService:['',[Validators.required]],
      description:['',[Validators.required]]
    })
  }
  formulaire(idFormulaire?:any){
    if(idFormulaire.id === 'ville'){
      this.champsActif="ville"
      this.formulaireDialog=true
      this.titre="Créer une ville"
    }else if (idFormulaire.id === 'adresse'){
      this.champsActif="adresse"
      this.formulaireDialog=true
      this.titre="Créer une adresse"
    }else if(idFormulaire.id === 'service'){
      this.champsActif="service"
      this.formulaireDialog=true
      this.titre="Créer un service"
    }else if (idFormulaire.id ==='modePaiement'){

      this.champsActif="modePaiement"
      this.formulaireDialog=true
      this.titre="Créer un mode de paiement"
    }
  }

  recupererParametrage():void{
   this.typeService.recupererTypeService().subscribe({
      next:(value)=>{
        this.postsService = value.data;
        this.services = this.postsService;
      }
    })

    this.patientService.recupererPatient().subscribe({
      next: (value: any) => {
        const post = value.data;
        this.patients = post;
      },
      error: () => {
      },
      complete: () => {
      }
    });
  }
  recupererVille():void{
    this.villeService.recupererVille().subscribe({
      next:(value)=>{
        this.postsVille = value.data;
        this.villes = this.postsVille;
      }
    })
  }
  recupererAdresse():void{
    this.adresseService.recupererAdresse().subscribe({
      next:(value)=>{
        this.postsAdresse = value.data;
        this.adresses = this.postsAdresse;
      }
    })
  }
  recupererService():void{
    this.serviceService.recupererService().subscribe({
      next: (value: any) => {
        const post = value.data;
        this.services = post;
      },
      error: () => {
      },
      complete: () => {
      }
    });
  }
  recupererModePaiement():void{
    this.modePaiementService.recupererModePaiement().subscribe({
      next: (value: any) => {
        const post = value.data;
        this.modePaiements = post;
        console.log(this.modePaiements )
      },
      error: () => {
      },
      complete: () => {
      }
    });
  }
  enregistrerParametre() {
          if(this.champsActif=='ville'){
            const ville: Ville=new Ville();
            ville.libelle=this.parametreForms.get('libelle')?.value;
            this.villeService.enregistrerVille(ville).subscribe({
              next:()=>{
                this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'La ville a été enregistrée' });
                this.parametreForms.reset();
              },complete:()=>{
                this.recupererVille();
                this.formulaireDialog=false
              }
            })
          }else if(this.champsActif=='adresse'){
            const adresse:Adresse = new Adresse();
            adresse.libelle= this.parametreForms.get('libelle')?.value;
            adresse.description= this.parametreForms.get('description')?.value;
            adresse.lattitude= this.parametreForms.get('lattitude')?.value;
            adresse.longitude= this.parametreForms.get('longitude')?.value;
            const villeValeur= this.parametreForms.get('ville')?.value;
            adresse.ville=villeValeur.id;
            const patientValeur=this.parametreForms.get('assure')?.value;
            adresse.assure=patientValeur.id;

            this.adresseService.enregistrerAdresse(adresse).subscribe({
              next:()=>{
                this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'L\'adresse a été enregistrée' });
                this.parametreForms.reset();
              },complete:()=>{
                this.recupererAdresse();
                this.formulaireDialog=false
              }
            })
          }else if (this.champsActif=='service'){
            const service: Service=new Service();
            service.libelle=this.parametreForms.get('libelle')?.value;
            service.description=this.parametreForms.get('description')?.value;
            const typeServiceValeur=this.parametreForms.get('typeService')?.value;
            service.typeService=typeServiceValeur.id;

            this.serviceService.enregistrerService(service).subscribe({
              next:()=>{
                this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Le service a été enregistré' });
                this.parametreForms.reset();
              },complete:()=>{
                this.recupererService();
                this.formulaireDialog=false
              }
            })
          }else if(this.champsActif=='modePaiement'){
            const modePaiement: ModePaiement= new ModePaiement();
            modePaiement.libelle=this.parametreForms.get('libelle')?.value;

            this.modePaiementService.enregistrerModePaiement(modePaiement).subscribe({
              next:()=>{
                this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Le mode de paiement a été enregistré' });
                this.parametreForms.reset();
              },complete:()=>{
                this.recupererModePaiement();
                this.formulaireDialog=false
              }
            })
          }
  }

  supprimerVille(ville: any) {
    this.confirmationService.confirm({
      message: 'Supprimer la ville ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.villeService.supprimerVille(ville.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'La ville a été supprimée', icon: 'pi-file' });
            this.villes = this.villes.filter(val => val.id !== ville.id);
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer la ville', icon: 'pi-file' });
          }
        });
      }
    });
  }

  supprimerService(service: any) {
    this.confirmationService.confirm({
      message: 'Supprimer le service ' + service.libelle + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.serviceService.supprimerService(service.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'Le service a été supprimé', icon: 'pi-file' });
            this.services = this.services.filter(val => val.id !== service.id);
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer le service', icon: 'pi-file' });
          }
        });
      }
    });
  }

  supprimerAdresse(adresse: any) {
    this.confirmationService.confirm({
      message: 'Supprimer l\'adresse ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adresseService.supprimerAdresse(adresse.id).subscribe({
          next: () => {
            this.messageService.add({severity: 'info', summary: 'Suppression', detail: 'La ville a été supprimée', icon: 'pi-file' });
            this.adresses = this.adresses.filter(val => val.id !== adresse.id);
          },
          error: () => {
            this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer l\'adresse ', icon: 'pi-file' });
          }
        });
      }
    });
  }

  supprimerModePaiement(modePaiement: any) {
    this.confirmationService.confirm({
      message: 'Supprimer le mode de paiement '+ modePaiement.libelle + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.modePaiementService.supprimerModePaiement(modePaiement.id).subscribe({
          next: () => {
            this.messageService.add({severity: 'info', summary: 'Suppression', detail: 'Le mode de paiement a été supprimée', icon: 'pi-file' });
            this.modePaiements = this.modePaiements.filter(val => val.id !== modePaiement.id);
          },
          error: () => {
            this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer l\'adresse ', icon: 'pi-file' });
          }
        });
      }
    });
  }

  fermerModal():void{
    this.formulaireDialog=false
  }

  patientsItems(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.patients.length; i++) {
      let item = this.patients[i];
      if (item.user.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.patientsForm = filtered;
  }

  servicesItems(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.services.length; i++) {
      let item = this.services[i];
      if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.serviceForm = filtered;
  }

  villesItems(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.villes.length; i++) {
      let item = this.villes[i];
      if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.villeForm = filtered;
  }

  recupereConfig():void{
    this.primeNgConfig.setTranslation({
      startsWith: 'Commence par',
      contains: 'Contient',
      notContains: 'Ne contient pas',
      endsWith: 'Fini par',
      equals: 'Egale à',
      notEquals: 'différent de',
      noFilter: 'Pas de filtre',
      reject: 'Non',
      accept: 'Oui'
    });
  }
}
