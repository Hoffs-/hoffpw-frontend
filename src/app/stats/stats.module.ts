import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRoutingModule } from './stats-routing.module';
import {StatsComponent} from './stats.component';
import {ChartModule} from 'angular2-highcharts';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {TwitchStatsService} from '../_services/twitchstats.service';

export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  imports: [
    CommonModule,
    StatsRoutingModule,
    ChartModule
  ],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    TwitchStatsService
  ],
  declarations: [
    StatsComponent
  ]
})
export class StatsModule { }
