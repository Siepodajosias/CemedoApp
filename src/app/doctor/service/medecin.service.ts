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

  constructor(private httpMed:HttpClient) { }

  //medecin ressource
  getMedecin():Observable<any>{
    return this.httpMed.get<any>(this.config+"/getAll")
  }

  sendMedecin(med:Medecin):Observable<Medecin>{
    return this.httpMed.post<Medecin>(this.config+"/create",med,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getMedecinById(a:number):Observable<any>{
    return this.httpMed.get<any>(this.config+"/getOne/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteMedecin(e:number):void{
    this.httpMed.delete(this.config+"/"+e)
  }

  //rendezvous ressource
  getRdv():Observable<any>{
    return this.httpMed.get<any>(this.config2,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  sendRdv(rdv:Rendezvous):Observable<Rendezvous>{
    return this.httpMed.post<Rendezvous>(this.config2,rdv,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getRdvById(a:number):Observable<any>{
    return this.httpMed.get<any>(this.config2+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteRdv(e:number):void{
    this.httpMed.delete(this.config2+"/"+e)
  }

 // "http://localhost:8080/listeM?nom="
// "http://localhost:8080/listeM?nom=val&prenom=val"
}
