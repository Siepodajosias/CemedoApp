import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assurance } from 'src/app/models/modelAssurance/assurance';

@Injectable({
	providedIn: 'root'
})
export class AssuranceService {
	private config1: string = 'http://38.242.229.12/assurances/';
	private config2: string = 'http://38.242.229.12/employe/responsableAssurance/';

	constructor(private http: HttpClient) {
	}

	//ressource assurance
	recupererAssurance(): Observable<any> {
		return this.http.get<any>(this.config1,
				{
					headers:new HttpHeaders({'Content-Type':'application/json'})
				});
	}

	enregistrerAssurance(assurance: any): Observable<Assurance> {
		return this.http.post<Assurance>(this.config1 + 'create', assurance,
				{
					headers:new HttpHeaders({'Content-Type':'application/json'})
				});
	}

	recupererAssuranceById(a: number): Observable<any> {
		return this.http.get<any>(this.config1 + 'getOne/' + a,
				{
					headers:new HttpHeaders({'Content-Type':'application/json'})
				});
	}

	supprimerAssurance(e: number): Observable<any> {
		return this.http.get(this.config1 + 'active/' + e);
	}

	modificationAssurance(assurance: any): Observable<any> {
		return this.http.post<any>(this.config1 + 'update/' + assurance.id, assurance,
				{
					headers: new HttpHeaders({ 'Content-Type': 'application/json' })
				});
	}


	//ressource responsable
	recupererResponsable(): Observable<any> {
		return this.http.get<any>(this.config2 + 'getAll', {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		});
	}

	enregistrerResponsable(responsable: any): Observable<any> {
		return this.http.post<any>(this.config2 + 'create', responsable, {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		});
	}

	recupererResponsableById(a: number): Observable<any> {
		return this.http.get<any>(this.config2 + 'getOne/' + a,
				{
					headers: new HttpHeaders({ 'Content-Type': 'application/json' })
				}
		);
	}

	supprimerteResponsable(idesponsable: number): Observable<any> {
		return this.http.get(this.config2 + 'active/' + idesponsable);
	}
}
