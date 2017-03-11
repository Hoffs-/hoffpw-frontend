import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatsComponent} from './stats.component';

const routes: Routes = [
  { path: 'twitch/stats/:id', component: StatsComponent, canActivate: [] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StatsRoutingModule { }
