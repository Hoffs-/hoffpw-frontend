import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './profile.component';
import {TwitchCallbackComponent} from './twitch-callback/twitch-callback.component';
import {AuthGuard} from '../_guards/auth.guard';

const routes: Routes = [
  { path: 'profile', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'twitch/callback', component: TwitchCallbackComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class UserRoutingModule { }
