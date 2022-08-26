import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assurance } from '../model/assurance';
import { Responsable } from '../model/responsable';

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {
  private config:string="https://cemedos.openslearning.com/cemedo/assurances"
  private config2:string="https://cemedos.openslearning.com/cemedo/responsable_assurances"
  constructor(private httpAssu:HttpClient) { }
  

  private config1:string='api/assurance.json';
  getAssurance1():Observable<any>{
    return this.httpAssu.get<any>(this.config1)
  }




  //ressource assurance
  getAssurance():Observable<any>{
    return this.httpAssu.get<any>(this.config,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  sendAssurance(assu:any):Observable<Assurance>{
    return this.httpAssu.post<Assurance>(this.config,assu,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getAssuranceById(a:number):Observable<any>{
    return this.httpAssu.get<any>(this.config+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteAssurance(e:number):Observable<any>{
  return this.httpAssu.delete(this.config+"/"+e)
  }


    //ressource responsable
    getResponsable():Observable<any>{
      return this.httpAssu.get<any>(this.config2,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      })
    }
    sendResponsable(assu:any):Observable<Responsable>{
      return this.httpAssu.post<Responsable>(this.config2,assu,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      })
    }
    getResponsableById(a:number):Observable<any>{
      return this.httpAssu.get<any>(this.config2+"/"+a,
      {
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
      )
    }
    deleteResponsable(e:number):Observable<any>{
    return this.httpAssu.delete(this.config2+"/"+e)
    }
}
