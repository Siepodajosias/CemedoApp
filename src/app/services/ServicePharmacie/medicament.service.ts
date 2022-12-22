import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ordonnance } from 'src/app/models/modelPatient/ordonnance';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
  configUrl="http://38.242.229.12/"
  constructor(private http: HttpClient) { }


  recupererListeMedicament():Observable<any>{
    return this.http.get<any>(this.configUrl+"medicaments/",{
      headers:new HttpHeaders({'Content-Type':'application/json'})})
  }

  supprimerMedicament(idOrdonnance:number):Observable<any> {
    return this.http.get(this.configUrl+"medicaments/active/"+idOrdonnance)
  }

  modificationMedicament(ordonnance: any) {
    return this.http.post<any>(this.configUrl + 'medicaments/update/' + ordonnance.id,ordonnance,
            {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            });
  }

  enregistrerMedicament(ordonnance: Ordonnance):Observable<Ordonnance> {
    return this.http.post<Ordonnance>(this.configUrl+"medicaments/create",ordonnance,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
}
