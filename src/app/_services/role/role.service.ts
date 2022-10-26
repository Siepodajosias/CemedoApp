import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/_modeles/role/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private path_liste:string="https://cemedo-api-java.herokuapp.com/roles/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste)
        .toPromise()
        .then((res) => <Role[]>res.data)
        .then((data) => {
            return data;
        });
}
}
