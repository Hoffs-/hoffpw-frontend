import { Component, OnInit } from '@angular/core';
import {Reset} from './model';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})

export class ResetComponent implements OnInit {
  private resetModel: Reset;

  constructor() { }

  ngOnInit() {
    this.resetModel = {
      email: ''
    };
  }

  public reset(form: FormGroup, model: Reset, isValid: boolean) {
    if (isValid) {
      console.log('TO DO: SEND A RESET REQUEST.');
    }
  }

}
