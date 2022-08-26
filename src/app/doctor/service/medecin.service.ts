import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin1 } from '../model/medecin1';
import { Rendezvous } from '../model/rendezvous';
@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  private config1:string='api/medecin.json';

  private config:string="https://cemedos.openslearning.com/cemedo/medecins"
  private config2:string="https://cemedos.openslearning.com/cemedo/rendez_vouses"

  constructor(private httpMed:HttpClient) { }
  getMedecin1():Observable<any>{
    return this.httpMed.get<any>(this.config1)
  }


  //medecin ressource
  getMedecin():Observable<any>{
    return this.httpMed.get<any>(this.config)
  }

  sendMedecin(med:Medecin1):Observable<Medecin1>{
    return this.httpMed.post<Medecin1>(this.config,med,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getMedecinById(a:number):Observable<any>{
    return this.httpMed.get<any>(this.config+"/"+a,
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
