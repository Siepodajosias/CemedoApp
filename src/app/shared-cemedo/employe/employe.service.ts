import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private config:string="http://38.242.229.12/"
  constructor(private http: HttpClient) { }

  recupererTypeEmploye():Observable<any>{
        return this.http.get(this.config+'typeEmployes/')
  }
  recupererGenre():Observable<any>{
    return  this.http.get(this.config+'genre/')
  }
}
