import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModePaiement } from 'src/app/models/modelPartager/mode-paiement';

@Injectable({
  providedIn: 'root'
})
export class ModePaiementService {

  private configUrl:string="http://38.242.229.12/modePaiement"
  constructor(private http: HttpClient) { }

  recupererModePaiement():Observable<any>{
    return this.http.get<any>(this.configUrl+"/",
            {
              headers:new HttpHeaders({'Content-Type':'application/json'})
            });
  }

  enregistrerModePaiement(modePaiement: ModePaiement): Observable<any> {
    return this.http.post<any>(this.configUrl + '/create', modePaiement,
            {
              headers:new HttpHeaders({'Content-Type':'application/json'})
            });
  }

  supprimerModePaiement(idModePaiement: number): Observable<any> {
    return this.http.get(this.configUrl + '/active/' + idModePaiement);
  }

    modifierModePaiement(modePaiement: ModePaiement): Observable<any> {
        return this.http.post<any>(this.configUrl + '/update/' + modePaiement.id,modePaiement,
                {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                });
    }

}
