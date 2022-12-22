import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medecin } from 'src/app/models/modelMedecin/medecin';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private configUrl:string="http://38.242.229.12/rendez_vous"
  constructor(private http: HttpClient) { }

  recupererRendezVous():Observable<any>{
    return this.http.get<any>(this.configUrl+"/getAll")
  }

  enregistrerRendezVous(rendez_vous:Medecin):Observable<Medecin>{
    return this.http.post<Medecin>(this.configUrl+"/create",rendez_vous,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  recupererRendezVousById(a:number):Observable<any>{
    return this.http.get<any>(this.configUrl+"/getOne/"+a,
            {
              headers:new HttpHeaders({'Content-Type':'application/json'})
            }
    )
  }
  supprimerRendezVous(e:number):Observable<any>{
    return this.http.get(this.configUrl+"/active/"+e)
  }
  modifierRendezVous(rendez_vous:any){
    return this.http.post<any>(this.configUrl + '/update' + rendez_vous.id,rendez_vous,
            {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            });
  }
}
