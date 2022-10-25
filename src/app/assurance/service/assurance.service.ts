import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assurance } from '../model/assurance';
import { Responsable } from '../model/responsable';

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {
  private config:string="https://cemedo-api-java.herokuapp.com/assurances/"
  private config2:string="https://cemedo-api-java.herokuapp.com/employe/responsableAssurance/"
  constructor(private httpAssu:HttpClient) { }
  
  getProducts() {
    return this.httpAssu
        .get<any>(this.config)
        .toPromise()
        .then((res) => <Assurance[]>res.data)
        .then((data) => {
            return data;
        });
}
getCustomers(params?: any) {
  return this.httpAssu.get<any>(this.config, { params: params }).toPromise();
}
  //ressource assurance
  getAssurance():Observable<any>{
    return this.httpAssu.get<any>(this.config,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  sendAssurance(assu:any):Observable<Assurance>{
    return this.httpAssu.post<Assurance>(this.config+"create",assu,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getAssuranceById(a:number):Observable<any>{
    return this.httpAssu.get<any>(this.config+"getOne/"+a,
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
      return this.httpAssu.get<any>(this.config2+"getAll",{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      })
    }
    sendResponsable(assu:any):Observable<Responsable>{
      return this.httpAssu.post<Responsable>(this.config2+"create",assu,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      })
    }
    getResponsableById(a:number):Observable<any>{
      return this.httpAssu.get<any>(this.config2+"getOne/"+a,
      {
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
      )
    }
    deleteResponsable(e:number):Observable<any>{
    return this.httpAssu.delete(this.config2+"/"+e)
    }
}
