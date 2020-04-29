import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppTestingModule} from '../../../app-testing/app-testing.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        AppTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('正则表达式验证学号姓名', () => {
    const obj = {no: 123456, name: '测试姓名'};
    const formControl = new FormControl(obj);
    expect(formControl.valid).toBeTruthy();
    const noObj = {no: '测试学号', name: '测'};
    const noFormControl = new FormControl(noObj);
    expect(noFormControl.valid).toBeTruthy();
  });

});
