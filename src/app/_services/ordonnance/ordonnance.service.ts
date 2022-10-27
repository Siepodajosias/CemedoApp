import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ordonnance } from 'src/app/_modeles/ordonnance/Ordonnance';

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {

 
  private path_liste:string="https://cemedo-api-java.herokuapp.com/ordonnances/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste,{
          headers:new HttpHeaders({'Content-Type':'application/json'})
        })
        .toPromise()
        .then((res) => <Ordonnance[]>res.data)
        .then((data) => {
            return data;
        });
}
}
