/**
 * Created by Hoffs on 2017-01-30.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from './_guards/auth.guard';
import {TopnavComponent} from './topnav/topnav.component';
import {HomeComponent} from './home/home.component';
import {AuthenticationService} from './_services/authentication.service';

export const routes: Routes = [
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: TopnavComponent, outlet: 'top-nav' },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ]
})
export class AppRoutingModule {}
