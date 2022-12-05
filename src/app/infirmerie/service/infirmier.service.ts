import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Infirmier } from '../model/infirmier';
import { Rendezvous } from '../model/rendezvous';

@Injectable({
  providedIn: 'root'
})
export class InfirmierService {
  private config:string="http://38.242.229.12:80/employe/infirmier/"
  private config2:string="http://38.242.229.12:80/rendez_vouses"
  constructor(private httpInfir:HttpClient) { }

  //infirmier ressource
  getInfirmier():Observable<any>{
    return this.httpInfir.get<any>(this.config+"getAll",{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  sendInfirmier(infir:Infirmier):Observable<Infirmier>{
    return this.httpInfir.post<Infirmier>(this.config+"create",infir,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getInfirmierById(a:number):Observable<any>{
    return this.httpInfir.get<any>(this.config+"getOne/"+a,
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
