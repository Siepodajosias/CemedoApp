import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from 'src/app/models/modelMedecin/medecin';
import { Rendezvous } from 'src/app/models/modelMedecin/rendezvous';
@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  private config:string="http://38.242.229.12/employe/medecin"
  private config2:string="http://38.242.229.12/rendez_vouses"

  constructor(private http:HttpClient) { }

  //medecin ressource
  recupererMedecin():Observable<any>{
    return this.http.get<any>(this.config+"/getAll")
  }

  enregistrerMedecin(medecin:Medecin):Observable<Medecin>{
    return this.http.post<Medecin>(this.config+"/create",medecin,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  recupererMedecinById(a:number):Observable<any>{
    return this.http.get<any>(this.config+"/getOne/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  supprimerMedecin(e:number):void{
    this.http.delete(this.config+"/"+e)
  }

  //rendezvous ressource
  recupererRdv():Observable<any>{
    return this.http.get<any>(this.config2,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  enregistrerRdv(rdv:Rendezvous):Observable<Rendezvous>{
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

 // "http://localhost:8080/listeM?nom="
// "http://localhost:8080/listeM?nom=val&prenom=val"
}
