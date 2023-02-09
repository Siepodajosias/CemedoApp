import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Infirmier } from 'src/app/models/modelInfirmier/infirmier';
import { Rendezvous } from 'src/app/models/modelInfirmier/rendezvous';

@Injectable({
  providedIn: 'root'
})
export class InfirmierService {
  private config:string="http://38.242.229.12/employe/infirmier/"
  private config2:string="http://38.242.229.12/rendez_vouses"
  constructor(private http:HttpClient) { }

  //infirmier ressource
  recupererInfirmier():Observable<any>{
    return this.http.get<any>(this.config+"getAll",{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  enregistrerInfirmier(infirmier:Infirmier):Observable<Infirmier>{
    return this.http.post<Infirmier>(this.config+"create",infirmier,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  recupererInfirmierById(a:number):Observable<any>{
    return this.http.get<any>(this.config+"getOne/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  supprimerInfirmier(e:number):Observable<any>{
    return this.http.get(this.config+"active/"+e)
  }

  modificationInfirmier(infirmier: any): Observable<any> {
    return this.http.post<any>(this.config + 'update/' + infirmier.matricule,infirmier,
            {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            });
  }

    //rendezvous ressource
    recupererRDV():Observable<any>{
      return this.http.get<any>(this.config2,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      })
    }
  
    sendRdv(rdv:Rendezvous):Observable<Rendezvous>{
      return this.http.post<Rendezvous>(this.config2,rdv,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      })
    }
    recupererRdvById(a:number):Observable<any>{
      return this.http.get<any>(this.config2+"/"+a,
      {
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
      )
    }
    supprimerRdv(e:number):void{
      this.http.delete(this.config2+"/"+e)
    }
}
