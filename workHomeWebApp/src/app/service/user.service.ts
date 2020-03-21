import { Injectable } from '@angular/core';
import {AppOnReadyItem, CommonService} from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../common/user';
import { Observable } from 'rxjs';

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


  login(user: User): Observable<void> {
    // 新建Headers，并添加认证信息
    let headers = new HttpHeaders();
    // 添加 content-type
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // 添加认证信息
    headers = headers.append('Authorization', 'Basic ' + btoa(user.username + ':' + encodeURIComponent(user.password)));
    // 发起get请求并返回
    return this.httpClient.get<void>('user/me', {headers});
  }

}
