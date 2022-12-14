import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comptable } from 'src/app/models/modelComptable/comptable';

@Injectable({
	providedIn: 'root'
})
export class ComptableService {

	private config: string = 'http://38.242.229.12/employe/comptable/';
	constructor(private http: HttpClient) {
	}

	recupererComptable(): Observable<any> {
		return this.http.get<any>(this.config + 'getAll', {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		});
	}

	enregistrerComptable(comptable: Comptable): Observable<Comptable> {
		return this.http.post<Comptable>(this.config + 'create', comptable, {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		});
	}

	recupererComptableById(idComptable: number): Observable<any> {
		return this.http.get<any>(this.config + 'getOne/' + idComptable,
				{
					headers: new HttpHeaders({ 'Content-Type': 'application/json' })
				}
		);
	}

	supprimerComptable(idComptable: number): Observable<any> {
		return this.http.get(this.config + 'active/' + idComptable);
	}

	modificationComptable(comptable: any): Observable<any> {
		return this.http.post<any>(this.config + 'update/' + comptable.matricule,comptable,
				{
					headers: new HttpHeaders({ 'Content-Type': 'application/json' })
				});
	}

}
