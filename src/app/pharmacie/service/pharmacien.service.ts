import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicament } from '../model/medicament';
import { Pharmacien } from '../model/pharmacien';

@Injectable({
  providedIn: 'root'
})
export class PharmacienService {
  private config:string="https://cemedos.openslearning.com/cemedo/pharmaciens"
  private config2:string="https://cemedos.openslearning.com/cemedo/medicaments"
  constructor(private httpPhar:HttpClient) { }



  private config1:string='api/infirmier.json';

  getPharmacien1():Observable<any>{
    return this.httpPhar.get<any>(this.config1)
  }



  //pharmacien ressource
  getPharmacien():Observable<any>{
    return this.httpPhar.get<any>(this.config,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  sendPharmacien(phar:Pharmacien):Observable<Pharmacien>{
    return this.httpPhar.post<Pharmacien>(this.config,phar,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getPharmacienById(a:number):Observable<any>{
    return this.httpPhar.get<any>(this.config+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deletePharmacien(e:number):void{
    this.httpPhar.delete(this.config+"/"+e)
  }

  //medicaments ressource

  getMedicament():Observable<any>{
    return this.httpPhar.get<any>(this.config2,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  sendMedicament(medica:Medicament):Observable<Medicament>{
    return this.httpPhar.post<Medicament>(this.config2,medica,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getMedicamentById(a:number):Observable<any>{
    return this.httpPhar.get<any>(this.config2+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteMedicament(e:number):Observable<any>{
   return this.httpPhar.delete(this.config2+"/"+e,
   {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }
   )
  }
}
