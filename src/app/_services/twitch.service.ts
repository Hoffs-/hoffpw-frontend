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
import {Observer} from 'rxjs/Observer';

const TwitchClientID = 'wzfatxi0lrgmnpvibgdqnokgtgkicv';

@Injectable()
export class TwitchService {

  private twitchHeaders: Headers;

  private static _addToArray(list: Array<string>, data: JSON): Array<string> {
    for (let _i = 0; _i < data['length']; _i++) {
      list.push(data[_i]['twitch_id']);
    }
    return list;
  }

  private static _successfulRequest(data: any, observer: Observer<any>) {
    observer.next(data);
    observer.complete();
  }

  private static _errorRequest(data: any, observer: Observer<any>) {
    observer.error(data);
    observer.complete();
  }

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

  public getTwitchUserData(id: string): Observable<JSON> {
    return this.http.get('https://api.twitch.tv/kraken/users/' + id, { headers: this.twitchHeaders})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Server error');
      });
  }

  public getTrackingUsers(id: string): Observable<Array<string>> {
    return Observable.create(
      observer => this._getAllTrackingUserApi(id, observer, 1)
    );
  }

  public addTracking(twitch_user: string, username: string): Observable<string> {
    return Observable.create(
      observer => {
        this._getUserIdTwitch(username).subscribe(
          response => this._sendRequest(twitch_user, response, observer),
          error => TwitchService._errorRequest(error, observer)
        );
      }
    );
  }

  private _getAllTrackingUserApi(id: string, observer: Observer<Array<string>>, page: number) {
    const list = [];
    this._getTrackingUsersApi(id, page).subscribe(
      response => {
        observer.next(TwitchService._addToArray(list, response['results']));
        if (response['next'] != null) {
          this._getAllTrackingUserApi(id, observer, ++page);
        } else {
          observer.complete();
        }
      },
      error => TwitchService._errorRequest(error, observer)
    );
  }

  private _getTrackingUsersApi(id: string, page: number): Observable<JSON> {
    return this.http.get(serverUrl + '/twitch/' + id + '/tracking/?page=' + page, { headers: this.authenticationService.authHeaders })
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error || 'Server error');
      });
  }

  private _sendRequest(user: string, id: string, observer: Observer<string>) {
    this._sendTrackingRequestToApi(user, id).subscribe(
      response => TwitchService._successfulRequest(response, observer),
      error => TwitchService._errorRequest(error, observer)
    );
  }

  private _sendTrackingRequestToApi(user_id: string, id: string): Observable<boolean> {
    return this.http.post(serverUrl + '/twitch/' + user_id + '/tracking/', JSON.stringify({ twitch_id: id }),
      { headers: this.authenticationService.authHeaders })
      .map((response: Response) => {
        return true;
      })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Server error');
      });
  }

  private _getUserIdTwitch(user: string): Observable<string> {
    return this.http.get('https://api.twitch.tv/kraken/users?login=' + user, { headers: this.twitchHeaders })
      .map((response: Response) => {
        return response.json()['users'][0]['_id'];
      })
      .catch((error: any) => {
        return Observable.throw(error || 'Server error');
    });
  }

  public removeFromTracking(user: string, id: string): Observable<boolean> {
    return this.http.delete(serverUrl + '/twitch/' + user + '/tracking/' + id + '/', { headers: this.authenticationService.authHeaders })
      .map((response: Response) => {
        if (response.status === 200) {
          console.log(response.status);
          return true;
        } else {
          return false;
        }
      })
      .catch((error: any) => {
        return Observable.throw(error || 'Server error');
    });
  }
}

