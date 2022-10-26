import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comptable } from 'src/app/_modeles/comptable/comptable';

@Injectable({
  providedIn: 'root'
})
export class ComptableService {
  private path_liste:string="https://cemedo-api-java.herokuapp.com/comptable"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste+"getAll")
        .toPromise()
        .then((res) => <Comptable[]>res.data)
        .then((data) => {
            return data;
        });
}
}
