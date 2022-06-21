import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformaticienService {

  constructor(private httpInfor:HttpClient) { }
}
