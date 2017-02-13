import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from '../../_services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  public username: string;
  public email: string;
  public date: string;
  public loaded: boolean;
  private ob: any;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.loaded = false;
    this.retrieveData();
  }

  ngOnDestroy() {
    this.ob.unsubscribe();
  }

  retrieveData() {
    this.ob = this.service.getUserData().subscribe(
      (response) => {
        console.log(response['results'][0]);
        const rp = response['results'][0];
        if (rp) {
          this.username = rp['username'];
          this.email = rp['email'];
          this.date = moment(rp['date_joined']).format('YYYY-MM-DD h:mm:ss a');
        }
        this.loaded = true;
      },
      (error) => {
        console.log(error);
        this.loaded = true;
      }
    );
  };

}
