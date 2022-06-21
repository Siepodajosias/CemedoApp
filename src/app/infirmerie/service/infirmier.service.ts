import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfirmierService {

  constructor(private httpInfir:HttpClient) { }
}
