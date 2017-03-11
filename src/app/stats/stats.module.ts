import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRoutingModule } from './stats-routing.module';
import {StatsComponent} from './stats.component';
import {ChartModule} from 'angular2-highcharts';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {TwitchStatsService} from '../_services/twitchstats.service';
import {dark_unica} from '../_common/highcharts_exports';
import { StockChartsComponent } from './stock-charts/stock-charts.component';

export function highchartsFactory() {
  const Highcharts = require('highcharts/highstock');
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  Highcharts.setOptions(dark_unica);
  return Highcharts;
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
    StatsComponent,
    StockChartsComponent
  ]
})
export class StatsModule { }
