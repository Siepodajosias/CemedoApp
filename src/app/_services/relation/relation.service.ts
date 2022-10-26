import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Relation } from 'src/app/_modeles/relation/relation';

@Injectable({
  providedIn: 'root'
})
export class RelationService {

  private path_liste:string="https://cemedo-api-java.herokuapp.com/relations/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <Relation[]>res.data)
        .then((data) => {
            return data;
        });
}
}
