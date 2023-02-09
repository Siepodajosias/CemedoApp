import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  private configUrl:string="http://38.242.229.12/typeServices"
  constructor(private http: HttpClient) { }

  recupererTypeService():Observable<any>{
    return this.http.get<any>(this.configUrl+"/",
            {
              headers:new HttpHeaders({'Content-Type':'application/json'})
            });
  }
}
