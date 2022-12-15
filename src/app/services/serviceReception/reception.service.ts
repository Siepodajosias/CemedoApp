import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reception } from 'src/app/models/modelReception/reception';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
private config:string="http://38.242.229.12/employe/gerant/"
private config2:string="http://38.242.229.12/rendez_vouses"
  constructor(private http:HttpClient) { }

  //reception ressources
  recupererReception():Observable<any>{
    return this.http.get<any>(this.config+"getAll",{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  enregistrerReception(phar:Reception):Observable<Reception>{
    return this.http.post<Reception>(this.config+"create",phar,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  recupererReceptionById(a:number):Observable<any>{
    return this.http.get<any>(this.config+"getOne/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  supprimerReception(e:number):Observable<any>{
    return  this.http.get(this.config+"active/"+e)
  }

  modificationReception(reception: any): Observable<any> {
    return this.http.post<any>(this.config + '/update/' + reception.matricule,reception,
            {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            });
  }
}
