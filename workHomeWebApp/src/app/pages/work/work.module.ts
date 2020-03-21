import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {WorkRoutingModule} from './work-routing.module';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    WorkRoutingModule
  ]
})
export class WorkModule { }
