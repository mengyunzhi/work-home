import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {ServiceTestingModule} from './service-tesing/service-testing.module';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Student} from '../common/student';
import {User} from '../common/user';
import {of} from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let commonService: CommonService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ServiceTestingModule,
      RouterTestingModule,
      HttpClientTestingModule
    ]
  }));

  beforeEach(() => {
    commonService = TestBed.get(CommonService);
    const httpClient = TestBed.get(HttpClient) as HttpClient;
    const router = TestBed.get(Router);
    service = new UserService(commonService, httpClient, router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('resetPassword', () => {
    const student = new Student();
    student.id = Math.floor(Math.random() * 100);
    student.name = Math.random().toString(36).slice(-10);
    student.no = Math.floor(Math.random() * 100).toString();
    student.user = new User();
    student.user.id = Math.floor(Math.random() * 100);
    student.user.username = student.no;
    let resultUser;
    let called = false;
    service.resetPassword(student)
      .subscribe(result => {
        resultUser = result;
        called = true;
      });
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne('user/resetPassword');
    expect(req.request.method).toEqual('PUT');

    // 断言请求的参数及方法符合预期
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toBe(student);
    // 返回值为可被观察者，该观察者携带的内容为`void`
    expect(called).toBeFalsy();
    req.flush(of());
    expect(called).toBeTruthy();
  });
});
