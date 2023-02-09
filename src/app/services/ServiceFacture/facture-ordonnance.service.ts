import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureOrdonnanceService {

  configUrl:string="http://38.242.229.12/facture_ordonnance"
  constructor(private http: HttpClient) { }

  recupererFactureOrdonnance():Observable<any>{
    return this.http.get<any>(this.configUrl+"/"+"getAll",{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
}
