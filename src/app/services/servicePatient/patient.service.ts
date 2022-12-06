import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from 'src/app/models/modelPatient/patient';
import { Observable } from 'rxjs';
import { Patient1 } from 'src/app/models/modelPatient/patient1';
import { Ordonnance } from 'src/app/models/modelPatient/ordonnance';
import { PageCarnetSante } from 'src/app/models/modelPatient/page-carnet-sante';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private config:string="http://38.242.229.12:80/assures/patient/"
  private config4:string="http://38.242.229.12:80/assures/"
  private config2:string="http://38.242.229.12:80/ordonnances"
  private config3:string="http://38.242.229.12:80/page_carnet_santes"
  constructor(private httpPat:HttpClient) { }

 //patients ressource
 recupererPatient():Observable<any>{
  return this.httpPat.get<any>(this.config+"all",{
    headers:new HttpHeaders({'Content-Type':'application/json'})
  })
}

enregistrerPatient(pat:Patient1):Observable<Patient1>{
  return this.httpPat.post<Patient1>(this.config+"create",pat,{
    headers:new HttpHeaders({'Content-Type':'application/json'})
  })
}
recupererPatientById(a:number):Observable<any>{
  return this.httpPat.get<any>(this.config4+"getOne/"+a,
  {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }
  )
}
supprimerPatient(e:number):Observable<any>{
 return this.httpPat.delete(this.config+"/"+e)
}

//Ordonnance ressource

recupererOrdonnance():Observable<any>{
  return this.httpPat.get<any>(this.config2,{
    headers:new HttpHeaders({'Content-Type':'application/json'})
  })
}

enregistrerOrdonnance(ord:Ordonnance):Observable<Ordonnance>{
  return this.httpPat.post<Ordonnance>(this.config2,ord,{
    headers:new HttpHeaders({'Content-Type':'application/json'})
  })
}
recupererOrdonnanceById(a:number):Observable<any>{
  return this.httpPat.get<any>(this.config2+"/"+a,
  {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }
  )
}
supprimerOrdonnance(e:number):void{
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
