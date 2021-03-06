/**
 * Created by Hoffs-Laptop on 2017-02-08.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AuthenticationService} from './authentication.service';
import {serverUrl} from './settings';

@Injectable()
export class UserService {
  public token: string;
  public user: string;

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  public getUserData(): Observable<Object> {
    return this.http.get(serverUrl + '/users/',
      { headers: this.authenticationService.authHeaders })
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        if (error.json()['detail'] && error.json()['detail'].match(/^(Invalid token.|Expired token.|User inactive or deleted.)$/)) {
          this.authenticationService.logout();
        }
        return Observable.throw(error.json() || 'Server error');
      });
  }

}
