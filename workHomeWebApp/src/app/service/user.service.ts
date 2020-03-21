import { Injectable } from '@angular/core';
import {AppOnReadyItem, CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private commonService: CommonService, private httpClient: HttpClient) {
    this.getCurrentLoginUser();
  }

  private getCurrentLoginUser() {
    const appOnReadyItem =  new AppOnReadyItem();
    this.commonService.addAppOnReadyItem(appOnReadyItem);

    // 获取当前登录用户，并设置ready = true;
    appOnReadyItem.ready = true;
  }

}
