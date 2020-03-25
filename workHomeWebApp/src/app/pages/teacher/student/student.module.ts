import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentIndexComponent } from './student-index/student-index.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [StudentIndexComponent, StudentAddComponent, StudentEditComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
