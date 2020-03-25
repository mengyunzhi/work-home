import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkRoutingModule } from './work-routing.module';
import { IndexComponent } from './index/index.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    WorkRoutingModule,
    ReactiveFormsModule
  ]
})
export class WorkModule { }
