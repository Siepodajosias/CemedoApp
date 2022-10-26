import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pharmacien } from 'src/app/_modeles/pharmacien/Pharmacien';

@Injectable({
  providedIn: 'root'
})
export class PharmacienService {

  
  private path_liste:string="https://cemedo-api-java.herokuapp.com/employe/pharmacien/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste+"getAll")
        .toPromise()
        .then((res) => <Pharmacien[]>res.data)
        .then((data) => {
            return data;
        });
}
}
