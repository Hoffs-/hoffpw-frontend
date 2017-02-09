import {Component, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {ToastService} from './_services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToastService]
})
export class AppComponent {
  options = {};

  constructor(public router: Router, public toastService: ToastService) {
    this.options = toastService.notifOptions;
  }
}
