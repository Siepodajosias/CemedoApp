import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reception } from 'src/app/models/modelReception/reception';
import { Rendezvous } from 'src/app/models/modelReception/rendezvous';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
private config:string="http://38.242.229.12:80/employe/gerant/"
private config2:string="http://38.242.229.12:80/rendez_vouses"
  constructor(private httpRecep:HttpClient) { }

  //reception ressources
  recupererReception():Observable<any>{
    return this.httpRecep.get<any>(this.config+"getAll",{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  enregistrerReception(phar:Reception):Observable<Reception>{
    return this.httpRecep.post<Reception>(this.config+"create",phar,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  recupererReceptionById(a:number):Observable<any>{
    return this.httpRecep.get<any>(this.config+"getOne/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  supprimerReception(e:number):void{
    this.httpRecep.delete(this.config+"/"+e)
  }

  //rendezvous ressource
  getRdv():Observable<any>{
    return this.httpRecep.get<any>(this.config2,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  sendRdv(rdv:Rendezvous):Observable<Rendezvous>{
    return this.httpRecep.post<Rendezvous>(this.config2,rdv,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getRdvById(a:number):Observable<any>{
    return this.httpRecep.get<any>(this.config2+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteRdv(e:number):void{
    this.httpRecep.delete(this.config2+"/"+e)
  }
}
