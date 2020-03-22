import {Injectable} from '@angular/core';
import {AppOnReadyItem, CommonService} from './common.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {User} from '../common/user';
import {VUser} from '../base/vuser';
import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

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
   * 学生注册
   * @param student 学生
   */
  register(student): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/register`, student);
  }

  /**
   * 设置当前登录用户
   * @param user 登录用户
   */
  setCurrentLoginUser(user: User): void {
    this.currentLoginUser = user;
    this.currentLoginUser$.next(user);
  }

  /**
   * 校验密码是否正确
   * @param password 密码
   */
  public checkPasswordIsRight(password: string): Observable<boolean> {
    const vUser = new VUser();
    vUser.password = password;
    return this.httpClient.post<boolean>(`${this.url}/checkPasswordIsRight`, vUser);
  }

  /**
   * 验证原密码是否正确
   */
  public oldPasswordValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.checkPasswordIsRight(ctrl.value)
        .pipe(map((isRight: boolean) => (isRight ? null : {passwordError: true})),
          catchError(() => null));
    };
  }

  /**
   * 验证新密码与确认密码是否相同
   * @param control 表单
   */
  public confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const newPassword = control.get('newPassword').value;
    const confirmNewPassword = control.get('confirmNewPassword').value;

    // 判断确认密码与新密码是否相同
    if (newPassword && confirmNewPassword) {
      return newPassword !== confirmNewPassword ? {confirmPasswordError: true} : null;
    }
    return null;
  }

  /**
   * 登录用户修改密码
   * @param newPassword 新密码
   * @param oldPassword 旧密码
   */
  public updatePassword(newPassword: string, oldPassword: string): Observable<void> {
    const vUser = new VUser();
    vUser.password = oldPassword;
    vUser.newPassword = encodeURIComponent(newPassword);

    return this.httpClient.put<void>(`${this.url}/updatePassword`, vUser);
  }
}
