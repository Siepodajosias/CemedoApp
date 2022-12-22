import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from 'src/app/models/modelMedecin/medecin';


@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  private config:string="http://38.242.229.12/employe/medecin"

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
  supprimerMedecin(e:number):Observable<any>{
   return this.http.get(this.config+"/active/"+e)
  }
  modifierMedecin(medecin:any){
    return this.http.post<any>(this.config + '/update/' + medecin.matricule,medecin,
            {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            });
  }

 // "http://localhost:8080/listeM?nom="
// "http://localhost:8080/listeM?nom=val&prenom=val"
}
