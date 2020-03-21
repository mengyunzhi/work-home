import { Injectable } from '@angular/core';
import { AppOnReadyItem, CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../common/user';
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'User';
  private currentLoginUser$ = new ReplaySubject<User>(1);
  /*当前登录用户*/
  private currentLoginUser;

  constructor(private commonService: CommonService,
              private httpClient: HttpClient,
              private router: Router,
  ) {

    // 如果当前不是登录模块，请求当前登录用户
    if (!this.router.url.includes('auth')) {
      this.getCurrentLoginUser();
    }
  }

  public getCurrentLoginUser(callback?: () => void) {
    const appOnReadyItem = new AppOnReadyItem();
    this.commonService.addAppOnReadyItem(appOnReadyItem);
    // 获取当前登录用户，并设置ready = true;
    this.httpClient.get<User>('User/user')
      .subscribe((user: User) => {
        this.setCurrentLoginUser(user);
      }, () => {
      }, () => {
        appOnReadyItem.ready = true;
        if (callback) {
          callback();
        }
      });
  }


  login(user: User): Observable<User> {
    // 新建Headers，并添加认证信息
    let headers = new HttpHeaders();
    // 添加 content-type
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // 添加认证信息
    headers = headers.append('Authorization', 'Basic ' + btoa(user.username + ':' + encodeURIComponent(user.password)));
    // 发起get请求并返回
    return this.httpClient.get<User>(this.baseUrl + '/me', {headers});
  }

  /**
   * 设置当前登录用户
   * @param user 登录用户
   */
  setCurrentLoginUser(user: User): void {
    this.currentLoginUser = user;
    this.currentLoginUser$.next(user);
  }

}
