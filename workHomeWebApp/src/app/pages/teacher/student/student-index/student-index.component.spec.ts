import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentIndexComponent } from './student-index.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {AppTestingModule} from '../../../../app-testing/app-testing.module';
import {UserService} from '../../../../service/user.service';
import {UserStubService} from '../../../../service/service-tesing/user-stub.service';
import {User} from '../../../../common/user';
import {Student} from '../../../../common/student';
import {FormTest} from '../../../../testing/formTest';

describe('StudentIndexComponent', () => {
  let component: StudentIndexComponent;
  let fixture: ComponentFixture<StudentIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentIndexComponent ],
      providers: [
        {provide: UserService, useClass: UserStubService}
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AppTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentIndexComponent);
    component = fixture.componentInstance;
    const student = new Student();
    student.id = Math.floor(Math.random() * 100);
    student.name = Math.random().toString(36).slice(-10);
    student.no = Math.floor(Math.random() * 100).toString();
    student.user = new User();
    student.user.id = Math.floor(Math.random() * 100);
    student.user.username = student.no;
    component.students = [
      student
    ];
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('测试依赖注入', () => {
    const service = TestBed.get(UserService);
    console.log(service);
  });
  it('点击重置密码按钮', () => {
   spyOn(component, 'resetPassword');
   FormTest.clickButton(fixture, '#resetPassword');
   expect(component.resetPassword).toHaveBeenCalled();
  });
  it('pages -> teacher -> student -> resetPassword', () => {
     const service  = TestBed.get(UserService) as UserService;
     spyOn(service, 'resetPassword').and.returnValue(of());
     const id = 1;
     component.resetPassword(id);
     expect(service.resetPassword).toHaveBeenCalled();
   });
});
