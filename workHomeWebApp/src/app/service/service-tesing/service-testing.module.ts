import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonService} from '../common.service';
import {CommonStubService} from './common-stub.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';



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
    {provide: CommonService, useClass: CommonStubService}
  ]
})
export class ServiceTestingModule { }
