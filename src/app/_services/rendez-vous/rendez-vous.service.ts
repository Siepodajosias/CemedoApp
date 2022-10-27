import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RendezVous } from 'src/app/_modeles/rendez-vous/RendezVous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

 
  private path_liste:string="https://cemedo-api-java.herokuapp.com:443/rendez_vous/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste,{
          headers:new HttpHeaders({'Content-Type':'application/json'})
        })
        .toPromise()
        .then((res) => <RendezVous[]>res.data)
        .then((data) => {
            return data;
        });
}
}
