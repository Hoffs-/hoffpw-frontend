/**
 * Created by Hoffs on 2017-02-26.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {serverUrl} from './settings';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class TwitchStatsService {

  private static _successfulRequest(data: any, observer: Observer<any>) {
    observer.next(data);
    observer.complete();
  }

  private static _errorRequest(data: any, observer: Observer<any>) {
    observer.error(data);
    observer.complete();
  }

  constructor(private http: Http) { }

  public getAllStats(id: string): Observable<Array<Object>> {
    return Observable.create(
      observer => this._getAllStatsData(id, observer, 1)
    );
  }

  private _getAllStatsData(id: string, observer: Observer<Array<Object>>, page: number): void {
    this._getUserStats(id, page).subscribe(
      response => {
        observer.next(response['results']);
        if (response['next'] != null) {
          this._getAllStatsData(id, observer, ++page);
        } else {
          observer.complete();
        }
      },
      error => TwitchStatsService._errorRequest(error, observer)
    );
  }

  private _getUserStats(id: string, page: number): Observable<JSON> {
    return this.http.get(serverUrl + '/twitch/stats/' + id + '/?page=' + page)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error || 'Server error');
      });
  }

}
