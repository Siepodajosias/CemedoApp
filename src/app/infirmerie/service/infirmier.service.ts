import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Infirmier } from '../model/infirmier';
import { Rendezvous } from '../model/rendezvous';

@Injectable({
  providedIn: 'root'
})
export class InfirmierService {
  private config:string="https://cemedos.openslearning.com/cemedo/infirmiers"
  private config2:string="https://cemedos.openslearning.com/cemedo/rendez_vouses"
  constructor(private httpInfir:HttpClient) { }


  private config1:string='api/infirmier.json';

  getInfirmier1():Observable<any>{
    return this.httpInfir.get<any>(this.config1)
  }







  //infirmier ressource
  getInfirmier():Observable<any>{
    return this.httpInfir.get<any>(this.config,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  sendInfirmier(infir:Infirmier):Observable<Infirmier>{
    return this.httpInfir.post<Infirmier>(this.config,infir,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getInfirmierById(a:number):Observable<any>{
    return this.httpInfir.get<any>(this.config+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteInfirmier(e:number):void{
    this.httpInfir.delete(this.config+"/"+e)
  }

    //rendezvous ressource
    getRdv():Observable<any>{
      return this.httpInfir.get<any>(this.config2,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      })
    }
  
    sendRdv(rdv:Rendezvous):Observable<Rendezvous>{
      return this.httpInfir.post<Rendezvous>(this.config2,rdv,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      })
    }
    getRdvById(a:number):Observable<any>{
      return this.httpInfir.get<any>(this.config2+"/"+a,
      {
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
      )
    }
    deleteRdv(e:number):void{
      this.httpInfir.delete(this.config2+"/"+e)
    }
}
