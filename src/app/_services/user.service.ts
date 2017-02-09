/**
 * Created by Hoffs-Laptop on 2017-02-08.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {contentHeaders} from './headers';

@Injectable()
export class UserService {
  public token: string;
  public user: string;

  constructor(private http: Http) {
    // set token if saved in local
    console.log("Constructing user service");
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.user = currentUser && currentUser.user;
  }

  getUserData(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:8000/auth/login/', JSON.stringify({ username: username, password: password }),
      { headers: contentHeaders })
      .map((response: Response) => {
        const token = response.json() && response.json().token;
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
