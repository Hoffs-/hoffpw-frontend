/**
 * Created by Hoffs-Laptop on 2017-02-08.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AuthenticationService} from './authentication.service';

const TwitchClientID = 'wzfatxi0lrgmnpvibgdqnokgtgkicv';

@Injectable()
export class UserService {
  public token: string;
  public user: string;

  private headers: Headers;

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers();
    this.headers.append('Accept', 'application/vnd.twitchtv.v5+json');
    this.headers.append('Client-ID', TwitchClientID);
  }

  public getUserData(): Observable<Object> {
    return this.http.get('http://localhost:8000/users/',
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

  getTwitchLogo(id: string): Observable<string> {
    return this.http.get('https://api.twitch.tv/kraken/users/' + id, { headers: this.headers})
      .map((response: Response) => {
        return response.json()['logo'];
      })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Server error');
      });
  }

}
