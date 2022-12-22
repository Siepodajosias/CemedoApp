import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrateur } from 'src/app/models/modelAdministrateur/administrateur';
import { Facture } from 'src/app/models/modelAdministrateur/facture';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private config1:string="http://38.242.229.12/administrateurs"
  private config2:string="http://38.242.229.12/factures"
  constructor(private httpadmin:HttpClient) { }

  //administrateur ressources
  recupererAdministrateur():Observable<any>{
    return this.httpadmin.get<any>(this.config1,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  enregistrerAdministrateur(admin:Administrateur):Observable<Administrateur>{
    return this.httpadmin.post<Administrateur>(this.config1,admin,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getAdminById(a:number):Observable<any>{
    return this.httpadmin.get<any>(this.config1+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteAdmin(e:number):void{
    this.httpadmin.delete(this.config1+"/"+e)
  }

  //facture ressource
  recupererRDV():Observable<any>{
    return this.httpadmin.get<any>(this.config2,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }

  sendFacture(fact:Facture):Observable<Facture>{
    return this.httpadmin.post<Facture>(this.config2,fact,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    })
  }
  getFactureById(a:number):Observable<any>{
    return this.httpadmin.get<any>(this.config2+"/"+a,
    {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    )
  }
  deleteFacture(e:number):void{
    this.httpadmin.delete(this.config2+"/"+e)
  }

}
