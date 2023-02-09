import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ordonnance } from 'src/app/models/modelPatient/ordonnance';

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {
  configUrl="http://38.242.229.12/"
  constructor(private http: HttpClient) { }

  recupererListeOrdonnance():Observable<any>{
    return this.http.get<any>(this.configUrl+"ordonnances/",{
      headers:new HttpHeaders({'Content-Type':'application/json'})})
  }

	supprimerOrdonnance(idOrdonnance:number):Observable<any> {
		return this.http.get(this.configUrl+"ordonnances/active/"+idOrdonnance)
	}


	modificationOrdonnance(ordonnance: any) {
		return this.http.post<any>(this.configUrl + 'ordonnances/update/' + ordonnance.id,ordonnance,
				{
					headers: new HttpHeaders({ 'Content-Type': 'application/json' })
				});
	}

	enregistrerOrdonnance(ordonnance: Ordonnance):Observable<Ordonnance> {
		return this.http.post<Ordonnance>(this.configUrl+"ordonnances/create",ordonnance,{
			headers:new HttpHeaders({'Content-Type':'application/json'})
		})
	}
}
