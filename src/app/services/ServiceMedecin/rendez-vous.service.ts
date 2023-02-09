import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rendezvous } from 'src/app/models/modelMedecin/rendezvous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private configUrl:string="http://38.242.229.12/rendez_vous"
  constructor(private http: HttpClient) { }

  recupererRendezVous():Observable<any>{
    return this.http.get<any>(this.configUrl+"/getAll")
  }

  enregistrerRendezVous(rendez_vous:Rendezvous):Observable<any>{
    return this.http.post<any>(this.configUrl+"/create",rendez_vous,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  recupererRendezVousById(idRendezVous:number):Observable<any>{
    return this.http.get<any>(this.configUrl+"/getOne/"+idRendezVous,
            {
              headers:new HttpHeaders({'Content-Type':'application/json'})
            }
    )
  }
  supprimerRendezVous(idRendezVous:number):Observable<any>{
    return this.http.get(this.configUrl+"/active/"+idRendezVous)
  }
  modifierRendezVous(rendez_vous:any){
    return this.http.post<any>(this.configUrl + '/update' + rendez_vous.id,rendez_vous,
            {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            });
  }
}
