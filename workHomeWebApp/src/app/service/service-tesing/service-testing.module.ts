import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonService} from '../common.service';
import {CommonStubService} from './common-stub.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../user.service';
import {UserStubService} from './user-stub.service';
import {WorkService} from '../work.service';
import {WorkStubService} from './work-stub.service';
import {MenuService} from '../menu.service';
import {MenuStubService} from './menu-stub.service';
import {StudentService} from '../student.service';
import {StudentStubService} from './student-stub.service';
import {AttachmentService} from '../attachment.service';
import {AttachmentStubService} from './attachment-stub.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientTestingModule
  ],
  exports: [
    HttpClientTestingModule
  ],
  providers: [
    {provide: CommonService, useClass: CommonStubService},
    {provide: UserService, useClass: UserStubService},
    {provide: WorkService, useClass: WorkStubService},
    {provide: MenuService, useClass: MenuStubService},
    {provide: StudentService, useClass: StudentStubService},
    {provide: AttachmentService, useClass: AttachmentStubService},
  ]
})
export class ServiceTestingModule {
}
