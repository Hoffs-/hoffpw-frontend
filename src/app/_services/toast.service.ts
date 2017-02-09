/**
 * Created by Hoffs on 2017-02-03.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {NotificationsService} from "angular2-notifications";

@Injectable()
export class ToastService {

  public notifOptions = {
    timeOut: 3000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: false,
    pauseOnHover: false,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    rtl: false,
    animate: 'fromRight',
    position: ['right', 'bottom']
  };

  constructor(private service: NotificationsService) { }

  public create(type: string, title: string, body: string) {
    switch (type) {
      case 'success':
        this.service.success(title, body);
        break;
      case 'error':
        this.service.error(title, body);
        break;
    }
  }

  public onCreate(event: Event) {
    // console.log(event);
  }

  public onDestroy(event: Event) {
    // console.log(event);
  }

}
