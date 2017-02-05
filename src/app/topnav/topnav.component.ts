import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";
import {NotificationService} from "../_services/notifications.service";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopnavComponent implements OnInit {

  constructor(public router: Router, private authenticationService: AuthenticationService, private service: NotificationService) {
  }

  ngOnInit() {
  }

  public logout() {
    if (this.authenticationService.isLoggedin()) {
      this.authenticationService.logout();
      this.service.create('success', 'Success!', 'Successfully logged out!');
      this.router.navigate(['/login']);
    } else {
      this.service.create('error', 'Oops!', 'Not logged in!');
    }
  }
}
