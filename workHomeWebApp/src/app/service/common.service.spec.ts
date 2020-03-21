import {TestBed} from '@angular/core/testing';

import {CommonService} from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = new CommonService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
