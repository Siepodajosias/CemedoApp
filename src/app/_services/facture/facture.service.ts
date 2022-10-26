import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facture } from 'src/app/_modeles/facture/Facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {


  private path_liste:string="https://cemedo-api-java.herokuapp.com/facture/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <Facture[]>res.data)
        .then((data) => {
            return data;
        });
}
}
