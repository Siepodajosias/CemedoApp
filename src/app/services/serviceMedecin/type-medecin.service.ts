import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeMedecinService {
  private config:string="http://38.242.229.12/typeMedecins/"
  constructor(private http: HttpClient) { }

  recupererTypeMedecin():Observable<any>{
    return this.http.get(this.config,
            {
              headers:new HttpHeaders({'Content-Type':'application/json'})
            })
  }
}
