import {TestBed} from '@angular/core/testing';

import {WorkService} from './work.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Work} from '../common/work';
import {Page} from '../base/page';
import {HttpRequest} from '@angular/common/http';

describe('workServiceTest', () => {
  let httpTestingController: HttpTestingController;
  let service: WorkService;
  beforeEach(() => TestBed.configureTestingModule({
    imports:
      [HttpClientTestingModule]
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(WorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getById', () => {
    const id = Math.floor(Math.random() * 100);
    let resultWork;
    const params = {id};
    const _params = {id: params.id.toLocaleString()};
    service.getById({id})
      .subscribe(result => {
        resultWork = result;
      });
    const req = httpTestingController.expectOne((request: HttpRequest<any>) => {
      return request.url === `work/${_params.id}`;
    });
    // 断言请求的参数及方法符合预期
    expect(req.request.method).toEqual('GET');
    // 返回值为可被观察者，该观察者携带的内容为`void`
  });
  it('getAllOfCurrentStudent', () => {
    let result;
    service.getAllOfCurrentStudent()
      .subscribe(data => result = data);
    const req = httpTestingController.expectOne('work/getAllOfCurrentStudent');
    expect(req.request.method).toBe('GET');

    const mockReturn = new Array<Work>();
    req.flush(mockReturn);

    expect(mockReturn).toBe(result);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  /* 分页测试 */
  it('getAll分页测试', () => {
    /* 模拟返回数据 */
    const mockResult = new Page<Work>();

    /* 进行订阅，发送数据后将called置true */
    let called = false;
    service.getAll({page: 2, size: 3}).subscribe((success: Page<Work> ) => {
      called = true;
      expect(success).toEqual(new Page<Work>());
    });

    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = httpTestingController.expectOne((request: HttpRequest<any>) => {
    return request.url === 'work/getAll';
  });
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('page')).toEqual('2');
    expect(req.request.params.get('size')).toEqual('3');

    req.flush(mockResult);
    expect(called).toBe(true);
  });

  /* 分页参数测试 */
  it('getAll分页参数测试', () => {
    service.getAll({page: 2, size: 3}).subscribe();
    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = httpTestingController.expectOne(
      request => request.url === 'work/getAll'
    );
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('page')).toEqual('2');
    expect(req.request.params.get('size')).toEqual('3');

    req.flush({});
  });

  /* 分页测试 */
  it('getAll分页测试', () => {
    /* 模拟返回数据 */
    const mockResult = new Page<Work>();

    /* 进行订阅，发送数据后将called置true */
    let called = false;
    service.getAll({page: 2, size: 3}).subscribe((success: Page<Work> ) => {
      called = true;
      expect(success).toEqual(new Page<Work>());
    });

    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = httpTestingController.expectOne((request: HttpRequest<any>) => {
      return request.url === 'work/getAll';
    });
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('page')).toEqual('2');
    expect(req.request.params.get('size')).toEqual('3');

    req.flush(mockResult);
    expect(called).toBe(true);
  });

  it('updateScore更新作业成绩', () => {
    // 调用方法并订阅
    const _work = new Work();
    _work.id = Math.floor(Math.random() * 100);
    let resultWork;
    service.updateScore({ id: _work.id, work: _work })
      .subscribe(result => {
        resultWork = result;
      });

    // 断言发起了http请求
    const httpTesting: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTesting.expectOne(`work/updateScore/${_work.id}`);

    // 断言请求的参数及方法符合预期
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(_work);

    // 模拟返回数据
    const mockWork = new Work();
    req.flush(mockWork);

    // 断言接收数据
    expect(resultWork).toBe(mockWork);
  });
});
