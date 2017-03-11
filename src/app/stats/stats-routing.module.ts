import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatsComponent} from './stats.component';
import {AuthGuard} from '../_guards/auth.guard';

const routes: Routes = [
  { path: 'twitch/stats/:id', component: StatsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StatsRoutingModule { }
