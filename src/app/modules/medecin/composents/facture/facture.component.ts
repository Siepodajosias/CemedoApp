import { Component, OnInit } from '@angular/core';
import { FactureRendezVousService } from 'src/app/services/ServiceFacture/facture-rendez-vous.service';
import { FactureOrdonnanceService } from 'src/app/services/ServiceFacture/facture-ordonnance.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  formulaireDialog: boolean=false;
  factureForms: FormGroup;
  titre: string;

  constructor(private factureRendezVousService: FactureRendezVousService,
              private factureOrdonnanceService: FactureOrdonnanceService) { }

  ngOnInit(): void {
    this.recupererFacture();
  }
  formulaire(idFormulaire?:any){
    if(idFormulaire.id === 'rdv'){
      this.formulaireDialog=true
      this.titre="Créer une facture pour un rendez-vous"
    }else if (idFormulaire.id === 'appelVideo'){
      this.formulaireDialog=true
      this.titre="Créer une facture pour un appel vidéo"
    }else if(idFormulaire.id === 'appelTelephonique'){
      this.formulaireDialog=true
      this.titre="Créer une facture pour un appel téléphonique"
    }else if(idFormulaire.id === 'consultationDomicile'){
      this.formulaireDialog=true
      this.titre="Créer une facture pour une consultation à domicile"
    }else if(idFormulaire.id === 'chat'){
      this.formulaireDialog=true
      this.titre="Créer une facture pour un chat"
    }else if(idFormulaire.id === 'examen'){
      this.formulaireDialog=true
      this.titre="Créer une facture pour un examen"
    }else if(idFormulaire.id === 'hospitalisation'){
      this.formulaireDialog=true
      this.titre="Créer une facture pour une hospitalisationà domicile"
    }else {
      this.formulaireDialog=true
      this.titre="Créer une facture pour un test laboratoire"
    }

  }

  recupererFacture():void{
    this.factureRendezVousService.recupererFactureRendezVous().subscribe({
      next:(value)=>{
      }
    })
    this.factureOrdonnanceService.recupererFactureOrdonnance().subscribe({
      next:(value)=>{
      }
    })
  }

  enregistrerFacture() {

  }
}
