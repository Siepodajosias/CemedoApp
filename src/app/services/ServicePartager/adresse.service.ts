import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adresse } from 'src/app/models/modelPartager/adresse';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {
  private configUrl:string="http://38.242.229.12/adresses"

  constructor(private http: HttpClient) { }

  recupererAdresse():Observable<any>{
    return this.http.get<any>(this.configUrl+"/getAll",
            {
              headers:new HttpHeaders({'Content-Type':'application/json'})
            });
  }

  enregistrerAdresse(adresse: Adresse): Observable<any> {
    return this.http.post<any>(this.configUrl + '/create', adresse,
            {
              headers:new HttpHeaders({'Content-Type':'application/json'})
            });
  }

    supprimerAdresse(idAdresse:number):Observable<any>{
        return this.http.get(this.configUrl+"/active/"+idAdresse)
    }

    modifierAdresse(adresse: Adresse): Observable<any> {
        return this.http.post<any>(this.configUrl + '/update',adresse,
                {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                });
    }
}
