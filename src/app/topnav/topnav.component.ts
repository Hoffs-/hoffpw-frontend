import {Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import {ToastService} from '../_services/toast.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopnavComponent implements OnInit, OnDestroy {
  private loggedInObservable: any;
  public isLoggedIn: boolean;

  constructor(public router: Router, private authenticationService: AuthenticationService, private service: ToastService) {
  }

  ngOnInit() {
    this.loggedInObservable = this.authenticationService.isLoggedIn;
    this.loggedInObservable.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnDestroy() {
    this.loggedInObservable.unsubscribe();
  }


  public logout() {
    if (this.authenticationService.isLoggedIn) {
      this.service.create('success', 'Success!', 'Successfully logged out!');
      this.authenticationService.logout();
    } else {
      this.service.create('error', 'Oops!', 'Not logged in!');
    }
  }
}
