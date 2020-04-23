import {TestBed} from '@angular/core/testing';

import {StudentService} from './student.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpRequest} from '@angular/common/http';
import {Student} from '../common/student';
import {of} from 'rxjs';

describe('StudentService', () => {
  let service: StudentService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(StudentService);
  });

  /* 分页测试 */
  it('page', () => {
    /* 模拟返回数据 */
    const mockResult = {
      totalPages: 10,
      content: new Array(new Student({}), new Student({}))
    };

    /* 进行订阅，发送数据后将called置true */
    let called = false;
    service.page({}).subscribe((success: { totalPages: number, content: Array<Student> }) => {
      called = true;
      expect(success.totalPages).toEqual(10);
      expect(success.content.length).toBe(2);
    });

    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = TestBed.get(HttpTestingController).expectOne((request: HttpRequest<any>) => {
      return request.url === 'Student/getAll';
    });
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('studentName')).toEqual('');
    expect(req.request.params.get('studentNo')).toEqual('');
    expect(req.request.params.get('page')).toEqual('0');
    expect(req.request.params.get('size')).toEqual('10');

    req.flush(mockResult);
    expect(called).toBe(true);
  });

  /* 分页参数测试 */
  it('page params test', () => {
    service.page({name: 'name', no: 'no', page: 2, size: 20}).subscribe();
    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = TestBed.get(HttpTestingController).expectOne(
      request => request.url === 'Student/getAll'
    );
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('studentName')).toEqual('name');
    expect(req.request.params.get('studentNo')).toEqual('no');
    expect(req.request.params.get('page')).toEqual('2');
    expect(req.request.params.get('size')).toEqual('20');

    req.flush({});
  });
  it('getCurrentStudent', () => {
    let resultStudent;
    let called = false;
    service.getCurrentStudent()
      .subscribe(result => {
        resultStudent = result;
        called = true;
      });
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(`Student/getCurrentStudent`);
    // 断言请求的参数及方法符合预期
    expect(req.request.method).toEqual('GET');
    expect(called).toBeFalsy();
    req.flush(of(resultStudent));
    expect(called).toBeTruthy();
  });
});
