/**
 * Created by Hoffs on 2017-02-03.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {contentHeaders} from './headers';

@Injectable()
export class AuthenticationService {
  public token: string;
  public user: string;

  constructor(private http: Http) {
    console.log('Constructing auth service');
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.user = currentUser && currentUser.username;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:8000/auth/login/',
      JSON.stringify({ username: username, password: password }), { headers: contentHeaders })
      .map((response: Response) => {
        let token = response.json() && response.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          return true;
        } else {
          return false;
        }
      })
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedin(): boolean {
    return !!this.token;
  }
}
