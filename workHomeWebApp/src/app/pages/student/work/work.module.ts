import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FuncModule } from '../../../func/func.module';
import { RouterModule } from '@angular/router';
import { WorkRoutingModule } from './work-routing.module';


@NgModule({
  declarations: [IndexComponent, EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FuncModule,
    RouterModule,
    WorkRoutingModule,
    FormsModule
  ]
})
export class WorkModule {
}
