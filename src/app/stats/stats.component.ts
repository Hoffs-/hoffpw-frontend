import { Component, OnInit } from '@angular/core';
import {TwitchStatsService} from '../_services/twitchstats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor(tStatsService: TwitchStatsService) {
    this.tt = 0;
    this.options = {
      title : { text : 'test' },
      series: [{
        name: 'Current Viewers',
        data: [],
        allowPointSelect: true
      },
        {
        name: 'Total Views',
        data: [],
        allowPointSelect: true
      },
        {
        name: 'Total Followers',
        data: [],
        allowPointSelect: true
      }],
    };
    tStatsService.getAllStats('27815262').subscribe(
      response => {
        this._parseResponse(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

  options: Object;
  chart: any;
  tt: number;

  saveChart(chart) {
    this.chart = chart;
  }

  private _parseResponse(data: Array<Object>) {
    for (const obj of data) {
      console.log(obj);
      this.chart.series[0].addPoint({
        x: this.tt,
        y: obj['current_viewers']
      });
      this.chart.series[1].addPoint({
        x: this.tt,
        y: obj['total_views']
      });
      this.chart.series[2].addPoint({
        x: this.tt,
        y: obj['total_followers']
      });
      this.tt += 2;
    }
  }

  onShowEvent(series) {
    console.log(series.index);
    console.log(`${series.name} is show`);
  }

  onPointSelect(point) {
    console.log(`${point.y} is selected`);
  }

  onSeriesHide(series) {
    console.log(series.index);
    console.log(`${series.name} is hide`);
  }
}
