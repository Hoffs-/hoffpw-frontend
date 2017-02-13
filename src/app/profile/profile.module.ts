import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {TwitchCallbackComponent} from './twitch-callback/twitch-callback.component';
import {TwitchComponent} from './twitch/twitch.component';
import {UserComponent} from './user/user.component';
import {SpinnerComponent} from '../_common/spinner/spinner.component';
import {UserService} from '../_services/user.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    ProfileComponent,
    TwitchCallbackComponent,
    TwitchComponent,
    UserComponent,
    SpinnerComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
