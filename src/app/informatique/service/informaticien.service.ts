import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformaticienService {
  private config:string="http://cemedo.openslearning.com/"
  constructor(private httpInfor:HttpClient) { }
}
