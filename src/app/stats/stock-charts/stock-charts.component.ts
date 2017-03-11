import { Component, OnInit } from '@angular/core';
import {TwitchStatsService} from '../../_services/twitchstats.service';
import {ActivatedRoute, Params} from '@angular/router';
import * as moment from 'moment';
import {exportedRangeSelector} from "../../_common/highcharts_exports";

@Component({
  selector: 'app-stock-charts',
  templateUrl: './stock-charts.component.html',
  styleUrls: ['./stock-charts.component.scss']
})
export class StockChartsComponent implements OnInit {

  constructor(private tStatsService: TwitchStatsService, private route: ActivatedRoute) {
    let user = '';
    this.route.params.subscribe(
      (params: Params) => { user = params['id']; }
    );
    this.setViewersSettings();
    this.setFollowersSettings();
    this.setViewsSettings();
    this.getApiStats(user.toString());
  }

  ngOnInit() {}

  optionsViewers: Object;
  optionsFollowers: Object;
  optionsTotalViews: Object;
  chartViewers: any;
  chartFollowers: any;
  chartTotalViews: any;

  public saveChartViewers(chart) {
    this.chartViewers = chart;
  }

  public saveChartFollowers(chart) {
    this.chartFollowers = chart;
  }

  public saveChartTotalViews(chart) {
    this.chartTotalViews = chart;
  }

  private getApiStats(user: string) {
    this.tStatsService.getAllStats(user).subscribe(
      response => {
        this._parseResponse(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  private _parseResponse(data: Array<Object>) {
    for (const obj of data) {
      const ViewersSeries = this.chartViewers.series[0];
      const FollowerSeries = this.chartFollowers.series[0];
      const ViewsSeries = this.chartTotalViews.series[0];
      ViewersSeries.addPoint({
        x: moment(obj['created']).valueOf(),
        y: obj['current_viewers'],
        status_data: obj['channel_status'],
        game_data: obj['game']
      }, false);
      ViewsSeries.addPoint({
        x: moment(obj['created']).valueOf(),
        y: obj['total_views']
      }, false);
      FollowerSeries.addPoint({
        x: moment(obj['created']).valueOf(),
        y: obj['total_followers']
      }, false);
    }
    this.chartViewers.redraw();
    this.chartTotalViews.redraw();
    this.chartFollowers.redraw();
  }

  private setViewersSettings() {
    this.optionsViewers = {
      xAxis: {
        type: 'datetime',
        gridLineWidth: 1,
      },
      yAxis: {
        title: {
          text: 'Concurrent viewers'
        }
      },
      rangeSelector: exportedRangeSelector,
      plotOptions: {
        area: {
          gapSize: 5
        }
      },
      series: [{
        type: 'area',
        name: 'Current Viewers',
        tooltip: {
          pointFormatter: function() {
            return 'Current viewers: <b>' + this.y + '</b><br>' +
              'Status: <b>' + this.status_data + '</b><br>' +
              'Game: <b>' + this.game_data + '</b><br>';
          }
        },
      }]
    };
  }

  private setViewsSettings()  {
    this.optionsTotalViews = {
      xAxis: {
        type: 'datetime',
        gridLineWidth: 1,
      },
      yAxis: {
        title: {
          text: 'Total views'
        }
      },
      rangeSelector: exportedRangeSelector,
      series: [{
        name: 'Total views',
        tooltip: {
          pointFormatter: function() {
            return 'Total views: <b>' + this.y + '</b><br>';
          }
        },
      }]
    };
  }

  private setFollowersSettings() {
    this.optionsFollowers = {
      xAxis: {
        type: 'datetime',
        gridLineWidth: 1,
      },
      yAxis: {
        ordinal: false,
        title: {
          text: 'Follower count'
        }
      },
      rangeSelector: exportedRangeSelector,
      series: [{
        name: 'Follower count',
        tooltip: {
          pointFormatter: function() {
            return 'Follower count: <b>' + this.y + '</b><br>';
          }
        },
      }]
    };
  }
}
