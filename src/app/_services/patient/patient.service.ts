import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from 'src/app/_modeles/patient/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  private path_liste:string="https://cemedo-api-java.herokuapp.com/assures/patient/"
  constructor(private http:HttpClient) { }
  
  getListe() {
    return this.http
        .get<any>(this.path_liste+"all")
        .toPromise()
        .then((res) => <Patient[]>res.data)
        .then((data) => {
            return data;
        });
}
}
