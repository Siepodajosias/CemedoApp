import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Administrateur } from 'src/app/_modeles/administrateur/Administrateur';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {

  private path_liste:string="https://cemedo-api-java.herokuapp.com/empploye/administrateur/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste+"getAll")
        .toPromise()
        .then((res) => <Administrateur[]>res.data)
        .then((data) => {
            return data;
        });
}
}
