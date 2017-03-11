import { Component, OnInit } from '@angular/core';
import {TwitchStatsService} from '../_services/twitchstats.service';
import {ActivatedRoute, Params} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor(tStatsService: TwitchStatsService, private route: ActivatedRoute) {
    let user = '';
    this.route.params.subscribe(
      (params: Params) => { user = params['id']; }
    );
    this.options = {
      xAxis: {
        type: 'datetime',
      },
      series: [{
        name: 'Current Viewers',
        data: [],
        tooltip: {
          pointFormatter: function() {
            return 'Current viewers: <b>' + this.y + '</b><br>' +
              'Status: <b>' + this.status_data + '</b><br>' +
              'Game: <b>' + this.game_data + '</b><br>';
          }
        },
      } /* ,
        {
        name: 'Total Views',
        data: []
      },
        {
        name: 'Total Followers',
        data: []
      } */ ],
    };
    tStatsService.getAllStats(user.toString()).subscribe(
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

  saveChart(chart) {
    this.chart = chart;
  }

  private _parseResponse(data: Array<Object>) {
    for (const obj of data) {
      this.chart.series[0].addPoint({
        x: moment(obj['created']).toDate(),
        y: obj['current_viewers'],
        status_data: obj['channel_status'],
        game_data: obj['game']
      }, false);
      /*
      this.chart.series[1].addPoint({
        x: moment(obj['created']).toDate(),
        y: obj['total_views']
      }, false);
      this.chart.series[2].addPoint({
        x: moment(obj['created']).toDate(),
        y: obj['total_followers']
      }, false); */
    }
    this.chart.redraw();
    // this.chart.series[1].hide();
    // this.chart.series[2].hide();
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
