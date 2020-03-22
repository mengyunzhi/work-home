import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {environment} from 'src/environments/environment';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  /** 当前模式 */
  mode: string;

  /** 获取当前环境配置 */
  environment = environment;

  /** 登录表单对象 */
  loginForm: FormGroup;

  /** 注册表单对象 */
  registerForm: FormGroup;

  /** 错误信息 */
  errorInfo: string;

  /** 显示错误信息 */
  showErrorInfo: boolean;

  constructor(private userService: UserService,
              private builder: FormBuilder,
              private appComponent: AppComponent,
              private router: Router) {
  }

  ngOnInit() {
    this.mode = 'login';
    this.appComponent.showLogin = true;
    /** 创建表单 */
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    /** 创建注册表单 */
    this.registerForm = this.builder.group({
      no: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.checkPassword
    });
  }

  /**
   * 校验密码
   * @param group 表单对象
   */
  checkPassword(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    /** 判断两次密码是否相同 */
    if (password && confirmPassword) {
      return password === confirmPassword ? null : { mismatch: true };
    }
  }

  login() {
    this.userService.login(this.loginForm.value)
      .subscribe((user) => {
        this.showErrorInfo = false;
        this.userService.setCurrentLoginUser(user);
        this.appComponent.showLogin = false;
      }, () => {
        this.errorInfo = '登录失败，请检查您的用户名、密码';
        this.showErrorInfo = true;
      });
  }

  register(): void {
    console.log(this.registerForm.value);
  }

  changeToLogin(): void {
    this.mode = 'login';
  }

  changeToRegister(): void {
    this.mode = 'register';
  }

  ngOnDestroy(): void {

  }
}
