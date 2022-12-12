import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicament } from 'src/app/models/modelPharmacie/medicament';
import { Pharmacien } from 'src/app/models/modelPharmacie/pharmacien';

@Injectable({
  providedIn: 'root'
})
export class PharmacienService {
  private config:string="http://38.242.229.12/employe/pharmacien"
  private config2:string="http://38.242.229.12/medicaments"
  constructor(private httpPhar:HttpClient) { }

  //pharmacien ressource
  recupererPharmacien():Observable<any>{
    return this.httpPhar.get<any>(this.config+"/getAll",{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  enregistrerPharmacien(phar:Pharmacien):Observable<Pharmacien>{
    return this.httpPhar.post<Pharmacien>(this.config+"/create",phar,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  recupererPharmacienById(a:number):Observable<any>{
    return this.httpPhar.get<any>(this.config+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  supprimerPharmacien(e:number):void{
    this.httpPhar.delete(this.config+"/"+e)
  }

  //medicaments ressource

  recupererMedicament():Observable<any>{
    return this.httpPhar.get<any>(this.config2,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  enregistrerMedicament(medica:Medicament):Observable<Medicament>{
    return this.httpPhar.post<Medicament>(this.config2,medica,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  recupererMedicamentById(a:number):Observable<any>{
    return this.httpPhar.get<any>(this.config2+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  supprimerMedicament(e:number):Observable<any>{
   return this.httpPhar.delete(this.config2+"/"+e,
   {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }
   )
  }
}
