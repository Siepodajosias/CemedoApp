import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeFichierMedical } from 'src/app/_modeles/type-fichier-medical/TypeFichierMedical';

@Injectable({
  providedIn: 'root'
})
export class TypeFichierService {

  private path_liste:string="https://cemedo-api-java.herokuapp.com/typeFichierMedical/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <TypeFichierMedical[]>res.data)
        .then((data) => {
            return data;
        });
}
}
