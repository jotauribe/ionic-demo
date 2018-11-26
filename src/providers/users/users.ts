import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  serverURL = 'http://localhost:8050/api';

  constructor(public http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    const payload = {
      nombrePersona: user.firstname,
      apellidoPersona: user.lastname,
      correoPersona: user.email,
      passwordPersona: user.password,
      telefonoPersona: user.telephone,
      ciudadPersona: user.city
    };

    return this.http.post<any>(`${this.serverURL}/personas`, payload);
  }

  authenticateUser({ email, password }): Observable<any> {
    const payload = { correoPersona: email, passwordPersona: password };
    const endpoint = `${this.serverURL}/personas/login?`;

    return this.http.get<any>(
      `${endpoint}correoPersona=${email}&passwordPersona=${password}`
    );
  }
}
