import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformaticienService {
  private config:string="http://38.242.229.12"
  constructor(private httpInfor:HttpClient) { }
}
