import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeService } from 'src/app/_modeles/type-service/typeService';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {
  private path_liste:string="https://cemedo-api-java.herokuapp.com/typeServices/"
  constructor(private http:HttpClient) { }

  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <TypeService[]>res.data)
        .then((data) => {
            return data;
        });
}
}
