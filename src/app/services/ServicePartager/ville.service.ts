import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ville } from 'src/app/models/modelPartager/ville';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  private configUrl:string="http://38.242.229.12/ville"
  constructor(private http: HttpClient) { }

  recupererVille():Observable<any>{
    return this.http.get<any>(this.configUrl+"/getAll",
            {
              headers:new HttpHeaders({'Content-Type':'application/json'})
            });
  }

    enregistrerVille(ville: Ville): Observable<any> {
        return this.http.post<any>(this.configUrl + '/create', ville,
                {
                    headers:new HttpHeaders({'Content-Type':'application/json'})
                });
    }

    supprimerVille(idVille:number):Observable<any>{
        return this.http.get(this.configUrl+"/active/"+idVille)
    }

    modifierVille(ville: Ville): Observable<any> {
        return this.http.post<any>(this.configUrl + '/update/' + ville.id,ville,
                {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                });
    }
}
