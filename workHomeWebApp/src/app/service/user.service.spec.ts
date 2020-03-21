import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {ServiceTestingModule} from './service-tesing/service-testing.module';

describe('UserService', () => {
  let service: UserService;
  let commonService: CommonService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ServiceTestingModule
    ]
  }));

  beforeEach(() => {
    commonService = TestBed.get(CommonService);
    const httpClient = TestBed.get(HttpClient) as HttpClient;
    service = new UserService(commonService, httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
