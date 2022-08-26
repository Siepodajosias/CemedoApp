import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';
import { Observable } from 'rxjs';
import { Patient1 } from '../model/patient1';
import { Ordonnance } from '../model/ordonnance';
import { PageCarnetSante } from '../model/page-carnet-sante';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private config:string="https://cemedos.openslearning.com/cemedo/patients"
  private config2:string="https://cemedos.openslearning.com/cemedo/ordonnances"
  private config3:string="https://cemedos.openslearning.com/cemedo/page_carnet_santes"
  constructor(private httpPat:HttpClient) { }

  private config1:string='api/patient.json';
  //reccuperation
 getPatient():Observable<Patient[]>{
   return this.httpPat.get<Patient[]>(this.config1)
 }

 //patients ressource
 getPatientP():Observable<any>{
  return this.httpPat.get<any>(this.config,{
    headers:new HttpHeaders({'Content-Type':'application/json'})
  })
}

sendPatient(pat:Patient1):Observable<Patient1>{
  return this.httpPat.post<Patient1>(this.config,pat,{
    headers:new HttpHeaders({'Content-Type':'application/json'})
  })
}
getPatientById(a:number):Observable<any>{
  return this.httpPat.get<any>(this.config+"/"+a+"/update",
  {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }
  )
}
deletePatient(e:number):Observable<any>{
 return this.httpPat.delete(this.config+"/"+e)
}

//Ordonnance ressource

getOrdonnance():Observable<any>{
  return this.httpPat.get<any>(this.config2,{
    headers:new HttpHeaders({'Content-Type':'application/json'})
  })
}

sendOrdonnance(ord:Ordonnance):Observable<Ordonnance>{
  return this.httpPat.post<Ordonnance>(this.config2,ord,{
    headers:new HttpHeaders({'Content-Type':'application/json'})
  })
}
getOrdonnanceById(a:number):Observable<any>{
  return this.httpPat.get<any>(this.config2+"/"+a,
  {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }
  )
}
deleteOrdonnance(e:number):void{
  this.httpPat.delete(this.config2+"/"+e)
}

//carnet de sante ressource

getCarnetSante():Observable<any>{
  return this.httpPat.get<any>(this.config3,{
    headers:new HttpHeaders({'Content-Type':'application/json'})
  })
}

sendCarnetSante(cnts:PageCarnetSante):Observable<PageCarnetSante>{
  return this.httpPat.post<PageCarnetSante>(this.config3,cnts,{
    headers:new HttpHeaders({'Content-Type':'application/json'})
  })
}
getCanetSanteById(a:number):Observable<any>{
  return this.httpPat.get<any>(this.config3+"/"+a,
  {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }
  )
}
deletePageCarnetSante(e:number):void{
  this.httpPat.delete(this.config3+"/"+e)
}
}
