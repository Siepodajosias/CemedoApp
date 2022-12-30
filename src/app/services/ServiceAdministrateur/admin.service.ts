import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrateur } from 'src/app/models/modelAdministrateur/administrateur';
import { Facture } from 'src/app/models/modelAdministrateur/facture';
import { ModePaiement } from 'src/app/models/modelPartager/mode-paiement';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private config1:string="http://38.242.229.12/employe/administrateur"

  constructor(private http:HttpClient) { }

  //administrateur ressources
  recupererAdministrateur():Observable<any>{
    return this.http.get<any>(this.config1+'/getAll',{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  enregistrerAdministrateur(admin:Administrateur):Observable<Administrateur>{
    return this.http.post<Administrateur>(this.config1+'/create',admin,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  supprimerAdministrateur(idAdministrateur:number): Observable<any> {
    return this.http.get(this.config1 + '/active/' + idAdministrateur);
  }

  modifierAdministrateur(admin:Administrateur): Observable<any> {
    return this.http.post<any>(this.config1 + '/update/' + admin.matricule,admin,
            {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            });
  }

}
