import {Injectable} from '@angular/core';
import {AppOnReadyItem, CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../common/entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User;
  private url = '/user';

  constructor(private commonService: CommonService, private httpClient: HttpClient) {
    this.getCurrentLoginUser();
  }

  private getCurrentLoginUser() {
    const appOnReadyItem = new AppOnReadyItem();
    this.commonService.addAppOnReadyItem(appOnReadyItem);

    this.httpClient.get(`${this.url}/me`)
      .subscribe(user => {
        this.currentUser = user;
      }, () => {
        this.currentUser = null;
      }, () => {
        // 准备完完毕
        appOnReadyItem.ready = true;
      });
  }

  /**
   * 获取登录用户时，应该结合appOnReady。示例：
   * this.commonService.appOnReady(() => {const user = this.userService.getCurrentUser();});
   */
  getCurrentUser(): User {
    return this.currentUser;
  }

}
