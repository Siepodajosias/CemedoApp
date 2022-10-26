import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gerant } from 'src/app/_modeles/gerant/Gerant';

@Injectable({
  providedIn: 'root'
})
export class GerantService {

  private path_liste:string="https://cemedo-api-java.herokuapp.com/employe/gerant/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste +"getAll")
        .toPromise()
        .then((res) => <Gerant[]>res.data)
        .then((data) => {
            return data;
        });
}
}
