import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonService} from '../common.service';
import {CommonStubService} from './common-stub.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../user.service';
import {UserStubService} from './user-stub.service';
import {WorkService} from '../work.service';
import {WorkStubService} from './work-stub.service';


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
  ]
})
export class ServiceTestingModule {
}
