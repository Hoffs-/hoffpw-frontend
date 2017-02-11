/**
 * Created by Hoffs on 2017-02-03.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {contentHeaders} from './headers';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
  public token: string;
  public user: string;
  private headers: Headers;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private username: BehaviorSubject<Object> = new BehaviorSubject<Object>({'logged_in': false, 'username': null});

  constructor(private http: Http, private router: Router) {
    this.headers = contentHeaders;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.user = currentUser && currentUser.username;
    this.loggedIn.next(!!this.token);
    this.updateHeader(this.token);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:8000/auth/login/',
      JSON.stringify({ username: username, password: password }), { headers: contentHeaders })
      .map((response: Response) => {
        const token = response.json() && response.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          this.loggedIn.next(true);
          this.updateHeader(this.token);
          return true;
        } else {
          return false;
        }
      })
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.updateHeader(null);
    this.router.navigate(['/login']);
  }

  private updateHeader(header: string) {
    if (!!this.token) {
      this.headers.set('Authorization', 'Token ' + header);
    } else {
      this.headers.delete('Authorization');
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get authHeaders() {
    return this.headers;
  }
}
