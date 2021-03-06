import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Login} from './model';
import {AuthenticationService} from '../../_services/authentication.service';
import Timer = NodeJS.Timer;
import {ToastService} from '../../_services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginModel: Login;
  private timeout: Timer;

  constructor(public router: Router, private service: ToastService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginModel = {
      username: '',
      password: ''
    };
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  login(form: FormGroup, model: Login, isValid: boolean) {
    if (isValid) {
      this.authenticationService.login(model.username, model.password)
        .subscribe(
          result => {
            if (result === true) {
              this.service.create('success', 'Success!', 'Successfully logged in!');
              form.reset();
              this.timeout = setTimeout(() => { console.log('routing'); this.router.navigate(['/home']); }, 1500);
            } else {
              this.service.create('error', 'Oops!', 'Invalid details submitted.');
            }
          },
          error => {
              this.service.create('error', 'Oops!', 'Invalid details submitted.');
          }
        );
    }
  }

}
