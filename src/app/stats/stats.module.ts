import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRoutingModule } from './stats-routing.module';
import {StatsComponent} from "./stats.component";

@NgModule({
  imports: [
    CommonModule,
    StatsRoutingModule
  ],
  declarations: [
    StatsComponent
  ]
})
export class StatsModule { }
