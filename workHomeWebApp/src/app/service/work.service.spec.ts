import {TestBed} from '@angular/core/testing';

import {WorkService} from './work.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Work} from '../common/work';

describe('WorkService', () => {
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

  it('getAllOfCurrentStudent', () => {
    let result;
    service.getAllOfCurrentStudent()
      .subscribe(data => result = data);
    const req = httpTestingController.expectOne('work');
    expect(req.request.method).toBe('GET');

    const mockReturn = new Array<Work>();
    req.flush(mockReturn);

    expect(mockReturn).toBe(result);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
