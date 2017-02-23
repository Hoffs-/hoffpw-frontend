import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from '../../_services/user.service';
import * as moment from 'moment';
import {TwitchService} from '../../_services/twitch.service';

const redirectURI = 'https://hoff.pw/twitch/callback';
const clientId = 'wzfatxi0lrgmnpvibgdqnokgtgkicv';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss'],
  providers: [TwitchService]
})
export class TwitchComponent implements OnInit, OnDestroy {
  public partner: string;
  public date: string;
  public loaded: boolean;
  public url: string;
  public connected: boolean;
  public logo: string;
  public obj: JSON;

  private username: string;
  private ob: any;
  private ob2: any;

  constructor(private service: UserService, private tService: TwitchService) { }

  ngOnInit() {
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '');
    this.url = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id='
      + clientId + '&redirect_uri=' + redirectURI + '&scope=user_read+channel_subscriptions&state=' + date;
    this.loadComponent(0);
  }

  ngOnDestroy() {
    this.ob.unsubscribe();
}

  public disconnect() {
    this.tService.disconnectProfile(this.obj['twitch_id']).subscribe(
      response => {
        this.loadComponent(500);
      },
      error => {
        console.log(error);
      }
    );
  }

  public addTracking(username: string) {
    this.tService.addTracking(this.username, username).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

  private loadComponent(time: number) {
    this.loaded = false;
    setTimeout(() => { this.retrieveData(); }, time);
  }

  private retrieveData() {
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
          this.getLogo(this.obj['twitch_id']);
        }
        if (!this.obj) { this.loaded = true; }
      },
      error => {
        console.log(error);
        this.loaded = true;
      }
    );
  };

  private getLogo(id: string) {
    this.ob2 = this.tService.getTwitchLogo(id).subscribe(
      response => {
        this.logo = response;
        this.loaded = true;
      },
      error => {
        console.log(error);
        this.loaded = true;
      }
    );
  }
}
