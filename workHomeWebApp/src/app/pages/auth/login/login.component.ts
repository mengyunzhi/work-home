import {Component, OnDestroy, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Student} from '../../../common/student';
import {ConfigService} from '../../../service/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  /** 当前模式 */
  mode: string;

  /** 登录表单对象 */
  loginForm: FormGroup;

  /** 注册表单对象 */
  registerForm: FormGroup;

  /** 错误信息 */
  errorInfo: string;

  /** 显示错误信息 */
  showErrorInfo: boolean;

  /** 注册错误信息 */
  registerErrorInfo: string;

  /** 显示注册错误信息 */
  showRegisterErrorInfo: boolean;

  /** 注册提示信息 */
  registerInfo: string;

  /** 显示注册提示信息 */
  showRegisterInfo: boolean;

  projectConfig: {version: string};

  constructor(private userService: UserService,
              private builder: FormBuilder,
              private configService: ConfigService) {
  }

  ngOnInit() {
    this.projectConfig = this.configService.config;
    this.changeToLogin();
    /** 创建表单 */
    this.loginForm = this.builder.group({
      username: ['', [Validators.minLength(5),
        Validators.maxLength(6),
        Validators.pattern('\\w+'),
        Validators.required]],
      password: ['', Validators.required],
    });
    /** 创建注册表单 */
    this.registerForm = this.builder.group({
      no: ['', [Validators.minLength(5),
        Validators.maxLength(6),
        Validators.pattern('\\w+'),
        Validators.required]],
      name: ['', [Validators.minLength(2),
        Validators.maxLength(5),
        Validators.pattern('\\D+'),
        Validators.required]],
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
      return password === confirmPassword ? null : {mismatch: true};
    }
  }

  login() {
    this.userService.login(this.loginForm.value)
      .subscribe(() => {
        this.showErrorInfo = false;
      }, () => {
        this.errorInfo = '登录失败，请检查您的用户名、密码';
        this.showErrorInfo = true;
      });
  }

  register(): void {
    const student = new Student();
    student.name = this.registerForm.get('name').value;
    student.no = this.registerForm.get('no').value;
    student.user.username = student.no;
    student.user.password = this.registerForm.get('confirmPassword').value;

    this.userService.register(student)
      .subscribe(() => {
        this.showRegisterErrorInfo = false;
        this.changeToLogin();
        this.showRegisterInfo = true;
        this.registerInfo = '注册成功，请登录。';
      }, (response: HttpErrorResponse) => {
        this.registerErrorInfo = `${response.error.message}请尝试更换用户名或检查您的网络连接`;
        this.showRegisterErrorInfo = true;
      });
  }

  changeToLogin(): void {
    this.mode = 'login';
  }

  changeToRegister(): void {
    this.mode = 'register';
  }

  ngOnDestroy(): void {
  }
  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get no(): AbstractControl {
    return this.registerForm.get('no');
  }

  get name(): AbstractControl {
    return this.registerForm.get('name');
  }
}
