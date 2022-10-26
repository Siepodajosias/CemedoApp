import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeEmploye } from 'src/app/_modeles/type-employe/typeEmploye';

@Injectable({
  providedIn: 'root'
})
export class TypeEmployeService {

  private path_liste:string="https://cemedo-api-java.herokuapp.com/typeEmployes/"
  constructor(private http:HttpClient) { }

  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <TypeEmploye[]>res.data)
        .then((data) => {
            return data;
        });
}
}
