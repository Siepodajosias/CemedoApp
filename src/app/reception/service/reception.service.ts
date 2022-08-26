import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reception } from '../model/reception';
import { Rendezvous } from '../model/rendezvous';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
private config:string="https://cemedos.openslearning.com/cemedo/gerants"
private config2:string="https://cemedos.openslearning.com/cemedo/rendez_vouses"
  constructor(private httpRecep:HttpClient) { }

  private config1:string='api/reception.json';

  getReception1():Observable<any>{
    return this.httpRecep.get<any>(this.config1)
  }

  //reception ressources
  getReception():Observable<any>{
    return this.httpRecep.get<any>(this.config,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  sendReception(phar:Reception):Observable<Reception>{
    return this.httpRecep.post<Reception>(this.config,phar,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getReceptionById(a:number):Observable<any>{
    return this.httpRecep.get<any>(this.config+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteReception(e:number):void{
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
