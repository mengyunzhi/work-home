import {Injectable} from '@angular/core';
import {AppOnReadyItem, CommonService} from './common.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {User} from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentLoginUser: User;
  private currentLoginUser$ = new ReplaySubject<User>(1);
  private url = 'user';

  constructor(private commonService: CommonService,
              private httpClient: HttpClient,
              private router: Router) {
    // 如果当前不是登录模块，请求当前登录用户
    if (!this.router.url.includes('auth')) {
      this.getCurrentLoginUser();
    }
  }

  private getCurrentLoginUser() {
    const appOnReadyItem = new AppOnReadyItem();
    this.commonService.addAppOnReadyItem(appOnReadyItem);

    this.httpClient.get<User>(`${this.url}/me`)
      .subscribe(user => {
        this.currentLoginUser = user;
      }, () => {
        this.currentLoginUser = null;
      }, () => {
        // 准备完完毕
        appOnReadyItem.ready = true;
      });
  }

  /**
   * 获取登录用户时，应该结合appOnReady。示例：
   * this.commonService.appOnReady(() => {const user = this.userService.getCurrentUser();});
   */
  getCurrentUser(): User | null {
    return this.currentLoginUser;
  }


  login(user: User): Observable<User> {
    // 新建Headers，并添加认证信息
    let headers = new HttpHeaders();
    // 添加 content-type
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // 添加认证信息
    headers = headers.append('Authorization', 'Basic ' + btoa(user.username + ':' + encodeURIComponent(user.password)));
    // 发起get请求并返回
    return this.httpClient.get<User>(this.url + '/me', {headers});
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${this.url}/logout`).pipe(map(() => {
      this.setCurrentLoginUser(null);
    }));
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
