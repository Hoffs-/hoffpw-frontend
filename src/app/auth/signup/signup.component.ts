import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {contentHeaders} from "../../_services/headers";
import { Signup } from "./model";
import {ToastService} from "../../_services/toast.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [ToastService]
})
export class SignupComponent implements OnInit {
  public signupModel: Signup;

  constructor(public router: Router, public http: Http, private service: ToastService) {
  }

  ngOnInit() {
    this.signupModel = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  register(form: FormGroup, model: Signup, isValid: boolean) {
    if (isValid) {
      const body = JSON.stringify({ username: model.username, email: model.email, password: model.password });
      this.http.post('http://localhost:8000/users/', body, { headers: contentHeaders })
        .subscribe(
          response => {
            this.service.create('success', 'Success!', 'Successfully registered!');
            form.reset();
          },
          error => this.showErrors(error));
    }
  }

  private showErrors(error) {
    console.log(error);
    if (error.json()['email']) {
      this.service.create('error', 'Oops!', error.json()['email'][0].replace('user', 'User'));
    }
    if (error.json()['username']) {
      this.service.create('error', 'Oops!', error.json()['username'][0].replace('user', 'User'));
    }
    if (error.json()['password']) {
      this.service.create('error', 'Oops!', error.json()['password'][0].replace('user', 'User'));
    }
  }
}
