import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comptable } from '../model/comptable';

@Injectable({
  providedIn: 'root'
})
export class ComptableService {
  private config1:string='api/comptable.json';
  private config:string="https://cemedo-api-java.herokuapp.com/comptables"
  constructor(private httpCompt:HttpClient) { }

  getComptable1():Observable<any>{
    return this.httpCompt.get<any>(this.config1)
  }

  //Comptable ressource
  getComptable():Observable<any>{
    return this.httpCompt.get<any>(this.config,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  sendComptable(infir:Comptable):Observable<Comptable>{
    return this.httpCompt.post<Comptable>(this.config,infir,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getComptableById(a:number):Observable<any>{
    return this.httpCompt.get<any>(this.config+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteComptable(e:number):void{
    this.httpCompt.delete(this.config+"/"+e)
  }

}
