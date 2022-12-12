import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assurance } from 'src/app/models/modelAssurance/assurance';
import { Responsable } from 'src/app/models/modelAssurance/responsable';

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {
  private config:string="http://38.242.229.12/assurances/"
  private config2:string="http://38.242.229.12/employe/responsableAssurance/"
  constructor(private httpAssu:HttpClient) { }
  
  //ressource assurance
  recupererAssurance():Observable<any>{
    return this.httpAssu.get<any>(this.config)
  }
  enregistrerAssurance(assu:any):Observable<Assurance>{
    return this.httpAssu.post<Assurance>(this.config+"create",assu)
  }
  recupererAssuranceById(a:number):Observable<any>{
    return this.httpAssu.get<any>(this.config+"getOne/"+a)
  }
  supprimerAssurance(e:number):Observable<any>{
  return this.httpAssu.delete(this.config+"/"+e)
  }

    //ressource responsable
    recupererResponsable():Observable<any>{
      return this.httpAssu.get<any>(this.config2+"getAll",{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      })
    }
    enregistrerResponsable(assu:any):Observable<Responsable>{
      return this.httpAssu.post<Responsable>(this.config2+"create",assu,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      })
    }
    recupererResponsableById(a:number):Observable<any>{
      return this.httpAssu.get<any>(this.config2+"getOne/"+a,
      {
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
      )
    }
    supprimerteResponsable(e:number):Observable<any>{
    return this.httpAssu.delete(this.config2+"/"+e)
    }
}
