/**
 * Created by Hoffs-Laptop on 2017-02-08.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class TwitchService {

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  connectProfile(code: string): Observable<string> {
    return this.http.post('http://localhost:8000/twitch/', JSON.stringify({ code: code}),
      { headers: this.authenticationService.authHeaders })
      .map((response: Response) => {
        console.log(response.json());
        return response.json()['detail'];
      })
      .catch((error: any) => {
        if (error.json()['detail'] && error.json()['detail'].match(/^(Invalid token.|Expired token.|User inactive or deleted.)$/)) {
          this.authenticationService.logout();
        }
        return Observable.throw(error.json()['detail'] || 'Server error');
        // Observable.throw(error.json() || 'Server error');
      });
  }

}
