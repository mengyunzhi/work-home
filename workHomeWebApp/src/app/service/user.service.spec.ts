import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {ServiceTestingModule} from './service-tesing/service-testing.module';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('UserService', () => {
  let service: UserService;
  let commonService: CommonService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ServiceTestingModule,
      RouterTestingModule
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
});
