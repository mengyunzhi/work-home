import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkRoutingModule } from './work-routing.module';
import { IndexComponent } from './index/index.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import {FuncModule} from '../../../func/func.module';


@NgModule({
  declarations: [IndexComponent, EditComponent],
  imports: [
    CommonModule,
    WorkRoutingModule,
    ReactiveFormsModule,
    FuncModule
  ]
})
export class WorkModule { }
