import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/modelPartager/service';
import { Adresse } from 'src/app/models/modelPartager/adresse';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private configUrl:string="http://38.242.229.12/service_s"
  constructor(private http: HttpClient) { }

  recupererService():Observable<any>{
    return this.http.get<any>(this.configUrl+"/",
            {
              headers:new HttpHeaders({'Content-Type':'application/json'})
            });
  }

  enregistrerService(service: Service): Observable<any> {
    return this.http.post<any>(this.configUrl + '/create', service,
            {
              headers:new HttpHeaders({'Content-Type':'application/json'})
            });
  }


    supprimerService(idService: number): Observable<any> {
        return this.http.get(this.configUrl + '/active/' + idService);
    }

    modifierService(service: Service): Observable<any> {
        return this.http.post<any>(this.configUrl + '/update/' + service.id,service,
                {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                });
    }
}
