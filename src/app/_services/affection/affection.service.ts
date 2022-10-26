import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Affection } from 'src/app/_modeles/affection/Affection';

@Injectable({
  providedIn: 'root'
})
export class AffectionService {

 
  private path_liste:string="https://cemedo-api-java.herokuapp.com/affections/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <Affection[]>res.data)
        .then((data) => {
            return data;
        });
}
}
