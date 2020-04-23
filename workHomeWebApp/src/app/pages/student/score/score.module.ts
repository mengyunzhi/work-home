import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScoreRoutingModule} from './score-routing.module';
import {IndexComponent} from './index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ScoreRoutingModule
  ]
})
export class ScoreModule { }
