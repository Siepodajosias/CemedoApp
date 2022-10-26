import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medecin } from 'src/app/_modeles/medecin/Medecin';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

 
  private path_liste:string="https://cemedo-api-java.herokuapp.com/employe/medecin/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste+"getAll")
        .toPromise()
        .then((res) => <Medecin[]>res.data)
        .then((data) => {
          console.log(data);
            return data;
        });
}
}
