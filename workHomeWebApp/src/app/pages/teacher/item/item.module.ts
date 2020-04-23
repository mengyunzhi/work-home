import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ItemRoutingModule} from './item-routing.module';
import {IndexComponent} from './index/index.component';
import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import {PartModule} from '../../../part/part.module';


@NgModule({
  declarations: [IndexComponent, EditComponent, AddComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    PartModule,
  ],
  providers: [DatePipe]
})
export class ItemModule {
}
