import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../../_modeles/service/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private path_liste:string="https://cemedo-api-java.herokuapp.com:443/service_s/"
  constructor(private http:HttpClient) { }

  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <Service[]>res.data)
        .then((data) => {
          console.log(data);
            return data;
          
        });
}
}
