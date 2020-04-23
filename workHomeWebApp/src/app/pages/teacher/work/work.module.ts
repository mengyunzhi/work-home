import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WorkRoutingModule} from './work-routing.module';
import {IndexComponent} from './index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditComponent} from './edit/edit.component';
import {FuncModule} from '../../../func/func.module';
import {RouterModule} from '@angular/router';
import {ItemSelectComponent} from './item-select/item-select.component';
import {PartModule} from '../../../part/part.module';


@NgModule({
  declarations: [IndexComponent, EditComponent, ItemSelectComponent],
  imports: [
    CommonModule,
    WorkRoutingModule,
    ReactiveFormsModule,
    FuncModule,
    FormsModule,
    RouterModule,
    PartModule
  ]
})
export class WorkModule { }
