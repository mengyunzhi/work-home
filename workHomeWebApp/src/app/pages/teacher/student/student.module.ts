import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentRoutingModule} from './student-routing.module';
import {StudentIndexComponent} from './student-index/student-index.component';
import {StudentAddComponent} from './student-add/student-add.component';
import {StudentEditComponent} from './student-edit/student-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PartModule} from '../../../part/part.module';


@NgModule({
  declarations: [StudentIndexComponent, StudentAddComponent, StudentEditComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PartModule
  ]
})
export class StudentModule { }
