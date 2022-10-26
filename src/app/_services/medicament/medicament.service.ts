import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicament } from 'src/app/_modeles/medicament/Medicament';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  
  private path_liste:string="https://cemedo-api-java.herokuapp.com/medicaments/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <Medicament[]>res.data)
        .then((data) => {
            return data;
        });
}
}
