import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsableAssurance } from 'src/app/_modeles/responsable-assurance/ResponsableAssurance';

@Injectable({
  providedIn: 'root'
})
export class ResponsableAssuranceService {

  private path_liste:string="https://cemedo-api-java.herokuapp.com/employe/responsableAssurance/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste+"getAll")
        .toPromise()
        .then((res) => <ResponsableAssurance[]>res.data)
        .then((data) => {
            return data;
        });
}
}
