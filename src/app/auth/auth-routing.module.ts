import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ResetComponent} from "./reset/reset.component";
import {AuthComponent} from "./auth.component";
import {LoggedInGuard, AuthGuard} from "../_guards/auth.guard";

export const routes: Routes = [
  { path: 'login', component: AuthComponent, children: [{path: '', component: LoginComponent, outlet: 'auth'}], canActivate: [LoggedInGuard] },
  { path: 'signup', component: AuthComponent, children: [{ path: '', component: SignupComponent, outlet: 'auth'}], canActivate: [LoggedInGuard] },
  { path: 'reset', component: AuthComponent, children: [{ path: '', component: ResetComponent, outlet: 'auth'}], canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoggedInGuard]
})
export class AuthRoutingModule { }
