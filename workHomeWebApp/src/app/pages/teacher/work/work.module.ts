import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkRoutingModule } from './work-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import {FuncModule} from '../../../func/func.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [IndexComponent, EditComponent],
  imports: [
    CommonModule,
    WorkRoutingModule,
    ReactiveFormsModule,
    FuncModule,
    FormsModule,
    RouterModule
  ]
})
export class WorkModule { }
