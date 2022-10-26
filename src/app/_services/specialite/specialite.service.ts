import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Specialite } from 'src/app/_modeles/specialite/specialite';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  private path_liste:string="https://cemedo-api-java.herokuapp.com/specialite/"
  constructor(private http:HttpClient) { }

  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <Specialite[]>res.data)
        .then((data) => {
            return data;
        });
}
}
