import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppelVideoService {
  configUrl: 'http://38.242.229.12/serviceAppel/'

  constructor(private http: HttpClient) { }

  recupererListeAppelVideo():Observable<any> {
    return this.http.get<any>(this.configUrl,{ headers:new HttpHeaders({'Content-Type':'application/json','Authorization':'' +
                '007eJxTYCh976R67amZ+cSY6YreMv2TpLatsq954TzxGP+n/t/3T3xXYDA2MkhJSzOxMEk0MTQxMjSztEhMNUtNSko0tjROTDZOPWC+J7khkJGhZPY2BkYoBPHZGJJTc1NT8hkYAPKKIiE='})})
  }

  enregistrerAppelVideo(data: any): Observable<any> {
    return this.http.post(this.configUrl+ "create", data);
  }

  modificationAppelVideo(data: any): Observable<any> {
    return this.http.post(this.configUrl+ "setEmployeTraitant", data);
  }

  supprimerAppelVideo(id: any): Observable<any> {
    return this.http.get(this.configUrl+ "active",id);
  }

  /*
  deleteSelectedProducts(data:any): Observable<any> {
    return this.http.post(this.baseUrl+ "active", data);
  }*/

  /*
  setEmployeTraitant(doc: any,employe: any,gerant:any): Observable<any> {
    return this.http.get(`${this.baseUrl+ "setEmployeTraitant"}/${doc}/${employe}/${gerant}`);
  }*/

}
