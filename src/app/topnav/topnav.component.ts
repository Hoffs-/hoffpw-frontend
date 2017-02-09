import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import {ToastService} from '../_services/toast.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToastService]
})
export class TopnavComponent implements OnInit {
  public canLogout: boolean;

  constructor(public router: Router, private authenticationService: AuthenticationService, private service: ToastService) {
  }

  ngOnInit() {
    this.canLogout = this.authenticationService.isLoggedin();
  }

  ngOnChange() {
    this.canLogout = this.authenticationService.isLoggedin();
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
