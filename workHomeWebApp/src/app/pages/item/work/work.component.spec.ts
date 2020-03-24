import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkComponent } from './work.component';
import {FuncModule} from '../../../func/func.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ServiceTestingModule} from '../../../service/service-tesing/service-testing.module';
import {AppTestingModule} from '../../../app-testing/app-testing.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

fdescribe('WorkComponent', () => {
  let component: WorkComponent;
  let fixture: ComponentFixture<WorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkComponent ],
      imports: [
        FuncModule,
        RouterTestingModule,
        ServiceTestingModule,
        AppTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
