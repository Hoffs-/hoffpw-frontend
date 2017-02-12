import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './profile-routing.module';
import {UserComponent} from './profile.component';
import {TwitchCallbackComponent} from './twitch-callback/twitch-callback.component';
import {TwitchComponent} from './twitch/twitch.component';
import {ProfileComponent} from './user/user.component';
import {SpinnerComponent} from '../_common/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    TwitchCallbackComponent,
    TwitchComponent,
    ProfileComponent,
    SpinnerComponent
  ]
})
export class UserModule { }
