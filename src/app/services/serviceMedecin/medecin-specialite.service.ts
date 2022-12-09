import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedecinSpecialiteService {
  private config:string="http://38.242.229.12/specialite/"
  constructor(private http: HttpClient) { }

  recupererSpecialite():Observable<any>{
    return this.http.get(this.config,{
            headers:new HttpHeaders({'Content-Type':'application/json'})
  })
  }
}
