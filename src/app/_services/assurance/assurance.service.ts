import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assurance } from 'src/app/_modeles/assurance/assurance';


@Injectable({
  providedIn: 'root'
})
export class AssuranceService {
  private path_liste:string="https://cemedo-api-java.herokuapp.com/assurances/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <Assurance[]>res.data)
        .then((data) => {
            return data;
        });
}

}
