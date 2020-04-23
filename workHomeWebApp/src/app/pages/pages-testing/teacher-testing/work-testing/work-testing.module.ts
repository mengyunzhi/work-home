import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkTestingController} from './work-testing-controller';
import { ItemSelectComponent } from './item-select/item-select.component';



@NgModule({
  declarations: [ItemSelectComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ItemSelectComponent
  ],
  providers: [
    WorkTestingController
  ]
})
export class WorkTestingModule { }
