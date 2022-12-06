import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comptable } from 'src/app/models/modelComptable/comptable';

@Injectable({
  providedIn: 'root'
})
export class ComptableService {
 
  private config:string="http://38.242.229.12:80/employe/comptable/"
  constructor(private httpCompt:HttpClient) { }

  //Comptable ressource
  recupererComptable():Observable<any>{
    return this.httpCompt.get<any>(this.config+"getAll",{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  enregistrerComptable(compt:Comptable):Observable<Comptable>{
    return this.httpCompt.post<Comptable>(this.config+"create",compt,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  recupererComptableById(a:number):Observable<any>{
    return this.httpCompt.get<any>(this.config+"getOne/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  supprimerComptable(e:number):void{
    this.httpCompt.delete(this.config+"/"+e)
  }

}
