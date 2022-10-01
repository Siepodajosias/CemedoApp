import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comptable } from '../model/comptable';

@Injectable({
  providedIn: 'root'
})
export class ComptableService {
 
  private config:string="https://cemedo-api-java.herokuapp.com/employe/comptable/"
  constructor(private httpCompt:HttpClient) { }


  //Comptable ressource
  getComptable():Observable<any>{
    return this.httpCompt.get<any>(this.config+"getAll",{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  sendComptable(compt:Comptable):Observable<Comptable>{
    return this.httpCompt.post<Comptable>(this.config+"create",compt,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getComptableById(a:number):Observable<any>{
    return this.httpCompt.get<any>(this.config+"getOne/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteComptable(e:number):void{
    this.httpCompt.delete(this.config+"/"+e)
  }

}
