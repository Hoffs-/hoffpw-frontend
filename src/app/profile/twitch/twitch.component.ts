import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from '../../_services/user.service';
import * as moment from 'moment';
import {TwitchService} from '../../_services/twitch.service';
import {TrackUser} from './model';

const redirectURI = 'https://hoff.pw/twitch/callback';
const clientId = 'wzfatxi0lrgmnpvibgdqnokgtgkicv';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss'],
  providers: [TwitchService]
})
export class TwitchComponent implements OnInit, OnDestroy {
  public trackModel: TrackUser;
  public partner: string;
  public date: string;
  public loaded: boolean;
  public url: string;
  public connected: boolean;
  public logo: string;
  public obj: JSON;
  public trackingDisplay: Array<string>;

  private username: string;
  private ob: any;
  private ob2: any;

  constructor(private service: UserService, private tService: TwitchService) {
    this.trackModel = {
      username: ''
    };
    this.trackingDisplay = [];
  };

  ngOnInit() {
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '');
    this.url = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id='
      + clientId + '&redirect_uri=' + redirectURI + '&scope=user_read+channel_subscriptions&state=' + date;
    this._loadComponent(0);
  }

  ngOnDestroy() {
    this.ob.unsubscribe();
}

  public disconnect() {
    this.tService.disconnectProfile(this.obj['twitch_id']).subscribe(
      response => {
        this._loadComponent(500);
      },
      error => {
        console.log(error);
      }
    );
  }

  public addTracking(username: string) {
    this.tService.addTracking(this.username, username['user']).subscribe(
      data => this._loadTracking(),
      error => console.log(error)
    );
  }

  public testTracking() {
    this.tService.getTrackingUsers(this.username).subscribe(
      data => this._test(data),
      error => console.log(error)
    );
  }

  private _test(data: Array<string>) {
    console.log(data);
  }

  private _loadTracking() {
    this.tService.getTrackingUsers(this.username).subscribe(
      data => this._makeDisplayArray(data),
      error => console.log(error)
    );
  }

  private _makeDisplayArray(data: Array<string>): Array<string> {
    const displayList = [];
    for (const user of data) {
      this.tService.getTwitchUserData(user).subscribe(
        response => {
          if (this.trackingDisplay.indexOf(response['display_name']) === -1) {
            this.trackingDisplay.push(response['display_name']);
          }
        }
      );
    }
    return displayList;
  }

  private _loadComponent(time: number) {
    this.loaded = false;
    setTimeout(() => { this._retrieveData(); }, time);
  }

  private _retrieveData() {
    this.date = this.partner = null;
    this.connected = false;
    this.ob = this.tService.getTwitchData().subscribe(
      response => {
        this.obj = response['results'][0];
        if (this.obj) {
          this.connected = true;
          this.date = moment(this.obj['twitch_created']).format('YYYY-MM-DD h:mm:ss a');
          this.partner = this.obj['twitch_is_partnered'] ? 'Yes' : 'No';
          this.username = this.obj['twitch_id'];
          this._getLogo(this.obj['twitch_id']);
          this._loadTracking();
        }
        if (!this.obj) { this.loaded = true; }
      },
      error => {
        console.log(error);
        this.loaded = true;
      }
    );
  };

  private _getLogo(id: string) {
    this.ob2 = this.tService.getTwitchUserData(id).subscribe(
      response => {
        this.logo = response['logo'];
        this.loaded = true;
      },
      error => {
        console.log(error);
        this.loaded = true;
      }
    );
  }
}
