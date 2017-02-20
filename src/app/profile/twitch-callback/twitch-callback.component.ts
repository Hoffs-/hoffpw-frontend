import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TwitchService} from '../../_services/twitch.service';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-twitch-callback',
  templateUrl: './twitch-callback.component.html',
  styleUrls: ['./twitch-callback.component.scss'],
  providers: [TwitchService]
})
export class TwitchCallbackComponent implements OnInit, OnDestroy {
  public message: string;
  public outputClass: string;
  public isRequesting: boolean;
  public success: boolean;
  public error: boolean;

  private code: string;
  private sub: any;
  private timer: Timer;

  constructor(private route: ActivatedRoute, private router: Router, private twitchService: TwitchService) { }

  ngOnInit() {
    this.success = this.error = false;
    this.isRequesting = true;
    this.sub = this.route
      .queryParams
      .subscribe(p => {
        this.code = p['code'];
        this.connectUser(this.code);
      });
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
    this.sub.unsubscribe();
  }

  private connectUser(code: string) {
    this.twitchService.connectProfile(code).subscribe(
      response => {
        this.message = response;
        this.isRequesting = false;
        this.outputClass = 'success';
        this.success = true;
        this.timer = setTimeout(() => { this.router.navigate(['/profile']); }, 3500);
      },
      error => {
        this.message = error;
        this.isRequesting = false;
        this.outputClass = 'error';
        this.error = true;
        this.timer = setTimeout(() => { this.router.navigate(['/profile']); }, 3500);
      }
    );
  }
}
