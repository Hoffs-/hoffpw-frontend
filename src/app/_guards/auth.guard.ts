/**
 * Created by Hoffs on 2017-01-30.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
