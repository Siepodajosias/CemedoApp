import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fichier } from 'src/app/_modeles/fichier/Fichier';

@Injectable({
  providedIn: 'root'
})
export class FichierService {

  private path_liste:string="https://cemedo-api-java.herokuapp.com/fichiers/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste+"getAll")
        .toPromise()
        .then((res) => <Fichier[]>res.data)
        .then((data) => {
            return data;
        });
}
}
