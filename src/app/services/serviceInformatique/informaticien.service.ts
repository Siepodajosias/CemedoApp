import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformaticienService {
  private config:string="https://cemedo-api-java.herokuapp.com/"
  constructor(private httpInfor:HttpClient) { }
}
