import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ItemRoutingModule} from './item-routing.module';
import {IndexComponent} from './index/index.component';
import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import { SeeComponent } from './see/see.component';
import { WorkComponent } from './work/work.component';
import {FuncModule} from '../../func/func.module';


@NgModule({
  declarations: [IndexComponent, EditComponent, AddComponent, SeeComponent, WorkComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    FuncModule,
  ],
  providers: [DatePipe]
})
export class ItemModule {
}
