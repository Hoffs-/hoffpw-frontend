/**
 * Created by Hoffs-Laptop on 2017-02-08.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AuthenticationService} from './authentication.service';
import {serverUrl} from './settings';

const TwitchClientID = 'wzfatxi0lrgmnpvibgdqnokgtgkicv';

@Injectable()
export class TwitchService {

  private twitchHeaders: Headers;

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.twitchHeaders = new Headers();
      this.twitchHeaders.append('Accept', 'application/vnd.twitchtv.v5+json');
    this.twitchHeaders.append('Client-ID', TwitchClientID);
  }

  public connectProfile(code: string): Observable<string> {
    return this.http.post(serverUrl + '/twitch/', JSON.stringify({ code: code}),
      { headers: this.authenticationService.authHeaders })
      .map((response: Response) => {
        return response.json()['detail'];
      })
      .catch((error: any) => {
        if (error.json()['detail'] && error.json()['detail'].match(/^(Invalid token.|Expired token.|User inactive or deleted.)$/)) {
          this.authenticationService.logout();
        }
        return Observable.throw(error.json()['detail'] || 'Server error');
      });
  }

  public getTwitchData(): Observable<Object> {
    return this.http.get(serverUrl + '/twitch/',
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

  public disconnectProfile(id: string): Observable<string> {
    return this.http.delete(serverUrl + '/twitch/' + id + '/', { headers: this.authenticationService.authHeaders })
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

  public getTwitchLogo(id: string): Observable<string> {
    return this.http.get('https://api.twitch.tv/kraken/users/' + id, { headers: this.twitchHeaders})
      .map((response: Response) => {
        return response.json()['logo'];
      })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Server error');
      });
  }

  public getTrackingUsers(id: string): Observable<Object> {
    return this.http.get(serverUrl + '/twitch/' + id + '/tracking/', { headers: this.authenticationService.authHeaders })
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Server error');
      });
  }

  public addTracking(twitch_user: string, username: string): Observable<string> {
    return Observable.create(
      observer => {
        this.getUserId(username).subscribe(
          response => {
            this.sendRequest(twitch_user, response).subscribe(
              reqResponse => {
                observer.next(reqResponse);
                observer.complete();
              },
              reqError => {
                observer.next('error in sendRequest');
                observer.complete();
              }
            );
          },
          error => {
            observer.next('error in getUserId');
            observer.complete();
          }
        );
      }
    );
  }

  private sendRequest(user: string, id: string): Observable<string> {
    return Observable.create(
      observer => {
        this.sendTrackingRequest(user, id).subscribe(
          response => {
            observer.next('complete in sendRequest');
            observer.complete();
          },
          error => {
            observer.next('error in sendRequest fnc');
            observer.complete();
          }
        );
      }
    );
  }

  private sendTrackingRequest(user_id: string, id: string): Observable<boolean> {
    return this.http.post(serverUrl + '/twitch/' + user_id + '/tracking/', JSON.stringify({ twitch_id: id }),
      { headers: this.authenticationService.authHeaders })
      .map((response: Response) => {
        return true;
      })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Server error');
      });
  }

  private getUserId(user: string): Observable<string> {
    console.log('getuid');
    return this.http.get('https://api.twitch.tv/kraken/users?login=' + user, { headers: this.twitchHeaders })
      .map((response: Response) => {
        return response.json()['users'][0]['_id'];
      })
      .catch((error: any) => {
        return Observable.throw(error || 'Server error');
    });
  }
}
