import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';
import { Role } from '../models/role';

const users: User[] = [
  {
    id: 1,
    img: 'assets/images/user/admin.jpg',
    username: 'admin@hospital.org',
    password: 'admin@123',
    firstName: 'Diaby',
    lastName: 'Kader',
    role: Role.Admin,
    token: 'admin-token',
  },
  {
    id: 2,
    img: 'assets/images/user/doctor.jpg',
    username: 'doctor@hospital.org',
    password: 'doctor@123',
    firstName: 'Ashton',
    lastName: 'Cox',
    role: Role.Doctor,
    token: 'doctor-token',
  },{
    id:3,
    img: 'assets/images/user/patient.jpg',
    username: 'comptable@hospital.org',
    password: 'comptable@123',
    firstName: 'Yao',
    lastName: 'elfride',
    role: Role.Comptable,
    token: 'comptable-token',
  },
  {
    id: 4,
    img: 'assets/images/user/patient.jpg',
    username: 'reception@hospital.org',
    password: 'reception@123',
    firstName: 'Tiéméle',
    lastName: 'olivier',
    role: Role.Reception,
    token: 'reception-token',
  },{
    id: 5,
    img: 'assets/images/user/patient.jpg',
    username: 'infirmier@hospital.org',
    password: 'infirmier@123',
    firstName: 'Yeo',
    lastName: 'zié',
    role: Role.Infirmier,
    token: 'infirmier-token',
  },{
    id: 6,
    img: 'assets/images/user/patient.jpg',
    username: 'pharmacien@hospital.org',
    password: 'pharmacien@123',
    firstName: 'Gbotto',
    lastName: 'ange roxane',
    role: Role.Pharmacien,
    token: 'pharmacien-token',
  },
  {
    id: 7,
    img: 'assets/images/user/patient.jpg',
    username: 'informaticien@hospital.org',
    password: 'informaticien@123',
    firstName: 'Yao',
    lastName: 'yvan',
    role: Role.Informaticien,
    token: 'informaticien-token',
  },
  {
    id: 8,
    img: 'assets/images/user/patient.jpg',
    username: 'assurance@hospital.org',
    password: 'assurance@123',
    firstName: 'Yao',
    lastName: 'atta yvan',
    role: Role.Assurance,
    token: 'assurance-token',
  }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(handleRoute));

    function handleRoute() {
      switch (true) {
        case url.endsWith('/authenticate') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        id: user.id,
        img: user.img,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: user.token,
      });
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
