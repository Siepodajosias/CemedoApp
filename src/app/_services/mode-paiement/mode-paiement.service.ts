import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModePaiement } from 'src/app/_modeles/mode-paiement/modePaiement';

@Injectable({
  providedIn: 'root'
})
export class ModePaiementService {

  
  private path_liste:string="https://cemedo-api-java.herokuapp.com/modePaiement/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <ModePaiement[]>res.data)
        .then((data) => {
            return data;
        });
}
}
