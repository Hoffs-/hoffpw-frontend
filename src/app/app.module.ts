import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./auth/auth.module";
import {TopnavComponent} from "./topnav/topnav.component";
import {StatsModule} from "./stats/stats.module";
import {HomeComponent} from "./home/home.component";
import {ToastService} from "./_services/toast.service";
import {SimpleNotificationsModule} from "angular2-notifications";
import {UserService} from "./_services/user.service";

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
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
