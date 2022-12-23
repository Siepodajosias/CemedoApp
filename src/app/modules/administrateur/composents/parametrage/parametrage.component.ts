import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VilleService } from 'src/app/services/ServicePartager/ville.service';
import { AdresseService } from 'src/app/services/ServicePartager/adresse.service';
import { Ville } from 'src/app/models/modelPartager/ville';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss']
})
export class ParametrageComponent implements OnInit {

  formulaireDialog: boolean=false;
  parametreForms: FormGroup;
  titre: string;
  villes: any[];
  adresses: any[];
  postsVille: any;
  postsAdresse: any;
  champsActif:string
  constructor(private villeService: VilleService,private parametreForm: FormBuilder,
              private adresseService: AdresseService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.recupererParametrage();
    this.parametreForms=this.parametreForm.group({
      libelle:['',[Validators.required]],
      assure:['',[Validators.required]],
      ville:['',[Validators.required]],
      longitude:['',[Validators.required]],
      lattitude:['',[Validators.required]],
      designation:['',[Validators.required]],
      typeMedecin:['',[Validators.required]]
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
    }else {

    }
  }

  recupererParametrage():void{
    this.villeService.recupererVille().subscribe({
      next:(value)=>{
        this.postsVille = value.data;
        this.villes = this.postsVille;
      }
    })
    this.adresseService.recupererAdresse().subscribe({
      next:(value)=>{
        this.postsAdresse = value.data;
        this.adresses = this.postsAdresse;
      }
    })
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
                this.recupererParametrage();
                this.formulaireDialog=false
              }
            })
          }
  }

  supprimerVille(assurance: any) {
    this.confirmationService.confirm({
      message: 'Supprimer l\'assurance ' + assurance.libelle + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
      }
    });
  }

  fermerModal():void{
    this.formulaireDialog=false
  }
}
