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

  /**
   * 多个准备项。当且仅且所有的准备项均准备完毕后，才认为应用准备完毕。
   */
  it('addAppOnReadyItem', () => {
    // console.debug('数据准备，初始化准备状态为true');
    const commonService: CommonService = TestBed.get(CommonService);
    expect(commonService).toBeTruthy();

    let count = 0;
    // console.debug('添加准备项0，准备状态为false');
    const readyItem = commonService.getAppOnReadyItem();
    expect(readyItem.ready).toBeFalsy();

    // console.debug('添加准备项1，断言准备状态为false');
    const readyItem1 = commonService.getAppOnReadyItem();
    expect(readyItem1.ready).toBeFalsy();

    commonService.appOnReady(() => {
      // console.debug('一切准备就绪,断言count为3');
      expect(count).toEqual(3);
    });

    // console.debug('设置准备项0准备完毕。');
    count++;
    readyItem.ready = true;

    // console.debug('设置准备项1准备完毕。');
    count++;
    count++;
    readyItem1.ready = true;
    expect(readyItem1.ready).toBeTruthy();

  });
});
