import {Injectable} from '@angular/core';
import {AppOnReadyItem, CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../common/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private appOnReadyItem: AppOnReadyItem = new AppOnReadyItem();

  /**
   * buffer 设置为 1
   * 只保留最新的登录用户
   */
  private currentLoginUser$ = new ReplaySubject<User>(1);

  /**
   * 当前登录用户
   */
  private currentLoginUser;

  constructor(private commonService: CommonService,
              private httpClient: HttpClient,
              private router: Router) {
    this.getCurrentLoginUser();
    this.requestCurrentLoginUser();
    // 如果当前不是登录模块，请求当前登录用户
    // if (!this.router.url.includes('auth')) {
    //   this.requestCurrentLoginUser();
    // }
  }

  private getCurrentLoginUser(): User {
    const appOnReadyItem = new AppOnReadyItem();
    this.commonService.addAppOnReadyItem(appOnReadyItem);

    // 获取当前登录用户，并设置ready = true;
    appOnReadyItem.ready = true;
    return this.currentLoginUser;
  }

  /**
   * 获取当前登录用户
   */
  getCurrentLoginUser$(): Observable<User> {
    return this.currentLoginUser$;
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>('User/logout').pipe(map(() => {
      this.setCurrentLoginUser(null);
    }));
  }

  /**
   * 请求当前登录用户
   */
  requestCurrentLoginUser(callback?: () => void): void {
    this.appOnReadyItem.ready = false;
    this.httpClient.get<User>('User/me')
      .subscribe((user: User) => {
        this.setCurrentLoginUser(user);
      }, () => {
      }, () => {
        this.appOnReadyItem.ready = true;
        if (callback) {
          callback();
        }
      });
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
