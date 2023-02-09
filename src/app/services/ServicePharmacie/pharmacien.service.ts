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
  constructor(private http:HttpClient) { }

  //pharmacien ressource
  recupererPharmacien():Observable<any>{
    return this.http.get<any>(this.config+"/getAll",{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  enregistrerPharmacien(pharmacien:Pharmacien):Observable<Pharmacien>{
    return this.http.post<Pharmacien>(this.config+"/create",pharmacien,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  supprimerPharmacien(e:number):Observable<any>{
   return  this.http.get(this.config+"/active/"+e)
  }

  modificationPharmacien(pharmacien: Pharmacien): Observable<any> {
    return this.http.post<any>(this.config + '/update/' + pharmacien.matricule,pharmacien,
            {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            });
  }

  //medicaments ressource

  recupererMedicament():Observable<any>{
    return this.http.get<any>(this.config2,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  enregistrerMedicament(medica:Medicament):Observable<Medicament>{
    return this.http.post<Medicament>(this.config2,medica,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  recupererMedicamentById(a:number):Observable<any>{
    return this.http.get<any>(this.config2+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  supprimerMedicament(e:number):Observable<any>{
   return this.http.delete(this.config2+"/"+e,
   {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }
   )
  }
}
