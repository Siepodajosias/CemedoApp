import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeMedecin } from 'src/app/_modeles/type-medecin/typeMedecin';

@Injectable({
  providedIn: 'root'
})
export class TypeMedecinService {

  private path_liste:string="https://cemedo-api-java.herokuapp.com/typeMedecins/"
  constructor(private http:HttpClient) { }

  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <TypeMedecin[]>res.data)
        .then((data) => {
            return data;
        });
}
}
