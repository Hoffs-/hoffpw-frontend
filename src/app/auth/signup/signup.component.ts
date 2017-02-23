import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {contentHeaders} from '../../_services/settings';
import { Signup } from './model';
import {ToastService} from '../../_services/toast.service';
import {AuthenticationService} from "../../_services/authentication.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupModel: Signup;

  constructor(public router: Router, public http: Http, private authenticationService: AuthenticationService, private service: ToastService) {
  }

  ngOnInit() {
    this.signupModel = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  register(form: FormGroup, model: Signup, isValid: boolean) {
    if (isValid) {
      this.authenticationService.register(model.username, model.password, model.email).subscribe(
        response => {
          if (response) {
            this.service.create('success', 'Success!', 'Successfully registered!');
            form.reset();
          } else {
            this.service.create('error', 'Oops!', 'Something went wrong!');
          }
        },
        error => {
          this.showErrors(error);
        }
      );
    }
  }

  private showErrors(error) {
    if (error['email']) {
      this.service.create('error', 'Oops! (Email)', error['email'][0].replace('user', 'User'));
    }
    if (error['username']) {
      this.service.create('error', 'Oops! (Username)', error['username'][0].replace('user', 'User'));
    }
    if (error['password']) {
      this.service.create('error', 'Oops! (Password)', error['password'][0].replace('user', 'User'));
    }
  }
}
