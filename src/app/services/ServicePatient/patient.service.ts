import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/modelPatient/patient';

@Injectable({
	providedIn: 'root'
})
export class PatientService {
	private config1: string = 'http://38.242.229.12/assures/patient/';
	private config4: string = 'http://38.242.229.12/assures/';

	constructor(private http: HttpClient) {}

	recupererPatient(): Observable<any> {
		return this.http.get<any>(this.config1 + 'all', {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		});
	}

	enregistrerPatient(patient: Patient): Observable<Patient> {
		return this.http.post<Patient>(this.config1 + 'create', patient, {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		});
	}

	recupererPatientById(idPatient: number): Observable<any> {
		return this.http.get<any>(this.config4 + 'getOne/' + idPatient,
				{
					headers: new HttpHeaders({ 'Content-Type': 'application/json' })
				}
		);
	}

	modifierPatient(patient: Patient): Observable<Patient> {
		return this.http.post<Patient>(this.config1 + 'update', patient, {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		});
	}

	supprimerPatient(idPatient: number): Observable<any> {
		return this.http.get(this.config1 + '/active/' + idPatient);
	}
}
