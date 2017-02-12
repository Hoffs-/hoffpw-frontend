 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {TopnavComponent} from './topnav/topnav.component';
import {StatsModule} from './stats/stats.module';
import {HomeComponent} from './home/home.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
 import {UserModule} from './profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    StatsModule,
    UserModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
