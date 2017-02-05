import {Component, ViewEncapsulation} from '@angular/core';
import { Router } from "@angular/router";
import {NotificationService} from "./_services/notifications.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  page_title = 'App';
  title = 'app works!';
  options = {};

  constructor(public router: Router, public service: NotificationService) {
    this.options = service.notifOptions;
  }

}
