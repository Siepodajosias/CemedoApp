import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }

  /**
   * Retourne true s'il s'agit d'une url complète c'est-à-dire qu'elle contient http.
   *
   * @param url l'url à tester.
   * @private
   */
  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^http?:\/\//i;
    return absolutePattern.test(url);
  }
}
