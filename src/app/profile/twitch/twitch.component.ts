import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {TwitchService} from '../../_services/twitch.service';
import {TrackUser} from './model';
import {ListAnimation} from '../../_common/animations';
import {ToastService} from '../../_services/toast.service';

const redirectURI = 'https://hoff.pw/twitch/callback';
const clientId = 'wzfatxi0lrgmnpvibgdqnokgtgkicv';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss'],
  animations: [ ListAnimation(700) ],
  providers: [TwitchService]
})
export class TwitchComponent implements OnInit {
  public trackModel: TrackUser;
  public partner: string;
  public date: string;
  public loaded: boolean;
  public url: string;
  public connected: boolean;
  public logo: string;
  public obj: JSON;
  public trackingDisplay: Array<[string, string]>;

  private username: string;

  private static _arrayHasTuple(array: Array<[string, string]>, id: string): boolean {
    for (const obj of array) {
      if (obj[0] === id) {
        return true;
      }
    }
    return false;
  }

  constructor(private toastService: ToastService, private twitchService: TwitchService) {
    this.trackModel = {
      username: '',
    };
    this.trackingDisplay = [];
  };

  ngOnInit() {
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '');
    this.url = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id='
      + clientId + '&redirect_uri=' + redirectURI + '&scope=user_read+channel_subscriptions&state=' + date;
    this._loadComponent(0);
  }

  public disconnect() {
    this.twitchService.disconnectProfile(this.obj['twitch_id']).subscribe(
      response => {
        this.toastService.create('success', 'Disconnected', 'Successfully disconnected your twitch account.');
        this._loadComponent(500);
      },
      error => {
        console.log(error);
      }
    );
  }

  public stopTracking(id: number) {
    this.twitchService.removeFromTracking(this.username, this.trackingDisplay[id][0]).subscribe(
      response => {
        this.trackingDisplay.splice(id, 1);
        this.toastService.create('success', 'Success!', 'Successfully removed from your tracking list.');
      },
      error => {
        this.toastService.create('error', 'Oops!', 'Something went wrong while trying to remove user from your tracking list.');
        console.log(error);
        this._loadTracking(true);
      }
    );
  }

  public addTracking(username: string) {
    this.twitchService.addTracking(this.username, username['user']).subscribe(
      data => {
        this.toastService.create('success', 'Success!', 'Successfully added '
          + username['user'] + ' to your tracking list.');
        this._loadTracking(false);
      },
      error => {
        this.toastService.create('error', 'Oops!', 'Something went wrong while trying to add '
          + username['user'] + ' to your tracking list.');
        console.log(error);
      }
    );
  }

  private _loadTracking(force: boolean) {
    this.twitchService.getTrackingUsers(this.username).subscribe(
      data => this._makeDisplayArray(data, force),
      error => console.log(error)
    );
  }

  private _loadComponent(time: number) {
    this.loaded = false;
    setTimeout(() => { this._retrieveData(); }, time);
  }

  private _makeDisplayArray(data: Array<string>, force: boolean): void {
    if (force) {
      this.trackingDisplay = [];
    }
    for (const user of data) {
      this.twitchService.getTwitchUserData(user).subscribe(
        response => {
          if (!TwitchComponent._arrayHasTuple(this.trackingDisplay, user)) {
            this.trackingDisplay.push([user, response['display_name']]);
          }
        }
      );
    }
  }

  private _retrieveData() {
    this.date = this.partner = null;
    this.connected = false;
    this.twitchService.getTwitchData().subscribe(
      response => {
        this.obj = response['results'][0];
        if (this.obj) {
          this.connected = true;
          this.date = moment(this.obj['twitch_created']).format('YYYY-MM-DD h:mm:ss a');
          this.partner = this.obj['twitch_is_partnered'] ? 'Yes' : 'No';
          this.username = this.obj['twitch_id'];
          this._getLogo(this.obj['twitch_id']);
          this._loadTracking(false);
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
    this.twitchService.getTwitchUserData(id).subscribe(
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
