import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {ResetComponent} from "./reset/reset.component";
import {AuthComponent} from "./auth.component";
import {EqualValidator} from "./equal-validator.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
    ResetComponent,
    EqualValidator,
    AuthComponent
  ]
})
export class AuthModule {

}
