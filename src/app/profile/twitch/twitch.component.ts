import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from '../../_services/user.service';
import * as moment from 'moment';
import {TwitchService} from '../../_services/twitch.service';
import {Router} from '@angular/router';

const redirectURI = 'http://localhost:4200/twitch/callback';
const clientId = 'wzfatxi0lrgmnpvibgdqnokgtgkicv';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss'],
  providers: [TwitchService]
})
export class TwitchComponent implements OnInit, OnDestroy {
  public username: string;
  public id: string;
  public partner: string;
  public date: string;
  public loaded: boolean;
  public url: string;
  public connected: boolean;
  public logo: string;

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

  private loadComponent(time: number) {
    this.loaded = false;
    setTimeout(() => { this.retrieveData(); }, time);
  }

  private retrieveData() {
    this.username = this.id = this.date = this.partner = null;
    this.connected = false;
    this.ob = this.tService.getTwitchData().subscribe(
      response => {
        console.log(response['results'][0]);
        const rp = response['results'][0];
        if (rp) {
          this.connected = true;
          this.username = rp['twitch_display'];
          this.id = rp['twitch_id'];
          this.date = moment(rp['twitch_created']).format('YYYY-MM-DD h:mm:ss a');
          this.partner = rp['twitch_is_partnered'] ? 'Yes' : 'No';
          this.getLogo(this.id);
        }
        if (!rp) { this.loaded = true; }
      },
      error => {
        console.log(error);
        this.loaded = true;
      }
    );
  };

  private getLogo(id: string) {
    this.ob2 = this.service.getTwitchLogo(id).subscribe(
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

  public disconnect() {
    this.tService.disconnectProfile(this.id).subscribe(
      response => {
        console.log(response);
        this.loadComponent(500);
      },
      error => {
        console.log(error);
      }
    );
  }
}
