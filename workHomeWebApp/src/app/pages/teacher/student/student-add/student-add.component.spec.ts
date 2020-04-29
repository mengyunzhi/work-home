import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentAddComponent} from './student-add.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {ServiceTestingModule} from '../../../../service/service-tesing/service-testing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AppTestingModule} from '../../../../app-testing/app-testing.module';

describe('StudentAddComponent', () => {
  let component: StudentAddComponent;
  let fixture: ComponentFixture<StudentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAddComponent],
      imports: [
        ReactiveFormsModule,
        ServiceTestingModule,
        RouterTestingModule,
        AppTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAddComponent);
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
