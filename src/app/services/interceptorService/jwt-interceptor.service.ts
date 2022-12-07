import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  apiUrl=environment.apiUrl
  constructor(private authenticationService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const utilisateurConnecter=this.authenticationService.currentUserValue
    const isApiUrl=request.url.startsWith(this.apiUrl)

    if((utilisateurConnecter && utilisateurConnecter.token) && isApiUrl){
      request.clone({
        setHeaders:{
          Authorization: `Bearer ${utilisateurConnecter.token}`,
        }
      })
    }
    return next.handle(request);
  }
}
