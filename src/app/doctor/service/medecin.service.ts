import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from '../model/medecin';
import { Rendezvous } from '../model/rendezvous';
@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  private config:string="http://38.242.229.12:80/employe/medecin"
  private config2:string="http://38.242.229.12:80/rendez_vouses"

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
  getMedecinById(a:number):Observable<any>{
    return this.http.get<any>(this.config+"/getOne/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteMedecin(e:number):void{
    this.http.delete(this.config+"/"+e)
  }

  //rendezvous ressource
  getRdv():Observable<any>{
    return this.http.get<any>(this.config2,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  sendRdv(rdv:Rendezvous):Observable<Rendezvous>{
    return this.http.post<Rendezvous>(this.config2,rdv,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getRdvById(a:number):Observable<any>{
    return this.http.get<any>(this.config2+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteRdv(e:number):void{
    this.http.delete(this.config2+"/"+e)
  }

 // "http://localhost:8080/listeM?nom="
// "http://localhost:8080/listeM?nom=val&prenom=val"
}
