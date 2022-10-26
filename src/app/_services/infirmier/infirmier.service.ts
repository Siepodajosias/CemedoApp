import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Infirmier } from 'src/app/_modeles/infirmier/Infirmier';

@Injectable({
  providedIn: 'root'
})
export class InfirmierService {

  
  private path_liste:string="https://cemedo-api-java.herokuapp.com/employe/infirmier/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste+"getAll")
        .toPromise()
        .then((res) => <Infirmier[]>res.data)
        .then((data) => {
            return data;
        });
}
}
