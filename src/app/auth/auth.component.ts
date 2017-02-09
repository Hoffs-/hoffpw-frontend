import {Component, OnInit} from '@angular/core';
import {ToastService} from '../_services/toast.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [ToastService]
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
