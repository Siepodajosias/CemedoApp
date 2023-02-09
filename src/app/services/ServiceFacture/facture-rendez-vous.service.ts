import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FactureRendezVousService {
  configUrl:string="http://38.242.229.12/facture_rendez_vous"
  constructor(private http: HttpClient) { }

  recupererFactureRendezVous():Observable<any>{
    return this.http.get<any>(this.configUrl+"/"+"getAll",{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
}
